import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunRaceComponent } from './run-race.component';

describe('RunRaceComponent', () => {
  let component: RunRaceComponent;
  let fixture: ComponentFixture<RunRaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunRaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
