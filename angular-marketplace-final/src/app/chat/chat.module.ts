import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { InboxComponent } from './inbox.component';
import { CometChatConversationComponent } from './comet-chat-conversation.component';

import { CometChatConversationListWithMessages } from "@cometChatComponents/Chats/CometChat-conversation-list-with-messages/cometchat-conversation-list-with-messages.module";
import { CometChatMessages } from "@cometChatComponents/Messages/CometChat-messages/cometchat-messages.module";
import { AuthGuard } from "../account/auth.guard";
import { UserMessageComponent } from './user-message.component';

@NgModule({
  declarations: [InboxComponent, CometChatConversationComponent, UserMessageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "conversation",
        component: CometChatConversationComponent,
        canActivate: [AuthGuard],
      },
    ]),
    CometChatConversationListWithMessages,
    CometChatMessages,
  ],
  exports: [InboxComponent, UserMessageComponent],
})
export class ChatModule {}
