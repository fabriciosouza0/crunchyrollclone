import { Component, OnInit } from '@angular/core';
import { TmdbApiService } from 'app/services/tmdbApi.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularMovies$!: Observable<any>;
  topRatedMovies$!: Observable<any>;
  familyMovies$!: Observable<any>;
  popularSeries$!: Observable<any>;
  topRatedSeries$!: Observable<any>;

  constructor(private tmdbApiService: TmdbApiService) { }

  ngOnInit(): void {
    const elemList: Array<HTMLElement> = [
      document.querySelector('.recommendations')!,
      document.querySelector('.critcs-love')!,
      document.querySelector('.family')!,
      document.querySelector('.highligth')!,
      document.querySelector('.top-tv')!,
      document.querySelector('.memorable-tv')!
    ];

    this.loadContent(elemList);
  }

  private loadContent(elemList: Array<HTMLElement>) {
    const ob = new IntersectionObserver(entries => {
      entries.forEach(entrie => {
        if (entrie.isIntersecting) {
          switch (entrie.target.className) {
            case 'recommendations':
              //console.log('recommendations')
              this.popularMovies$ = this.tmdbApiService.popularMovies();
              break;
            case 'critcs-love':
              //console.log('critcs-love')
              this.topRatedMovies$ = this.tmdbApiService.topRatedMovies();
              break;
            case 'family':
              //console.log('family')
              this.familyMovies$ = this.tmdbApiService.discover('movie', { with_genres: 10751 }).pipe(map(data => data.results));
              break;
            case 'highligth':
              //console.log('highligth')
              break;
            case 'top-tv':
              //console.log('top-tv')
              this.popularSeries$ = this.tmdbApiService.popularSeries();
              break;
            case 'memorable-tv':
              //console.log('memorable-tv')
              this.topRatedSeries$ = this.tmdbApiService.topRatedSeries();
              break;
          }
          ob.unobserve(entrie.target);
        }
      })
    });

    elemList.forEach(value => {
      ob.observe(value);
    });
  }

}