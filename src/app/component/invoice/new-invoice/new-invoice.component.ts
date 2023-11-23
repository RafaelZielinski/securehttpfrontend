import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable, catchError, map, of, startWith } from 'rxjs';
import { DataState } from 'src/app/enum/datastate.enum';
import { CustomHttpResponse, Page } from 'src/app/interface/appstates';
import { Customer } from 'src/app/interface/customer';
import { State } from 'src/app/interface/state';
import { User } from 'src/app/interface/user';
import { CustomerService } from 'src/app/service/customer.service';
@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NewInvoiceComponent {
  newInvoiceState$: Observable<State<CustomHttpResponse<Customer[] & User>>>;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Customer[] & User>>(null);
  private isLoadingubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingubject.asObservable();
  readonly DataState = DataState;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.newInvoiceState$ = this.customerService.newInvoice$()
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next(response);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({ dataState: DataState.LOADING }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, error })
        })
      )
  }

  newInvoice(newInvoiceForm: NgForm): void {
    this.dataSubject.next({...this.dataSubject.value, message: null})
    this.isLoadingubject.next(true);
    this.newInvoiceState$ = this.customerService.createInvoice$(newInvoiceForm.value.customerId, newInvoiceForm.value)
      .pipe(
        map(response => {
          console.log(response);
          newInvoiceForm.reset({status: 'PENDING'})
          this.isLoadingubject.next(false);
          this.dataSubject.next(response)
          return { dataState: DataState.LOADED, appData: this.dataSubject.value };
        }),
        startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.isLoadingubject.next(false);
          return of({ dataState: DataState.LOADED, error })
        })
      )
  }
}
