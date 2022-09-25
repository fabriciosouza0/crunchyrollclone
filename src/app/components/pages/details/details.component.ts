import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  private titleSub!: Subscription;

  details$!: Observable<any>;
  related$!: Observable<any>;

  mediaType!: string;
  mediaId!: number;
  baseImgUrl: string = environment.baseImgUrl;

  constructor(private titleService: Title, private route: ActivatedRoute, private router: Router, private tmdbApiService: TmdbApiService) { }

  ngOnInit(): void {
    if (!this.route.snapshot.paramMap.has('id') || !this.route.snapshot.paramMap.has('type')) this.router.navigate(['**']);
    this.titleService.setTitle('DatMovie...');

    this.route.params.subscribe(params => {
      this.mediaType = params['type'];
      this.mediaId = params['id'];

      this.loadDetails();

      this.titleSub = this.details$.subscribe(res => {
        const title = res?.title ? res.title : res.name;
        this.titleService.setTitle('DatMovie - ' + title);
      });

    });
  }

  private loadDetails(): void {
    this.details$ = this.tmdbApiService.details(this.mediaType, this.mediaId);

    this.related$ = this.tmdbApiService.related(this.mediaType, this.mediaId);

    window.scroll({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.titleSub.unsubscribe();
  }

}
