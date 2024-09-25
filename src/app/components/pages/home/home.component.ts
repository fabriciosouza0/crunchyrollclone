import { Component, OnInit } from "@angular/core";
import { TmdbApiService } from "app/services/tmdbApi.service";
import { map, Observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  popularMovies$!: Observable<any>;
  topRatedMovies$!: Observable<any>;
  familyMovies$!: Observable<any>;
  highlights$!: Observable<any>;
  popularSeries$!: Observable<any>;
  topRatedSeries$!: Observable<any>;

  constructor(private tmdbApiService: TmdbApiService) {}

  ngOnInit(): void {
    const elemList: Array<HTMLElement> = [
      document.querySelector(".recommendations")!,
      document.querySelector(".critcs-love")!,
      document.querySelector(".family")!,
      document.querySelector(".top-tv")!,
      document.querySelector(".memorable-tv")!,
    ];

    this.loadContent(elemList);
  }

  private loadContent(elemList: Array<HTMLElement>): void {
    const ob = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        entries.forEach((entire: IntersectionObserverEntry): void => {
          if (entire.isIntersecting) {
            switch (entire.target.className) {
              case "recommendations":
                this.popularMovies$ = this.tmdbApiService.popularMovies();
                break;
              case "critcs-love":
                this.topRatedMovies$ = this.tmdbApiService.topRatedMovies();
                break;
              case "family":
                this.familyMovies$ = this.tmdbApiService
                  .discover("movie", { with_genres: 10751 })
                  .pipe(map((data: any): any => data.results));
                break;
              case "top-tv":
                this.popularSeries$ = this.tmdbApiService.popularSeries();
                break;
              case "memorable-tv":
                this.topRatedSeries$ = this.tmdbApiService.topRatedSeries();
                break;
            }
            ob.unobserve(entire.target);
          }
        });
      }
    );

    elemList.forEach((value: HTMLElement): void => {
      ob.observe(value);
    });
  }
}
