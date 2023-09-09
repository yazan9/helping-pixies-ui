import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { LocationService } from 'src/app/services/location.service';
import { ToastService } from 'src/app/services/toast.service';
declare var google: any;  // Declare google to let TypeScript know that google will be available globally

@Component({
  selector: 'app-booking-location',
  templateUrl: './booking-location.component.html',
  styleUrls: ['./booking-location.component.css']
})
export class BookingLocationComponent implements OnInit{
  public locationLoaded: boolean = false;
  constructor(
    public bookingService: BookingService, 
    private locationService: LocationService,
    private toast: ToastService
    ) { }
  
  ngOnInit(): void {
    this.locationService.getLocation().subscribe((position) => {
      this.locationLoaded = true;
      this.setLocation(position.coords.latitude, position.coords.longitude);
    });
  }

  public setLocation(lat: number, lng: number){
    const geocoder = new google.maps.Geocoder;
    const latlng = {lat, lng};

    geocoder.geocode({'location': latlng}, (results: { address_components: any; }[], status: string) => {
      if (status === 'OK') {
        if (results[0]) {
          const postalCode = this.findPostalCode(results[0].address_components);
          this.bookingService.updateLocation(lat, lng, postalCode);
        } else {
          this.toast.showError('No results found');
        }
      } else {
        this.toast.showError('No results found');      }
    });
  }

  updatePostalCode(): void {
    this.locationLoaded = false;
    const geocoder = new google.maps.Geocoder;

    geocoder.geocode({ 'address': this.bookingService.zipCode }, (results: {
      geometry: {
        location: {
          lat(): any; lng: () => any;
        };
      };
    }[], status: string) => {
      this.locationLoaded = true;
      if (status === 'OK') {
        const latitude = results[0].geometry.location.lat();
        const longitude = results[0].geometry.location.lng();
        this.bookingService.updateLocation(latitude, longitude, this.bookingService.zipCode);
      } else {
        this.toast.showError('No results found');      }
    });
  }

  private findPostalCode(addressComponents: any[]): string | null {
    for (const component of addressComponents) {
      if (component.types.includes('postal_code')) {
        return component.long_name;
      }
    }
    return null;
  }
}
