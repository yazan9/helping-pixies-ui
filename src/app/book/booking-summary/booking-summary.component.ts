import { Component } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/services/booking.service';
import { FrequencyType } from 'src/app/types/frequency-type';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.css']
})
export class BookingSummaryComponent {
  public advnancedView: boolean = false;
  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  constructor(public bookingService: BookingService) { 
    this.advnancedView = this.bookingService.selectedFrequency !== FrequencyType.once;
  }

  selectedDays(): string {
    let fromDate:Date | null = this.bookingService.startDate;
    let toDate:Date | null = this.bookingService.endDate;

    if(this.bookingService.selectedFrequency === FrequencyType.twice_a_week && fromDate && toDate){
      return `Every ${this.days[fromDate.getDay()]} and ${this.days[toDate.getDay()]}`;
    }

    return this.days[this.bookingService.getSelectedDate().getDay()];
  }

  getStartDate(): Date | null {
    return this.bookingService.selectedFrequency === FrequencyType.twice_a_week ? this.bookingService.startDate : this.bookingService.getSelectedDate();
  }
}
