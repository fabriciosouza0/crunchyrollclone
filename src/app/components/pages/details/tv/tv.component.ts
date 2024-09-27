import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'app/services/tmdbApi.service';
import { environment } from 'environments/environment';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'details-tv-temps',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {
  @Input() mediaVideoUrl?: string;
  @Input() imdbId$!: Observable<any>;
  details$!: Observable<any>;
  detailsSub!: Subscription;
  tvName!: string;
  seasonName!: string;
  episodes$!: Observable<any>;
  seasonNumber!: number;
  episodeCount!: Array<any>;
  baseStreamUrl: string = environment.baseStreamUrl;
  baseImgUrl: string = `${environment.baseImgUrl}original/`;

  constructor(
    private route: ActivatedRoute,
    private tmdbApiService: TmdbApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const type = params['type'];
      const tvId = params['id'];

      this.loadSeasons(type, tvId);
    })
  }

  loadSeasons(type: string, tvId: number) {
    this.details$ = this.tmdbApiService.details(type, tvId);

    this.detailsSub = this.tmdbApiService.details(type, tvId).subscribe(tv => {
      this.fillVariables(tv, tvId);
    });
  }

  fillVariables(tv: any, tvId: number) {
    this.tvName = tv.name;
    this.seasonName = tv.seasons[0].name;
    this.seasonNumber = Number(tv.seasons[0].season_number);
    this.episodeCount = Array(tv.seasons[0].episode_count);
    this.episodes$ = this.tmdbApiService.seasons(tvId, this.seasonNumber).pipe(map(season => season.episodes));
  }

  changeSeason(event: any, tvId: number, tvName: string) {
    this.tvName = tvName;
    this.seasonNumber = event.target.children[0].value;
    this.seasonName = event.target.children[1].value;
    this.episodeCount = Array(Number(event.target.children[2].value));
    this.episodes$ = this.tmdbApiService.seasons(tvId, this.seasonNumber).pipe(map(season => season.episodes));
  }

  ngOnDestroy(): void {
    this.detailsSub.unsubscribe();
  }
}
