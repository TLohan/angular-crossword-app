import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerProgressWidgetComponent } from './player-progress-widget.component';

describe('PlayerProgressWidgetComponent', () => {
  let component: PlayerProgressWidgetComponent;
  let fixture: ComponentFixture<PlayerProgressWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerProgressWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerProgressWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
