import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://jakesmoviedb.herokuapp.com/';
const token = localStorage.getItem('token');
const headers = { headers: { Authorization: `Bearer ${token}` } };

@Injectable({ providedIn: 'root' })

export class UserRegistrationService {
  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies', headers)
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  getUser(username: any): Observable<any> {
    return this.http.get(`${apiUrl}users/${username}`, headers)
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  userRegister(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + 'users', userData,
      { responseType: 'text' }
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  loginUser(loginData: any): Observable<any> {
    return this.http.post(apiUrl + 'login', loginData).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  updateUser(userData: any): Observable<any> {
    return this.http.put(`${apiUrl}users/${userData.Username}`, userData, headers)
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  deleteUser(username: any): Observable<any> {
    return this.http.delete(`${apiUrl}users/${username}`, headers)
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  getFavorites(username: any): Observable<any> {
    return this.http.get(`${apiUrl}users/${username}/FavoriteMovies`, headers)
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  addFavorite(username: any, movie: any): Observable<any> {
    return this.http.post(`${apiUrl}users/${username}/movies/${movie}`, movie, headers)
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  removeFavorite(username: any, movie: any): Observable<any> {
    return this.http.delete(`${apiUrl}users/${username}/movies/${movie}`, headers)
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

}
