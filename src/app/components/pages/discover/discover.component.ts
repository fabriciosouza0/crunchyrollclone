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
  diplayPage!: string;
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
    this.genres$ = this.tmdbApiService.genres('movie');
    this.diplayPage = 'Filmes';
    this.page = this.diplayPage.toLowerCase();
    this.genreId = undefined;
    this.genreName = 'Generos';

    this.navigate(this.page, { genero: this.genreId });
  }

  tv() {
    this.diplayPage = 'Series';
    this.page = this.diplayPage.toLowerCase();
    this.genres$ = this.tmdbApiService.genres('tv');
    this.genreId = undefined;
    this.genreName = 'Generos';
    this.navigate(this.page, { genero: this.genreId });
  }

  animes() {
    this.diplayPage = 'Animes';
    this.page = this.diplayPage.toLowerCase();
    this.genres$ = this.tmdbApiService.genres('tv')
      .pipe(
        map(genres => {
          genres = genres.filter((genre: any) => genre.id != 16);

          return genres;
        })
      );
    this.genreId = undefined;
    this.genreName = 'Generos';
    this.navigate(this.page, { genero: this.genreId });
  }

  navigate(route: string, genre: Object) {
    this.router.navigate(['/discover/' + route], { queryParams: genre });
  }

  setGenre(event: any) {
    const genreId = event.target.children[0].value;
    const genreName = event.target.children[1].value;
    this.genreId = genreId;
    this.genreName = genreName;

    this.navigate(this.page, { genero: genreId })
  }

}
