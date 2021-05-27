import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';

@Pipe({
  name: 'dateAgo',
  pure: true,
})
export class DateAgoPipe implements PipeTransform {
  constructor(private readonly translateService: TranslateService ) {}


  static INTERVALS = {
    'year': 365 * 24 * 60 * 60,
    'month': 30 * 24 * 60 * 60,
    'week': 7 * 24 * 60 * 60,
    'day': 24 * 60 * 60,
    'hour': 60 * 60,
    'minute': 60,
    'second': 1,
  };

  transform(value: Date | string | number): Observable<string> {
    const seconds = Math.floor((Date.now().valueOf() - new Date(value).valueOf()) / 1000);
    if (seconds < 30) {
      return this.translateService.stream('DateAgo.Now');
    }

    for (const [unit, value] of Object.entries(DateAgoPipe.INTERVALS)) {
      const counter = Math.floor(seconds / value);
      if (counter > 0) {
        return this.translateService.stream('DateAgo.Ago', {count: counter, unit: unit});
      }
    }
    return of(value.toString());
  }
}
