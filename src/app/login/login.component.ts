import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from './../services/login-service.service';
import { Client } from './../models/client';
import { Router, NavigationExtras } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { ThemeService } from 'ng2-charts';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  @Output() loginEventEmitter = new EventEmitter();
  email: string;
  password: string;

  constructor(private loginService: LoginService, private router: Router, public userService: UserService) {
  }
  ngOnInit() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  }

  loginUser(): void {
    this.loginService.validateUser(this.email, this.password).subscribe((client:any)=>
      {
        let c:Client = <Client>JSON.parse(JSON.stringify(client));
        this.userService.userId = c.user_id;
        localStorage.setItem('userId', c.user_id.toString());
        localStorage.setItem('userName', c.name.toString());
        // console.log("customer id "+c.user_id)
        // this.loginEventEmitter.emit(c);
        if(c.user_id != 0){

          this.loginService.clientObervable.next(c);
          this.loginService.setClient(c);
          this.router.navigate(['/dash']);
        }else{
          this.loginService.clientObervable.next(c);
        }

      }
    );

    // if(c.id != 0) {
    //   // Client has been authenticated

    // }

    // Show client some error message and ask to enter details again.
    // this.email = undefined;
    // this.password = undefined;
  }

}
