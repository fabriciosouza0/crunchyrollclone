import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { TmdbApiService } from "app/services/tmdbApi.service";
import { filter, map, Observable, switchMap, tap } from "rxjs";

@Component({
  selector: "app-tv",
  templateUrl: "./tv.component.html",
  styleUrls: ["./tv.component.css"],
})
export class TvComponent implements OnInit {
  tv$!: Observable<any>;
  genreId?: number;
  loadMoreConfig!: Object;

  constructor(
    private route: ActivatedRoute,
    private tmdbApiService: TmdbApiService
  ) {}

  ngOnInit(): void {
    this.setLoadMoreConfig();

    this.tv$ = this.route.queryParams.pipe(
      filter(
        (params: Params): any =>
          params["genero"] && params["genero"].trim() !== ""
      ),
      map((params: Params): any => params["genero"]),
      switchMap((genreId: any): Observable<any> => {
        this.genreId = genreId;
        this.setLoadMoreConfig();
        return this.tmdbApiService.discover("tv", {
          with_genres: this.genreId,
        });
      })
    );
  }

  private setLoadMoreConfig(): void {
    this.loadMoreConfig = {
      method: "discover",
      type: "tv",
      params: {
        with_genres: this.genreId,
        without_genres: 16,
      },
    };
  }
}
