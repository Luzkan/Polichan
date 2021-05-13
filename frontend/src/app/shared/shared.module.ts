import {NgModule} from '@angular/core';
import {DateAgoPipe} from './date/date-ago.pipe';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    DateAgoPipe,
  ],
  exports: [
    DateAgoPipe,
    TranslateModule,
  ],
})
export class SharedModule {
}
