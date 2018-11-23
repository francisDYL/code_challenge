import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {API_URL} from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  getShops(lat, lon): Observable<any> {

    return this.http.post<any>(API_URL + '/getshops', {
              'lat': lat || 33.9793414,
              'lon': lon || -6.9273035,
              'token': localStorage.getItem('token')})
             .pipe(
                  catchError(this.errorHandler)
              );
  }

  addPreferredShop(name, address): Observable<any> {
    return this.http.post<any>(API_URL + '/addpreferredshop', {'name': name, 'address': address})
             .pipe(
                  catchError(this.errorHandler)
              );
  }

  getPreferredShop(): Observable<any> {
    return this.http.post<any>(API_URL + '/getpreferredshop', {})
             .pipe(
                  catchError(this.errorHandler)
              );
  }

  deletePreferredShop(): Observable<any> {
    return this.http.post<any>(API_URL + '/deletepreferredshop', {})
             .pipe(
                  catchError(this.errorHandler)
              );
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error');
  }


}
