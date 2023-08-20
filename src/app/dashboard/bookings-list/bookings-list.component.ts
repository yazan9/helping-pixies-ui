import { Component, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { Provider } from 'src/app/types/provider';

interface Booking {
	id: number;
  start_date: string;
  start_time: string;
  provider: Provider;
  frequency: string;
  status: string;
  rate: number;
}

const BOOKINGS: Booking[] = [
	{
		id: 1,
    start_date: '2021-01-01',
    start_time: '10:00',
    provider: {
      id: 1,
      name: 'Brandy',
      description: 'something',
      distance: 1,
      average_rating: 5
    },
    frequency: 'Weekly',
    status: 'Active',
    rate: 35
  },
		
	{
		id: 2,
    start_date: '2021-01-01',
    start_time: '10:00',
    provider: {
      id: 1,
      name: 'Keila',
      description: 'something',
      distance: 1,
      average_rating: 5
    },
    frequency: 'Weekly',
    status: 'Active',
    rate: 35
  }
];

type SortableFields = 'id' | 'start_date' | 'start_time' | 'frequency' | 'status' | 'rate';
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
export class BookingsListComponent {
  bookings = BOOKINGS;

	@ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

	onSort({ column, direction }: SortEvent) {
		// resetting other headers
		this.headers.forEach((header) => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		// sorting countries
		if (direction === '' || column === '') {
      this.bookings = BOOKINGS;
    } else {
      this.bookings = [...BOOKINGS].sort((a, b) => {
        const valueA = a[column as SortableFields]; // TypeScript will now allow this
        const valueB = b[column as SortableFields]; // TypeScript will now allow this
        const res = compare(valueA, valueB);
        return direction === 'asc' ? res : -res;
      });
    }
	}
}

