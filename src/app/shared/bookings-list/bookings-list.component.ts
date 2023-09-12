import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { BookingDetailsComponent } from 'src/app/dashboard/booking-details/booking-details.component';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Booking } from 'src/app/types/booking';
import { FrequencyType } from 'src/app/types/frequency-type';

type SortableFields = 'id' | 'start_at' | 'start_at' | 'frequency' | 'status' | 'rate';
export type SortColumn = SortableFields | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export interface SortEvent {
	column: SortColumn;
	direction: SortDirection;
}

@Directive({
	selector: 'th[sortable]',
	host: {
		'[class.asc]': 'direction === "asc"',
		'[class.desc]': 'direction === "desc"',
		'(click)': 'rotate()',
	},
})
export class NgbdSortableHeader {
	@Input() sortable: SortColumn = '';
	@Input() direction: SortDirection = '';
	@Output() sort = new EventEmitter<SortEvent>();

	rotate() {
		this.direction = rotate[this.direction];
		this.sort.emit({ column: this.sortable, direction: this.direction });
	}
}

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.css']
})
export class BookingsListComponent implements OnInit{
  @Input() userType: string = '';
  bookings: Booking[] = [];
  originalBookings: Booking[] = [];
  FrequencyType = FrequencyType;

  private subscriptions: Subscription[] = [];

	@ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  @ViewChild('cancelConfirmation') cancelConfirmation!: TemplateRef<any>;

  public user_type = this.authService.getUserType();

  constructor(
    private bookingService: BookingService, 
    private modalService: NgbModal, 
    private authService: AuthService,
    public utils: UtilsService
    ) { }

  ngOnInit(): void {
    this.fetchBookings();

    const bookingAcceptedSubscription = this.bookingService.bookingAccepted$.subscribe(bookingId => {
      let updatedBooking = this.bookings.find(booking => booking.id === bookingId);
      if(updatedBooking){
        updatedBooking.status = 'active';
      }
    });

    const bookingRejectedSubscription = this.bookingService.bookingRejected$.subscribe(bookingId => {
      let updatedBooking = this.bookings.find(booking => booking.id === bookingId);
      if(updatedBooking){
        this.bookings = this.bookings.filter(booking => booking.id !== bookingId);
      }
    });

    this.subscriptions.push(bookingAcceptedSubscription);
  }

  fetchBookings(): void {
    this.bookingService.getBookings().subscribe((response) => {
      this.bookings = response;
    }, (error) => {
      alert('Error fetching bookings');
    });
  }

  viewBooking(booking: Booking){
    const modalRef = this.modalService.open(BookingDetailsComponent, {fullscreen: true, scrollable: true});
    modalRef.componentInstance.booking = booking;

    modalRef.result.then((result) => {
      if (result === 'accept') {
        this.acceptBooking(booking.id);
      }
      else if (['cancel', 'reject'].includes(result)) {
        this.cancelBooking(booking.id);
      }
    }
  )}

  cancelBooking(bookingId: number): void {
    const modalRef = this.modalService.open(this.cancelConfirmation);
    modalRef.result.then((result) => {
      console.log(result);
      if (result === 'Yes') {
        this.bookingService.rejectBooking(bookingId).subscribe((response) => {
          this.fetchBookings();
        }, (error) => {
          alert('Error cancelling booking');
        });
      }
    });
  }

	onSort({ column, direction }: SortEvent) {
		// resetting other headers
		this.headers.forEach((header) => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		// sorting countries
		if (direction === '' || column === '') {
      this.bookings = this.originalBookings;
    } else {
      this.bookings = this.bookings.sort((a, b) => {
        const valueA = a[column as SortableFields]; // TypeScript will now allow this
        const valueB = b[column as SortableFields]; // TypeScript will now allow this
        const res = compare(valueA, valueB);
        return direction === 'asc' ? res : -res;
      });
    }
	}

  public acceptBooking(bookingId: number): void {
    this.bookingService.acceptBooking(bookingId).subscribe((response) => {
      let booking = this.bookings.find(booking => booking.id === bookingId);
      if (booking) {
        booking.status = 'active';
      }
    }, (error) => {
      alert('Error accepting booking');
    });
  }
}

