import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TmdbApiService } from "app/services/tmdbApi.service";
import { map, Observable, Subscription, tap } from "rxjs";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.component.html",
  styleUrls: ["./discover.component.css"],
})
export class DiscoverComponent implements OnInit, OnDestroy {
  routerSub!: Subscription;
  genres$!: Observable<any>;
  genreId!: number;
  genreName: string = "Generos";
  displayPage: string = "Filmes";
  page!: string;

  constructor(private router: Router, private tmdbApiService: TmdbApiService) {}

  ngOnInit(): void {
    const url: string = this.router.url;

    switch (url) {
      case "/discover/series":
        this.tv();
        break;
      case "/discover/animes":
        this.animes();
        break;
      default:
        this.movies();
    }
  }

  movies(): void {
    this.moveTo("Filmes", "movie", false);
  }

  tv(): void {
    this.moveTo("Séries", "tv", false);
  }

  animes(): void {
    this.moveTo("Animes", "tv", true);
  }

  private moveTo(
    displayPage: string,
    genresFor: string,
    isAnime: boolean
  ): void {
    this.displayPage = displayPage;
    this.page = this.displayPage.toLowerCase().replace(/[é]/g, "e");
    this.genreName = "Generos";

    if (isAnime) {
      this.genres$ = this.tmdbApiService.genres("tv").pipe(
        map((genres: any): any => {
          genres = genres.filter((genre: any): boolean => genre.id != 16);
          this.genreId = genres[0]?.id;
          return genres;
        }),
        tap((): void => {
          this.navigate(this.page, { genero: this.genreId });
        })
      );

      return;
    }

    this.genres$ = this.tmdbApiService.genres(genresFor).pipe(
      tap((genres: any): void => {
        this.genreId = genres[0]?.id;
      }),
      tap((): void => {
        // Apenas após garantir que o gênero foi definido
        this.navigate(this.page, { genero: this.genreId });
      })
    );
  }

  changeGenre(event: any): void {
    const genreId: any = event.target.children[0].value;
    const genreName: any = event.target.children[1].value;
    this.genreId = genreId;
    this.genreName = genreName;

    this.navigate(this.page, { genero: genreId });
  }

  navigate(route: string, genre: Object) {
    this.router.navigate(["/discover/" + route], { queryParams: genre });
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
