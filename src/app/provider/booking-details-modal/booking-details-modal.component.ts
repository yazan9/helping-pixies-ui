import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from 'src/app/services/utils.service';
import { Booking } from 'src/app/types/booking';
import { FrequencyType } from 'src/app/types/frequency-type';

@Component({
  selector: 'app-booking-details-modal',
  templateUrl: './booking-details-modal.component.html',
  styleUrls: ['./booking-details-modal.component.css']
})
export class BookingDetailsModalComponent {
  @Input() booking!: Booking;
  FrequencyType = FrequencyType;
  constructor(public activeModal: NgbActiveModal, public utils: UtilsService) {}

  public acceptBooking() {
    this.activeModal.close('accept');
  }

  public rejectBooking() {
    this.activeModal.close('reject');
  }
}
