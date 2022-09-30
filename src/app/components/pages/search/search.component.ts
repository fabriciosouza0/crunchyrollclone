import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbApiService } from 'app/services/tmdbApi.service';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('arcResults', { static: false }) arcResults!: ElementRef;
  searchForm!: FormGroup;
  page: number = 1;
  query!: string;
  search$!: Observable<any>;
  searchResults$!: Observable<any>;
  baseImgUrl: string = environment.baseImgUrl;

  constructor(
    private tmdbApiService: TmdbApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    document.getElementById('search')?.focus();

    this.searchForm = new FormGroup(
      {
        search: new FormControl('', Validators.required)
      }
    );

    this.route.queryParams.subscribe(params => {
      this.query = params['query'] !== undefined ? params['query'] : false;
      this.page = params['page'] !== undefined ? params['page'] : 1;

      const searchInput = this.searchForm.get('search');

      if (this.query) {
        this.search(this.query, this.page);
        searchInput?.setValue(this.query);
        return;
      }

      // Caso esteja acessando a rota sem a queryParam 'query'
      if (!(this.search$ instanceof Observable)) {
        this.search$ = new Observable((subscriber) => {
          subscriber.next([]);
          subscriber.complete();
        })
      }
    })
  }

  submit() {
    if (this.searchForm.invalid) return;

    this.query = this.searchForm.value.search;
    this.router.navigate(['/search'], { queryParams: { query: this.query } });
  }

  search(query: string, page: number) {
    this.search$ = this.tmdbApiService.search(query, page);
    this.searchResults$ = this.tmdbApiService.search(query, page)
      .pipe(
        map(search => search = search.results)
      );
  }

  pageChange(query: string): void {
    this.router.navigate((['/search']), { queryParams: { query: query, page: this.page } });
  }
}
