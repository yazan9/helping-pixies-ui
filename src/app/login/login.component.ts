import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../types/user';
import { TokenResponse } from '../types/token-response';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(
    private authService: AuthService, 
    private storageService: StorageService,
    private toastService: ToastService,
    private router: Router
    ){}
  public user: User = new User();

  ngOnInit(): void {

  }

  public login(){
    this.authService.login(this.user).subscribe((response:TokenResponse) => {
      this.storageService.setItemToLocalStorage('hp-token', response.jwt_token);
      this.storageService.setItemToLocalStorage('hp-user', JSON.stringify(response.user));
      if(response.user.user_type == 'provider'){
        this.router.navigate(['/provider']);
      }
      else{
        this.router.navigate(['/dashboard']);
      }
    }, err =>{
      console.log(err);
      if(err.status == 401){
        this.showDanger('Invalid email or password');
    }
  else{
    this.showDanger('Server Error, please try in a bit');
  }});
  }

  showDanger(text: string) {
		this.toastService.show(text, { classname: 'bg-danger text-light', delay: 5000 });
	}

	ngOnDestroy(): void {
		this.toastService.clear();
	}
}
