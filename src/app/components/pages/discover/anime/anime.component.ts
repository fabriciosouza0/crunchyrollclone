import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { TmdbApiService } from "app/services/tmdbApi.service";
import { filter, map, Observable, switchMap } from "rxjs";

@Component({
  selector: "app-anime",
  templateUrl: "anime.component.html",
  styleUrls: ["anime.component.css"],
})
export class AnimeComponent implements OnInit {
  anime$!: Observable<any>;
  genreId?: number;
  loadMoreConfig!: Object;

  constructor(
    private route: ActivatedRoute,
    private tmdbApiService: TmdbApiService
  ) {}

  ngOnInit(): void {
    this.setLoadMoreConfig();

    this.anime$ = this.route.queryParams.pipe(
      filter(
        (params: Params): any =>
          params["genero"] && params["genero"].trim() !== ""
      ),
      map((params: Params): any => params["genero"]),
      switchMap((genreId: any): Observable<any> => {
        this.genreId = genreId;
        this.setLoadMoreConfig();
        return this.tmdbApiService.discover("tv", {
          with_genres: `16, ${this.genreId}`,
        });
      })
    );
  }

  private setLoadMoreConfig(): void {
    this.loadMoreConfig = {
      method: "discover",
      type: "tv",
      params: {
        with_genres: `16,${this.genreId}`,
      },
    };
  }
}
