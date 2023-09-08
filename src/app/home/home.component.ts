import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authService: AuthService, public router: Router){}

  ngOnInit(): void {
    let isLoggedIn = this.authService.isLoggedIn.subscribe(loggedIn => {
      let user = this.authService.getUser();
      if(user?.user_type === 'provider'){
        this.router.navigate(['/provider']);
      }
      else if(user?.user_type === 'client'){
        this.router.navigate(['/dashboard']);
      }
    });
    
  }
}
