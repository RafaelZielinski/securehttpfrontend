import {Component, Input} from '@angular/core';
import {User} from "../../interface/user";
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  constructor(private router: Router, private userService: UserService) {

  }
  @Input() user: User;

  logOut():void {
      this.userService.logOut();
      this.router.navigate(['/login']);
  }
}
