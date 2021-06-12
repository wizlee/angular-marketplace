import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { GetProductDetailService } from "./_api/get-product-detail.service";
import { Facemask } from "./_api/product-detail";

@Component({
  templateUrl: "./face-mask-product-list.component.html",
  styles: [],
})
export class FaceMaskProductListComponent implements OnInit {
  facemasks: Facemask[];

  constructor(
    private router: Router,
    private productService: GetProductDetailService
  ) {}

  ngOnInit(): void {
    this.facemasks = this.productService.getOnSaleFacemasks();
  }

  onViewFacemask(id: number): void {
    const productId: number =
      this.productService.getFacemaskProductIdForOnSale(id);
    this.router.navigate(["/facemask", "detail", productId.toString()]);
  }
}
