import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Conversation } from 'src/app/types/conversation';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent {
  constructor(private location:Location) { }

  back(){
    this.location.back();
  }
  
}
