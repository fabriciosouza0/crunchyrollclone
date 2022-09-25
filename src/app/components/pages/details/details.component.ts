import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbApiService } from 'app/services/tmdbApi.service';
import { environment } from 'environments/environment';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  /* private imdbIdSub?: Subscription; */
  /* mediaVideoUrl?: SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl; */
  /* streamUrl!: string; */

  details!: Observable<any>;
  baseImgUrl: string = environment.baseImgUrl;
  baseStreamUrl: string = environment.baseStreamUrl;
  mediaType!: string;
  mediaId!: number;
  related!: Observable<any>;

  constructor(private sanitizer: DomSanitizer, private titleService: Title, private route: ActivatedRoute, private router: Router, private tmdbApiService: TmdbApiService) { }

  ngOnInit(): void {
    if (!this.route.snapshot.paramMap.has('id') || !this.route.snapshot.paramMap.has('type')) this.router.navigate(['**']);

    this.route.params.subscribe(params => {
      this.mediaType = params['type'];
      this.mediaId = params['id'];
      /* this.mediaVideoUrl = undefined; */

      this.loadDetails();
    });
  }

  private loadDetails(): void {
    /* this.details = this.tmdbApiService.details(this.mediaType, this.mediaId).subscribe(res => {
      const data = res;

      this.mediaData = data;

      const id = this.mediaData.id;
      const imdbId = this.mediaData?.imdb_id;

      if (this.mediaType == 'movie') {
        this.titleService.setTitle(`DatMovie - ${this.mediaData!.title}`);
        this.setStreamLink(this.mediaType, id, imdbId);
        return;
      }

      this.titleService.setTitle(`DatMovie - ${this.mediaData!.name}`);
      this.setStreamLink(this.mediaType, id, undefined);
    }, err => {
      console.error(err);
      this.router.navigate(['**']);
    }); */

    this.details = this.tmdbApiService.details(this.mediaType, this.mediaId);

    this.related = this.tmdbApiService.related(this.mediaType, this.mediaId);

    window.scroll({ top: 0, behavior: 'smooth' });
  }

  /* private setStreamLink(type: string, id: number, imdbId: number | undefined) {
    if (type == 'movie') {
      this.streamUrl = `${this.baseStreamUrl}filme/${imdbId}`;
      return;
    }

    this.setImdbId(id);
  } */

  /* private setImdbId(id: number): void {
    this.imdbIdSub = this.tmdbApiService.imdbId(id).subscribe(res => {
      const imdbId = res.imdb_id;

      this.streamUrl = `${this.baseStreamUrl}serie/${imdbId}`;
    });
  } */

  ngOnDestroy() {
    /* if (this.imdbIdSub) {
      this.imdbIdSub.unsubscribe();
    } */
  }
}
