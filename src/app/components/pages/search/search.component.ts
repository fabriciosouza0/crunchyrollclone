import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { TmdbApiService } from "app/services/tmdbApi.service";
import { environment } from "environments/environment";
import { map, Observable, Subscriber } from "rxjs";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  @ViewChild("arcResults", { static: false }) arcResults!: ElementRef;
  searchForm!: FormGroup;
  page: number = 1;
  query!: string;
  search$!: Observable<any>;
  searchResults$!: Observable<any>;
  baseImgUrl: string = environment.baseImgUrl;
  loadMoreConfig!: Object;

  constructor(
    private tmdbApiService: TmdbApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.getElementById("search")?.focus();

    this.searchForm = new FormGroup({
      search: new FormControl("", Validators.required),
    });

    this.route.queryParams.subscribe((params: Params): void => {
      this.query = params["query"] !== undefined ? params["query"] : false;
      this.page = params["page"] !== undefined ? params["page"] : 1;

      const searchInput: AbstractControl<any, any> | null =
        this.searchForm.get("search");
      if (this.query) {
        this.search(this.query, this.page);
        searchInput?.setValue(this.query);
        return;
      }

      // Caso esteja acessando a rota sem a queryParam 'query'
      if (!(this.search$ instanceof Observable)) {
        this.search$ = new Observable((subscriber: Subscriber<any>): void => {
          subscriber.next([]);
          subscriber.complete();
        });
      }
    });
  }

  submit(): void {
    if (this.searchForm.invalid) return;

    this.query = this.searchForm.value.search;
    this.router.navigate(["/search"], { queryParams: { query: this.query } });
  }

  search(query: string, page: number): void {
    this.search$ = this.tmdbApiService.search(query, page);
    this.searchResults$ = this.tmdbApiService.search(query, page);
    this.setLoadMoreConfig();
  }

  private setLoadMoreConfig(): void {
    this.loadMoreConfig = {
      method: "search",
      query: this.query,
      params: {},
    };
  }
}
