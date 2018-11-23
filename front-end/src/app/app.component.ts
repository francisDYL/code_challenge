import { Component} from '@angular/core';
import { AuthenticationService } from './auth/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  user;

  constructor(private _authService: AuthenticationService) {
    this.user = localStorage.getItem('user');
  }

  logout() {
    this.user = null;
    this._authService.logout();
  }

}
