import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public getItemFromLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  public setItemToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public removeItemFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  public clearLocalStorage() {
    localStorage.clear();
  }

  public getItemFromSessionStorage(key: string) {
    return sessionStorage.getItem(key);
  }

  public setItemToSessionStorage(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  public removeItemFromSessionStorage(key: string) {
    sessionStorage.removeItem(key);
  }

  public clearSessionStorage() {
    sessionStorage.clear();
  }
  
}
