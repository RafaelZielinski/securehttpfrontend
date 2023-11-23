import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {User} from "../../interface/user";
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Stats } from 'src/app/interface/stats';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NavbarComponent {


  constructor(private router: Router, private userService: UserService) {

  }
  @Input() stats: Stats;
  @Input() user: User;

  logOut():void {
      this.userService.logOut();
      this.router.navigate(['/login']);
  }
}
