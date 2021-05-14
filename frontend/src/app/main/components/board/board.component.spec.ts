import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AbstractBoardComponent} from './abstract-board.component';

describe('HomeComponent', () => {
  let component: AbstractBoardComponent;
  let fixture: ComponentFixture<AbstractBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbstractBoardComponent],
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
