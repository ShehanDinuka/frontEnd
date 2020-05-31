import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPopUpComponent } from './sell-pop-up.component';

describe('SellPopUpComponent', () => {
  let component: SellPopUpComponent;
  let fixture: ComponentFixture<SellPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
