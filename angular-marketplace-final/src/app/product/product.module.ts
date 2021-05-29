import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';

import { BasketComponent } from './basket.component';
import { FaceMaskProductListComponent } from './face-mask-product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { AddSellingGoodsComponent } from './add-selling-goods.component';
import { AuthGuard } from '../account/auth.guard';

@NgModule({
  declarations: [
    BasketComponent,
    FaceMaskProductListComponent,
    ProductDetailComponent,
    AddSellingGoodsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "addgoods",
        component: AddSellingGoodsComponent,
        canActivate: [AuthGuard],
      },
    ]),
    FormsModule,
  ],
  exports: [BasketComponent],
})
export class ProductModule {}
