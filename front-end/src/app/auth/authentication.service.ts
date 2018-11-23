import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {API_URL} from '../config/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLogin = false;
  constructor(private http: HttpClient, private router: Router) { }

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
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();

    this.router.navigate(['/welcome']);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error');
  }
}
