import { Injectable } from '@angular/core';
import { FrequencyType } from '../types/frequency-type';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  FrequencyType = FrequencyType;
  constructor() { }

  public getFrequencyType(frequency: string): string {
    const frequencyValue = FrequencyType[frequency as keyof typeof FrequencyType];
    return frequencyValue || 'Unknown frequency';
  }

  public capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
