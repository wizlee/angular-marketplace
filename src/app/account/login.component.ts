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
  signInErrorMsg: string;
  defaultUserUrls: {};

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.isLogin = false;
    this.signInErrorMsg = "Can't be blank";
    this.defaultUserUrls = COMETCHAT_CONSTANTS.imgUrls;
  }

  openModal(id: string) {
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
      this.modalService.open(id);
    }
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onSignIn(f: NgForm) {
    f.control.markAllAsTouched();
    this.signInErrorMsg = "Can't be blank";

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
          },
          (error) => {
            console.log("Login failed with exception:", { error });
          }
        );
      } else {
        f.setValue({ username: "" });
        this.signInErrorMsg = `User ${username} doesn't exist.`;
      }
    }
    console.log(f.value); // { first: '', last: '' }
    console.log(f.valid); // false
  }

  onSelectUser(f: NgForm, user: string) {
    f.setValue({ username: user });
  }

  onRegister(f: NgForm) {
    f.control.markAllAsTouched();
    console.log(f.value); // { first: '', last: '' }
    console.log(f.valid); // false
  }
}
