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
import {NavbarComponent} from './components/navbar/navbar.component';
import {ThreadComponent} from './components/thread/thread.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SpinnerInterceptor} from '../core/spinner/spinner-interceptor';
import {NgxSpinnerModule} from 'ngx-spinner';

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
    NavbarComponent,
    ThreadComponent,
  ],
  imports: [
    NgbModule,
    NgSelectModule,
    FormsModule,
    // CKEditorModule,
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
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
