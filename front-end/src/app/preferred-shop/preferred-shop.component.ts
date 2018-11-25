import { Component, OnInit } from '@angular/core';
import {ShopService} from '../shop/shop.service';
import { PreloadService } from '../preload/preload.service';
@Component({
  selector: 'app-preferred-shop',
  templateUrl: './preferred-shop.component.html',
  styleUrls: ['./preferred-shop.component.css']
})
export class PreferredShopComponent implements OnInit {

  preferredShops: [];
  isEmpty = true;

  constructor(private _shopService: ShopService, private _preloadService: PreloadService) { }

  ngOnInit() {
    this.getPreferredShop();

  }


  getPreferredShop() {
    this._preloadService.setLoadingState(true);
    this._shopService.getPreferredShop().subscribe(
      data  => this.successHandler(data, 'preferred', 0),
      error => this.errorHandler(error)
  );
  }

  deletePreferredSop(index) {
    this._preloadService.setLoadingState(true);
    const preferredShop = this.preferredShops[index];
    this._shopService.deletePreferredShop(preferredShop['_id'], preferredShop['name']).subscribe (
      data => this.successHandler(data, 'deletepreferred', index),
      error => this.errorHandler(error)
    );
  }

  errorHandler(error) {
    this._preloadService.setLoadingState(false);
    this._preloadService.sendMessage({type: 'Error', content: 'server unreachable'});
  }

  successHandler(data, type, index) {
    if (data.error) {
      this._preloadService.setLoadingState(false);
      this._preloadService.sendMessage({type: 'Error', content: data.error});
    } else {
      switch (type) {
        case 'preferred': {
          this.preferredShops = data.preferredShops;
          if (this.preferredShops.length > 0) {this.isEmpty = false; }
          this._preloadService.setLoadingState(false);
        }
        break;
        case 'deletepreferred': {
          this.preferredShops.splice(index, 1);
          this._preloadService.setLoadingState(false);
          this._preloadService.sendMessage({type: 'Success', content: 'Preferred Shop successfully remove'});
        }
      }
    }
  }


}
