import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { TmdbApiService } from "app/services/tmdbApi.service";
import { filter, map, Observable, Subscription, switchMap, tap } from "rxjs";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"],
})
export class MovieComponent implements OnInit {
  movies$!: Observable<any>;
  genreId?: number;
  loadMoreConfig!: Object;
  routeSub$!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private tmdbApiService: TmdbApiService
  ) {}

  ngOnInit(): void {
    this.setLoadMoreConfig();

    this.movies$ = this.route.queryParams.pipe(
      filter(
        (params: Params): any =>
          params["genero"] && params["genero"].trim() !== ""
      ),
      map((params: Params): any => params["genero"]),
      switchMap((genreId: any): Observable<any> => {
        this.genreId = genreId;
        this.setLoadMoreConfig();
        return this.tmdbApiService.discover("movie", {
          with_genres: this.genreId,
        });
      })
    );
  }

  private setLoadMoreConfig(): void {
    this.loadMoreConfig = {
      method: "discover",
      type: "movie",
      params: {
        with_genres: this.genreId,
      },
    };
  }
}
