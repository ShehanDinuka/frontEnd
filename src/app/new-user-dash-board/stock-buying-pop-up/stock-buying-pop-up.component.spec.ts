import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockBuyingPopUpComponent } from './stock-buying-pop-up.component';

describe('StockBuyingPopUpComponent', () => {
  let component: StockBuyingPopUpComponent;
  let fixture: ComponentFixture<StockBuyingPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockBuyingPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockBuyingPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
