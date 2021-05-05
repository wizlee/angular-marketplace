import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from "@angular/forms";

import { ModalModule } from "../_modal";
import { NotLoginMessageComponent } from './not-login-message.component';

@NgModule({
  declarations: [LoginComponent, NotLoginMessageComponent],
  imports: [CommonModule, ModalModule, FormsModule],
  exports: [LoginComponent],
})
export class AccountModule {}
