import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  private token: string = '';
  public password: string = '';
  constructor(
    private route: ActivatedRoute, 
    private authService:AuthService,
    private toaster:ToastService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  resetPassword(): void {
    this.authService.resetPassword(this.token, this.password).subscribe(() => {
      this.toaster.showSuccess('Password reset successfully');
      this.router.navigate(['/login']);
    }, err => {
      this.toaster.showError("Password reset failed");
    });
  }
}
