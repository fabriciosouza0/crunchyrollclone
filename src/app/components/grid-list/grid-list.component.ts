import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  data: any;
  page: number = 1;
  loadMoreSub?: Subscription;
  baseImgUrl: string = environment.baseImgUrl;
  listSize!: Array<number>;
  listSub!: Subscription;
  totalPages!: number;

  constructor(private tmdbApiService: TmdbApiService) { }

  ngOnInit(): void {
    if (!this.data$) return;

    this.listSub = this.data$
      .pipe(
        map(data => {
          this.data = data;
          this.totalPages = data.total_pages;
          return data = Array<number>(data.results.length);
        })
      )
      .subscribe(listSize => {
        this.listSize = listSize;
      });

    this.data$ = this.data$.pipe(delay(500));
  }

  loadMore(event: any): void {
    this.page += 1;
    this.loadMoreConfig.params.page = this.page;

    if (this.page > this.totalPages) {
      event.target.remove();
      return;
    }

    if ((this.loadMoreConfig.method === 'discover') && (this.loadMoreConfig?.type && this.loadMoreConfig?.params)) {
      this.loadMoreSub = this.tmdbApiService.discover(this.loadMoreConfig.type, this.loadMoreConfig?.params)
        .subscribe(data => {
          data.results.forEach((element: any) => {
            this.data.results.push(element);
          });
          this.loadMoreSub?.unsubscribe();
        });

      return;
    }

    if (this.loadMoreConfig?.query) {
      this.loadMoreSub = this.tmdbApiService.search(this.loadMoreConfig.query, this.page).subscribe(data => {
        data.results.forEach((element: any) => {
          this.data.results.push(element);
        });
        this.loadMoreSub?.unsubscribe();
      });
    }
  }

  ngOnDestroy(): void {
    this.listSub?.unsubscribe();
  }
}