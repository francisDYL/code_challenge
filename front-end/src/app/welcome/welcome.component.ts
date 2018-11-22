import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import {Router} from '@angular/router';
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
      error => this.errorHandler('signIn')
    );
  }

  signUp() {
   this._authService.signUp(this.email, this.password).subscribe(
     data => this.successHandler(data),
     error => this.errorHandler('signUp')
   );

  }

  errorHandler(type: String) {
      this.email = '';
      this.password = '';
      if (type === 'signIn') {
        this.errorMessage = 'incorrect email or password';
      } else {
        this.errorMessage = 'An account using this email already exist';
      }
  }

  successHandler(data) {
    this._authService.sendUserDetails(data);
    this.router.navigate(['/nearbyshops']);
  }
}
