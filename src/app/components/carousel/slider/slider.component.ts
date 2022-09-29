import { Component, OnInit } from "@angular/core";
import SwiperCore, { SwiperOptions, Navigation, Pagination, Autoplay } from "swiper";

SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: "slider",
  templateUrl: './slider.component.html',
  styleUrls: ["./slider.component.css"],
})
export class SliderComponent implements OnInit {
  config: SwiperOptions = {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 5,
    cssMode: true,
    navigation: true,
    pagination: true,
    loop: true,
    autoplay: {
      delay: 4000
    }
  };

  ngOnInit() { }
}
