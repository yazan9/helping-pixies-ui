import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConversationsService } from 'src/app/services/coversations.service';
import { Conversation } from 'src/app/types/conversation';
import { Message } from 'src/app/types/message';

@Component({
  selector: 'app-conversation-messages',
  templateUrl: './conversation-messages.component.html',
  styleUrls: ['./conversation-messages.component.css']
})
export class ConversationMessagesComponent implements OnInit, OnDestroy{
  conversation: Conversation | null = null;
  subscriptions: Subscription[] = [];
  newMessage: Message = {content: ''};

  constructor(private conversationsService: ConversationsService) {
  }

  ngOnInit(): void {
    let selectConversationsSubscription = this.conversationsService.selectedConversation$.subscribe(conversation => {
      this.conversation = conversation;
      this.fetchConversationMessages();
    });
    this.subscriptions.push(selectConversationsSubscription);
  }

  fetchConversationMessages(): void {
    if(this.conversation){
      this.conversationsService.getConversationMessages(this.conversation.id).subscribe(messages => {
        this.conversation!.messages = messages;
      });
    }
  }

  sendMessage(): void {
    if(this.conversation){
      this.conversationsService.sendMessage(this.conversation.id, this.newMessage).subscribe(() => {
        this.fetchConversationMessages();
        this.newMessage.content = '';
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
