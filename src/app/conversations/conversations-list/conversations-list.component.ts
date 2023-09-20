import { Component } from '@angular/core';
import { ConversationsService } from 'src/app/services/coversations.service';
import { Conversation } from 'src/app/types/conversation';

@Component({
  selector: 'app-conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.css']
})
export class ConversationsListComponent {
  conversations: Conversation[] = [];
  selectedConversation: Conversation | null = null;

  constructor(private conversationsService:ConversationsService) { }

  ngOnInit(): void {
    this.fetchConversations();
  }

  fetchConversations(): void {
    this.conversationsService.getConversations().subscribe(({conversations, meta}) => {
      conversations.sort((a, b) => {
        return b.unread_messages_count - a.unread_messages_count || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });
      this.conversations = conversations;
      if(conversations.length){
        this.selectConversation(conversations[0]);
      }
    });
  }

  selectConversation(conversation: Conversation): void {
    this.conversationsService.selectConversation(conversation);
    this.selectedConversation = conversation;
  }

  ngOnDestroy(): void {
  }
}
