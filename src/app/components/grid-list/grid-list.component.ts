import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { delay, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.css']
})
export class GridListComponent implements OnInit {
  @Input() data$!: Observable<any>;
  baseImgUrl: string = environment.baseImgUrl;
  listSize!: Array<number>;
  listSub!: Subscription;

  constructor() { }

  ngOnInit(): void {
    if (!this.data$) return;

    this.listSub = this.data$
      .pipe(
        map(data => data = Array<number>(data.length))
      )
      .subscribe(listSize => this.listSize = listSize);

    this.data$ = this.data$.pipe(delay(500));
  }

  ngOnDestroy(): void {
    if (this.listSub instanceof Subscription) this.listSub.unsubscribe();
  }

}
