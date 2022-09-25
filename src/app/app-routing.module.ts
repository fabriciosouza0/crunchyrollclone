import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LimboComponent } from './components/limbo/limbo.component';
import { HomeComponent } from './components/pages/home/home.component';

const appRoutes: Routes = [
    { path: '', title: 'DatMovie - Home', component: HomeComponent },
    { path: 'detalhes/:type/:id', loadChildren: () => import('./components/pages/details/details.module').then(m => m.DetailsModule) },
    { path: 'discover', loadChildren: () => import('./components/pages/discover/discover.module').then(m => m.DiscoverModule) },
    { path: '**', title: 'DatMovie - Limbo', component: LimboComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule],
    providers: [],
})
export class AppRoutingModule { }
