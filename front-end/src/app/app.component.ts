import { Component, OnDestroy} from '@angular/core';
import { AuthenticationService } from './auth/authentication.service';
import { Subscription } from 'rxjs';
import { PreloadService } from './preload/preload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  title = 'NearByShop';
  userEmail;

  message = {type: '', content: ''};
  /* subscription to services in other to show preload animation and message from components */
  private userSubscription: Subscription;
  private preloadSubscription: Subscription;
  private messageSubscription: Subscription;


  constructor(private _authService: AuthenticationService, private _preloadService: PreloadService) {

    this.userSubscription = this._authService.getUser().subscribe(email => { this.userEmail = email; });

    this.preloadSubscription = this._preloadService.getLoadingState().subscribe(state => {
      this.showHidePreload(state);
    });

    this.messageSubscription = this._preloadService.getMessage().subscribe(message => {
      this.showMessage(message);
    });

  }

  logout() {
    this.userEmail = null;
    this._authService.logout();
  }

  ngOnDestroy() {
    /* unsubscribe to ensure no memory leaks */
    this.userSubscription.unsubscribe();
    this.preloadSubscription.unsubscribe();
    this.messageSubscription.unsubscribe();
}

showHidePreload(state) {
  if (state) {
    document.getElementById('preloadButton').click();
  } else {
    document.getElementById('modal1').style.display = 'none';
    const testElements = document.getElementsByClassName('modal-overlay');
    Array.prototype.filter.call(testElements, function(testElement) {
      testElement.style.display = 'none';
    });
    document.getElementById('body').style.overflow = 'visible';
  }

}

showMessage(message) {
  this.message = message;
  document.getElementById('messageButton').click();
}
}
