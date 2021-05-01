import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Reply} from './reply.component';

describe('HomeComponent', () => {
  let component: Reply;
  let fixture: ComponentFixture<Reply>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Reply],
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Reply);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
