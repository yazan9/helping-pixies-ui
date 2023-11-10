import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-do-confirm-email',
  templateUrl: './do-confirm-email.component.html',
  styleUrls: ['./do-confirm-email.component.css']
})
export class DoConfirmEmailComponent implements OnInit {
  private token: string = '';

  constructor(
    private route: ActivatedRoute, 
    private userService: UserService, 
    private toastService: ToastService, 
    private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['confirmation_token'];

      this.userService.confirmEmail(this.token).subscribe(() => {
        this.toastService.showSuccess('Email confirmed successfully');
        this.router.navigate(['login']);
      }, (err: any) => {
        this.toastService.showError('Email confirmation failed');
      }
    )});
  }
}
