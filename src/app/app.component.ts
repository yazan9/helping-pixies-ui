import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'helping-pixies-ui';
  public isLoggedIn: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.isLoggedIn.subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn; 
      })
    );
  }
}
