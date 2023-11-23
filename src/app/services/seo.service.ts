import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta) {}

  setDefaultMeta() {
    this.title.setTitle('Helping Pixies - Connecting House Cleaners with Clients');

    let keywords = [
    'cleaning services',
    'house cleaning services',
    'residential cleaning services',
    'home cleaning services',
    'home cleaning',
    'residential cleaning'
    ];

    const defaultDescription = 'A platform where house cleaners and clients can connect.';

    this.meta.updateTag({ name: 'keywords', content: keywords.join(', ') });
    this.meta.updateTag({ name: 'description', content: defaultDescription });
  }
}
