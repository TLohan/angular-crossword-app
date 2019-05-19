import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerWidgetComponent } from './timer-widget.component';

describe('TimerWidgetComponent', () => {
  let component: TimerWidgetComponent;
  let fixture: ComponentFixture<TimerWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
