import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayInterfaceComponent } from './play-interface.component';

describe('PlayInterfaceComponent', () => {
  let component: PlayInterfaceComponent;
  let fixture: ComponentFixture<PlayInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
