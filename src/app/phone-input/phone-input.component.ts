import { Component, OnInit, AfterViewInit, ElementRef, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import intlTelInput, { Plugin } from 'intl-tel-input';
import { Country } from '../types/country';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.css']
})
export class PhoneInputComponent implements AfterViewInit, OnInit, OnDestroy {
  @Output() countryChanged = new EventEmitter<Country>();
  @Output() phoneNumberChanged = new EventEmitter<string>();
  @Input() isRequired: boolean = false;
  
  iti!: Plugin;
  phoneNumber: string = '';

  touched: boolean = false;
  forceInvalid: boolean = false;

  subscriptions: Subscription[] = [];

  constructor(private elementRef: ElementRef, private usersService: UserService) { }

  ngOnInit(): void {
    this.usersService.broadcastPhoneNumberValidity(true);

    this.subscriptions.push(this.usersService.phoneNumberInvalidSource$.subscribe((valid) => {
      if(this.phoneNumber.length === 0 && !valid){
        this.forceInvalid = true;
      }
    }));
  }

  ngAfterViewInit(): void {
    const input = this.elementRef.nativeElement.querySelector("#phone");
    if (input) {
      this.iti = intlTelInput(input, {
        utilsScript: "assets/js/intl-phone-input.js",
        preferredCountries: ['ca', 'us']
      });

      input.addEventListener('countrychange', () => {
        this.onCountryChange();
      });

      // Add input event listener to capture phone number changes
      input.addEventListener('input', () => {
        this.onPhoneNumberChange(input.value);
      });

      // Listen for focus and blur events
      input.addEventListener('focus', () => {
        this.touched = true;
      });

      input.addEventListener('blur', () => {
        this.touched = true;
      });
    }
  }

  onCountryChange(): void {
    const countryData = this.iti.getSelectedCountryData();
    this.countryChanged.emit(countryData);
  }

  onPhoneNumberChange(phoneNumber: string): void {
    if(phoneNumber.length !== 0){
      this.forceInvalid = false;
    }
    this.phoneNumber = phoneNumber;
    this.phoneNumberChanged.emit(phoneNumber);
    if(this.phoneNumber.length !== 0){
      this.usersService.broadcastPhoneNumberValidity(true);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
