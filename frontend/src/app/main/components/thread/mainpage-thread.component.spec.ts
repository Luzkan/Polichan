import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MainpageThreadComponent} from './mainpage-thread.component';

describe('HomeComponent', () => {
  let component: MainpageThreadComponent;
  let fixture: ComponentFixture<MainpageThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainpageThreadComponent],
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainpageThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
