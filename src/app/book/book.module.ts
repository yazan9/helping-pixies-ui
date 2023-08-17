import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookRoutingModule } from './book-routing.module';
import { MainComponent } from './main/main.component';
import { BookComponent } from './book.component';
import { FrequencyComponent } from './frequency/frequency.component';
import { FormsModule } from '@angular/forms';
import { NgbDatepicker, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { BookingSidebarComponent } from './booking-sidebar/booking-sidebar.component';
import { BookingSummaryComponent } from './booking-summary/booking-summary.component';
import { BookingPriceComponent } from './booking-price/booking-price.component';

@NgModule({
  declarations: [
    MainComponent,
    BookComponent,
    FrequencyComponent,
    BookingSidebarComponent,
    BookingSummaryComponent,
    BookingPriceComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    FormsModule,
    NgbDatepicker,
    NgbTimepicker
  ]
})
export class BookModule { }
