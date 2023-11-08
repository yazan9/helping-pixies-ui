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
  public locationLoading: boolean = false;
  public locationDetectedSuccessfully: boolean = false;
  public locationManuallyEntered: boolean = false;
  public locationRequested: boolean = false;
  constructor(
    public bookingService: BookingService, 
    private locationService: LocationService,
    private toast: ToastService
    ) { }
  
  ngOnInit(): void {
    
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
    this.locationLoading = true;
    const geocoder = new google.maps.Geocoder;

    geocoder.geocode({ 'address': this.bookingService.zipCode }, (results: {
      geometry: {
        location: {
          lat(): any; lng: () => any;
        };
      };
    }[], status: string) => {
      this.locationLoading = false;
      this.locationManuallyEntered = true;
      if (status === 'OK') {
        this.locationManuallyEntered = true;
        this.locationDetectedSuccessfully = true;
        const latitude = results[0].geometry.location.lat();
        const longitude = results[0].geometry.location.lng();
        this.bookingService.updateLocation(latitude, longitude, this.bookingService.zipCode);
      }
      else{
        this.locationDetectedSuccessfully = false;
        this.toast.showError('Hmm, looks like google is not able to find this postal code. Please enter a postal code for a nearby area instead.');
        this.bookingService.updateLocation(0, 0, '');
      }
    });
  }

  public getPostalCode(): void{
    this.locationRequested = true;
    this.locationLoading = true;
    this.locationService.getLocation().subscribe((position) => {
      this.locationLoading = false;
      this.locationDetectedSuccessfully = true;
      this.setLocation(position.coords.latitude, position.coords.longitude);
    }, (err) => {
      this.locationDetectedSuccessfully = false;
      this.locationLoading = false;
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
