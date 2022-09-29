import { Component, OnInit } from "@angular/core";
import { TmdbApiService } from "app/services/tmdbApi.service";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import SwiperCore, { SwiperOptions, Navigation, Pagination, Autoplay } from "swiper";

SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: "slider",
  templateUrl: './slider.component.html',
  styleUrls: ["./slider.component.css"],
})
export class SliderComponent implements OnInit {
  highligths$!: Observable<any>;
  baseImgUrl: string = environment.baseImgUrl;
  config: SwiperOptions = {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 0,
    cssMode: false,
    navigation: true,
    pagination: { clickable: true },
    loop: true,
    autoplay: {
      delay: 4000
    }
  };

  constructor(private tmdbApiService: TmdbApiService) { }

  ngOnInit() {
    this.highligths$ = this.tmdbApiService.highligths();
  }

}
