import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceModeComponent } from './race-mode.component';

describe('RaceModeComponent', () => {
  let component: RaceModeComponent;
  let fixture: ComponentFixture<RaceModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
