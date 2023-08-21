import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from '../types/token-response';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private sotrageService: StorageService) { }

  public register(user: User) {
    return this.http.post<TokenResponse>(`users`, {user: user});
  }

  public login(user: User) {
    return this.http.post<TokenResponse>(`users/sign_in`, {user: user});
  }

  public getUser(): User | null {
    let user = this.sotrageService.getItemFromLocalStorage('hp-user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public isLoggedIn(): boolean {
    // Check if a token exists in local storage
    const token = this.sotrageService.getItemFromLocalStorage('hp-token');
    
    // If the token exists, the user is logged in
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}

