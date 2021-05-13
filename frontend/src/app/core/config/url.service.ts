import {Injectable} from '@angular/core';
import {SettingsService} from './settings.service';
import {Dictionary} from '../types/dictionary.model';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  constructor(private readonly settingsService: SettingsService) {
  }

  public prepareUrlForKey(patternKey: string, pathParams: Dictionary<string> = {}): string {
    const pattern = this.settingsService.getPatternForKey(patternKey);
    return this.prepareUrl(pattern, pathParams);
  }


  private prepareUrl(pattern: string, pathParams: Dictionary<string> = {}): string {
    return Object.entries(pathParams).reduce((pattern, [key, value]) => {
      return pattern.replace(`{${key}}`, value);
    }, pattern);
  }
}
