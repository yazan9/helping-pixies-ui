import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  
  constructor() {}

  //errors:
  // 1. Location error
  // 2. Location permission denied
  // 3. Geolocation is not supported by this browser

  public getLocation(): Observable<GeolocationPosition> {
    return new Observable(observer => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (err) => {
            if (this.isFirefox()) {
              this.handleFirefoxLocation().then((position) => {
                observer.next(position);
                observer.complete();
              }, (err) => {
                observer.error(1);
              });
            } else {
              observer.error(2);
            }
          }
        );
      } else {
        observer.error(3);
      }
    });
  }

  private async handleFirefoxLocation(): Promise<any> {
    const response = await fetch("https://location.services.mozilla.com/v1/geolocate?key=test");
    const jsonData = await response.json();
    return jsonData;
  }

  private isFirefox(): boolean {
    return navigator.userAgent.includes('Firefox');
  }
}
