import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{
  public isLoggedIn: boolean = false;
  private subscriptions: Subscription[] = [];

  user: User | null = null;
  
  constructor(public authService: AuthService) { }

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

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
