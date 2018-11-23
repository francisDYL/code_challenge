import { Component, OnInit, Input } from '@angular/core';
import {ShopService} from '../shop/shop.service';



@Component({
  selector: 'app-near-by-shop',
  templateUrl: './near-by-shop.component.html',
  styleUrls: ['./near-by-shop.component.css']
})
export class NearByShopComponent implements OnInit {

  private error;
  nearByShops: [];
  constructor(private _shopService: ShopService) { }

  ngOnInit() {
    this._shopService.getShops().subscribe(
      data  => { this.nearByShops = data; },
      error => this.errorHandler(error)
    );
  }

  addPreferredSop(index) {
    this._shopService.addPreferredShop(JSON.stringify(this.nearByShops[index])).subscribe (
      data => console.log(data),
      error => console.log(error)
    );
    }

  errorHandler(error) {
    this.error = error;
}

}
