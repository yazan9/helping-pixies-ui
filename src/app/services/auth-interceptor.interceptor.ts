import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  whiteList = ['/i18n', 'UtcTimeZone.json', 'http', 'assets/images/'];

  constructor(private storageService: StorageService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('intercepted request ... ');
    const request = this.setRequerstUrl(req);
    return next.handle(request);
  }

  setRequerstUrl(req: HttpRequest<any>) {
    const apiUrl = environment.API_URL;
    let url: string = apiUrl + req.url;
    
    const request = req.clone({
      url: url
    });

    if (this.whiteList.some(s => req.url.includes(s))) {
      return request;
    }

    const token = this.storageService.getItemFromLocalStorage('hp-token');
    if (token) {
      let requestWithToken = this.addToken(request, token);
      return requestWithToken;
    }

    return request;
  }

  addToken(req: HttpRequest<any>, token: string) {
    const request = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return request;
  }
}
