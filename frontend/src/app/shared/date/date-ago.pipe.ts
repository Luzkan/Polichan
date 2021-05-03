import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateAgo',
  pure: true,
})
export class DateAgoPipe implements PipeTransform {
  static intervals = {
    'year': 365 * 24 * 60 * 60,
    'month': 30 * 24 * 60 * 60,
    'week': 7 * 24 * 60 * 60,
    'day': 24 * 60 * 60,
    'hour': 60 * 60,
    'minute': 60,
    'second': 1,
  };

  transform(value: Date | string | number): string {
    const seconds = Math.floor((Date.now().valueOf() - new Date(value).valueOf()) / 1000);
    if (seconds < 30) {
      return 'Just now';
    }

    for (const [unit, value] of Object.entries(DateAgoPipe.intervals)) {
      const counter = Math.floor(seconds / value);
      if (counter > 0) {
        if (counter === 1) {
          return `${counter} ${unit} ago`;
        } else {
          return `${counter} ${unit}s ago`;
        }
      }
    }
    return String(value);
  }
}
