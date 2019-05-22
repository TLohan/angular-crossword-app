import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedQuestionsListComponent } from './created-questions-list.component';

describe('CreatedQuestionsListComponent', () => {
  let component: CreatedQuestionsListComponent;
  let fixture: ComponentFixture<CreatedQuestionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedQuestionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedQuestionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
