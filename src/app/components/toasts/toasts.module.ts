import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastsContainer } from './toasts-container/toasts-container.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'app/services/toast.service';



@NgModule({
  declarations: [ToastsContainer],
  imports: [
    CommonModule,
    NgbToastModule
  ],
  exports: [ToastsContainer],
  providers: [ToastService]
})
export class ToastsModule { }
