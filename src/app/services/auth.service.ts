import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from '../types/token-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public register(user: User) {
    return this.http.post<TokenResponse>(`users`, {user: user});
  }

  public login(user: User) {
    return this.http.post<TokenResponse>(`users/sign_in`, {user: user});
  }
}

