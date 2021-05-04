import {Injectable} from '@angular/core';
import {appConfig} from '../../../environments/app-config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  get isProduction(): boolean {
    return appConfig.production;
  }
}
