import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import SwiperCore, { Swiper, SwiperOptions } from 'swiper';

@Component({
  selector: 'slider-inline',
  templateUrl: './slider-inline.component.html',
  styleUrls: ['./slider-inline.component.css']
})
export class SliderInlineComponent implements OnInit {
  @Input() mediaType!: string;
  @Input() sliderTitle!: string;
  @Input() sliderData$!: Observable<any>;
  slidesPerView!: Array<number>;

  config: SwiperOptions = {
    direction: 'horizontal',
    spaceBetween: 5,
    freeMode: true,

    breakpoints: {
      280: {
        slidesPerView: 1,
        spaceBetween: 0
      },

      320: {
        slidesPerView: 2,
        spaceBetween: 5.2
      },

      570: {
        slidesPerView: 3,
        spaceBetween: 5.2
      },

      900: {
        slidesPerView: 5,
        spaceBetween: 5.2
      }
    },

  };

  constructor() { }

  ngOnInit(): void {
    this.resizeLoading();
  }

  resizeLoading() {
    const breakPoint = window.innerWidth;

    if (breakPoint >= 280 && breakPoint < 370) {
      this.slidesPerView = Array<number>(1);
      return;
    }

    if (breakPoint >= 320 && breakPoint < 570) {
      this.slidesPerView = Array<number>(2);
      return;
    }

    if (breakPoint >= 570 && breakPoint < 900) {
      this.slidesPerView = Array<number>(3);
      return;
    }

    if (breakPoint >= 900) {
      this.slidesPerView = Array<number>(5);
      return;
    }
  }
}