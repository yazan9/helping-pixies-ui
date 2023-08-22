import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsListComponent, NgbdSortableHeader } from './bookings-list/bookings-list.component';


@NgModule({
  declarations: [
    NgbdSortableHeader, BookingsListComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [BookingsListComponent]
})
export class SharedModule { }
