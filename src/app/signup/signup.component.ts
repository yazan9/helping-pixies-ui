import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../types/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { Country } from '../types/country';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterViewInit{
  public user: User = new User();
  public countryCode: string = '';
  public location: string = '';

  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {
    
  }

  ngOnInit(): void {
    this.user = new User();
  }

  ngAfterViewInit(): void {
    this.emailInput.nativeElement.focus();
  }

  signupClicked(signupForm: NgForm): void {
    if(signupForm.valid && this.user.phone.trim() !== ''){
      this.doSignUp();
    }
    else{
      Object.keys(signupForm.controls).forEach(field => {
        const control = signupForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      this.toastService.showError('Please fill all required fields');
    }
  }

  public doSignUp() {
    if(!this.validateUser()){
      alert('Please fill all the fields');
      return;
    }

    this.user.phone = this.countryCode + this.user.phone;
    // this.user.latitude = this.location.split(',')[0];
    // this.user.longitude = this.location.split(',')[1];

    this.authService.register(this.user).subscribe((response) => {
      //this.clearForm();
      //this.router.navigate(['/dashboard']);
    }, (error) => {
      if(error?.error?.errors?.length){
        error.error.errors.forEach((err: string) => {
          this.toastService.showError(err);
        });
        return;
      }
      else{
        this.toastService.showError('Server Error, please try in a bit');
      }
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.setLocation(this.parsePosition(position)),
        (err) => this.handleFirefoxLocation()
      );
    }
    else{
      alert("Geolocation is not supported by this browser.");
    }
  }

  private async handleFirefoxLocation(): Promise<any> {
    await fetch(
      "https://location.services.mozilla.com/v1/geolocate?key=test"
    ).then((el) => this.setLocation(el.json()));
  }

  parsePosition(position: any) {
    const {
      coords: { latitude: lat, longitude: lng },
    } = position;
    return { location: { lat, lng } };
  }

  countryChanged(country: Country) {
    this.countryCode = '+' + country.dialCode;
  }

  phoneNumberChanged(phoneNumber: string) {
    this.user.phone = phoneNumber;
  }

  private setLocation(location: any) {
    this.location = location.location.lat + ',' + location.location.lng;
  }

  private validateUser(): boolean{
    return this.user.email.trim() !== '' && 
    this.user.name.trim() !== '' && 
    this.user.phone.trim() !== '' && 
    this.user.password.trim() !== '' && 
    this.countryCode.trim() !== '';
  }

  private clearForm(){
    this.user = new User();
    this.countryCode = '';
    this.location = '';
  }
}
