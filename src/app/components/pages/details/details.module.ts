import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { CarouselModule } from '../../carousel/carousel.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { RouterModule } from '@angular/router';

import { DetailsRoutingModule } from './details.routing.module';
import { TmdbApiService } from 'app/services/tmdbApi.service';
import { TvComponent } from './tv/tv.component';
import { DetailsComponent } from './details.component';
import { DetailsTrailerComponent } from './details-trailer/details-trailer.component';
import { DetailsGeneralComponent } from './details-general/details-general.component';

@NgModule({
  declarations: [
    DetailsComponent,
    DetailsGeneralComponent,
    DetailsTrailerComponent,
    TvComponent
  ],
  providers: [TmdbApiService],
  imports: [
    CommonModule,
    MatIconModule,
    CarouselModule,
    NgbDropdownModule,
    LazyLoadImageModule,
    RouterModule,
    DetailsRoutingModule
  ]
})
export class DetailsModule { }
