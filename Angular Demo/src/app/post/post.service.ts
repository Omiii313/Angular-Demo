// Extrenal imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// Internal imports
import { Post } from './post';
import { environment } from '../../environments/environment';
import { APINAME } from './post.constants';

@Injectable()
export class PostService {
  // to set content-type
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // http client used to send api req to server using http protocol.
  constructor(private httpClient: HttpClient) { }
  /**
   * @author om kanada
   * @description This function is used to get all post.
   */
  public getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(environment.API_URL + APINAME.POST)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  /**
   * @author om kanada
   * @description This function is used to create new post.
   */
  public create(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(environment.API_URL + APINAME.POST, JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  /**
   * @author om kanada
   * @description This function is used to find particular post.
   */
  public find(id: number): Observable<Post> {
    return this.httpClient.get<Post>(environment.API_URL + APINAME.POST + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  /**
   * @author om kanada
   * @description This function is used to update post.
   */
  public update(id: number, post: Post): Observable<Post> {
    return this.httpClient.put<Post>(environment.API_URL + APINAME.POST + id, JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  /**
   * @author om kanada
   * @description This function is used to delete post.
   */
  public delete(id: number) {
    return this.httpClient.delete<Post>(environment.API_URL + APINAME.POST + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  /**
   * @author om kanada
   * @description This function is used to handle error.
   */
  private errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
