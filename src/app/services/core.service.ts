import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  //Observable Sources
  private logoutSource = new Subject<any>();

  constructor() { }


}
