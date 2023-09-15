import { Injectable } from '@angular/core';
import { FrequencyType } from '../types/frequency-type';
import { DatePipe } from '@angular/common';

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
  constructor(public datepipe: DatePipe) { }

  public capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  public getFrequencyTypeAsString(frequencyType: FrequencyType | null): string {
    if (frequencyType === null) {
      return '';
    }
    return FrequencyTypes[frequencyType as keyof typeof FrequencyTypes] as string;
  }

  chatTimeStamp(index: number, items: any) {
    var returnData: any = '';
    if (index === 0) {
      returnData = this.labelingDate(items[index].created_at);
    } else {
      if (this.datepipe.transform(items[index - 1].created_at, 'M/d/yy') === this.datepipe.transform(items[index].created_at, 'M/d/yy')) {
        returnData = '';
      } else {
        returnData = returnData = this.labelingDate(items[index].created_at);
      }
    }
    return returnData;
  }

  labelingDate(date: any) {
    switch (this.datepipe.transform(date, 'M/d/yy')) {
      case this.datepipe.transform(new Date(), 'M/d/yy'):
        return 'TODAY';
        break;
      case this.datepipe.transform(((new Date()).setDate((new Date()).getDate() - 1)), 'M/d/yy'):
        return 'YESTERDAY';
        break;
      default:
        return this.datepipe.transform(date, 'MMMM d, y')
        break;
    }
  }
}
