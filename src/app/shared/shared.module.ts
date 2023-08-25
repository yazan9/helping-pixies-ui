import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsListComponent, NgbdSortableHeader } from './bookings-list/bookings-list.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    NgbdSortableHeader, BookingsListComponent, NavbarComponent
  ],
  imports: [
    CommonModule,
    
  ],
  exports: [BookingsListComponent, NavbarComponent]
})
export class SharedModule { }
