import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlDashboardComponent } from './control-dashboard.component';

describe('ControlDashboardComponent', () => {
  let component: ControlDashboardComponent;
  let fixture: ComponentFixture<ControlDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
