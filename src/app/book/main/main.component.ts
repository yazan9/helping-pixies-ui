import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/services/booking.service';
import { Location } from '@angular/common';
import { FrequencyType } from 'src/app/types/frequency-type';

import * as moment from 'moment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  showRangeDatePicker: boolean = false;
  locationReceived: boolean = false;

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  mindate: NgbDateStruct;
  
  constructor(
    public bookingService: BookingService, 
    private router: Router, 
    public location: Location, 
    calendar: NgbCalendar) { 
      this.fromDate = calendar.getToday();
	  this.bookingService.startDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
      this.toDate = calendar.getNext(calendar.getToday(), 'd', 2);
	  this.bookingService.endDate = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
	  this.mindate = new NgbDate(moment().year(), moment().month() + 1, moment().date());
  }

  ngOnInit(): void {
    if(!this.bookingService.selectedFrequency){
      this.router.navigate(['/book'])
    }

	this.setShowRangeDatePicker();
	this.bookingService.bookingLocationUpdated$.subscribe((location: {lat: number, lng: number, postalCode: string}) => {
		this.locationReceived = true;
	});
  }

  setShowRangeDatePicker(){
	this.showRangeDatePicker = this.bookingService.selectedFrequency === FrequencyType.twice_a_week;
  }

  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
			this.bookingService.startDate = new Date(date.year, date.month - 1, date.day);
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
			this.bookingService.endDate = new Date(date.year, date.month - 1, date.day);
		} else {
			this.toDate = null;
			this.fromDate = date;
			this.bookingService.startDate = new Date(date.year, date.month - 1, date.day);
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

  public next(){
    this.router.navigate(['/book/search']);
  }

}
