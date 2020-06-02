import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserDashBoardComponent } from './new-user-dash-board.component';

describe('NewUserDashBoardComponent', () => {
  let component: NewUserDashBoardComponent;
  let fixture: ComponentFixture<NewUserDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserDashBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
