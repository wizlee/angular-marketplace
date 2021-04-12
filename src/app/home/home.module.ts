import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ProductBannerComponent } from './product-banner.component';
import { ProductBundleComponent } from './product-bundle.component';
import { ProductListComponent } from './product-list.component';
import { AboutBannerComponent } from './about-banner.component';
import { FooterComponent } from './footer.component';



@NgModule({
  declarations: [HeaderComponent, ProductBannerComponent, ProductBundleComponent, ProductListComponent, AboutBannerComponent, FooterComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, ProductBannerComponent, ProductBundleComponent, ProductListComponent, AboutBannerComponent, FooterComponent]
})
export class HomeModule { }
