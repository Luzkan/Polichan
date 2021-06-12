import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BoardThreadComponent} from './board-thread.component';
import {CategoryBoardComponent} from '../category-board.component';
import {BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import {ChangeDetectorRef} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateCompiler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateModuleConfig} from '@ngx-translate/core/public_api';
import {TranslateMessageFormatCompiler} from 'ngx-translate-messageformat-compiler';
import {HttpLoaderFactory} from '../category-board.component.spec';
import {PostService} from '../../../services/post.service';
import {Thread} from '../../../models/thread.model';
import {ThreadCategory} from '../../../models/thread-category.model';

const translationConfig: TranslateModuleConfig = {
  defaultLanguage: 'en',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
  compiler: {
    provide: TranslateCompiler,
    useClass: TranslateMessageFormatCompiler,
  },
};

describe('BoardThreadComponent', () => {
  let component: BoardThreadComponent;
  let fixture: ComponentFixture<BoardThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryBoardComponent],
      providers: [
        PostService,
        BsModalService,
        ChangeDetectorRef,
      ],
      imports: [
        HttpClientModule,
        ModalModule.forRoot(),
        TranslateModule.forRoot(translationConfig),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardThreadComponent);
    component = fixture.componentInstance;
    component.thread = {
      id: '1',
      category: ThreadCategory.BIO,
      nickname: 'Mike',
      content: 'Lorem ipsum',
      imgUrl: '',
      date: new Date(),
    } as Thread;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
