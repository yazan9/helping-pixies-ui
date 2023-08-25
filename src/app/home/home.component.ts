import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    if(this.authService.isLoggedIn){
      if(this.authService.getUserType() === 'provider'){
        this.router.navigate(['/provider']);
      }
      else{
        this.router.navigate(['/dashboard']);
      }
    }
  }
}
