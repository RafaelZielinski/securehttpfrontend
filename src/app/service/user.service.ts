import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, catchError, tap, throwError} from 'rxjs';
import {CustomHttpResponse, Profile} from '../interface/appstates';
import {User} from "../interface/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly server: string = 'http://localhost:8095';

  constructor(private http: HttpClient) {
  }

  login$ = (email: string, password: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.post<CustomHttpResponse<Profile>>
    (`${this.server}/user/login`, {email, password})
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  verifyCode$ = (email: string, code: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>
    (`${this.server}/user/verify/code/${email}/${code}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  profile$ = () => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>
    (`${this.server}/user/profile`, {headers: new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJTVVBFUl9DT01QQU5ZX0FLQV9SQUZBRUwiLCJzdWIiOiIxNyIsImlzcyI6IlNFQ1VSRV9IVFRQX0FLQV9SQUZBRUwiLCJleHAiOjE2OTUxNjk5OTAsImlhdCI6MTY5NTA2OTE5MCwiYXV0aG9yaXRpZXMiOlsiUkVBRDpVU0VSIiwiUkVBRDpDVVNUT01FUiJdfQ.dX0beJrYhGSksG6poGAytd2vt_PcdiESfIIvLKbY3Ed0ouorpzm67H2SSzKG7bE7FcSCVPRk2CYbeZQisgejWQ')})
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  update$ = (user: User) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
    (`${this.server}/user/update`, user, {headers: new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJTVVBFUl9DT01QQU5ZX0FLQV9SQUZBRUwiLCJzdWIiOiIxNyIsImlzcyI6IlNFQ1VSRV9IVFRQX0FLQV9SQUZBRUwiLCJleHAiOjE2OTUxNjk5OTAsImlhdCI6MTY5NTA2OTE5MCwiYXV0aG9yaXRpZXMiOlsiUkVBRDpVU0VSIiwiUkVBRDpDVVNUT01FUiJdfQ.dX0beJrYhGSksG6poGAytd2vt_PcdiESfIIvLKbY3Ed0ouorpzm67H2SSzKG7bE7FcSCVPRk2CYbeZQisgejWQ')})
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    console.log(errorMessage);
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client error occured - ${error.error.message}`
      console.log(errorMessage)
    } else {
      if (error.error.reason) {
        errorMessage = error.error.reason;
        console.log(errorMessage);
      } else {
        errorMessage = `An error occured - Error codeStatus ${error.status}`;
        console.log(errorMessage)
      }
    }
    return throwError(() => errorMessage);
  }
}
