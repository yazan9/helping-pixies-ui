import { Component, Input } from '@angular/core';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  @Input() average_rating: number = 0;
  @Input() ratings_count: number = 0;

  constructor() { }

  
}
