import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../types/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { Country } from '../types/country';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivacyPolicyComponent } from '../static/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from '../static/terms-of-service/terms-of-service.component';
declare var google: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterViewInit{
  public user: User = new User();
  public countryCode: string = '';

  public address: string = '';
  public postalCode: string = '';
  public policyAgreed: boolean = false;

  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;

  private addressAutocomplete: any;
  private postalCodeAutoComplete: any;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private toastService: ToastService,
    private userService: UserService,
    private modalService: NgbModal,
    ) {
      
  }

  ngOnInit(): void {
    this.user = new User();
  }

  ngAfterViewInit(): void {
    this.emailInput.nativeElement.focus();

    this.initGoogleAddressAutoComplete();
    this.initGooglePostalCodeAutoComplete();
  }

  registrationTypeChanged(){
    
  }

  signupClicked(signupForm: NgForm): void {
    if(signupForm.valid && this.user.phone.trim() !== ''){
      this.doSignUp();
    }
    else{
      if(this.policyAgreed === false){
        this.toastService.showError('Please agree to the terms and conditions');
      }
      Object.keys(signupForm.controls).forEach(field => {
        const control = signupForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      this.userService.broadcastPhoneNumberValidity(false);
      this.toastService.showError('Please fill all required fields');
    }
  }

  public doSignUp() {
    if(!this.validateUser()){
      alert('Please fill all the fields');
      return;
    }

    this.user.phone = this.countryCode + this.user.phone;
    this.user.address = this.user.user_type === 'provider' ? this.postalCode : this.address;

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

  countryChanged(country: Country) {
    this.countryCode = '+' + country.dialCode;
  }

  phoneNumberChanged(phoneNumber: string) {
    this.user.phone = phoneNumber;
  }

  getAddressLabel(){
    return this.user.user_type === 'provider' ? 'Postal Code' : 'Address';
  }

  openPrivacyPolicy() {
		this.modalService.open(PrivacyPolicyComponent, {fullscreen: true, scrollable: true});
	}

  openTermsAndConditions() {
    this.modalService.open(TermsOfServiceComponent, {fullscreen: true, scrollable: true});
  }

  private initGoogleAddressAutoComplete(): void {
    const input = document.getElementById('inputAddress') as HTMLInputElement;
    this.addressAutocomplete = new google.maps.places.Autocomplete(input);
    this.bindPlacesChangedEventToAddressInput();
  }

  private initGooglePostalCodeAutoComplete(): void {
    const input = document.getElementById('inputPostalCode') as HTMLInputElement;
    this.postalCodeAutoComplete = new google.maps.places.Autocomplete(input, {
      types: ['(regions)']
    });
    this.bindPlacesChangedEventToPostalCodeInput();
  }

  private bindPlacesChangedEventToAddressInput(): void {
    this.addressAutocomplete.addListener('place_changed', () => {
      const place = this.addressAutocomplete.getPlace();
      // Update your form and variables with the selected place details
      this.user.address = place.formatted_address;
    });
  }

  private bindPlacesChangedEventToPostalCodeInput(): void {
    this.postalCodeAutoComplete.addListener('place_changed', () => {
      const place = this.postalCodeAutoComplete.getPlace();
      // Update your form and variables with the selected place details
      this.user.address = place.formatted_address;
    });
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
  }
}
