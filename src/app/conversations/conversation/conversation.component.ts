import { Component, Input } from '@angular/core';
import { ConversationsService } from 'src/app/services/coversations.service';
import { Conversation } from 'src/app/types/conversation';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent {
  @Input() conversation: Conversation | null = null;

  constructor(private conversationsService:ConversationsService) { }


}
