import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingsListComponent, NgbdSortableHeader } from './bookings-list/bookings-list.component';


@NgModule({
  declarations: [
    DashboardComponent,
    BookingsListComponent,
    NgbdSortableHeader
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
