import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AnimeComponent } from "./anime/anime.component";
import { DiscoverComponent } from "./discover.component";
import { MovieComponent } from "./movie/movie.component";
import { TvComponent } from "./tv/tv.component";

const discoverRoutes: Routes = [
  {
    path: "",
    title: "DatMovie - Discover",
    component: DiscoverComponent,
    children: [
      {
        path: "filmes",
        title: "DatMovie - Discover Filmes",
        component: MovieComponent,
      },
      {
        path: "series",
        title: "DatMovie - Discover Séries",
        component: TvComponent,
      },
      {
        path: "animes",
        title: "DatMovie - Discover Animes",
        component: AnimeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(discoverRoutes)],
  exports: [RouterModule],
})
export class DiscoverRoutingModule {}
