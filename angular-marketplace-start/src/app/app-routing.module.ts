import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

import { InvalidComponent } from "./home/invalid.component";
import { NotLoginMessageComponent } from "./account/not-login-message.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "notlogin",
    component: NotLoginMessageComponent,
  },
  {
    path: "**",
    component: InvalidComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
