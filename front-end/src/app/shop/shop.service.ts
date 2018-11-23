import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {API_URL} from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  lat;
  lon;
  coords = {lat: 33.9793414, lon: -6.9273035};
  constructor(private http: HttpClient) { }

  getShops(): Observable<any> {

    this.getCoords();
    return this.http.post<any>(API_URL + '/getshops', {'lat': this.coords.lat , 'lon': this.coords.lon})
             .pipe(
                  catchError(this.errorHandler)
              );
  }

  addPreferredShop(shop): Observable<any> {
    return this.http.post<any>(API_URL + '/addPreferredShop', {'shop': shop})
             .pipe(
                  catchError(this.errorHandler)
              );
  }

  getPreferredShop(id): Observable<any> {
    return this.http.post<any>(API_URL + '/getPreferredShop', {'id': id})
             .pipe(
                  catchError(this.errorHandler)
              );
  }

  deletePreferredShop(shop): Observable<any> {
    return this.http.post<any>(API_URL + '/deletePreferredShop', {'shop': shop})
             .pipe(
                  catchError(this.errorHandler)
              );
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error');
  }


  latLon() {

     return new Promise (resolve => {
       navigator.geolocation.getCurrentPosition(function(place) {
         resolve ( [place.coords.latitude, place.coords.longitude]);
      });
    });

}

 getCoords () {
    this.latLon().then((data) => {
    this.coords.lat = data[0];
    this.coords.lon = data[1];
   });
}

todo () {
  navigator.geolocation.getCurrentPosition(function(place) {
    return {lat: place.coords.latitude, lon: place.coords.longitude};
  });

}

}
