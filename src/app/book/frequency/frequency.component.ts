import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.css']
})
export class FrequencyComponent {
  constructor(
    public bookingService: BookingService,
    private router: Router
    ) { }

  public next() {
    this.router.navigate(['/booking/main']);
  } 
}
