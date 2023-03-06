import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Movie } from 'src/app/entity/home/content-page';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}
  host = environment.API_URL;
  httpError(error) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }

  getMovieService = (): Observable<Array<Movie>> => {
    return this.httpClient.get<Movie>(this.host + 'movie/get-movies').pipe(
      map((response: any) => {
        const result = response ? response.data : {};
        const slice = Object.keys(result)
          .map(function (key) {
            return result[key];
          })
          .slice(-1);
        return slice;
      }),
      catchError(this.httpError)
    );
  };
}
