import {Injectable} from '@angular/core';
import {appConfig} from '../../../environments/app-config';
import {isNil} from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  get isProduction(): boolean {
    return appConfig.production;
  }

  getPatternForKey(key: string): string {
    const urlConfig = appConfig.url;
    const pattern = urlConfig.patterns[key];
    if (isNil(pattern)) {
      throw new Error(`Pattern for ${key} is not defined`);
    }
    return urlConfig.prefix + pattern;
  }
}
