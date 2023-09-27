import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../types/user';
import { TokenResponse } from '../types/token-response';
import { ToastService } from '../services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(
    private authService: AuthService, 
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
    ){}
  public user: User = new User();
  public returnUrl: string = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
    });
  }

  public login() {
    this.authService.login(this.user).subscribe((response: TokenResponse) => {
      if (this.returnUrl) {
        this.router.navigate([this.returnUrl], { queryParams: { source: 'login' } });
        return;
      }
      if (response.user.user_type == 'provider') {
        this.router.navigate(['/provider']);
      }
      else {
        this.router.navigate(['/dashboard']);
      }
    }, err => {
      if (err.status == 401) {
        let errorCode = err.error.code;
        if (errorCode === 0) {
          this.toastService.showError("Please confirm your email address");
          this.router.navigate(['/confirm-email'], { queryParams: { email: this.user.email } });
          return;
        }
        else if (errorCode === 1) {
          this.showDanger('Invalid email or password');
          return;
        }
        else {
          this.toastService.showError("Server error, please try again in a bit");
          return;
        }
      }
      else {
        this.showDanger('Server Error, please try in a bit');
      }
    });
  }

  showDanger(text: string) {
		this.toastService.show(text, { classname: 'bg-danger text-light', delay: 5000 });
	}

	ngOnDestroy(): void {
		this.toastService.clear();
	}
}
