import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../types/user';
import { TokenResponse } from '../types/token-response';
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
    private toastService: ToastService,
    private router: Router
    ){}
  public user: User = new User();

  ngOnInit(): void {

  }

  public login(){
    this.authService.login(this.user).subscribe((response:TokenResponse) => {
      if(response.user.user_type == 'provider'){
        this.router.navigate(['/provider']);
      }
      else{
        this.router.navigate(['/dashboard']);
      }
    }, err =>{
      if(err.status == 401){
        if(err?.error?.message){
          this.showDanger(err.error.message);
          return;
        }
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
