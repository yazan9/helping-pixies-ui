import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { LocationService } from '../services/location.service';
declare var google: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterViewInit{
  public user: User = new User();
  public countryCode: string = '+1';
  public selectedLocationOption: string = 'update';
  isDetecingLocation: boolean = false;

  //for clients
  public address: string = '';

  //for providers
  public postalCode: string = '';

  public policyAgreed: boolean = false;

  public loading: boolean = false;

  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('noLocationConfirmation') noLocationConfirmation!: TemplateRef<any>;

  //google autocomplete
  private addressAutocomplete: any;
  private postalCodeAutoComplete: any;

  constructor(
    private authService: AuthService, 
    private toastService: ToastService,
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router,
    private locationService: LocationService
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

  signupClicked(signupForm: NgForm): void {
    if(signupForm.valid && this.user.phone.trim() !== ''){
      if(this.user.user_type === 'provider' && this.user.address.trim() === ''){
        this.openLocationConfirmationDialog();
        return;
      }
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
      this.toastService.showError('Please fill all the fields');
      return;
    }

    this.user.phone = this.countryCode + this.user.phone;
    this.user.address = this.user.user_type === 'provider' ? this.postalCode : this.address;

    this.loading = true;

    this.authService.register(this.user).subscribe((response) => {
      this.loading = false;
      this.router.navigate(['/confirm-email'], { queryParams: { email: this.user.email } });
      this.clearForm();
    }, (error) => {
      this.loading = false;
      if(error?.error?.errors?.length){
        error.error.errors.forEach((err: string) => {
          this.toastService.showError(err);
        });
        return;
      }
      else if(error?.error?.message){
        this.toastService.showError(error.error.message);
      }
      else{
        this.toastService.showError('Server Error, please try in a bit');
      }
    });
  }

  // #region Location Confirmation Modal

  openLocationConfirmationDialog(): void {
    const modalRef = this.modalService.open(this.noLocationConfirmation, {fullscreen: true, scrollable: true});
    modalRef.result.then((result) => {
      if(this.selectedLocationOption === "register"){
        this.doSignUp();
      }
      else if(this.selectedLocationOption === "detect"){
        this.detectLocation();
      }
    });
  }

  detectLocation(): void {
    this.isDetecingLocation = true;
    this.locationService.getLocation().subscribe((response) => {
      this.isDetecingLocation = false;
      this.user.latitude = response.coords.latitude.toString();
      this.user.longitude = response.coords.longitude.toString();

      this.doSignUp();
    }, err => {
      this.isDetecingLocation = false;
      this.toastService.showError('Ouch, that did not work :( Perhaps try again and allow location access?');
    });
  }

  // #endregion

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
    this.user.password.trim() !== ''
  }

  private clearForm(){
    this.user = new User();
    this.countryCode = '';
  }
}
