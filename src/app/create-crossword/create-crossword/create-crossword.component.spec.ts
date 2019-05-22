import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCrosswordComponent } from './create-crossword.component';

describe('CreateCrosswordComponent', () => {
  let component: CreateCrosswordComponent;
  let fixture: ComponentFixture<CreateCrosswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCrosswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCrosswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
