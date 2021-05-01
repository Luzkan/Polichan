import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Post} from './reply.component';

describe('HomeComponent', () => {
  let component: Post;
  let fixture: ComponentFixture<Post>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Post],
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Post);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
