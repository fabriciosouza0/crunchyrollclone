import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { delay, filter, first, interval, map, Observable, tap, timeInterval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {
  private readonly baseApiUrl = environment.baseApiUrl;
  private readonly apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  private request<T>(endPoint: string, params: any): Observable<T> {
    let url = this.baseApiUrl + endPoint;
    let httpParams = new HttpParams();

    httpParams = httpParams.set('api_key', this.apiKey);
    httpParams = httpParams.set('language', 'pt-BR');

    Object.keys(params).forEach(key => {
      let value = params[key];
      httpParams = httpParams.set(key, value);
    })

    return this.http.get<T>(url, { params: httpParams });
  }

  details(type: string, id: number) {
    return this.request<any>(`${type}/${id}`, {}).pipe(delay(500));
  }

  videos(type: string, id: number) {
    return this.request<any>(`${type}/${id}/videos`, {}).pipe(delay(500), map(data => data.results[0]));
  }

  related(type: string, id: number) {
    return this.request<any>(`${type}/${id}/similar`, {}).pipe(delay(500), map(data => data.results));
  }

  imdbId(type: string, id: number) {
    return this.request<any>(`${type}/${id}/external_ids`, {}).pipe(delay(500), map(data => data.imdb_id));
  }

  popularMovies(): Observable<any> {
    return this.request<any>('movie/popular', { page: 1 }).pipe(delay(500), map(data => data.results));
  }

  topRatedMovies() {
    return this.request<any>('movie/top_rated', { page: 1 }).pipe(delay(500), map(data => data.results));
  }

  familyMovies() {
    return this.request<any>('discover/movie', { with_genres: 10751 }).pipe(delay(500), map(data => data.results));
  }

  popularSeries() {
    return this.request<any>('tv/popular', { page: 1 }).pipe(delay(500), map(data => data.results));
  }

  topRatedSeries() {
    return this.request<any>('tv/top_rated', { page: 1 }).pipe(delay(500), map(data => data.results));
  }
}
