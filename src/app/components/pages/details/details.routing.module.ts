import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details.component';

const detailsRoutes: Routes = [
    { path: '', title: 'DatMovie - Detalhes', component: DetailsComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(detailsRoutes)
    ],
    exports: [RouterModule],
    providers: [],
})
export class DetailsRoutingModule { }
