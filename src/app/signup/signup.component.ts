import { Component, OnInit } from '@angular/core';
import { User } from '../types/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  public user: User = new User();
  public countryCode: string = '';

  constructor(private authService: AuthService) {
    
  }

  ngOnInit(): void {
  }

  public signupClicked() {
    if(!this.validateUser()){
      alert('Please fill all the fields');
      return;
    }

    this.user.phone = this.countryCode + this.user.phone;
    this.authService.register(this.user).subscribe((response) => {
      console.log(response);
      alert('User registered successfully');
    });
  }

  private validateUser(): boolean{
    return this.user.email.trim() !== '' && 
    this.user.name.trim() !== '' && 
    this.user.phone.trim() !== '' && 
    this.user.password.trim() !== '' && 
    this.countryCode.trim() !== '';
  }

}
