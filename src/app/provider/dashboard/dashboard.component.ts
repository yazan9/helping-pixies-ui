import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/types/booking';
import { BookingDetailsModalComponent } from '../booking-details-modal/booking-details-modal.component';
import { FrequencyType } from 'src/app/types/frequency-type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };

  public bookings:Booking[] = [];
  NUMBER_OF_WEEKS_TO_REPEAT = 10;

  constructor(private bookingService: BookingService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fetchBookings();
  }

  handleDateClick(clickInfo: EventClickArg) {
    console.log(clickInfo);
    const booking: Booking = clickInfo.event.extendedProps as Booking;
    
    const modalRef = this.modalService.open(BookingDetailsModalComponent, { fullscreen: true } );
    modalRef.componentInstance.booking = booking;
    console.log(booking);
  }

  fetchBookings(): void {
    this.bookingService.getBookings().subscribe((bookings: Booking[]) => {
      const events: EventInput[] = [];

      bookings.forEach(booking => {
        const frequencyType = this.getFrequencyType(booking.frequency);
        const repeatedBookings = this.repeatBooking(booking, frequencyType);
        repeatedBookings.forEach(repeatedBooking => {
          events.push({
            id: repeatedBooking.id.toString(),
            start: repeatedBooking.start_at,
            title: `Booking!`, // You can customize the title
            className: this.getClassForBooking(repeatedBooking),
            // additional properties as needed...
          });
        });
      });

    this.calendarOptions.events = events;
    this.calendarOptions.eventClick = this.handleDateClick.bind(this);
    }, (error) => {
      alert('Error fetching bookings');
    });
  }

  getClassForBooking(booking: Booking): string {
    if(booking.status === 'active') {
      return 'bg-success';
    }
    else if(booking.status === 'pending'){
      return 'bg-warning';
    }
    return '';
  }

  getFrequencyType(frequency: string): FrequencyType {
    switch (frequency.toLowerCase()) {
      case "once":
        return FrequencyType.once;
      case "once_a_week":
        return FrequencyType.once_a_week;
      case "twice_a_week":
        return FrequencyType.twice_a_week;
      case "once_every_two_weeks":
        return FrequencyType.once_every_two_weeks;
      default:
        throw new Error(`Unknown frequency: ${frequency}`);
    }
  }  

  repeatBooking(booking: Booking, frequency: FrequencyType): Booking[] {
    const repeatedBookings: Booking[] = [];
  
    const repeatCount = this.getRepeatCount(frequency);
  
    for (let i = 0; i < repeatCount; i++) {
      const repeatedBooking = { ...booking };
      const startDate = new Date(repeatedBooking.start_at);
      startDate.setDate(startDate.getDate() + i * this.getRepeatOffset(frequency));
      repeatedBooking.start_at = startDate.toISOString();
      repeatedBookings.push(repeatedBooking);
    }
  
    return repeatedBookings;
  }
  
  getRepeatCount(frequency: FrequencyType): number {
    switch (frequency) {
      case FrequencyType.once:
        return 1;
      case FrequencyType.once_a_week:
        return this.NUMBER_OF_WEEKS_TO_REPEAT;
      case FrequencyType.twice_a_week:
        return this.NUMBER_OF_WEEKS_TO_REPEAT * 2;
      case FrequencyType.once_every_two_weeks:
        return this.NUMBER_OF_WEEKS_TO_REPEAT / 2;
    }
  }
  
  getRepeatOffset(frequency: FrequencyType): number {
    switch (frequency) {
      case FrequencyType.once:
        return 0;
      case FrequencyType.once_a_week:
        return 7;
      case FrequencyType.twice_a_week:
        return 3.5; // or calculate based on scheduling logic
      case FrequencyType.once_every_two_weeks:
        return 14;
    }
  }
  
}
