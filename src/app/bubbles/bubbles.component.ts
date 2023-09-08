import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-bubbles',
  templateUrl: './bubbles.component.html',
  styleUrls: ['./bubbles.component.css'],
  animations: [
    trigger('floatBubble', [
      state('bottom', style({ transform: 'translateY(0px)' })),
      state('top', style({ transform: 'translateY(-2000px)' })),
      transition('bottom => top', [animate('{{duration}}s')]),
      transition('top => bottom', [animate('0s')])
    ])
  ]
})
export class BubblesComponent implements OnInit {
  bubbles: any[] = [];

  ngOnInit() {
    this.createBubbles(20);
  }

  createBubbles(count: number) {
    for (let i = 0; i < count; i++) {
      const bubble = {
        left: Math.random() * 100 + 'vw',
        size: Math.floor(Math.random() * 40 + 10) + 'px',
        duration: Math.random() * 3 + 4,
        state: 'bottom'
      };
      this.bubbles.push(bubble);
      setTimeout(() => { bubble.state = 'top'; }, 0);  // Trigger the animation
    }
  }

  onAnimationEnd(bubble: any) {
    bubble.state = 'bottom';
    setTimeout(() => { 
      bubble.state = 'top'; 
      bubble.left = Math.random() * 100 + 'vw';
      bubble.size = Math.floor(Math.random() * 40 + 10) + 'px';
      bubble.duration = Math.random() * 3 + 2;
    }, 0);  // Re-trigger the animation
  }
}
