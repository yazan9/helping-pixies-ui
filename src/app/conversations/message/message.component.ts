import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Conversation } from 'src/app/types/conversation';
import { Message } from 'src/app/types/message';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent{
  @Input() message!: Message;
  @Input() conversation!: Conversation | null;

  editing: boolean = false;
  me: User | null = null;

  constructor(private authService: AuthService) {
    this.me = this.authService.getUser();
  }

  getMessageClassName(message: any): string {
    return this.messageIsFromMe(message) ? 'message-from-me' : 'message-from-them';
  }

  messageIsFromMe(message: any): boolean {
    return message.user_id === this.me?.id;
  }

  editMessage(): void {
    this.editing = true;
  }

  deleteMessage(): void {
    if(this.conversation){
      this.conversation.messages = this.conversation.messages.filter(message => message.id !== this.message.id);
    }
  }
}
