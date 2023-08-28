import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit{
  private email: string = '';
  constructor(
    private authService: AuthService, 
    private route: ActivatedRoute, 
    private toastService: ToastService
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      console.log(this.email)
    });
  }

  resendEmail(): void {
    this.authService.resendConfirmationEmail(this.email).subscribe(() => {
      this.toastService.show('Confirmation email resent', { classname: 'bg-success text-light', delay: 5000 });
    }, err => {
      this.toastService.show('Error sending confirmation email', { classname: 'bg-danger text-light', delay: 5000 });
    });
  }

}
