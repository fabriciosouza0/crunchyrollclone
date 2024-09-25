import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TmdbApiService {
  private readonly baseApiUrl: string = environment.baseApiUrl;
  private readonly apiKey: string = environment.apiKey;

  constructor(private http: HttpClient) {}

  private request<T>(endPoint: string, params: any): Observable<T> {
    let url: string = this.baseApiUrl + endPoint;
    let httpParams = new HttpParams();

    httpParams = httpParams.set("api_key", this.apiKey);
    httpParams = httpParams.set("language", "pt-BR");

    Object.keys(params).forEach((key: string): void => {
      let value: any = params[key];
      httpParams = httpParams.set(key, value);
    });

    return this.http.get<T>(url, { params: httpParams });
  }

  details(type: string, id: number): Observable<any> {
    return this.request<any>(`${type}/${id}`, {});
  }

  videos(type: string, id: number): Observable<any> {
    return this.request<any>(`${type}/${id}/videos`, {}).pipe(
      map((data: any): any => data.results[0])
    );
  }

  related(type: string, id: number): Observable<any> {
    return this.request<any>(`${type}/${id}/similar`, {}).pipe(
      map((data: any): any => {
        data.results = data.results.filter((el: any): boolean => el.id != id);
        return data.results;
      })
    );
  }

  imdbId(type: string, id: number): Observable<any> {
    return this.request<any>(`${type}/${id}/external_ids`, {}).pipe(
      map((data: any): any => data.imdb_id)
    );
  }

  highligths(): Observable<any> {
    const endPoints: string[] = ["movie/top_rated", "tv/top_rated"];
    const index: number = Math.floor(Math.random() * 2);
    const rEndPoint: string = endPoints[index];

    return this.request<any>(rEndPoint, { page: 1 }).pipe(
      map((data: any): any => {
        data.results = data.results.sort((): number => Math.random() - 0.5);
        let highligths: Array<any> = [];

        for (let i: number = 0; i < 4; i++) highligths.push(data.results[i]);

        data.results = highligths;
        return data.results;
      })
    );
  }

  popularMovies(): Observable<any> {
    return this.request<any>("movie/popular", { page: 1 }).pipe(
      map((data: any): any => data.results)
    );
  }

  topRatedMovies(): Observable<any> {
    return this.request<any>("movie/top_rated", { page: 1 }).pipe(
      map((data: any): any => data.results)
    );
  }

  popularSeries(): Observable<any> {
    return this.request<any>("tv/popular", { page: 1 }).pipe(
      map((data: any): any => data.results)
    );
  }

  topRatedSeries(): Observable<any> {
    return this.request<any>("tv/top_rated", { page: 1 }).pipe(
      map((data: any): any => data.results)
    );
  }

  discover(type: string, params: Object): Observable<any> {
    return this.request<any>(`discover/${type}`, params);
  }

  seasons(id: number, seasonNumber: number): Observable<any> {
    return this.request<any>(`tv/${id}/season/${seasonNumber}`, {});
  }

  genres(type: string): Observable<any> {
    return this.request<any>(`genre/${type}/list`, {}).pipe(
      map((data: any): any => data.genres)
    );
  }

  search(query: string, page: number): Observable<any> {
    return this.request<any>("search/multi", { query: query, page: page }).pipe(
      map((data: any): any => {
        const totalResults: any = data.results.length;
        if (totalResults === 0) return "notfound";
        data.results = data.results.filter(
          (el: any): boolean => el.media_type !== "person"
        );

        return data;
      })
    );
  }
}
