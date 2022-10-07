import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'app/services/tmdbApi.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {
  tv$!: Observable<any>;
  genreId?: number;
  loadMoreConfig!: Object;

  constructor(private route: ActivatedRoute, private tmdbApiService: TmdbApiService) { }

  ngOnInit(): void {
    this.setLoadMoreConfig();

    this.route.queryParams.subscribe(params => {
      if (params['genero'] && (params['genero'].trim() !== '')) this.genreId = params['genero'];
      this.tv$ = this.tmdbApiService.discover('tv', { with_genres: this.genreId, without_genres: 16 })
      this.setLoadMoreConfig();
    });
  }

  private setLoadMoreConfig(): void {
    this.loadMoreConfig = {
      method: 'discover',
      type: 'tv',
      params: {
        with_genres: this.genreId,
        without_genres: 16
      }
    }
  }

}
