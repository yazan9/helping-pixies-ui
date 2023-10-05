import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta) {}

  setDefaultMeta() {
    this.title.setTitle('Helping Pixies - House Cleaning Services in Victoria, BC');

    let keywords = [
    'cleaning services victoria bc',
    'house cleaning services victoria bc',
    'residential cleaning services victoria bc',
    'home cleaning services victoria bc',
    'home cleaning victoria bc',
    'residential cleaning victoria bc'
    ];

    const defaultDescription = 'A platform where house cleaners and clients can connect.';

    this.meta.updateTag({ name: 'keywords', content: keywords.join(', ') });
    this.meta.updateTag({ name: 'description', content: defaultDescription });
  }
}
