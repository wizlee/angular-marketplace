import { Component, Input, OnInit } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";

@Component({
  selector: "app-user-message",
  templateUrl: "./user-message.component.html",
  styleUrls: ["./user-message.component.css"],
})
export class UserMessageComponent implements OnInit {
  cometChatUser: any;
  isInitSuccess: boolean;
  isOpen: boolean;

  constructor() {}

  ngOnInit(): void {
    this.isInitSuccess = false;
    this.isOpen = false;
  }

  @Input()
  public set uid(uid: string) {
    CometChat.getUser(uid).then(
      (user) => {
        console.log("User details fetched for UID:", uid);
        this.cometChatUser = user;
        this.isInitSuccess = true;
      },
      (error) => {
        console.error("User details fetching failed with error:", error);
      }
    );
  }

  openOrClose(): void {
    if (this.isInitSuccess) {
      this.isOpen = !this.isOpen;
    }
  }
}
