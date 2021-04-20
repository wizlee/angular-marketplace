import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ModalService } from "../_modal";
import { CometChat } from "@cometchat-pro/chat";
import { COMETCHAT_CONSTANTS } from "../../CONSTS";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  isLogin: boolean; // TODO: use auth service instead of a local variable
  defaultUserUrls: {};
  loginModalId: string;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.isLogin = false;
    this.loginModalId = "login-modal";
    this.defaultUserUrls = COMETCHAT_CONSTANTS.imgUrls;
  }

  openModal() {
    if (this.isLogin) {
      CometChat.logout().then(
        (_) => {
          //Logout completed successfully
          console.log("Logout completed successfully");
        },
        (error) => {
          //Logout failed with exception
          console.log("Logout failed with exception:", { error });
        }
      );

      this.isLogin = false;
    } else {
      this.modalService.open(this.loginModalId);
    }
  }

  closeModal(f: NgForm = undefined) {
    if (f) {
      f.reset();
    }
    this.modalService.close(this.loginModalId);
  }

  onSignIn(f: NgForm) {
    f.control.markAllAsTouched();

    const username = f.value.username;
    if (username) {
      if (username in COMETCHAT_CONSTANTS.UIDs) {
        CometChat.login(
          COMETCHAT_CONSTANTS.UIDs[username],
          COMETCHAT_CONSTANTS.AUTH_KEY
        ).then(
          (user) => {
            console.log("Login Successful:", { user });
            this.isLogin = true;
            this.closeModal(f);
          },
          (error) => {
            f.control.setErrors({
              signInErrorMsg: `Login failed: Check your CometChat App ID & Secret`,
            });
            console.log("Login failed with exception:", { error });
          }
        );
      } else {
        f.control.setErrors({
          signInErrorMsg: `User '${username}' is not one of the default users. To use a default user without registering, please select an avatar. `,
        });
      }
    }
  }

  onSelectUser(f: NgForm, user: string) {
    f.setValue({ username: user });
    this.onSignIn(f);
  }

  onRegister(f: NgForm) {
    f.control.markAllAsTouched();
    console.log(f.value); // { first: '', last: '' }
    console.log(f.valid); // false
  }
}
