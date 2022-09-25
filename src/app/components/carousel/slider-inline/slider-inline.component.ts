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

  private swiper!: Swiper;

  constructor() { }

  ngOnInit(): void {
    this.swiper = new Swiper('#inline');
  }

  resetSwiper() {
    this.swiper.destroy;
    if (!(this.swiper instanceof Swiper)) {
      this.swiper = new Swiper('#inline', this.config);
    }
  }

}
