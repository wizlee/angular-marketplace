import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";

import { ModalService } from "../_modal";
import { CometChat } from "@cometchat-pro/chat";
import { COMETCHAT_CONSTANTS } from "../../CONSTS";
import { AuthService} from "./auth.service";
import { User } from "./user";

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

  constructor(public authService: AuthService, private modalService: ModalService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.userAvatar = this.authService.getUser()?.userAvatar;
      this.userDisplayName = this.authService.getUser()?.displayName;
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
    f.setValue({ username: user });
    this.onSignIn(f);
  }

  onSignIn(f: NgForm): void {
    f.control.markAllAsTouched();

    const username = f.value.username;
    const isDefaultUser = username in COMETCHAT_CONSTANTS.UIDs;
    const name = isDefaultUser ? COMETCHAT_CONSTANTS.UIDs[username] : username;
    CometChat.login(name, COMETCHAT_CONSTANTS.AUTH_KEY).then(
      (user) => {
        console.log("Login Successful:", { user });
        const userData: User = {
          id: name,
          displayName: user.getName(),
          isLoggedIn: true,
          userAvatar: user.getAvatar(),
          isDefaultUser: isDefaultUser,
        };
        this.authService.setUser(userData);
        this.userAvatar = userData.userAvatar;
        this.closeModal(f);
      },
      (error) => {
        console.log("Login failed with exception:", { error });
        if (username in COMETCHAT_CONSTANTS.UIDs) {
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

    const username = f.value.registerUsername;
    const displayname = f.value.displayname;
    if (username && displayname) {
      const cometChatUser = new CometChat.User(username);
      cometChatUser.setName(displayname);
      CometChat.createUser(cometChatUser, COMETCHAT_CONSTANTS.AUTH_KEY).then(
        (user) => {
          console.log("User created", user);
          this.closeModal(f);
        },
        (error) => {
          f.control.setErrors({
            registerErrorMsg: `User registration failed: Check your CometChat App ID & Auth Key in src/CONSTS.ts`,
          });
          console.log("User registration error", error);
        }
      );
    }
  }
}
