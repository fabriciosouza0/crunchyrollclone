import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { GridListComponent } from './grid-list.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    GridListComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    LazyLoadImageModule,
    RouterModule
  ],
  exports: [GridListComponent]
})
export class GridListModule { }
