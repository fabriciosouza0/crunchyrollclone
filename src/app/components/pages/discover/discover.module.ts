import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { MovieComponent } from './movie/movie.component';
import { TvComponent } from './tv/tv.component';
import { AnimeComponent } from './anime/anime.component';
import { DiscoverComponent } from './discover.component';
import { DiscoverRoutingModule } from './discover-routing.module';
import { TmdbApiService } from 'app/services/tmdbApi.service';
import { GridListModule } from 'app/components/grid-list/grid-list.module';

@NgModule({
  declarations: [
    DiscoverComponent,
    MovieComponent,
    TvComponent,
    AnimeComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    RouterModule,
    GridListModule,
    DiscoverRoutingModule
  ],
  providers: [TmdbApiService],
})
export class DiscoverModule { }
