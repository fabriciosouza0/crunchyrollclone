import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbApiService } from 'app/services/tmdbApi.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  details$!: Observable<any>;
  related$!: Observable<any>;
  imdbId$!: Observable<any>;
  mediaType!: string;
  mediaId!: number;
  baseImgUrl: string = environment.baseImgUrl;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private tmdbApiService: TmdbApiService
  ) { }

  ngOnInit(): void {
    if (!this.route.snapshot.paramMap.has('id') || !this.route.snapshot.paramMap.has('type')) this.router.navigate(['**']);

    this.route.params.subscribe(params => {
      this.mediaType = params['type'];
      this.mediaId = params['id'];

      this.loadDetails();
    });
  }

  private loadDetails(): void {
    this.details$ = this.tmdbApiService.details(this.mediaType, this.mediaId);

    this.related$ = this.tmdbApiService.related(this.mediaType, this.mediaId);

    window.scroll({ top: 0, behavior: 'smooth' });
  }

  setImdbId(imdbId$: Observable<any>) {
    this.imdbId$ = imdbId$;
  }

  setTitle(title: string): void {
    this.titleService.setTitle(`DatMovie - ${title}`);
  }
}
