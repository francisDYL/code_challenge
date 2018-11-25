import { Component, OnInit, Input } from '@angular/core';
import {ShopService} from '../shop/shop.service';
import {ViewEncapsulation} from '@angular/core';
import { PreloadService } from '../preload/preload.service';

@Component({
  selector: 'app-near-by-shop',
  templateUrl: './near-by-shop.component.html',
  styleUrls: ['./near-by-shop.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class NearByShopComponent implements OnInit {

  /*nearByShops;*/
  nearByShops: [];
  constructor(private _shopService: ShopService, private _preloadService: PreloadService) { }

  ngOnInit() {
      navigator.geolocation.getCurrentPosition(this.getNearByShop.bind(this));
    /* this.nearByShops = [
       {name: 'NAME1', address: 'ADD1'},
       {name: 'NAME1', address: 'ADD1'},
       {name: 'NAME1', address: 'ADD1'},
       {name: 'NAME1', address: 'ADD1'},
       {name: 'NAME1', address: 'ADD1'},
       {name: 'NAME1', address: 'ADD1'},
       {name: 'NAME1', address: 'ADD1'},
       {name: 'NAME1', address: 'ADD1'},
       {name: 'NAME1', address: 'ADD1'}
     ];*/

  }

  getNearByShop(position) {
    this._preloadService.setLoadingState(true);
    this._shopService.getShops(position.coords.latitude, position.coords.longitude).subscribe(
      data  => this.successHandler(data, 'nearby', 0),
      error => this.errorHandler(error)
  );
  }

  addPreferredSop(index) {
    this._preloadService.setLoadingState(true);
    const preferredShop = this.nearByShops[index];
    this._shopService.addPreferredShop(preferredShop['name'], preferredShop['address']).subscribe (
      data => this.successHandler(data, 'addpreferred', index),
      error => this.errorHandler(error)
    );
  }

  errorHandler(error) {
    this._preloadService.sendMessage({type: 'Error', content: 'server unreachable'});
  }

  successHandler(data, type, index) {
    if (data.error) {
      this._preloadService.setLoadingState(false);
      this._preloadService.sendMessage({type: 'Error', content: data.error});
    } else {
      switch (type) {
        case 'nearby': {
          this._preloadService.setLoadingState(false);
          this.nearByShops = data.shops;
        }
        break;
        case 'addpreferred': {
          this.nearByShops.splice(index, 1);
          this._preloadService.setLoadingState(false);
          this._preloadService.sendMessage({type: 'Success', content: 'Preferred Shop successfully added'});
        }
      }
    }
  }
}
