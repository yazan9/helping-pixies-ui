import { Injectable } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FrequencyType } from '../types/frequency-type';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  zipCode: string = '';

  private _price: number = 35;
  private _latitude: number = 0;
  private _longitude: number = 0;
  public radius: number = 5;
  public query: string = '';
  public comments: string = '';

  //Observable sources
  private bookingAcceptedSubject = new Subject<number>();
  private bookingRejectedSubject = new Subject<number>();
  private bookingLocationUpdatedSubject = new Subject<{lat: number, lng: number, postalCode: string}>();

  //Observable streams
  bookingAccepted$ = this.bookingAcceptedSubject.asObservable();
  bookingRejected$ = this.bookingRejectedSubject.asObservable();
  bookingLocationUpdated$ = this.bookingLocationUpdatedSubject.asObservable();

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

  public updateLocation(latitude: number, longitude: number, postalCode: string | null){
    this._latitude = latitude;
    this._longitude = longitude;
    this.zipCode = postalCode ?? '';

    this.broadcastBookingLocationUpdated(latitude, longitude, this.zipCode);
  }

  public searchProviders(page: number): Observable<any> {
    // Start with an empty HttpParams object
    let params = new HttpParams();

    // Conditionally add latitude and longitude if they are not 0
    if (this._latitude !== 0) {
        params = params.set('latitude', this._latitude.toString());
    }
    if (this._longitude !== 0) {
        params = params.set('longitude', this._longitude.toString());
    }

    // Add the other parameters
    params = params
        .set('radius', this.radius)
        .set('zip_code', this.zipCode)
        .set('page', page.toString())
        .set('query', this.query)
        .set('start_at', this.setStartAt(this.getFrequencyKey(this.selectedFrequency)))
        .set('hours', this.selectedHours);

    // Call the API using the constructed parameters
    return this.http.get('search', { params: params });
}



  private getFrequencyKey(value: FrequencyType | null): string {
    if (value === null) return '';
    return Object.keys(FrequencyType).find(key => FrequencyType[key as keyof typeof FrequencyType] === value) || '';
  }

  public bookProvider(providerId: number): Observable<any>{
    let booking: Booking = new Booking();
    booking.provider_id = providerId;
    booking.frequency = this.getFrequencyKey(this.selectedFrequency);
    booking.start_at = this.setStartAt(booking.frequency);
    booking.rate = this._price;
    booking.hours = this.selectedHours;
    booking.offset = this.setBookingOffset(booking)
    booking.comments = this.comments;

    return this.http.post('bookings', booking).pipe(
      tap(() => {
        this.resetBooking();
      })
    );
  }

  private resetBooking(): void {
    this.selectedFrequency = null;
    this.selectedHours = 2;
    this.dateStruct = this.calendar.getToday();
    this.selectedDate = {
      year: this.dateStruct.year,
      month: this.dateStruct.month
    };
    this.selectedTime = {
      hour: 0,
      minute: 0
    };
    this.startDate = null;
    this.endDate = null;
    this.zipCode = '';
    this._price = 35;
    this._latitude = 0;
    this._longitude = 0;
    this.radius = 5;
    this.query = '';
    this.comments = '';
  }

  private setBookingOffset(booking: Booking): number {
    let offset = 0;
    if (booking.frequency !== "twice_a_week") {
      return 0;
    }
    return this.getDaysDifference() || 0;
  }

  private setStartAt(frequency: string): string {
    if(frequency === "twice_a_week"){
      return this.startDate?.toISOString() || '';
    }
    return this.getSelectedDate().toISOString();
  }

  public getBookings(): Observable<any>{
    return this.http.get('bookings');
  }
  
  public getBooking(bookingId: number): Observable<Booking>{
    return this.http.get<Booking>(`bookings/${bookingId}`);
  }

  public broadcastBookingAccepted(bookingId: number): void{
    this.bookingAcceptedSubject.next(bookingId);
  }

  public broadcastBookingRejected(bookingId: number): void{
    this.bookingRejectedSubject.next(bookingId);
  }

  public broadcastBookingLocationUpdated(lat: number, lng: number, postalCode: string): void{
    this.bookingLocationUpdatedSubject.next({lat, lng, postalCode});
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

  getDaysDifference(): number | null {
    if (this.startDate && this.endDate) {
      const millisecondsDifference = this.endDate.getTime() - this.startDate.getTime();
      const daysDifference = millisecondsDifference / (1000 * 60 * 60 * 24);
      return daysDifference;
    }
    return null;
  }
    
}
