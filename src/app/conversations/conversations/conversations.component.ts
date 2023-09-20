import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConversationsService } from 'src/app/services/coversations.service';
import { Conversation } from 'src/app/types/conversation';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent implements OnInit, OnDestroy {
  public isMobileView: boolean = false;

  private subscriptions: Subscription[] = [];
  public selectedConversation: Conversation | null = null;

  constructor(private conversationsService:ConversationsService) { 
    this.onResize();
  }  

  @HostListener('window:resize', ['$event'])
  onResize(event?:any) {
    this.isMobileView = window.innerWidth < 768;
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.conversationsService.selectedConversation$.subscribe(conversation => {
        this.selectedConversation = conversation;
      })
    );
  }

  back(){
    this.selectedConversation = null;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
