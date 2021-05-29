import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";

import { CometChat } from "@cometchat-pro/chat";
import { COMETCHAT_CONSTANTS } from "../../CONSTS";
import { User } from "./user";
import { ModalService } from "../_modal";
import { AuthService} from "./auth.service";
import { GetProductDetailService } from '../product/_api/get-product-detail.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  defaultUserUrls: {};
  loginModalId: string;
  userAvatar: string;
  userDisplayName: string;

  constructor(
    private router: Router,
    public authService: AuthService,
    private modalService: ModalService,
    private productService: GetProductDetailService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.userAvatar = this.authService.getUser()?.userAvatar;
      this.userDisplayName = this.authService.getUser()?.displayName;
      this.preRegisterExistingSellers();
    }
    this.loginModalId = "login-modal";
    this.defaultUserUrls = COMETCHAT_CONSTANTS.imgUrls;
  }

  openModal(): void {
    if (this.authService.isLoggedIn()) {
      CometChat.logout().then(
        (_) => {
          console.log("Logout completed successfully");
        },
        (error) => {
          console.log(`Logout failed with exception: ${error}`);
        }
      );

      this.authService.logout();
      this.router.navigate(["home"]);
    } else {
      this.modalService.open(this.loginModalId);
    }
  }

  closeModal(f: NgForm = undefined): void {
    if (f) {
      f.reset();
    }
    this.modalService.close(this.loginModalId);
  }

  onSelectUser(f: NgForm, user: string): void {
    f.setValue({ uniqueId: user });
    this.onSignIn(f);
  }

  onSignIn(f: NgForm): void {
    f.control.markAllAsTouched();

    // this will be the
    //  1. displayname if user login by clicking on the default superhero users
    //  2. uniqueId if user login by typing newly created CometChat user
    const username = f.value.uniqueId;
    const isDefaultUser = username in COMETCHAT_CONSTANTS.UIDs;
    const uniqueId = isDefaultUser
      ? COMETCHAT_CONSTANTS.UIDs[username]
      : username; // convert superhero displayname into unique id
    CometChat.login(uniqueId, COMETCHAT_CONSTANTS.AUTH_KEY).then(
      (user) => {
        console.log("Login Successful:", { user });
        const userData: User = {
          id: uniqueId,
          displayName: user.getName(),
          isLoggedIn: true,
          userAvatar: user.getAvatar(),
          isDefaultUser: isDefaultUser,
        };
        this.authService.setUser(userData);
        this.userDisplayName = userData.displayName;
        this.userAvatar = userData.userAvatar;
        this.closeModal(f);

        this.preRegisterExistingSellers();
      },
      (error) => {
        console.log("Login failed with exception:", { error });
        if (isDefaultUser) {
          f.control.setErrors({
            signInErrorMsg: `Login failed: Check your CometChat App ID & Auth Key in src/CONSTS.ts`,
          });
        } else {
          f.control.setErrors({
            signInErrorMsg: `User '${username}' is not one of the default users. To use a default user without registering, please select an avatar. `,
          });
        }
      }
    );
  }

  onRegister(f: NgForm): void {
    f.control.markAllAsTouched();

    const uniqueId = f.value.registerUniqueId;
    const displayname = f.value.username;
    if (uniqueId && displayname) {
      this.registerCometChatUser(uniqueId, displayname, f);
    }
  }

  private registerCometChatUser(uniqueId: string, displayname: string, f? : NgForm) {
    const cometChatUser = new CometChat.User(uniqueId);
      cometChatUser.setName(displayname);
      CometChat.createUser(cometChatUser, COMETCHAT_CONSTANTS.AUTH_KEY).then(
        (user) => {
          console.log("User created", user);
          if (f) {
            this.closeModal(f);
          }
        },
        (error) => {
          if (f) {
            f.control.setErrors({
              registerErrorMsg: `User registration failed: Check your CometChat App ID & Auth Key in src/CONSTS.ts`,
            });
          }
          console.log("User registration error", error);
        }
      );
  }

  private preRegisterExistingSellers() {
    if (this.authService.isLoggedIn()) {
      for (let i = 0; i < this.productService.getFacemaskCount(); i++) {
        const product = this.productService.getFacemaskDetail(i);
        const shopName: string = product.shop;
        const sellerName: string = product.seller;
        CometChat.getUser(shopName).then(
          (user) => {
            console.log(`Seller: ${user.getName()} already registered:`);
          },
          (_) => {
            console.log(`Registering for Seller: ${sellerName}, Shop Name: ${shopName}`);
            this.registerCometChatUser(shopName, sellerName);
          }
        );
      }
    }
  }
}
