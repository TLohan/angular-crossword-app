import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardThumbComponent } from './board-thumb.component';

describe('BoardThumbComponent', () => {
  let component: BoardThumbComponent;
  let fixture: ComponentFixture<BoardThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardThumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
