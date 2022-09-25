import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { MatIconModule } from '@angular/material/icon';

import { SliderComponent } from './slider/slider.component';
import { SliderInlineComponent } from './slider-inline/slider-inline.component';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    SliderComponent,
    SliderInlineComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    LazyLoadImageModule,
    SwiperModule,
    RouterModule
  ],
  exports: [
    SliderComponent,
    SliderInlineComponent
  ]
})
export class CarouselModule { }
