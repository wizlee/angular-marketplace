import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox.component';
import { UserMessageComponent } from './user-message.component';

@NgModule({
  declarations: [InboxComponent, UserMessageComponent],
  imports: [
    CommonModule,
  ],
  exports: [InboxComponent, UserMessageComponent],
})
export class ChatModule {}
