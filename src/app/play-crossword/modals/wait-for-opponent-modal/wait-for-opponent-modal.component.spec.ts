import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitForOpponentModalComponent } from './wait-for-opponent-modal.component';

describe('WaitForOpponentModalComponent', () => {
  let component: WaitForOpponentModalComponent;
  let fixture: ComponentFixture<WaitForOpponentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitForOpponentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitForOpponentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
