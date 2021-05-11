import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { BasketComponent } from './basket.component';
import { FaceMaskProductListComponent } from './face-mask-product-list.component';
import { ProductDetailComponent } from './product-detail.component';

@NgModule({
  declarations: [
    BasketComponent,
    FaceMaskProductListComponent,
    ProductDetailComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [BasketComponent],
})
export class ProductModule {}
