import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of, startWith } from 'rxjs';
import { DataState } from 'src/app/enum/datastate.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { CustomHttpResponse, Page, Profile } from 'src/app/interface/appstates';
import { Customer } from 'src/app/interface/customer';
import { State } from 'src/app/interface/state';
import { User } from 'src/app/interface/user';
import { CustomerService } from 'src/app/service/customer.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
  ,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersComponent {

  customerState$: Observable<State<CustomHttpResponse<Page<Customer> & User>>>;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Page<Customer> & User>>(null);
  private isLoadingubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingubject.asObservable();
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  private showLogsSubject = new BehaviorSubject<boolean>(false);
  showLogs$ = this.showLogsSubject.asObservable();
  readonly DataState = DataState;
  readonly EventType = EventType;

  constructor(private router: Router, private userService: UserService, private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customerState$ = this.customerService.
    searchCustomers$('')
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next(response);
          return {dataState: DataState.LOADED, appData: response};
        }),
        startWith({dataState: DataState.LOADING}),
        catchError((error: string) => {
          return of({dataState: DataState.ERROR, error})
        })
      )
  }

  searchCustomers(searchForm: NgForm): void {
    this.currentPageSubject.next(0);
    this.customerState$ = this.customerService.
    searchCustomers$(searchForm.value.name)
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next(response);
          return {dataState: DataState.LOADED, appData: response};
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
        catchError((error: string) => {
          return of({dataState: DataState.ERROR, error})
        })
      )
  }
    goToPage(pageNumber?: number, name?: string): void {
      this.customerState$ = this.customerService.searchCustomers$(name, pageNumber)
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next(response);
          this.currentPageSubject.next(pageNumber);
          return {dataState: DataState.LOADED, appData: response};
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
        catchError((error: string) => {
          return of({dataState: DataState.ERROR, error , appData: this.dataSubject.value})
        })
      )
      }
      
    goToNextOrPreviosPage(direction?: string, name?: string): void {
    this.goToPage(direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1, name);
    }  

  selectCustomer(customer: Customer): void {
    this.router.navigate([`/customers/${customer.id}`]);
  }
}
