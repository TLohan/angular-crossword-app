import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSelectedQuestionWidgetComponent } from './mobile-selected-question-widget.component';

describe('MobileSelectedQuestionWidgetComponent', () => {
  let component: MobileSelectedQuestionWidgetComponent;
  let fixture: ComponentFixture<MobileSelectedQuestionWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSelectedQuestionWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSelectedQuestionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
