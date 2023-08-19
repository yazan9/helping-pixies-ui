import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-booking-location',
  templateUrl: './booking-location.component.html',
  styleUrls: ['./booking-location.component.css']
})
export class BookingLocationComponent implements OnInit{
  constructor(public bookingService: BookingService, private locationService: LocationService) { }
  
  ngOnInit(): void {
    this.locationService.getLocation().subscribe((position) => {
      console.log(position);
      this.bookingService.updateLocation(position.coords.latitude, position.coords.longitude);
    });
  }

  public updateLocation(){
    
  }

}
