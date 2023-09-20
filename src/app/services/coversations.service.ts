import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Conversation } from '../types/conversation';
import { Meta } from '../types/meta';
import { Message } from '../types/message';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {
  //Observable Sources
  private selectedConversationSource = new BehaviorSubject<Conversation | null>(null);

  //Observable Streams
  selectedConversation$ = this.selectedConversationSource.asObservable();

  constructor(private http: HttpClient) { }

  getConversations(): Observable<{conversations:Conversation[], meta: Meta}>{
    return this.http.get<{conversations:Conversation[], meta: Meta}>('conversations');
  }

  createConversation(conversation: Conversation): Observable<Conversation>{
    return this.http.post<Conversation>('conversations', conversation);
  }

  deleteConversation(id: number): Observable<Conversation>{
    return this.http.delete<Conversation>(`conversations/${id}`);
  }

  getConversationMessages(conversationId: number): Observable<Message[]>{
    return this.http.get<Message[]>(`conversations/${conversationId}/messages`);
  }

  sendMessage(conversationId: number, message: Message): Observable<Message>{
    return this.http.post<Message>(`conversations/${conversationId}/messages`, message);
  }

  deleteMessage(message: Message): Observable<Message>{
    return this.http.delete<Message>(`conversations/${message.conversation_id}/messages/${message.id}`);
  }

  updateMessage(message: Message): Observable<Message>{
    return this.http.put<any>(`conversations/${message.conversation_id}/messages/${message.id}`, message);
  }

  selectConversation(conversation: Conversation | null): void {
    this.selectedConversationSource.next(conversation);
    if(conversation?.unread_messages_count){
      this.markMessagesAsRead(conversation.id).subscribe(res => {
        conversation.unread_messages_count = 0;
      });
    }
  }

  markMessagesAsRead(conversationId: number): Observable<any>{
    return this.http.put<any>(`conversations/${conversationId}/messages/read`, {});
  }

  getUnreadCount(): Observable<number>{ // 1
    return this.http.get<number>('conversations/unread_messages_count');
  }
}