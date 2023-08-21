import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/services/booking.service';
import { FrequencyType } from 'src/app/types/frequency-type';
import { Provider } from 'src/app/types/provider';

interface Booking {
	id: number;
  start_at: string;
  provider: Provider;
  frequency: string;
  status: string;
  rate: number;
}

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
  bookings: Booking[] = [];
  originalBookings: Booking[] = [];
  FrequencyType = FrequencyType;

	@ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  @ViewChild('cancelConfirmation') cancelConfirmation!: TemplateRef<any>;


  constructor(private bookingService: BookingService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.bookingService.getBookings().subscribe((response) => {
      this.bookings = response;
    }, (error) => {
      alert('Error fetching bookings');
    });
  }

  cancelBooking(bookingId: number): void {
    const modalRef = this.modalService.open(this.cancelConfirmation);
    modalRef.result.then((result) => {
      console.log(result);
      if (result === 'Yes') {
        this.bookingService.cancelBooking(bookingId).subscribe((response) => {
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

  public getFrequency(frequency: string): string {
    return FrequencyType[frequency as keyof typeof FrequencyType];
  }
}

