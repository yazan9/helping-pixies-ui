import { Component } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking-price',
  templateUrl: './booking-price.component.html',
  styleUrls: ['./booking-price.component.css']
})
export class BookingPriceComponent {

  constructor(public bookingService: BookingService) { }

  updatePrice(value: number){
    this.bookingService.updatePrice(value);
  }
}
