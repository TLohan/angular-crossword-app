import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsWidgetComponent } from './stats-widget.component';

describe('StatsWidgetComponent', () => {
  let component: StatsWidgetComponent;
  let fixture: ComponentFixture<StatsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
