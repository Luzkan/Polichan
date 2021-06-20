import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SpinnerInterceptor} from './spinner/spinner-interceptor';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: SpinnerInterceptor,
    //   multi: true,
    // },
  ],
})
export class CoreModule {
}
