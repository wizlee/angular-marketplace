import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";

import { COMETCHAT_CONSTANTS } from "../../CONSTS";
import { User } from "./user";
import { ModalService } from "../_modal";
import { AuthService} from "./auth.service";

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
    private modalService: ModalService
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

  openModal(): void { }

  closeModal(f: NgForm = undefined): void { }

  onSelectUser(f: NgForm, user: string): void {
    f.setValue({ uniqueId: user });
    this.onSignIn(f);
  }

  onSignIn(f: NgForm): void {
    f.control.markAllAsTouched();
  }

  onRegister(f: NgForm): void {
    f.control.markAllAsTouched();
  }

  private registerCometChatUser(uniqueId: string, displayname: string, f? : NgForm) { }

  private preRegisterExistingSellers() { }
}
