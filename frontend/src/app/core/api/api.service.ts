import {Injectable} from '@angular/core';
import {Dictionary} from '../types/dictionary.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {appConfig} from '../../../environments/app-config';
import {MockedDataWrapper} from '../mock-api/mocked-data-wrapper.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  static IN_MEMORY_ROOT_PATH = 'config';

  constructor(private readonly httpClient: HttpClient) {
  }

  get<T>(urlPattern: string,
      pathParams: Dictionary<string> = {},
      queryParams: Dictionary<string> = {},
      headers: Dictionary<string> = {}): Observable<T> {
    const options = {
      headers: headers,
      params: queryParams,
      reportProgress: false,
    };

    if (appConfig.inMemoryApiEnabled) {
      const url = ApiService.prepareMockerApiUrl(urlPattern, pathParams);
      const fakeApiUrl = `api/${ApiService.IN_MEMORY_ROOT_PATH}/${url}`;
      return this.httpClient.get<MockedDataWrapper<T>>(fakeApiUrl, options)
          .pipe(map((wrapper) => wrapper.data));
    }
    const url = ApiService.prepareUrl(urlPattern, pathParams);
    return this.httpClient.get<T>(url, options);
  }

  static prepareUrl(pattern: string, params: Dictionary<string>): string {
    return Object.entries(params).reduce((pattern, [key, value]) => {
      return pattern.replace(`{${key}}`, value);
    }, pattern);
  }

  static prepareMockerApiUrl(pattern: string, params: Dictionary<string> = {}): string {
    return Object.entries(params).reduce((pattern, [key, value]) => {
      return pattern.replace(`{${key}}`, value);
    }, pattern).slice(1).split('/').join('--');
  }
}
