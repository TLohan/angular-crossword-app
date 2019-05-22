import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealAllModalComponent } from './reveal-all-modal.component';

describe('RevealAllModalComponent', () => {
  let component: RevealAllModalComponent;
  let fixture: ComponentFixture<RevealAllModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevealAllModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevealAllModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
