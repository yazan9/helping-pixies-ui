import { Injectable } from '@angular/core';
import { FrequencyType } from '../types/frequency-type';

class FrequencyTypes {
  public static readonly once = 'Once';
  public static readonly once_a_week = 'Once a Week';
  public static readonly twice_a_week = 'Twice a Week';
  public static readonly once_every_two_weeks = 'Once Every Two Weeks';
}

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  
  FrequencyType = FrequencyType;
  constructor() { }

  public capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  public getFrequencyTypeAsString(frequencyType: FrequencyType | null): string {
    if (frequencyType === null) {
      return '';
    }
    return FrequencyTypes[frequencyType as keyof typeof FrequencyTypes] as string;
  }
}
