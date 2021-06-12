import {TestBed} from '@angular/core/testing';
import {ErrorModalComponent} from './error-modal.component';
import {BsModalRef, ModalModule} from 'ngx-bootstrap/modal';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModuleConfig} from '@ngx-translate/core/public_api';
import {TranslateCompiler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateMessageFormatCompiler} from 'ngx-translate-messageformat-compiler';

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

describe('ErrorModalComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ErrorModalComponent,
      ],
      providers: [
        BsModalRef,
      ],
      imports: [
        HttpClientModule,
        ModalModule.forRoot(),
        TranslateModule.forRoot(translationConfig),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ErrorModalComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
