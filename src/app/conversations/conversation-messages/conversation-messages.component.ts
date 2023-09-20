import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConversationsService } from 'src/app/services/coversations.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Conversation } from 'src/app/types/conversation';
import { Message } from 'src/app/types/message';

@Component({
  selector: 'app-conversation-messages',
  templateUrl: './conversation-messages.component.html',
  styleUrls: ['./conversation-messages.component.css'],
})
export class ConversationMessagesComponent implements OnInit, OnDestroy{
  conversation: Conversation | null = null;
  subscriptions: Subscription[] = [];
  newMessage: Message = {content: ''};
  profilePicture: string = '';

  constructor(
    private conversationsService: ConversationsService, 
    private auth: AuthService,
    public utils: UtilsService
    ) {
  }

  ngOnInit(): void {
    this.profilePicture = this.auth.getMyProfileImage();
    let selectConversationsSubscription = this.conversationsService.selectedConversation$.subscribe(conversation => {
      this.conversation = conversation;
      this.fetchConversationMessages();
      console.log("ConversationMessagesComponent -> ngOnInit -> conversation")
    });
    this.subscriptions.push(selectConversationsSubscription);
  }

  fetchConversationMessages(): void {
    if(this.conversation){
      this.conversationsService.getConversationMessages(this.conversation.id).subscribe(messages => {
        this.assignMessages(messages);
      });
    }
  }

  assignMessages(messages: Message[]){
    let me = this.auth.getUser();
    messages.forEach(message => {
      if(message.user_id === me?.id){
        message.assigned_profile_image_url = this.profilePicture;
      }
      else{
        message.assigned_profile_image_url = this.conversation?.the_other_user.profile_image_url as string;
        if(!this.conversation?.the_other_user?.profile_image_url?.length){
          message.assigned_initials = this.conversation?.the_other_user?.name?.slice(0, Math.min(2, this.conversation?.the_other_user?.name?.length)) as string;
        }
      }
    });
    this.conversation!.messages = messages;
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
