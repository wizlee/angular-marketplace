import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  templateUrl: "./not-login-message.component.html",
  styles: [],
})
export class NotLoginMessageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(["home"]);
    }, 5000); //5s
  }
}
