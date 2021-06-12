import {TestBed} from '@angular/core/testing';
import {DateAgoPipe} from './date-ago.pipe';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModuleConfig} from '@ngx-translate/core/public_api';
import {TranslateCompiler, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateMessageFormatCompiler} from 'ngx-translate-messageformat-compiler';
import {combineLatest} from 'rxjs';

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

describe('DateAgoPipe', () => {
  let pipe: DateAgoPipe;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateAgoPipe],
      imports: [
        HttpClientModule,
        TranslateModule.forRoot(translationConfig),
      ],
    }).compileComponents();
    translateService = TestBed.inject(TranslateService);
  });

  beforeEach(() => {
    pipe = new DateAgoPipe(translateService);
  });

  it('should inform that the post has just been created', () => {
    // expect(0).toBe(1);
    testAgo(0, 'DateAgo.Now');
  });

  it('should inform that the post was created 40 seconds ago', () => {
    testAgo(40, 'DateAgo.Ago.Second', {count: 40});
  });

  it('should inform that the post was created 1 minute ago', () => {
    testAgo(60 + 10, 'DateAgo.Ago.Minute', {count: 1});
  });

  it('should inform that the post was created 1 hour ago', () => {
    testAgo(60 * 60 + 10, 'DateAgo.Ago.Hour', {count: 1});
  });

  it('should inform that the post was created 1 day ago', () => {
    testAgo(24 * 60 * 60 + 10, 'DateAgo.Ago.Day', {count: 1});
  });

  it('should inform that the post was created 1 week ago', () => {
    testAgo(7 * 24 * 60 * 60 + 10, 'DateAgo.Ago.Week', {count: 1});
  });

  it('should inform that the post was created 1 month ago', () => {
    testAgo(30 * 24 * 60 * 60 + 10, 'DateAgo.Ago.Month', {count: 1});
  });

  it('should inform that the post was created 1 year ago', () => {
    testAgo(365 * 24 * 60 * 60 + 10, 'DateAgo.Ago.Year', {count: 1});
  });

  function testAgo(secondsAgo: number, expectedKey: string, params?: Object): void {
    combineLatest([
      pipe.transform(new Date(Date.now() - secondsAgo * 1000)),
      translateService.stream(expectedKey, params),
    ]).subscribe(([result, expected]) => expect(result).toBe(expected));
  }
});
