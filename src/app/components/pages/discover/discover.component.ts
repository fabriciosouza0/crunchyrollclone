import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { TmdbApiService } from 'app/services/tmdbApi.service';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  genres$!: Observable<any>;
  genreId?: number;
  genreName: string = 'Generos';
  displayPage!: string;
  page!: string;

  constructor(private router: Router, private tmdbApiService: TmdbApiService) { }

  ngOnInit(): void {
    this.movies();

    this.router.events
      .pipe(
        filter((events: Event): events is RouterEvent => events instanceof NavigationEnd)
      )
      .subscribe(navigation => {
        const url = navigation.url;
        if (url === '/discover') this.movies();
      });
  }

  movies(): void {
    this.moveTo('Filmes', 'movie', false);
  }

  tv(): void {
    this.moveTo('Séries', 'tv', false);
  }

  animes(): void {
    this.moveTo('Animes', 'tv', true);
  }

  private moveTo(displayPage: string, genresFor: string, anime: boolean): void {
    this.displayPage = displayPage;
    this.page = displayPage.toLowerCase().replace(/[é]/g, "e");
    this.genreId = undefined;
    this.genreName = 'Generos';

    if (!anime) {
      this.genres$ = this.tmdbApiService.genres(genresFor);
      this.navigate(this.page, { genero: this.genreId });
      return;
    }

    this.genres$ = this.tmdbApiService.genres('tv')
      .pipe(
        map(genres => {
          genres = genres.filter((genre: any) => genre.id != 16);

          return genres;
        })
      );

    this.navigate(this.page, { genero: this.genreId })
  }

  changeGenre(event: any): void {
    const genreId = event.target.children[0].value;
    const genreName = event.target.children[1].value;
    this.genreId = genreId;
    this.genreName = genreName;

    this.navigate(this.page, { genero: genreId })
  }

  navigate(route: string, genre: Object) {
    this.router.navigate(['/discover/' + route], { queryParams: genre });
  }

}
