import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {

  private isLoading = new Subject<any>();
  private message = new Subject<any>();

  constructor() { }

  getLoadingState(): Observable<any> {
    return this.isLoading.asObservable();
  }

  setLoadingState(state) {
    this.isLoading.next(state);
  }

  getMessage(): Observable<any> {
    return this.message.asObservable();
  }

  sendMessage(message) {
    this.message.next(message);
  }
}
