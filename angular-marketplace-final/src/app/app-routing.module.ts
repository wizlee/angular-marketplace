import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { InvalidComponent } from "./home/invalid.component";
import { NotLoginMessageComponent } from "./account/not-login-message.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "/home", pathMatch: "full" },
      {
        path: "notlogin",
        component: NotLoginMessageComponent,
      },
      {
        path: "**",
        component: InvalidComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
