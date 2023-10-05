import { Injectable } from '@angular/core';
import { SeoService } from './seo.service';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeoGuard implements CanActivate {
  constructor(private seoService: SeoService) {}

  canActivate(): boolean {
    this.seoService.setDefaultMeta();
    return true;
  }
  
}
