import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from '../types/token-response';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private user = new BehaviorSubject<User | null>(this.getUser());
  get userObservable() {
    return this.user.asObservable();
  }
  
  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) { }

  public register(user: User) {
    return this.http.post<TokenResponse>(`users`, {user: user});
  }

  public login(user: User) {
    return this.http.post<TokenResponse>(`users/sign_in`, {user: user})
    .pipe(
      tap((res: TokenResponse) => {
        this.setTokens(res.jwt_token);
        this.setUser(res.user);
      }
    ));
  }

  public logout(): void {
    this.removeTokensAndUser();
    this.router.navigate(['/login']);
  }

  public resendConfirmationEmail(email: string) {
    return this.http.post(`confirmation`, {email: email});
  }

  public getUser(): User | null {
    let user = this.storageService.getItemFromLocalStorage('hp-user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public getUserType(): string {
    let user = this.getUser();
    if (user) {
      return user.user_type;
    }
    return '';
  }

  public setUser(user: User){
    this.storageService.setItemToLocalStorage('hp-user', JSON.stringify(user));
    this.user.next(user);
  }

  //private
  private setTokens(token: string): void {
    this.storageService.setItemToLocalStorage('hp-token', token);
    this.loggedIn.next(true);
  }

  

  private removeTokensAndUser(): void {
    this.storageService.removeItemFromLocalStorage('hp-token');
    this.storageService.removeItemFromLocalStorage('hp-user');
    this.loggedIn.next(false);
    this.user.next(null);
  }

  private hasToken(): boolean {
    // Implement logic here to check if a valid JWT token exists
    //Check if a token exists in local storage
    const token = this.storageService.getItemFromLocalStorage('hp-token');
    
    // If the token exists, the user is logged in
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}

