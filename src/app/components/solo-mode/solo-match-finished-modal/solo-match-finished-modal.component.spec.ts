import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloMatchFinishedModalComponent } from './solo-match-finished-modal.component';

describe('SoloMatchFinishedModalComponent', () => {
  let component: SoloMatchFinishedModalComponent;
  let fixture: ComponentFixture<SoloMatchFinishedModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoloMatchFinishedModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoloMatchFinishedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
