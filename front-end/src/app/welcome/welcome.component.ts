import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import {Router} from '@angular/router';
import { PreloadService } from '../preload/preload.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  email: String;
  password: String;

  constructor(private _authService: AuthenticationService, private router: Router,
    private _preloadService: PreloadService) { }

  ngOnInit() {

  }

  OnDestroy(): void {
  }

  signIn() {
    this._preloadService.setLoadingState(true);
    this._authService.signIn(this.email, this.password).subscribe(
      data => this.successHandler(data),
      error => this.errorHandler(error)
    );
  }

  signUp() {
    this._preloadService.setLoadingState(true);
    this._authService.signUp(this.email, this.password).subscribe(
      data => this.successHandler(data),
       error => this.errorHandler(error)
   );

  }

  errorHandler(error) {
      this.email = '';
      this.password = '';
      this._preloadService.setLoadingState(false);
      this._preloadService.sendMessage({type: 'Error', content: 'server unreachable'});
  }

  successHandler(data) {
    if (data.error) {
      this.email = '';
      this.password = '';
      this._preloadService.setLoadingState(false);
      this._preloadService.sendMessage({type: 'Error', content: data.error});
    } else {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data.user.email);
      this.router.navigate(['/nearByShops']);
    }
  }

}
