import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { HeaderComponent } from './header.component';
import { ProductBannerComponent } from './product-banner.component';
import { ProductBundleComponent } from './product-bundle.component';
import { ProductListComponent } from './product-list.component';
import { AboutBannerComponent } from './about-banner.component';
import { FooterComponent } from './footer.component';
import { ContentComponent } from './content.component';

import { AccountModule } from "../account/account.module";
import { ChatModule } from "../chat/chat.module";
import { ProductModule } from "../product/product.module";
import { InvalidComponent } from './invalid.component';

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
    RouterModule.forChild([
      {
        path: "",
        component: ContentComponent,
      },
      {
        path: "**",
        component: InvalidComponent,
      },
    ]),
    AccountModule,
    ChatModule,
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
    InvalidComponent,
  ],
})
export class HomeModule {}
