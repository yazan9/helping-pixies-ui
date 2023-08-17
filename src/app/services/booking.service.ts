import { Injectable } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FrequencyType } from '../types/frequency-type';

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

  private _price: number = 35;

  constructor(private calendar: NgbCalendar) { 
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
}
