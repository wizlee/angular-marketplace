import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';



@NgModule({
  declarations: [BasketComponent],
  imports: [
    CommonModule
  ],
  exports: [BasketComponent]
})
export class ProductModule { }
