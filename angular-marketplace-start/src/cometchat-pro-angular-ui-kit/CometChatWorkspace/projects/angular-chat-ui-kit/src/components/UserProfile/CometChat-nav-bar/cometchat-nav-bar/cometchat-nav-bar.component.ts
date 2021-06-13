import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import * as enums from "../../../../utils/enums";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
import { CometChat } from "@cometchat-pro/chat";
@Component({
  selector: "cometchat-nav-bar",
  templateUrl: "./cometchat-nav-bar.component.html",
  styleUrls: ["./cometchat-nav-bar.component.css"],
})
export class CometChatNavBarComponent implements OnInit {
  @Input() item = null;
  @Input() type = null;
  @Input() lastMessage;
  @Input() enableSelectedGroupStyling = false;
  @Input() groupToUpdate = null;
  @Input() groupToLeave = null;
  @Input() groupToDelete = null;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();
  @Output() onUserClick: EventEmitter<any> = new EventEmitter();

  displayConversationList: boolean = true;
  displayGroupList: boolean = false;
  displayUserList: boolean = false;
  displayUserInfoScreen: boolean = false;

  groupMessage = [];
  curentItem;
  constructor() {}

  ngOnInit() {}

  /**
   * Toggles the List to be opened on user clicked
   * @param
   */
  checkScreen(type) {
    try {
      this.displayConversationList =
        type === enums.CONVERSATION_LIST ? true : false;
      this.displayGroupList = type === enums.GROUP_LIST ? true : false;
      this.displayUserList = type === enums.USER_LIST ? true : false;
      this.displayUserInfoScreen = type === enums.INFO_SCREEN ? true : false;
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Opens ConversationList
   */
  openConversationList() {
    try {
      this.checkScreen(enums.CONVERSATION_LIST);
      this.closeDetailView();
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Opens GroupList
   */
  openGroupList() {
    try {
      this.checkScreen(enums.GROUP_LIST);
      this.closeDetailView();
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Opens userlist
   */
  openUserList() {
    try {
      this.checkScreen(enums.USER_LIST);
      this.closeDetailView();
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Opens User Info Screnn
   */
  openUserInfoScreen() {
    try {
      this.checkScreen(enums.INFO_SCREEN);
      this.closeDetailView();
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Closes Detail View when tab is changed
   */
  closeDetailView() {
    try {
      this.actionGenerated.emit({
        type: enums.TAB_CHANGED,
      });
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Listen to the user emitted by the userList component
   * @param Event user
   */
  userClicked(user) {
    try {
      if (user.hasOwnProperty(enums.CONVERSATION_WITH)) {
        this.item = user.conversationWith;
        this.curentItem = this.item;
      } else {
        this.item = user;
        this.curentItem = this.item;
      }
      if (this.item.hasOwnProperty(enums.UID)) {
        this.type = CometChat.RECEIVER_TYPE.USER;
      } else {
        this.type = CometChat.RECEIVER_TYPE.GROUP;
      }
      this.lastMessage = user.lastMessage;
      this.onUserClick.emit(this.item);
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Listen to the group emitted by the groupList component
   * @param Event user
   */
  groupClicked(group) {
    try {
      this.item = group;
      this.curentItem = this.item;

      if (this.item.hasOwnProperty(enums.UID)) {
        this.type = CometChat.RECEIVER_TYPE.USER;
      } else {
        this.type = CometChat.RECEIVER_TYPE.GROUP;
      }

      this.onUserClick.emit(this.item);
    } catch (error) {
      logger(error);
    }
  }
}
