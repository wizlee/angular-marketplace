import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { FaceMaskProductListComponent } from './face-mask-product-list.component';

@NgModule({
  declarations: [BasketComponent, FaceMaskProductListComponent],
  imports: [
    CommonModule
  ],
  exports: [BasketComponent]
})
export class ProductModule { }
