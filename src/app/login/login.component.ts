import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {


  username = '';
  password = '';
  message = '';

  constructor(public authService: AuthService, public router: Router) {
  }

  logMeIn() {
    console.log('LogMeIn');
    this.authService
      .authenticate(this.username, this.password)
      .catch(errorMessage => this.message = errorMessage)
      .then(() => {
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['home']);
        }
      });

  }

  ngOnInit(): any {
    // if user has already login this page should navigate to home
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['home']);
    }
    console.log('hello `Login` component');
  }
}
