import { Component, Input } from '@angular/core';
import { er } from '@fullcalendar/core/internal-common';
import { AuthService } from 'src/app/services/auth.service';
import { ConversationsService } from 'src/app/services/coversations.service';
import { ToastService } from 'src/app/services/toast.service';
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
  original_message: string = '';

  constructor(private authService: AuthService, private conversationsService: ConversationsService, private toastService: ToastService) {
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
    this.original_message = this.message.content;
  }

  deleteMessage(): void {
    this.conversationsService.deleteMessage(this.message).subscribe(() => {
      this.removeMessageFromConversation();
    }, error => {
      this.toastService.showError('There was an error deleting your message.');
    });
    
  }

  removeMessageFromConversation(): void {
    this.conversation!.messages = this.conversation!.messages.filter(message => message.id !== this.message.id);
  }

  saveMessage(): void {
    this.editing = false;
    this.conversationsService.updateMessage(this.message).subscribe(() => {
      this.message.content = this.message.content.trim();
    }, error => {
      this.message.content = this.original_message;
      this.toastService.showError('There was an error saving your message.');
    });
  }

  cancelEdit(): void {
    this.editing = false;
    this.message.content = this.original_message;
  }
}
