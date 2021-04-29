import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { InboxComponent } from './inbox.component';
import { CometChatConversationComponent } from './comet-chat-conversation.component';

import { CometChatConversationListWithMessages } from "@cometchatComponents/Chats/CometChat-conversation-list-with-messages/cometchat-conversation-list-with-messages.module";

@NgModule({
  declarations: [InboxComponent, CometChatConversationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "conversation",
        component: CometChatConversationComponent,
      },
    ]),
    CometChatConversationListWithMessages,
  ],
  exports: [InboxComponent],
})
export class ChatModule {}
