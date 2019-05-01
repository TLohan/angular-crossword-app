import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunRaceModeComponent } from './run-race-mode.component';

describe('RunRaceModeComponent', () => {
  let component: RunRaceModeComponent;
  let fixture: ComponentFixture<RunRaceModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunRaceModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunRaceModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
