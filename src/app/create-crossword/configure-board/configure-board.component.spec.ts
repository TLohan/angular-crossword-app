import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureBoardComponent } from './configure-board.component';

describe('ConfigureBoardComponent', () => {
  let component: ConfigureBoardComponent;
  let fixture: ComponentFixture<ConfigureBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
