import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TmdbApiService } from 'app/services/tmdbApi.service';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  popularMovies$!: Observable<any>;
  topRatedMovies$!: Observable<any>;
  familyMovies$!: Observable<any>;
  popularSeries$!: Observable<any>;
  topRatedSeries$!: Observable<any>;


  constructor(private tmdbService: TmdbApiService) { }

  ngOnInit(): void {
    this.popularMovies$ = this.tmdbService.popularMovies();
    this.topRatedMovies$ = this.tmdbService.topRatedMovies();
    this.popularSeries$ = this.tmdbService.popularSeries();
    this.topRatedSeries$ = this.tmdbService.topRatedSeries();
    this.familyMovies$ = this.tmdbService.familyMovies();
  }

  ngAfterViewInit(): void {
    document.getElementById('loader')?.classList.remove('loading');
  }

}
