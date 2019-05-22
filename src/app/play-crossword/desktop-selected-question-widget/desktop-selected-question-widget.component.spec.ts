import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopSelectedQuestionWidgetComponent } from './desktop-selected-question-widget.component';

describe('DesktopSelectedQuestionWidgetComponent', () => {
  let component: DesktopSelectedQuestionWidgetComponent;
  let fixture: ComponentFixture<DesktopSelectedQuestionWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopSelectedQuestionWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopSelectedQuestionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
