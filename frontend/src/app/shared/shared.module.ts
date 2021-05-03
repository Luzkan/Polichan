import {NgModule} from '@angular/core';
import {DateAgoPipe} from './date/date-ago.pipe';

@NgModule({
  declarations: [
    DateAgoPipe,
  ],
  exports: [
    DateAgoPipe,
  ],
})
export class SharedModule {
}
