import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CustomHttpResponse, Profile } from '../interface/appstates';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly server: string = '';

  constructor(private http: HttpClient) { }

  login$ = (email: string, password: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.post<CustomHttpResponse<Profile>>
      ('${this.server}/user/login', { email, password })
      .pipe(
        tap(console.log),
          catchError(this.handleError)
        );

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client error occured - ${error.error.message}`
    } else {
      if (error.error.reason) {
        errorMessage = error.error.reason;
      } else {
        errorMessage = `An error occured - Error codeStatus ${error.status}`;
      }
    }
    return throwError(() => errorMessage);
  }
}
