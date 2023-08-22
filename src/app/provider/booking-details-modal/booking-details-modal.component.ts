import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from 'src/app/types/booking';

@Component({
  selector: 'app-booking-details-modal',
  templateUrl: './booking-details-modal.component.html',
  styleUrls: ['./booking-details-modal.component.css']
})
export class BookingDetailsModalComponent {
  @Input() booking!: Booking;
  constructor(public activeModal: NgbActiveModal) {}
}
