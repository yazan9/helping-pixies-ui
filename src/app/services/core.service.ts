import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Provider } from '../types/provider';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  //Observable Sources
  private logoutSource = new Subject<any>();

  savedProvider: Provider | null = null;

  constructor() { }

  setSavedProvider(provider: Provider): void {
    this.savedProvider = provider;
  } 

  getSavedProvider(): Provider | null {
    return this.savedProvider;
  }
}
