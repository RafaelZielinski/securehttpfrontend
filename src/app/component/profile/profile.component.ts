import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {BehaviorSubject, catchError, map, Observable, of, startWith} from "rxjs";
import {DataState} from "../../enum/datastate.enum";
import {CustomHttpResponse, Profile} from "../../interface/appstates";
import {State} from "../../interface/state";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileState$: Observable<State<CustomHttpResponse<Profile>>>;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Profile>>(null);
  private isLoadingubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingubject.asObservable();
  readonly DataState = DataState;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.profileState$ = this.userService.profile$()
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next(response);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({ dataState: DataState.LOADING }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, appData: this.dataSubject.value, error })
        })
      )
  }

  updateProfile(profileForm: NgForm): void {
    this.isLoadingubject.next(true);
    this.profileState$ = this.userService.update$(profileForm.value)
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next({ ...response, data: response.data });
          this.isLoadingubject.next(false);
          return { dataState: DataState.LOADED, appData: this.dataSubject.value };
        }),
        startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.isLoadingubject.next(false);
          return of({ dataState: DataState.LOADED, appData: this.dataSubject.value, error })
        })
      )
  }

  updatePassword(passwordForm: NgForm): void {
    this.isLoadingubject.next(true);
    if (passwordForm.value.newPassword === passwordForm.value.confirmNewPassword) {
      this.profileState$ = this.userService.updatePassword$(passwordForm.value)
        .pipe(
          map(response => {
            console.log(response);
            passwordForm.reset();
            this.isLoadingubject.next(false);
            return { dataState: DataState.LOADED, appData: this.dataSubject.value };
          }),
          startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
          catchError((error: string) => {
            passwordForm.reset();
            this.isLoadingubject.next(false);
            return of({ dataState: DataState.ERROR, appData: this.dataSubject.value, error })
          })
        )
    } else {
      passwordForm.reset();
      this.isLoadingubject.next(false);
    }
  }


  updateRole(roleForm: NgForm): void {
    this.isLoadingubject.next(true);
    console.log(roleForm);
    this.profileState$ = this.userService.updateRole$(roleForm.value.roleName)
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next({ ...response, data: response.data });
          this.isLoadingubject.next(false);
          return { dataState: DataState.LOADED, appData: this.dataSubject.value };
        }),
        startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.isLoadingubject.next(false);
          return of({ dataState: DataState.LOADED, appData: this.dataSubject.value, error })
        })
      )
  }

  updateAccountSettings(settingsForm: NgForm): void {
    this.isLoadingubject.next(true);
    this.profileState$ = this.userService.updateAccountSettings$(settingsForm.value)
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next({ ...response, data: response.data });
          this.isLoadingubject.next(false);
          return { dataState: DataState.LOADED, appData: this.dataSubject.value };
        }),
        startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.isLoadingubject.next(false);
          return of({ dataState: DataState.LOADED, appData: this.dataSubject.value, error })
        })
      )
  }


  toggleMfa(): void {
    this.isLoadingubject.next(true);
    this.profileState$ = this.userService.toggleMfa$()
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next({ ...response, data: response.data });
          this.isLoadingubject.next(false);
          return { dataState: DataState.LOADED, appData: this.dataSubject.value };
        }),
        startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.isLoadingubject.next(false);
          return of({ dataState: DataState.LOADED, appData: this.dataSubject.value, error })
        })
      )
  }

}
