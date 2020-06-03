import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddAssetsComponent } from './user-add-assets.component';

describe('UserAddAssetsComponent', () => {
  let component: UserAddAssetsComponent;
  let fixture: ComponentFixture<UserAddAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
