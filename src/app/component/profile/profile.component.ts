import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, startWith} from "rxjs";
import {CustomHttpResponse, LoginState, Profile} from "../../interface/appstates";
import {UserService} from "../../service/user.service";
import {State} from "../../interface/state";
import {DataState} from "../../enum/datastate.enum";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileState$: Observable<State<CustomHttpResponse<Profile>>>;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Profile>>(null);
  private isLoadingubject = new BehaviorSubject<Boolean>(false);
  isLoading$ = this.isLoadingubject.asObservable();
  readonly DataState = DataState;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.profileState$ = this.userService.profile$()
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next(response);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({dataState: DataState.LOADING}),
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
          this.dataSubject.next({...response, data: response.data });
          this.isLoadingubject.next(false);
          return { dataState: DataState.LOADED, appData: this.dataSubject.value };
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.isLoadingubject.next(false);
          return of({ dataState: DataState.ERROR, appData: this.dataSubject.value, error })
        })
      )
  }
}