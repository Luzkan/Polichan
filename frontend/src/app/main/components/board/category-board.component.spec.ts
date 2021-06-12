import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import {ThreadService} from '../../services/thread.service';
import {ChangeDetectorRef} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateCompiler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModuleConfig} from '@ngx-translate/core/public_api';
import {TranslateMessageFormatCompiler} from 'ngx-translate-messageformat-compiler';
import {CategoryBoardComponent} from './category-board.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {ThreadCategory} from '../../models/thread-category.model';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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

describe('CategoryBoardComponent', () => {
  let component: CategoryBoardComponent;
  let fixture: ComponentFixture<CategoryBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryBoardComponent],
      providers: [
        ThreadService,
        BsModalService,
        ChangeDetectorRef,
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({categoryId: ThreadCategory.BIO}),
          },
        },
      ],
      imports: [
        ModalModule.forRoot(),
        HttpClientModule,
        TranslateModule.forRoot(translationConfig),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
