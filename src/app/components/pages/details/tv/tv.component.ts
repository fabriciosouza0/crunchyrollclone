import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'app/services/tmdbApi.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'details-tv-temps',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {
  private imdbIdSub!: Subscription;

  @Input() mediaData!: any;
  @Input() mediaVideoUrl?: string;
  imdbId!: number;

  constructor(private tmdbApiService: TmdbApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

}
