import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Conversation } from '../types/conversation';
import { Meta } from '../types/meta';
import { Message } from '../types/message';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {
  //Observable Sources
  private selectedConversationSource = new Subject<Conversation | null>();

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

  deleteMessage(conversationId: number, messageId: number): Observable<Message>{
    return this.http.delete<Message>(`conversations/${conversationId}/messages/${messageId}`);
  }

  updateMessage(conversationId: number, messageId: number, message: Message): Observable<Message>{
    return this.http.put<any>(`conversations/${conversationId}/messages/${messageId}`, message);
  }

  selectConversation(conversation: Conversation | null): void {
    this.selectedConversationSource.next(conversation);
  }
}