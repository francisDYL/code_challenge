import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferredShopComponent } from './preferred-shop.component';

describe('PreferredShopComponent', () => {
  let component: PreferredShopComponent;
  let fixture: ComponentFixture<PreferredShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferredShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferredShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
