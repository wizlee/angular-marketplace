import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: "app-product-banner",
  templateUrl: "./product-banner.component.html",
  styles: [],
})
export class ProductBannerComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onViewFaceMask(): void {
    this.router.navigate(["facemask"]);
  }
}
