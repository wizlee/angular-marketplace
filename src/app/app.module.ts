import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { ChatModule } from "./chat/chat.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: "home",
        loadChildren: () => HomeModule,
      },
      {
        path: "conversation",
        loadChildren: () => ChatModule,
      },
      { path: "**", redirectTo: "/home", pathMatch: "full" },
    ]),
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
