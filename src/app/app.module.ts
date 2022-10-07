import { NgModule } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { DestaqueComponent } from './components/destaque/destaque.component';
import { TmdbApiService } from './services/tmdbApi.service';
import { SearchComponent } from './components/pages/search/search.component';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from './components/carousel/carousel.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LimboComponent } from './components/limbo/limbo.component';
import { GridListModule } from './components/grid-list/grid-list.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NavComponent,
    DestaqueComponent,
    SearchComponent,
    LimboComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    LazyLoadImageModule,
    CarouselModule,
    GridListModule,
    AppRoutingModule
  ],
  providers: [TmdbApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
