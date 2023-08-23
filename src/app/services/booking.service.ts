import { Injectable } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FrequencyType } from '../types/frequency-type';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Booking } from '../types/booking';

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
  public query: string = '';

  //Observable sources
  private bookingAcceptedSubject = new Subject<number>();
  private bookingRejectedSubject = new Subject<number>();

  //Observable streams
  bookingAccepted$ = this.bookingAcceptedSubject.asObservable();
  bookingRejected$ = this.bookingRejectedSubject.asObservable();

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

    return this.http.get(`search?latitude=${this._latitude}&longitude=${this._longitude}&radius=${this.radius}&zip_code=${this.zipCode}&page=${page}&query=${this.query}`);
  }

  private getFrequencyKey(value: FrequencyType | null): string {
    if (value === null) return '';
    return Object.keys(FrequencyType).find(key => FrequencyType[key as keyof typeof FrequencyType] === value) || '';
  }

  public bookProvider(providerId: number): Observable<any>{
    let booking: Booking = new Booking();
    booking.provider_id = providerId;
    booking.start_at = this.getSelectedDate().toISOString();
    booking.frequency = this.getFrequencyKey(this.selectedFrequency);
    booking.rate = this._price;
    booking.comments = '';

    return this.http.post('bookings', booking);
  }

  public getBookings(): Observable<any>{
    return this.http.get('bookings');
  }

  public cancelBooking(bookingId: number): Observable<any>{
    return this.http.delete(`bookings/${bookingId}`);
  }

  public broadcastBookingAccepted(bookingId: number): void{
    this.bookingAcceptedSubject.next(bookingId);
  }

  public broadcastBookingRejected(bookingId: number): void{
    this.bookingRejectedSubject.next(bookingId);
  }

  public acceptBooking(bookingId: number): Observable<any>{
    return this.http.put(`bookings/${bookingId}/accept`, {})
    .pipe(
      tap(() => {
        this.broadcastBookingAccepted(bookingId);
      })
    );
  }

  public rejectBooking(bookingId: number): Observable<any>{
    return this.http.delete(`bookings/${bookingId}`, {})
    .pipe(
      tap(() => {
        this.broadcastBookingRejected(bookingId);
      }
    ));
  }
}
