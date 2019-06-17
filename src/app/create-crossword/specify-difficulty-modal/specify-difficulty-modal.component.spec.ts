import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifyDifficultyModalComponent } from './specify-difficulty-modal.component';

describe('SpecifyDifficultyModalComponent', () => {
  let component: SpecifyDifficultyModalComponent;
  let fixture: ComponentFixture<SpecifyDifficultyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecifyDifficultyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecifyDifficultyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
