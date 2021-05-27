import {NgModule} from '@angular/core';
import {DateAgoPipe} from './date/date-ago.pipe';
import {ErrorModalComponent} from './error/error-modal.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    DateAgoPipe,
    ErrorModalComponent,
  ],
  exports: [
    DateAgoPipe,
  ],
  imports: [
    TranslateModule,
  ],
})
export class SharedModule {
}
