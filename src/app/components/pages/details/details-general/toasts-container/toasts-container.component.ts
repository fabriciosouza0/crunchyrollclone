import { Component, TemplateRef } from '@angular/core';

import { ToastService } from 'app/services/toast.service';


@Component({
  selector: 'app-toasts',
  templateUrl: './toasts-container.component.html',
  host: { 'class': 'toast-container position-fixed top-0 end-0 p-3', 'style': 'z-index: 1000; margin-top: 3.75rem' }
})
export class ToastsContainer {
  constructor(public toastService: ToastService) { }

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}