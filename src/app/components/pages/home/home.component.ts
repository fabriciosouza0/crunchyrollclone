import { Component, OnInit } from '@angular/core';
import { TmdbApiService } from 'app/services/tmdbApi.service';
import { Observable } from 'rxjs';

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
    this.popularMovies$ = this.tmdbApiService.popularMovies();
    this.topRatedMovies$ = this.tmdbApiService.topRatedMovies();
    this.popularSeries$ = this.tmdbApiService.popularSeries();
    this.topRatedSeries$ = this.tmdbApiService.topRatedSeries();
    this.familyMovies$ = this.tmdbApiService.familyMovies();
  }

}
