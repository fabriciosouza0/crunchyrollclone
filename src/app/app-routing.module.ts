import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LimboComponent } from "./components/limbo/limbo.component";
import { HomeComponent } from "./components/pages/home/home.component";
import { SearchComponent } from "./components/pages/search/search.component";

const appRoutes: Routes = [
  { path: "", title: "DatMovie - Home", component: HomeComponent },
  { path: "search", title: "DatMovie - Search", component: SearchComponent },
  {
    path: "discover",
    loadChildren: () =>
      import("./components/pages/discover/discover.module").then(
        (m) => m.DiscoverModule
      ),
  },
  {
    path: "detalhes/:type/:id",
    loadChildren: () =>
      import("./components/pages/details/details.module").then(
        (m) => m.DetailsModule
      ),
  },
  { path: "**", title: "DatMovie - Limbo", component: LimboComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: "top" }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
