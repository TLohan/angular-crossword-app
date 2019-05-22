import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceEndedModalComponent } from './race-ended-modal.component';

describe('RaceEndedModalComponent', () => {
  let component: RaceEndedModalComponent;
  let fixture: ComponentFixture<RaceEndedModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceEndedModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceEndedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
