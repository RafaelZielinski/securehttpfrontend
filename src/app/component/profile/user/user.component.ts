import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {BehaviorSubject, catchError, map, Observable, of, startWith} from "rxjs";
import {DataState} from "../../../enum/datastate.enum";
import {CustomHttpResponse, Profile} from "../../../interface/appstates";
import {State} from "../../../interface/state";
import {UserService} from "../../../service/user.service";
import { EventType } from 'src/app/enum/event-type.enum';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class UserComponent implements OnInit {
  profileState$: Observable<State<CustomHttpResponse<Profile>>>;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Profile>>(null);
  private isLoadingubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingubject.asObservable();
  private showLogsSubject = new BehaviorSubject<boolean>(false);
  showLogs$ = this.showLogsSubject.asObservable();
  readonly DataState = DataState;
  readonly EventType = EventType;

  constructor(private userService: UserService, private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.profileState$ = this.userService.profile$()
      .pipe(
        map(response => {
          this.notification.onDefault(response.message);
          this.dataSubject.next(response);
          return {dataState: DataState.LOADED, appData: response};
        }),
        startWith({dataState: DataState.LOADING}),
        catchError((error: string) => {
          this.notification.onError(error);
          return of({dataState: DataState.ERROR, appData: this.dataSubject.value, error})
        })
      )
  }

  updateProfile(profileForm: NgForm): void {
    this.isLoadingubject.next(true);
    this.profileState$ = this.userService.update$(profileForm.value)
      .pipe(
        map(response => {
          this.notification.onDefault(response.message);
          this.dataSubject.next({...response, data: response.data});
          this.isLoadingubject.next(false);
          return {dataState: DataState.LOADED, appData: this.dataSubject.value};
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
        catchError((error: string) => {
          this.notification.onError(error);
          this.isLoadingubject.next(false);
          return of({dataState: DataState.LOADED, appData: this.dataSubject.value, error})
        })
      )
  }

  updatePassword(passwordForm: NgForm): void {
    this.isLoadingubject.next(true);
    if (passwordForm.value.newPassword === passwordForm.value.confirmNewPassword) {
      this.profileState$ = this.userService.updatePassword$(passwordForm.value)
        .pipe(
          map(response => {
            this.notification.onDefault(response.message);
            this.dataSubject.next({...response, data: response.data});
            passwordForm.reset();
            this.isLoadingubject.next(false);
            return {dataState: DataState.LOADED, appData: this.dataSubject.value};
          }),
          startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
          catchError((error: string) => {
            this.notification.onError(error);
            passwordForm.reset();
            this.isLoadingubject.next(false);
            return of({dataState: DataState.ERROR, appData: this.dataSubject.value, error})
          })
        )
    } else {
      passwordForm.reset();
      this.isLoadingubject.next(false);
    }
  }


  updateRole(roleForm: NgForm): void {
    this.isLoadingubject.next(true);
    this.profileState$ = this.userService.updateRole$(roleForm.value.roleName)
      .pipe(
        map(response => {
          this.notification.onDefault(response.message);
          this.dataSubject.next({...response, data: response.data});
          this.isLoadingubject.next(false);
          return {dataState: DataState.LOADED, appData: this.dataSubject.value};
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
        catchError((error: string) => {
          this.notification.onError(error);
          this.isLoadingubject.next(false);
          return of({dataState: DataState.LOADED, appData: this.dataSubject.value, error})
        })
      )
  }

  updateAccountSettings(settingsForm: NgForm): void {
    this.isLoadingubject.next(true);
    this.profileState$ = this.userService.updateAccountSettings$(settingsForm.value)
      .pipe(
        map(response => {
          this.notification.onDefault(response.message);
          this.dataSubject.next({...response, data: response.data});
          this.isLoadingubject.next(false);
          return {dataState: DataState.LOADED, appData: this.dataSubject.value};
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
        catchError((error: string) => {
          this.notification.onError(error);
          this.isLoadingubject.next(false);
          return of({dataState: DataState.LOADED, appData: this.dataSubject.value, error})
        })
      )
  }


  toggleMfa(): void {
    this.isLoadingubject.next(true);
    this.profileState$ = this.userService.toggleMfa$()
      .pipe(
        map(response => {
          this.notification.onDefault(response.message);
          this.dataSubject.next({...response, data: response.data});
          this.isLoadingubject.next(false);
          return {dataState: DataState.LOADED, appData: this.dataSubject.value};
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
        catchError((error: string) => {
          this.notification.onError(error);
          this.isLoadingubject.next(false);
          return of({dataState: DataState.LOADED, appData: this.dataSubject.value, error})
        })
      )
  }

  updatePicture(image: File): void {
    if (image) {
      this.isLoadingubject.next(true);
      this.profileState$ = this.userService.updateImage$(this.getFormData(image))
        .pipe(
          map(response => {
            this.notification.onDefault(response.message);
            this.dataSubject.next({...response,
              data: {...response.data,
              user: {...response.data.user, imageUrl: `${response.data.user.imageUrl}?time=${new Date().getTime()}`}} });
            this.isLoadingubject.next(false);
            return {dataState: DataState.LOADED, appData: this.dataSubject.value};
          }),
          startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
          catchError((error: string) => {
            this.notification.onError(error);
            this.isLoadingubject.next(false);
            return of({dataState: DataState.LOADED, appData: this.dataSubject.value, error})
          })
        )
    }
  }

  toggleLogs(): void {
    this.showLogsSubject.next(!this.showLogsSubject.value);
  }

  private getFormData(image: File): FormData {
    const formData = new FormData();
    formData.append('image', image);
    return formData;
  }

}
