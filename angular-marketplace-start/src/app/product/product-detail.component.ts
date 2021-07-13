import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { AuthService } from "../account/auth.service";
import { GetProductDetailService } from "./_api/get-product-detail.service";
import { Facemask } from "./_api/product-detail";
import { UserMessageComponent } from "../chat/user-message.component";

@Component({
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit {
  isChatWidgetInitialized: boolean;
  isChatWidgetLaunched: boolean;
  facemask: Facemask;
  sellerUid: string;
  isUserLoggedIn: boolean;

  @ViewChild(UserMessageComponent)
  private userMsgComponent!: UserMessageComponent;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private productService: GetProductDetailService
  ) {}

  ngOnInit(): void {
    this.isChatWidgetInitialized = false;
    this.isChatWidgetLaunched = false;
    this.sellerUid = "";

    // As a simplified use case, this.route.snapshot is used because
    // this component will not be reused
    //
    // For a real world use case, this component will most likely
    // contains links to similar product, thus this component will be
    // reused to populate with that product's detail.
    // In this scenario, rxjs Observable and Operators will be a better choice
    const id: number = parseInt(this.route.snapshot.paramMap.get("id"));
    this.facemask = this.productService.getFacemaskDetail(id);

    if (this.authService.isLoggedIn()) {
      this.sellerUid = this.facemask.shop;
    }
  }

  onMessageSeller(): void {
    if (this.authService.isLoggedIn()) {
      this.sellerUid = this.facemask.shop;
      this.userMsgComponent.openOrClose();
    }
  }
}
