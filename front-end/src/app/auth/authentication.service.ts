import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {API_URL} from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLogin = false;
  private userDetails = new Subject<any>();
  constructor(private http: HttpClient) { }

  signIn(email, password): Observable<any> {
    return this.http.post<any>(API_URL + '/signin', {'email': email, 'password': password})
             .pipe(
                  catchError(this.errorHandler)
              );
  }

  signUp(email, password): Observable<any> {
    return this.http.post<any>( API_URL + '/signup', {'email': email, 'password': password})
                    .pipe(
                      catchError(this.errorHandler)
                    );
  }

  isAuthenticated(): boolean {
    let result = false;
    this.http.post<any>(API_URL + '/isauth', {})
            .pipe(
              catchError(this.errorHandler)
            )
            .subscribe(
              data => {
                if (data.state) {
                  this.sendUserDetails(data.user);
                  result = true;
                }
              }
            );
    return result;
  }

  getUserDetails(): Observable<any> {
    return this.userDetails.asObservable();
  }

  sendUserDetails(user) {
    this.userDetails.next(user);
  }

  logout(): Observable<any> {
    return this.http.post<any>(API_URL + '/logout', {})
                    .pipe(
                      catchError(this.errorHandler)
                    );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error');
  }
}
