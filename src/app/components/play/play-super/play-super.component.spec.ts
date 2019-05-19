import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaySuperComponent } from './play-super.component';

describe('PlaySuperComponent', () => {
  let component: PlaySuperComponent;
  let fixture: ComponentFixture<PlaySuperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaySuperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaySuperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
