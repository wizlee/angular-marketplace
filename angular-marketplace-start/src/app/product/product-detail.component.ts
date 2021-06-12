import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CometChatWidget } from "../../assets/cometchatwidget.js";
import { COMETCHAT_CONSTANTS } from "../../CONSTS";
import { AuthService } from "../account/auth.service";
import { User } from "../account/user";
import { GetProductDetailService } from "./_api/get-product-detail.service";
import { Facemask } from "./_api/product-detail";

@Component({
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  isChatWidgetInitialized: boolean;
  isChatWidgetLaunched: boolean;
  facemask: Facemask;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private productService: GetProductDetailService
  ) {}

  ngOnInit(): void {
    this.isChatWidgetInitialized = false;
    this.isChatWidgetLaunched = false;

    // As a simplified use case, this.route.snapshot is used because
    // this component will not be reused
    //
    // For a real world use case, this component will most likely
    // contains links to similar product, thus this component will be
    // reused to populate with that product's detail.
    // In this scenario, rxjs Observable and Operators will be a better choice
    const id: number = parseInt(this.route.snapshot.paramMap.get("id"));
    this.facemask = this.productService.getFacemaskDetail(id);

    if (!this.authService.isLoggedIn()) return;
    this.initCometChatWidget().then(
      () => {
        this.isChatWidgetInitialized = true;
        // launch and keep the chat widget minimized
        this.launchCometChatWidget(this.facemask.shop, false);
      },
      (error) => {
        console.log("User login failed with error:", error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.authService.isLoggedIn()) {
      CometChatWidget.openOrCloseChat(false);
      CometChatWidget.logout();
    }
  }

  onMessageSeller(): void {
    if (this.authService.isLoggedIn()) {
      this.initCometChatWidget().then(
        () => {
          this.isChatWidgetInitialized = true;
          // launch and open the chat widget
          this.launchCometChatWidget(this.facemask.shop, true);
        },
        (error) => {
          this.isChatWidgetInitialized = false;
          console.log("User login failed with error:", error);
        }
      );
    }
  }

  private initCometChatWidget() {
    if (this.isChatWidgetInitialized) {
      return new Promise((resolve, _) => {
        resolve(true);
      });
    }

    return CometChatWidget.init({
      appID: COMETCHAT_CONSTANTS.APP_ID,
      appRegion: COMETCHAT_CONSTANTS.REGION,
      authKey: COMETCHAT_CONSTANTS.AUTH_KEY,
    }).then(
      () => {
        let userObj: User = this.authService.getUser();
        return CometChatWidget.login({uid: userObj.id});
      },
      (error) => {
        console.log("Initialization failed with error:", error);
        return new Promise((resolve, _) => {
          resolve(false);
        });
      }
    );
  }

  private launchCometChatWidget(
    sellerUID: string,
    isOpenWidget: boolean
  ): void {
    if (this.isChatWidgetLaunched) {
      if (isOpenWidget) {
        CometChatWidget.openOrCloseChat(true);
        CometChatWidget.chatWithUser(sellerUID);
      }
      return;
    }

    CometChatWidget.launch({
      widgetID: "WIDGET_ID", // TODO: insert widgetID
      target: "#cometChatWidgetWrapper",
      docked: "true",
      alignment: "left", //left or right
      roundedCorners: "true",
      height: "400px",
      width: "350px",
      defaultID: sellerUID, //default UID (user) or GUID (group) to show,
      defaultType: "user", //user or group
    }).then(
      () => {
        this.isChatWidgetLaunched = true;
        if (isOpenWidget) {
          CometChatWidget.openOrCloseChat(true);
          CometChatWidget.chatWithUser(sellerUID);
        }
      },
      (error) => {
        console.log(
          `Widget Launching failed with error: ${error}\n Have you insert your WidgetID?`
        );
      }
    );
  }
}
