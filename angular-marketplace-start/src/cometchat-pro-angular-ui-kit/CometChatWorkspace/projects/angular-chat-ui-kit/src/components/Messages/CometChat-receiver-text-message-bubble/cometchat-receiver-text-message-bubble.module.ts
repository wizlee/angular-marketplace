import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatReceiverTextMessageBubbleComponent } from "./cometchat-receiver-text-message-bubble/cometchat-receiver-text-message-bubble.component";
import { CometChatMessageActions } from "../CometChat-message-actions/cometchat-message-actions.module";
import { CometChatThreadedMessageReplyCount } from "../CometChat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometChatAvatar } from "../../Shared/CometChat-avatar/cometchat-avatar.module";
import { CometChatReadReceipt } from "../CometChat-read-receipt/cometchat-read-receipt.module";
import { CometChatMessageReactions } from "../Extensions/CometChat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometChatReceiverTextMessageBubbleComponent],
  imports: [
    CommonModule,
    CometChatMessageActions,
    CometChatThreadedMessageReplyCount,
    CometChatAvatar,
    CometChatReadReceipt,
    CometChatMessageReactions,
  ],
  exports: [CometChatReceiverTextMessageBubbleComponent],
})
export class CometChatReceiverTextMessageBubble { }
