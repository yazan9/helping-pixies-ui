import { Component, TemplateRef } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.css']
})
export class ToastContainerComponent {
  
    constructor(public toastService:ToastService) { }

    isTemplate(toast: { textOrTpl: any; }) {
      return toast.textOrTpl instanceof TemplateRef;
    }
}
