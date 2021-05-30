import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ThreadComponent} from './thread.component';
import {TranslateModuleConfig} from '@ngx-translate/core/public_api';
import {TranslateCompiler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateMessageFormatCompiler} from 'ngx-translate-messageformat-compiler';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import {ChangeDetectorRef} from '@angular/core';
import {PostService} from '../../services/post.service';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {ThreadCategory} from '../../models/thread-category.model';
import {Thread} from '../../models/thread.model';
import {SharedModule} from '../../../shared/shared.module';

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

describe('ThreadComponent', () => {
  let component: ThreadComponent;
  let fixture: ComponentFixture<ThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreadComponent],
      providers: [
        PostService,
        BsModalService,
        ChangeDetectorRef,
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              thread: {
                id: '1',
                category: ThreadCategory.BIO,
                nickname: 'Mike',
                content: 'Lorem ipsum',
                imgUrl: '',
                date: new Date(),
              } as Thread,
            }),
          },
        },
      ],
      imports: [
        HttpClientModule,
        ModalModule.forRoot(),
        TranslateModule.forRoot(translationConfig),
        SharedModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
