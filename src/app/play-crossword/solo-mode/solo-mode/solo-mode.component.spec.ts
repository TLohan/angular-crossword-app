import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloModeComponent } from './solo-mode.component';

describe('SoloModeComponent', () => {
  let component: SoloModeComponent;
  let fixture: ComponentFixture<SoloModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoloModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoloModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
