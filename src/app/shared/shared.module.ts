import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsListComponent, NgbdSortableHeader } from './bookings-list/bookings-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReviewComponent } from './review/review.component';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    NgbdSortableHeader, BookingsListComponent, NavbarComponent, ReviewComponent
  ],
  imports: [
    CommonModule,
    NgbRating
  ],
  exports: [BookingsListComponent, NavbarComponent, ReviewComponent]
})
export class SharedModule { }
