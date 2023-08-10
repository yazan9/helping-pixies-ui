import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

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
    return request;
  }
}
