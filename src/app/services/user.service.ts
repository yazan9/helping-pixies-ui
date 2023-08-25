import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public updateProfileImage(userId: number, image: string): Observable<any> {
    return this.http.put<any>(`users/${userId}/profile_image`, { image });
  }

  public updateProfile(user: any): Observable<any> {
    return this.http.put<any>(`users/${user.id}`, { user: user });
  }
}
