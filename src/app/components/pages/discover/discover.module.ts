import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie/movie.component';
import { TvComponent } from './tv/tv.component';
import { AnimeComponent } from './anime/anime.component';
import { RouterModule } from '@angular/router';
import { DiscoverComponent } from './discover.component';
import { DiscoverRoutingModule } from './discover-routing.module';
import { TmdbApiService } from 'app/services/tmdbApi.service';



@NgModule({
  declarations: [
    DiscoverComponent,
    MovieComponent,
    TvComponent,
    AnimeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DiscoverRoutingModule
  ],
  providers: [TmdbApiService],
})
export class DiscoverModule { }
