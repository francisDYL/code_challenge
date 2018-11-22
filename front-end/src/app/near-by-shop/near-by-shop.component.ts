import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-near-by-shop',
  templateUrl: './near-by-shop.component.html',
  styleUrls: ['./near-by-shop.component.css']
})
export class NearByShopComponent implements OnInit {

  nearByShops: Array<any>;
  constructor() { }

  ngOnInit() {
    this.nearByShops = [{name: 'shop1', distance: 10}, {name: 'shop2', distance: 5}, {name: 'shop3', distance: 9}];

  }

}
