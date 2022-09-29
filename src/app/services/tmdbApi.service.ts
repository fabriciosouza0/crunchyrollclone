import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { delay, map, Observable } from 'rxjs';

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

  details(type: string, id: number): Observable<any> {
    return this.request<any>(`${type}/${id}`, {})
      .pipe(delay(500));
  }

  videos(type: string, id: number): Observable<any> {
    return this.request<any>(`${type}/${id}/videos`, {})
      .pipe(
        delay(500),
        map(data => data.results[0])
      );
  }

  related(type: string, id: number): Observable<any> {
    return this.request<any>(`${type}/${id}/similar`, {})
      .pipe(
        delay(500),
        map(data => {
          data.results = data.results.filter((el: any) => el.id != id);
          return data.results;
        })
      );
  }

  imdbId(type: string, id: number): Observable<any> {
    return this.request<any>(`${type}/${id}/external_ids`, {})
      .pipe(
        delay(500),
        map(data => data.imdb_id)
      );
  }

  highligths() {
    const endPoints = [
      'movie/top_rated',
      'tv/top_rated'
    ]
    const index = Math.floor(Math.random() * 2);
    const rEndPoint = endPoints[index];

    return this.request<any>(rEndPoint, { page: 1 })
      .pipe(
        delay(500),
        map(data => {
          data.results = data.results.sort(() => Math.random() - 0.5);
          let highligths: Array<any> = [];
          for (let i = 0; i < 4; i++) highligths.push(data.results[i]);

          data.results = highligths;
          return data.results;
        })
      );
  }

  popularMovies(): Observable<any> {
    return this.request<any>('movie/popular', { page: 1 })
      .pipe(
        delay(500),
        map(data => data.results)
      );
  }

  topRatedMovies(): Observable<any> {
    return this.request<any>('movie/top_rated', { page: 1 })
      .pipe(
        delay(500),
        map(data => data.results)
      );
  }

  familyMovies(): Observable<any> {
    return this.request<any>('discover/movie', { with_genres: 10751 })
      .pipe(
        delay(500),
        map(data => data.results)
      );
  }

  popularSeries(): Observable<any> {
    return this.request<any>('tv/popular', { page: 1 })
      .pipe(
        delay(500),
        map(data => data.results)
      );
  }

  topRatedSeries(): Observable<any> {
    return this.request<any>('tv/top_rated', { page: 1 })
      .pipe(
        delay(500),
        map(data => data.results)
      );
  }

  seasons(id: number, seasonNumber: number) {
    return this.request<any>(`tv/${id}/season/${seasonNumber}`, {})
      .pipe(
        delay(500)
      );
  }

  search(query: string, page: number) {
    return this.request<any>('search/multi', { query: query, page: page })
      .pipe(
        map(data => {
          const totalResults = data.results.length;
          if (totalResults === 0) return 'notfound';
          data.results = data.results.filter((el: any) => el.media_type !== 'person');

          return data;
        })
      );
  }
}
