import { Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from './auth/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'front-end';
  user;
  subscription: Subscription;

  constructor(private _authService: AuthenticationService) {
    this.subscription = this._authService.getUserDetails().subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
