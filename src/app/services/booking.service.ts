import { Injectable } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FrequencyType } from '../types/frequency-type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  selectedFrequency: FrequencyType | null = null;
  selectedHours: number = 2;
  availableHours: number[] = [2, 3, 4, 5, 6, 7, 8];

  dateStruct: NgbDateStruct;
  selectedDate: { year: number; month: number };
  selectedTime: { hour: number, minute: number };

  startDate: Date | null = null;
  endDate: Date | null = null;

  zipCode: string = 'V9C0R3';

  private _price: number = 35;
  private _latitude: number = 0;
  private _longitude: number = 0;
  public radius: number = 5;

  constructor(private calendar: NgbCalendar, private http: HttpClient) { 
    this.dateStruct = this.calendar.getToday();
    this.selectedDate = {
      year: this.dateStruct.year,
      month: this.dateStruct.month
    };
    this.selectedTime = {
      hour: 0,
      minute: 0 
    };
  }

  get price(): string {
    return this._price.toFixed(2);
  }
  
  set price(value: string) {
    this._price = parseFloat(value);
  }

  public getSelectedDate(): Date {
    return new Date(this.selectedDate.year, this.selectedDate.month - 1, this.dateStruct.day, this.selectedTime.hour, this.selectedTime.minute);
  }

  public updatePrice(value: number){
    this._price += value;
  }

  public priceAsNumber(){
    return this._price;
  }

  public updateLocation(latitude: number, longitude: number){
    this._latitude = latitude;
    this._longitude = longitude;

    //do something with the location
    //this.zipCode = value;
  }

  public searchProviders(page: number): Observable<any>{
    //call the api to get the providers
    //TODO: remove
    this._latitude = 48.4284;
    this._longitude = -123.3656;

    return this.http.get(`search?latitude=${this._latitude}&longitude=${this._longitude}&radius=${this.radius}&zip_code=${this.zipCode}&page=${page}`);
  }
}
