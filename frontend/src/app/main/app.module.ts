import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TestComponent} from './components/test/test.component';
import {PostComponent} from './components/post/post.component';
import {EntryFormComponent} from './components/reply/entry-form.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BoardThreadComponent} from './components/board/thread/board-thread.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ThreadComponent} from './components/thread/thread.component';
import {MainBoardComponent} from './components/board/mian-board.component';
import {RandomBoardComponent} from './components/board/random-board.component';
import {CategoryBoardComponent} from './components/board/category-board.component';

// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const translationConfig = {
  defaultLanguage: 'en',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TestComponent,
    PostComponent,
    EntryFormComponent,
    ThreadComponent,
    MainBoardComponent,
    RandomBoardComponent,
    BoardThreadComponent,
    CategoryBoardComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    NgSelectModule,
    // CKEditorModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(translationConfig),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
