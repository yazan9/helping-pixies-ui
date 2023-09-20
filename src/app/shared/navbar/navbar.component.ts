import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConversationsService } from 'src/app/services/coversations.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{
  public isLoggedIn: boolean = false;
  public unread_messages_count = 0;
  private subscriptions: Subscription[] = [];

  user: User | null = null;

  public conversations: any[] = [{name: 'test', description: 'test', id: 1}, {name: 'test2', description: 'test2', id: 2}];
  
  constructor(public authService: AuthService, private conversationsService: ConversationsService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.isLoggedIn.subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn;
      })
    );
    this.subscriptions.push(
      this.authService.userObservable.subscribe((user) => {
        this.user = user;
      })
    );

    this.subscriptions.push(
      this.conversationsService.selectedConversation$.subscribe(conversation => {
        let newUnreadCount = this.unread_messages_count - conversation!.unread_messages_count;
        this.unread_messages_count = Math.min(newUnreadCount, 0)
      })
    );
        
    this.getUnreadMessagesCount();
  }

  logout(): void {
    this.authService.logout();
  }

  getUnreadMessagesCount(): void {
    this.conversationsService.getUnreadCount().subscribe((res:any) => {
      this.unread_messages_count = res.unread_messages_count;
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
