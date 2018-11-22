import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearByShopComponent } from './near-by-shop.component';

describe('NearByShopComponent', () => {
  let component: NearByShopComponent;
  let fixture: ComponentFixture<NearByShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearByShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearByShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
