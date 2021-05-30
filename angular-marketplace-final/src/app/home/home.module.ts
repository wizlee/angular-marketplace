import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from './header.component';
import { ProductBannerComponent } from './product-banner.component';
import { ProductBundleComponent } from './product-bundle.component';
import { ProductListComponent } from './product-list.component';
import { AboutBannerComponent } from './about-banner.component';
import { FooterComponent } from './footer.component';
import { ContentComponent } from './content.component';
import { InvalidComponent } from './invalid.component';

import { AccountModule } from "../account/account.module";
import { ChatModule } from "../chat/chat.module";
import { ProductModule } from "../product/product.module";
import { FaceMaskProductListComponent } from "../product/face-mask-product-list.component";
import { ProductDetailComponent } from "../product/product-detail.component";

const routes: Routes = [
  {
    path: "home",
    component: ContentComponent,
  },
  {
    path: "facemask",
    component: FaceMaskProductListComponent,
  },
  {
    path: ":product/detail/:id",
    component: ProductDetailComponent,
  },
];

@NgModule({
  declarations: [
    HeaderComponent,
    ProductBannerComponent,
    ProductBundleComponent,
    ProductListComponent,
    AboutBannerComponent,
    FooterComponent,
    ContentComponent,
    InvalidComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ChatModule,
    AccountModule,
    ProductModule,
  ],
  exports: [
    HeaderComponent,
    ProductBannerComponent,
    ProductBundleComponent,
    ProductListComponent,
    AboutBannerComponent,
    FooterComponent,
    ContentComponent,
  ],
})
export class HomeModule {}
