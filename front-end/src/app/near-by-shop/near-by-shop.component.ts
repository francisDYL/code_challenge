import { Component, OnInit, Input } from '@angular/core';
import {ShopService} from '../shop/shop.service';



@Component({
  selector: 'app-near-by-shop',
  templateUrl: './near-by-shop.component.html',
  styleUrls: ['./near-by-shop.component.css']
})
export class NearByShopComponent implements OnInit {

  private errorMessage;
  nearByShops: [];
  constructor(private _shopService: ShopService) { }

  ngOnInit() {
      navigator.geolocation.getCurrentPosition(this.getNearByShop.bind(this));

  }

  getNearByShop(position) {
    this._shopService.getShops(position.coords.latitude, position.coords.longitude).subscribe(
      data  => this.successHandler(data, 'nearby'),
      error => this.errorHandler(error)
  );
  }

  addPreferredSop(index) {
    const preferredShop = this.nearByShops[index];
    this._shopService.addPreferredShop(preferredShop['name'], preferredShop['address']).subscribe (
      data => this.successHandler(data, 'addpreferred'),
      error => console.log(error)
    );
    }

  errorHandler(error) {
    this.errorMessage = 'server unreachable';
  }

  successHandler(data, type) {
    if (data.error) {
      this.errorMessage = data.error;
    } else {
      switch (type) {
        case 'nearby': this.nearByShops = data.shops;
        break;
      }
    }
  }
}
