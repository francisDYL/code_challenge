import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import {Router} from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  email: String;
  password: String;
  errorMessage: String;

  constructor(private _authService: AuthenticationService, private router: Router) { }

  ngOnInit() {

  }

  OnDestroy(): void {
  }

  signIn() {
    this._authService.signIn(this.email, this.password).subscribe(
      data => this.successHandler(data),
      error => this.errorHandler(error)
    );
  }

  signUp() {
   this._authService.signUp(this.email, this.password).subscribe(
     data => this.successHandler(data),
     error => this.errorHandler(error)
   );

  }

  errorHandler(error) {
      this.email = '';
      this.password = '';
      this.errorMessage = 'server unreachable';
  }

  successHandler(data) {
    if (data.error) {
      this.email = '';
      this.password = '';
      this.errorMessage = data.error;
    } else {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data.user.email);
      this.router.navigate(['/nearByShops']);
    }
  }

}
