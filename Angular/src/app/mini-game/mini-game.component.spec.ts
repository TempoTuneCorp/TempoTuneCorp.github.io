import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniGameComponent } from './mini-game.component';

describe('MiniGameComponent', () => {
  let component: MiniGameComponent;
  let fixture: ComponentFixture<MiniGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
