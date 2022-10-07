import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'app/services/tmdbApi.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movies$!: Observable<any>;
  genreId?: number;
  loadMoreConfig!: Object;

  constructor(private route: ActivatedRoute, private tmdbApiService: TmdbApiService) { }

  ngOnInit(): void {
    this.setLoadMoreConfig();

    this.route.queryParams.subscribe(params => {
      if (params['genero'] && (params['genero'].trim() !== '')) this.genreId = params['genero'];
      this.movies$ = this.tmdbApiService.discover('movie', { with_genres: this.genreId });
      this.setLoadMoreConfig();
    });
  }

  private setLoadMoreConfig(): void {
    this.loadMoreConfig = {
      method: 'discover',
      type: 'movie',
      params: {
        with_genres: this.genreId
      }
    }
  }

}
