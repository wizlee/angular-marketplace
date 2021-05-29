import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";

import { GetProductDetailService } from "./_api/get-product-detail.service";
import { Facemask } from "./_api/product-detail";

@Component({
  templateUrl: "./add-selling-goods.component.html",
  styles: [],
})
export class AddSellingGoodsComponent implements OnInit {
  goodsNotOnSale: Facemask[];

  constructor(
    private router: Router,
    private productService: GetProductDetailService
  ) {}

  ngOnInit(): void {
    this.goodsNotOnSale = this.productService.getNotOnSaleFacemasks();
  }

  onAddGoods(f: NgForm): void {
    f.control.markAllAsTouched();

    if (f.valid) {
      const id: number = this.productService.getFacemaskProductIdForNotOnSale(
        f.value.notOnSaleIndex
      );
      if(id >= 0) {
        this.productService.putFacemaskOnSale(id);
        this.router.navigate(["/facemask"]);
      }
    }
  }
}
