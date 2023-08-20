import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookRoutingModule } from './book-routing.module';
import { MainComponent } from './main/main.component';
import { BookComponent } from './book.component';
import { FrequencyComponent } from './frequency/frequency.component';
import { FormsModule } from '@angular/forms';
import { NgbDatepicker, NgbRatingModule, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { BookingSidebarComponent } from './booking-sidebar/booking-sidebar.component';
import { BookingSummaryComponent } from './booking-summary/booking-summary.component';
import { BookingPriceComponent } from './booking-price/booking-price.component';
import { BookingLocationComponent } from './booking-location/booking-location.component';
import { BookingSearchComponent } from './booking-search/booking-search.component';
import { ProviderDetailsModalComponent } from './provider-details-modal/provider-details-modal.component';

@NgModule({
  declarations: [
    MainComponent,
    BookComponent,
    FrequencyComponent,
    BookingSidebarComponent,
    BookingSummaryComponent,
    BookingPriceComponent,
    BookingLocationComponent,
    BookingSearchComponent,
    ProviderDetailsModalComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    FormsModule,
    NgbDatepicker,
    NgbTimepicker,
    NgbRatingModule
  ]
})
export class BookModule { }
