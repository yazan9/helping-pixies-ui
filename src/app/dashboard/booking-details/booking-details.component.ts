import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Booking } from 'src/app/types/booking';
import { Client } from 'src/app/types/client';
import { Provider } from 'src/app/types/provider';


@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit{
  @Input() booking!: Booking;

  public interlocutor!: Client | Provider;

  constructor(
    public activeModal: NgbActiveModal, 
    private bookingService: BookingService, 
    private authService: AuthService,
    public utils: UtilsService
    ) { }

  ngOnInit(): void {
    let user = this.authService.getUser();
    this.interlocutor = user?.id === this.booking.id ? this.booking.provider : this.booking.client;
  }

  public isThisMyBooking(): boolean {
    let user = this.authService.getUser();
    return user?.id === this.booking.user_id;
  }

  public acceptBooking() {
    this.activeModal.close('accept');
  }

  public cancelBooking() {
    this.activeModal.close('cancel');
  }

  public rejectBooking() {
    this.activeModal.close('reject');
  }
}
