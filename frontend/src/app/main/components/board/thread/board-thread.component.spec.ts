import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BoardThreadComponent} from './board-thread.component';

describe('HomeComponent', () => {
  let component: BoardThreadComponent;
  let fixture: ComponentFixture<BoardThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardThreadComponent],
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
