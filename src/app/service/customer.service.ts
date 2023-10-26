import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, tap, throwError, pipe } from 'rxjs';
import { CustomHttpResponse, CustomerState, Page, Profile } from '../interface/appstates';
import { User } from "../interface/user";
import { Key } from "../enum/key.enum";
import { Stats } from '../interface/stats';
import { Customer } from '../interface/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly server: string = 'http://localhost:8095';

  constructor(private http: HttpClient,) {
  }

  update$ = (customer: Customer) => <Observable<CustomHttpResponse<CustomerState>>>
    this.http.put<CustomHttpResponse<CustomerState>>
      (`${this.server}/customer/update`, customer)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  customer$ = (customerId: number) => <Observable<CustomHttpResponse<CustomerState>>>
    this.http.get<CustomHttpResponse<CustomerState>>
      (`${this.server}/customer/get/${customerId}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );


  searchCustomers$ = (name: string = '', page: number = 0) => <Observable<CustomHttpResponse<Page & User>>>
    this.http.get<CustomHttpResponse<Page & User & Stats>>
      (`${this.server}/customer/search?name=${name}&page=${page}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  customers$ = (page: number = 0) => <Observable<CustomHttpResponse<Page & User & Stats>>>
    this.http.get<CustomHttpResponse<Page & User & Stats>>
      (`${this.server}/customer/list?page=${page}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

      newCustomer$ = (customer: Customer) => <Observable<CustomHttpResponse<Customer & User>>>
      this.http.post<CustomHttpResponse<Customer & User>>
        (`${this.server}/customer/create`, customer)
        .pipe(
          tap(console.log),
          catchError(this.handleError)
        );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    let errorMessage: string;
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
