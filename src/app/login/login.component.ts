import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../types/user';
import { TokenResponse } from '../types/token-response';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private authService: AuthService, private storageServicie: StorageService){}
  public user: User = new User();

  ngOnInit(): void {

  }

  public login(){
    this.authService.login(this.user).subscribe((response:TokenResponse) => {
      console.log(response);
      this.storageServicie.setItemToLocalStorage('token', response.jwt_token);
      this.storageServicie.setItemToLocalStorage('user', JSON.stringify(response.user));
    });
  }
}
