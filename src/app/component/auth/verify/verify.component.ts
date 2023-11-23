import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {BehaviorSubject, catchError, map, Observable, of, startWith, switchMap} from 'rxjs';
import {DataState} from 'src/app/enum/datastate.enum';
import {AccountType, VerifyState} from 'src/app/interface/appstates';
import {User} from 'src/app/interface/user';
import {UserService} from 'src/app/service/user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
  ,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyComponent {
  verifyState$: Observable<VerifyState>;
  private userSubject = new BehaviorSubject<User>(null);
  user$ = this.userSubject.asObservable();
  private isLoadingubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingubject.asObservable();
  readonly DataState = DataState;
  private readonly ACCOUNT_KEY: string = 'key';


  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    this.verifyState$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log(this.activatedRoute);
        const type: AccountType = this.getAccountType(window.location.href);
        return this.userService.verify$(params.get(this.ACCOUNT_KEY), type)
          .pipe(
            map(response => {
              console.log(response);
              type === 'password' ? this.userSubject.next(response.data.user) : null;

              return {type, title: 'Verified!', dataState: DataState.LOADED, message: response.message, verifySuccess: true
              };
            }),
            startWith({ title: 'Verifying...', dataState: DataState.LOADING, message: 'Please wait while we verify the information', verifySuccess: false}),
            catchError((error: string) => {
              return of({title: 'An error occured', dataState: DataState.ERROR, error, message: error, verifySuccess: false})
            })
          );
      })
    );
  }

  renewPassword(resetPasswordForm: NgForm): void {
    this.isLoadingubject.next(true);
    this.verifyState$ = this.userService.renewPassword$({userId: this.userSubject.value.id, password: resetPasswordForm.value.password, confirmPassword: resetPasswordForm.value.confirmPassword})
      .pipe(
            map(response => {
              console.log(response);
              this.isLoadingubject.next(false);
            return {type: 'account' as AccountType, title: 'Success!', dataState: DataState.LOADED, message: response.message, verifySuccess: true
              };
            }),
            startWith({ type: 'password'  as AccountType, title: 'Verified!', dataState: DataState.LOADED, verifySuccess: false}),
            catchError((error: string) => {
              this.isLoadingubject.next(false);
              return of({type: 'password'  as AccountType, title: error, dataState: DataState.LOADED, error,  verifySuccess: true})
            })
          );
      }
  private getAccountType(url: string): AccountType {
    return url.includes('password') ? 'password' : 'account';
  }
}
