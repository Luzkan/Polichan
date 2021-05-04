import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {appConfig} from '../../environments/app-config';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './mock-api/in-memory-data.service';
import {SpinnerInterceptor} from './spinner/spinner-interceptor';

@NgModule({
  declarations: [],
  imports: [
    appConfig.production ? [] : HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {delay: 1000}),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
}
