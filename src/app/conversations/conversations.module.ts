import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ConversationsRoutingModule } from './conversations-routing.module';
import { ConversationsComponent } from './conversations/conversations.component';
import { ConversationsListComponent } from './conversations-list/conversations-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ConversationMessagesComponent } from './conversation-messages/conversation-messages.component';
import { MessageComponent } from './message/message.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConversationsComponent,
    ConversationsListComponent,
    ConversationComponent,
    ConversationMessagesComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    ConversationsRoutingModule,
    FormsModule
  ]
})
export class ConversationsModule { }
