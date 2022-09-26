import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TmdbApiService } from 'app/services/tmdbApi.service';
import { DetailsComponent } from './details.component';

const detailsRoutes: Routes = [
    { path: '', title: 'DatMovie...', component: DetailsComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(detailsRoutes)
    ],
    exports: [RouterModule],
    providers: [TmdbApiService],
})
export class DetailsRoutingModule { }
