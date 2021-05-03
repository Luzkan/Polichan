import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeComponent} from './components/home/home.component';
import {TestComponent} from './components/test/test.component';
import {PostComponent} from './components/post/post.component';
import {ReplyComponent} from './components/reply/reply.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {ThreadComponent} from './components/thread/thread.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SpinnerInterceptor} from '../core/spinner/spinner-interceptor';
import {NgxSpinnerModule} from 'ngx-spinner';
import {appConfig} from '../../environments/app-config';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from '../core/mock-api/in-memory-data.service';

// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TestComponent,
    PostComponent,
    ReplyComponent,
    ThreadComponent,
  ],
  imports: [
    NgbModule,
    NgSelectModule,
    FormsModule,
    // CKEditorModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSpinnerModule,
    appConfig.production ? [] : HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {delay: 100}),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
