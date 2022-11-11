import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://myflixdb.onrender.com/';

@Injectable({ providedIn: 'root' })

export class FetchApiDataService {
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

  /**
   * function that calls the myFlix API and returns all movie objects
   * @function getAllMovies
   * @returns {array of movie objects}
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * function that asks for a username and returns the user object 
   * relating to that username
   * @function getUser
   * @param {string} username 
   * @returns {object} user object
   */
  getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * takes object of user data and returns confirmation that user was registered
   * @function userRegister
   * @param {object} userData 
   * @returns {string} string response
   */
  userRegister(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + 'users', userData,
      { responseType: 'text' }
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * takes login data and returns confirmation or login error
   * @function loginUser
   * @param {object} loginData 
   * @returns {string} string confirmation of login
   */
  loginUser(loginData: any): Observable<any> {
    return this.http.post(apiUrl + 'login', loginData).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * takes user data object and returns the updated user data
   * @function updateUser
   * @param {object} userData 
   * @returns {object} updated user info
   */
  updateUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${apiUrl}users/${userData.Username}`, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * deletes given username and corresponding user data from database
   * @function deleteUser
   * @param {string} username 
   * @returns {string} confirmation of user deletion
   */
  deleteUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * gets favorites array of given username
   * @function getFavorites
   * @param {string} username 
   * @returns {array} array of movie objects
   */
  getFavorites(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}users/${username}/FavoriteMovies`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * takes username and movie id and returns confirmation movie has been added
   * to the username's favorites array
   * @function addFavorite
   * @param {string} username 
   * @param {string} movie 
   * @returns {object} returns object which confirms movie has been added
   */
  addFavorite(username: any, movie: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${apiUrl}users/${username}/movies/${movie}`, movie, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * takes username and movie id and returns confirmation movie has been removed
   * from the username's favorites array
   * @function removeFavorite
   * @param {string} username 
   * @param {string} movie 
   * @returns {object} returns object which confirms movie has been removed
   */
  removeFavorite(username: any, movie: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}users/${username}/movies/${movie}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

}
