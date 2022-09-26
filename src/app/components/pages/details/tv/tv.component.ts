import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'app/services/tmdbApi.service';
import { environment } from 'environments/environment';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'details-tv-temps',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit, AfterViewInit {
  @Input() mediaVideoUrl?: string;
  @Input() imdbId$!: Observable<any>;
  details$!: Observable<any>;
  detailsSub!: Subscription;
  episodes$!: Observable<any>;
  seasonNumber!: number;
  baseImgUrl: string = `${environment.baseImgUrl}original/`;

  constructor(private route: ActivatedRoute, private tmdbApiService: TmdbApiService) { }

  ngAfterViewInit(): void {
    console.log(document.querySelector('#menuTrigger'));
  }

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
      this.seasonNumber = Number(tv.seasons[0].season_number);
      this.episodes$ = this.tmdbApiService.seasons(tvId, this.seasonNumber).pipe(map(season => season.episodes));
    });
  }

  changeSeason(event: any, tvId: number) {
    this.seasonNumber = event.target.children[0].value;
    this.episodes$ = this.tmdbApiService.seasons(tvId, this.seasonNumber).pipe(map(season => season.episodes));
  }

  ngOnDestroy(): void {
    this.detailsSub.unsubscribe();
  }
}
