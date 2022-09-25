import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'app/services/tmdbApi.service';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'details-trailer',
  templateUrl: './details-trailer.component.html',
  styleUrls: ['./details-trailer.component.css']
})
export class DetailsTrailerComponent implements OnInit {
  mediaType!: string;
  mediaId!: number;
  trailer?: Observable<any>;

  imdbId$!: Observable<any>;
  baseStreamUrl: string = environment.baseStreamUrl;

  mediaVideoUrl?: SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private tmdbApiService: TmdbApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.mediaType = params['type'];
      this.mediaId = params['id'];

      const type = this.mediaType == 'movie' ? 'filme' : 'serie';
      this.baseStreamUrl = environment.baseStreamUrl + type;

      this.trailer = this.tmdbApiService.videos(this.mediaType, this.mediaId).pipe(map(video => {
        if (video) return video.key = this.transform(`https://www.youtube.com/embed/${video.key}`, 'resourceUrl')

        return 'notFound';
      }));

      this.imdbId$ = this.tmdbApiService.imdbId(this.mediaType, this.mediaId);
    });
  }

  transform(url: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(url);
      case 'script':
        return this.sanitizer.bypassSecurityTrustScript(url);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(url);
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    return this.sanitizer.bypassSecurityTrustHtml(url);
  }

}
