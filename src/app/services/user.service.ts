import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //Observable Sources
  private phoneNumberValiditySource = new BehaviorSubject<boolean>(true);

  //Observable Streams
  phoneNumberInvalidSource$ = this.phoneNumberValiditySource.asObservable();

  constructor(private http:HttpClient) { }

  public updateProfileImage(userId: number, image: string): Observable<any> {
    return this.http.put<any>(`users/${userId}/profile_image`, { image });
  }

  public updateProfile(user: any): Observable<any> {
    return this.http.put<any>(`users/${user.id}`, { user: user });
  }

  public broadcastPhoneNumberValidity(isValid: boolean): void {
    this.phoneNumberValiditySource.next(isValid);
  }

  public confirmEmail(token: string): Observable<any> {
    return this.http.get<any>(`confirmation?confirmation_token=${token}`);
  }
}
