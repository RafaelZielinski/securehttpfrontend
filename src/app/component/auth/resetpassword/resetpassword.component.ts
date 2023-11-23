import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { DataState } from 'src/app/enum/datastate.enum';
import { RegisterState, ResetPasswordState } from 'src/app/interface/appstates';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
  ,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetpasswordComponent {
  resetPasswordState$: Observable<ResetPasswordState> = of({ dataState: DataState.LOADED });
  readonly DataState = DataState;

  constructor(private userService: UserService) {}

  resetPassword(resetPasswordForm: NgForm): void {
    console.log(resetPasswordForm.value.email)
    this.resetPasswordState$ = this.userService.requestPasswordReset$(resetPasswordForm.value.email)
    .pipe(
      map(response => {
        console.log(response);
        return {dataState: DataState.LOADED, registerSuccess: true, message: response.message };
      }),
      startWith({dataState: DataState.LOADING, registerSuccess: false }),
      catchError((error: string) => {
        return of({ dataState: DataState.ERROR, registerSuccess: false, error })
    })
    );
  }
}
