import { Component } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking-sidebar',
  templateUrl: './booking-sidebar.component.html',
  styleUrls: ['./booking-sidebar.component.css']
})
export class BookingSidebarComponent {
  constructor(public bookingService: BookingService) { }
}
