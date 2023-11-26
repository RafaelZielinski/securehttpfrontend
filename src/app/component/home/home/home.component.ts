import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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
import { saveAs } from 'file-saver';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  ,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  
  homeState$: Observable<State<CustomHttpResponse<Page<Customer> & User>>>;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Page<Customer> & User>>(null);
  private isLoadingubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingubject.asObservable();
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  private showLogsSubject = new BehaviorSubject<boolean>(false);
  showLogs$ = this.showLogsSubject.asObservable();
  private fileStatusSubject = new BehaviorSubject<{status: string, type: string, percent: Number}>(undefined);
  fileStatus$ = this.fileStatusSubject.asObservable();
  readonly DataState = DataState;
  readonly EventType = EventType;

  constructor(private router: Router, private userService: UserService, private customerService: CustomerService, private noficationService: NotificationService) {
  }

  ngOnInit(): void {
    this.homeState$ = this.customerService.customers$()
      .pipe(
        map(response => {
          this.noficationService.onDefault(response.message);
          console.log(response);
          this.dataSubject.next(response);
          return {dataState: DataState.LOADED, appData: response};
        }),
        startWith({dataState: DataState.LOADING}),
        catchError((error: string) => {
          this.noficationService.onError(error);
          return of({dataState: DataState.ERROR, error})
        })
      )
  }
  goToPage(pageNumber?: number): void {
    this.homeState$ = this.customerService.customers$(pageNumber)
      .pipe(
        map(response => {
          this.noficationService.onDefault(response.message);
          console.log(response);
          this.dataSubject.next(response);
          this.currentPageSubject.next(pageNumber);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.noficationService.onError(error);
          return of({ dataState: DataState.ERROR, error, appData: this.dataSubject.value })
        })
      )
  }

  goToNextOrPreviosPage(direction?: string): void {
    this.goToPage(direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }  


  selectCustomer(customer: Customer): void {
    this.router.navigate([`/customers/${customer.id}`]);
  }

  report() : void {
    this.homeState$ = this.customerService.downloadReport$()
    .pipe(
      map(response => {
        console.log(response);
        this.reportProgress(response);
        return {dataState: DataState.LOADED, appData: this.dataSubject.value};
      }),
      startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
      catchError((error: string) => {
        this.noficationService.onError(error);
        return of({dataState: DataState.ERROR, error , appData: this.dataSubject.value})
      })
    )
  }
  private reportProgress(httpEvent: HttpEvent<string[] | Blob>) {
    switch (httpEvent.type) {
      case HttpEventType.DownloadProgress || HttpEventType.UploadProgress:
        this.fileStatusSubject.next({ status: 'progress', type: 'Downloading...', percent: Math.round(100 * httpEvent.loaded / httpEvent.total) });
        break;

      case HttpEventType.ResponseHeader || HttpEventType.UploadProgress:
        console.log('Got response Headers', httpEvent);
        break;

      case HttpEventType.Response:
        this.noficationService.onDefault('Downloading file...');
        saveAs(new File([<Blob>httpEvent.body], httpEvent.headers.get('File-Name'),
          { type: `${httpEvent.headers.get('Content-Type')}; charseet=utf-8` }))
        this.fileStatusSubject.next(undefined);

        break;

      default:
        console.log(httpEvent)
    }
  }


}
