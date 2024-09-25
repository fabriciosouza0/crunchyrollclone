import { Component, OnInit } from "@angular/core";
import { TmdbApiService } from "app/services/tmdbApi.service";
import { ToastService } from "app/services/toast.service";
import { environment } from "environments/environment";
import { delay, map, Observable, Subscription } from "rxjs";

@Component({
  selector: "app-destaque",
  templateUrl: "./destaque.component.html",
  styleUrls: ["./destaque.component.css"],
})
export class DestaqueComponent implements OnInit {
  private mediaTypes: Array<string> = ["movie", "tv"];
  private genres!: Subscription;
  private genre!: number;
  baseImgUrl: string = environment.baseImgUrl;
  mediaType!: string;
  highlight$!: Observable<any>;

  constructor(
    private tmdbApiService: TmdbApiService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const randIndex = this.rand(0, 2);
    this.mediaType = this.mediaTypes[randIndex];

    this.genres = this.tmdbApiService
      .genres(this.mediaType)
      .subscribe((genre) => {
        const index = this.rand(0, genre.length);
        this.setGenre(genre[index].id);

        this.highlight$ = this.tmdbApiService
          .discover(this.mediaType, { with_genres: this.genre })
          .pipe(
            map((data) => {
              const index = this.rand(1, data.results.length);
              return data.results[index];
            })
          );
      });
  }

  copyLink(link: string): void {
    navigator.clipboard.writeText(window.location.host + link);
    this.toastService.show("Link copiado para área de transferência!", {
      classname: "main-color text-light",
      delay: 2500,
    });
  }

  rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  setGenre(genre: number): void {
    this.genre = genre;
  }

  getGenre(): number {
    return this.genre;
  }

  ngOnDestroy(): void {
    this.genres.unsubscribe();
  }
}
