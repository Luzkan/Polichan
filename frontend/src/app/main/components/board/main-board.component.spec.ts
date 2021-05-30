import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MainBoardComponent} from './mian-board.component';
import {BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import {ThreadService} from '../../services/thread.service';
import {ChangeDetectorRef} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateCompiler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModuleConfig} from '@ngx-translate/core/public_api';
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

describe('MainBoardComponent', () => {
  let component: MainBoardComponent;
  let fixture: ComponentFixture<MainBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainBoardComponent],
      providers: [
        ThreadService,
        BsModalService,
        ChangeDetectorRef,
      ],
      imports: [
        ModalModule.forRoot(),
        HttpClientModule,
        TranslateModule.forRoot(translationConfig),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
