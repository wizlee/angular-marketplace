import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: "app-inbox",
  templateUrl: "./inbox.component.html",
  styles: [],
})
export class InboxComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToConversationListScreen() {
    this.router.navigate(["/conversation"]);
  }
}
