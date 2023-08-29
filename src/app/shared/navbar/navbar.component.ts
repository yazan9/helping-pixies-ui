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
  }

  logout(): void {
    this.authService.logout();
  }

  getUnreadMessagesCount(): void {
    this.conversationsService.getUnreadCount().subscribe((res) => {
      this.unread_messages_count = res;
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
