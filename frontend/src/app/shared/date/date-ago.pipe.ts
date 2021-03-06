import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';

@Pipe({
  name: 'dateAgo',
  pure: true,
})
export class DateAgoPipe implements PipeTransform {
  constructor(private readonly translateService: TranslateService) {
  }

  static INTERVALS = {
    'DateAgo.Ago.Year': 365 * 24 * 60 * 60,
    'DateAgo.Ago.Month': 30 * 24 * 60 * 60,
    'DateAgo.Ago.Week': 7 * 24 * 60 * 60,
    'DateAgo.Ago.Day': 24 * 60 * 60,
    'DateAgo.Ago.Hour': 60 * 60,
    'DateAgo.Ago.Minute': 60,
    'DateAgo.Ago.Second': 1,
  };

  transform(value: Date | string | number): Observable<string> {
    const seconds = Math.floor((Date.now().valueOf() - new Date(value).valueOf()) / 1000);
    if (seconds < 30) {
      return this.translateService.stream('DateAgo.Now');
    }

    for (const [key, value] of Object.entries(DateAgoPipe.INTERVALS)) {
      const counter = Math.floor(seconds / value);
      if (counter > 0) {
        return this.translateService.stream(key, {count: counter});
      }
    }
    return of(value.toString());
  }
}
