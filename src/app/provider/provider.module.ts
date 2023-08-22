import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BookingDetailsModalComponent } from './booking-details-modal/booking-details-modal.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DashboardComponent,
    BookingDetailsModalComponent
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    FullCalendarModule,
    SharedModule
  ]
})
export class ProviderModule { }
