import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable, catchError, map, of, startWith } from 'rxjs';
import { DataState } from 'src/app/enum/datastate.enum';
import { CustomHttpResponse, Page } from 'src/app/interface/appstates';
import { Customer } from 'src/app/interface/customer';
import { State } from 'src/app/interface/state';
import { User } from 'src/app/interface/user';
import { CustomerService } from 'src/app/service/customer.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
  ,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCustomerComponent implements OnInit {
  newCustomerState$: Observable<State<CustomHttpResponse<Page<Customer> & User>>>;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Page<Customer> & User>>(null);
  private isLoadingubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingubject.asObservable();
  readonly DataState = DataState;

  constructor(private customerService: CustomerService, private noficationService: NotificationService) { }

  ngOnInit(): void {
    this.newCustomerState$ = this.customerService.customers$()
      .pipe(
        map(response => {
          this.noficationService.onDefault(response.message);
          console.log(response);
          this.dataSubject.next(response);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({ dataState: DataState.LOADING }),
        catchError((error: string) => {
          this.noficationService.onError(error);
          return of({ dataState: DataState.ERROR, error })
        })
      )
  }

  createCustomer(newCustomerForm: NgForm): void {
    this.isLoadingubject.next(true);
    this.newCustomerState$ = this.customerService.newCustomer$(newCustomerForm.value)
      .pipe(
        map(response => {
          this.noficationService.onDefault(response.message);
          console.log(response);
          newCustomerForm.reset({ type: "INDIVIDUAL", status: 'ACTIVE'})
          this.isLoadingubject.next(false);
          return { dataState: DataState.LOADED, appData: this.dataSubject.value };
        }),
        startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.noficationService.onError(error);
          this.isLoadingubject.next(false);
          return of({ dataState: DataState.LOADED, error })
        })
      )
  }
}

