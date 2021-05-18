import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  templateUrl: "./face-mask-product-list.component.html",
  styles: [],
})
export class FaceMaskProductListComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onViewFacemask(id: string): void {
    this.router.navigate(["/facemask", "detail", id]);
  }
}
