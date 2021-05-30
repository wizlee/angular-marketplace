import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox.component';

import { AuthGuard } from "../account/auth.guard";

@NgModule({
  declarations: [InboxComponent],
  imports: [
    CommonModule,
  ],
  exports: [InboxComponent],
})
export class ChatModule {}
