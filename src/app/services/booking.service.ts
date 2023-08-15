import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  selectedFrequency: string | null = null;

  constructor() { }
}
