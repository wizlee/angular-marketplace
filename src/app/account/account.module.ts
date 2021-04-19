import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from "@angular/forms";

import { ModalModule } from "../_modal";

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ModalModule, FormsModule],
  exports: [LoginComponent],
})
export class AccountModule {}
