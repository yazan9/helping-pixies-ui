import { Component, OnInit, AfterViewInit, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import intlTelInput, { Plugin } from 'intl-tel-input';
import { Country } from '../types/country';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.css']
})
export class PhoneInputComponent implements AfterViewInit {
  @Output() countryChanged = new EventEmitter<Country>();
  @Output() phoneNumberChanged = new EventEmitter<string>();
  @Input() isRequired: boolean = false;
  @Input() enforceInvalid: boolean = false;
  
  iti!: Plugin;
  phoneNumber: string = '';

  touched: boolean = false;

  constructor(private elementRef: ElementRef) { }

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
    this.phoneNumber = phoneNumber;
    this.phoneNumberChanged.emit(phoneNumber);
  }
}
