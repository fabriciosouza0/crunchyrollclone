import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TmdbApiService } from 'app/services/tmdbApi.service';
import { environment } from 'environments/environment';
import { delay, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.css']
})
export class GridListComponent implements OnInit {
  @ViewChild('arcitems') arcItems!: ElementRef;
  @Input() data$!: Observable<any>;
  @Input() loadMoreConfig!: any;
  page: number = 1;
  loadMoreSub?: Subscription;
  baseImgUrl: string = environment.baseImgUrl;
  listSize!: Array<number>;
  listSub!: Subscription;
  totalPages!: number;

  constructor(private router: Router, private renderer: Renderer2, private tmdbApiService: TmdbApiService) { }

  ngOnInit(): void {
    if (!this.data$) return;

    this.listSub = this.data$
      .pipe(
        map(data => {
          this.totalPages = data.total_pages;
          return data = Array<number>(data.results.length);
        })
      )
      .subscribe(listSize => {
        this.listSize = listSize;
      });

    this.data$ = this.data$.pipe(delay(500));
  }

  ngOnDestroy(): void {
    this.listSub?.unsubscribe();
  }

  loadMore(event: any): void {
    this.page += 1;
    this.loadMoreConfig.params.page = this.page;
    // console.log(this.page, this.totalPages)

    if (this.page > this.totalPages) {
      event.target.remove();

      return;
    }

    if ((this.loadMoreConfig.method === 'discover') && (this.loadMoreConfig?.type && this.loadMoreConfig?.params)) {
      this.loadMoreSub = this.tmdbApiService.discover(this.loadMoreConfig.type, this.loadMoreConfig?.params).subscribe(data => {
        data.results.forEach((element: any) => {
          this.render(this.arcItems, element);
        });
        this.loadMoreSub?.unsubscribe();
      });

      return;
    }

    if (this.loadMoreConfig?.query) {

      this.loadMoreSub = this.tmdbApiService.search(this.loadMoreConfig.query, this.page).subscribe(data => {
        data.results.forEach((element: any) => {
          this.render(this.arcItems, element);
        });
        this.loadMoreSub?.unsubscribe();
      });
    }
  }

  render(eleRef: ElementRef, data: any): void {
    const detailsLink = this.renderer.createElement('a');
    detailsLink.addEventListener('click', (event: any) => {
      event.stopPropagation();
      event.preventDefault();

      const baseUri = event.path[3]?.baseURI;

      if (event.path[3]?.href) {
        const route = event.path[3].href.replace(baseUri, '');

        this.router.navigate([`/${route}`]);
      }
    });

    const arc = this.renderer.createElement('div');
    const arcCard = this.renderer.createElement('div');
    const cardPoster = this.renderer.createElement('div');
    const posterImage = this.renderer.createElement('img');
    const cardTitle = this.renderer.createElement('div');
    const titleText = this.renderer.createText(data?.title ? data.title : data.name);
    const cardRate = this.renderer.createElement('div');
    const rateIcon = this.renderer.createElement('img');
    const rateDiv = this.renderer.createElement('div');
    const rateSpan = this.renderer.createElement('span');
    const rateText = this.renderer.createText(data.vote_average);

    this.renderer.addClass(arcCard, 'arc-card-inline');
    this.renderer.addClass(cardPoster, 'card-inline-poster');
    this.renderer.addClass(cardRate, 'card-inline-rate');
    this.renderer.addClass(rateIcon, 'rate-icon');
    this.renderer.addClass(cardTitle, 'card-inline-title');

    this.renderer.setAttribute(detailsLink, 'href', `/detalhes/${data?.title ? 'movie' : 'tv'}/${data.id}`);
    this.renderer.setAttribute(posterImage, 'src', data?.poster_path ? `${this.baseImgUrl}w500${data?.poster_path}` : 'assets/images/img-not-found.png');
    this.renderer.setAttribute(rateIcon, 'src', 'assets/images/star.svg');

    this.renderer.appendChild(cardPoster, posterImage);
    this.renderer.appendChild(cardTitle, titleText);
    this.renderer.appendChild(rateSpan, rateText);
    this.renderer.appendChild(rateDiv, rateSpan)
    this.renderer.appendChild(cardRate, rateIcon);
    this.renderer.appendChild(cardRate, rateDiv);

    this.renderer.appendChild(arcCard, cardPoster);
    this.renderer.appendChild(arcCard, cardTitle);
    this.renderer.appendChild(arcCard, cardRate);
    this.renderer.appendChild(detailsLink, arcCard);
    this.renderer.appendChild(arc, detailsLink);

    this.renderer.appendChild(eleRef.nativeElement, arc);
  }

}
