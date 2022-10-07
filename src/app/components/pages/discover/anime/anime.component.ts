import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'app/services/tmdbApi.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-anime',
  templateUrl: 'anime.component.html',
  styleUrls: ['anime.component.css']
})
export class AnimeComponent implements OnInit {
  animes$!: Observable<any>;
  genreId?: number;
  loadMoreConfig!: Object;

  constructor(private route: ActivatedRoute, private tmdbApiService: TmdbApiService) { }

  ngOnInit(): void {
    this.setLoadMoreConfig();

    this.route.queryParams.subscribe(params => {
      if (params['genero'] && (params['genero'].trim() !== '')) this.genreId = params['genero'];
      this.animes$ = this.tmdbApiService.discover('tv', { with_genres: `16,${this.genreId}` });
      this.setLoadMoreConfig();
    });
  }

  private setLoadMoreConfig(): void {
    this.loadMoreConfig = {
      method: 'discover',
      type: 'tv',
      params: {
        with_genres: `16,${this.genreId}`
      }
    }
  }

}
