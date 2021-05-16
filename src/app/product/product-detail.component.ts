import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from "rxjs/operators";

import { CometChatWidget } from "../../assets/cometchatwidget.js";
import { COMETCHAT_CONSTANTS } from "../../CONSTS";
import { AuthService, User } from "../account/auth.service";

@Component({
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  isChatWidgetInitialized: boolean;
  isChatWidgetLaunched: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.isChatWidgetInitialized = false;
    this.isChatWidgetLaunched = false;
    // this.hero$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => this.service.getProduct(params.get("id")))
    // );
    if (!this.auth.isLoggedIn()) return;

    this.initCometChatWidget().then(
      () => {
        this.isChatWidgetInitialized = true;
        // launch and keep the chat widget minimized
        this.launchCometChatWidget("thebestfacemaskshop", false);
      },
      (error) => {
        console.log("User login failed with error:", error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.auth.isLoggedIn()) {
      CometChatWidget.openOrCloseChat(false);
      CometChatWidget.logout();
    }
  }

  onMessageSeller(): void {
    if (this.auth.isLoggedIn()) {
      this.initCometChatWidget().then(
        () => {
          this.isChatWidgetInitialized = true;
          // launch and open the chat widget
          this.launchCometChatWidget("thebestfacemaskshop", true);
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
        let userObj: User = this.auth.getUser();
        return CometChatWidget.login({
          uid: userObj.isDefaultUser
            ? COMETCHAT_CONSTANTS.UIDs[userObj.name]
            : userObj.name,
        })
      },
      (error) => {
        console.log("Initialization failed with error:", error);
        return new Promise((resolve, _) => {
          resolve(false);
        })
      }
    );
  }

  private launchCometChatWidget(sellerUID: string, isOpenWidget: boolean): void {
    if (this.isChatWidgetLaunched) {
      if (isOpenWidget) {
        CometChatWidget.openOrCloseChat(true);
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
