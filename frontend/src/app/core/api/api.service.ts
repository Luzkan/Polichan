import {Injectable} from '@angular/core';
import {Dictionary} from '../types/dictionary.model';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {appConfig} from '../../../environments/app-config';
import {InMemoryDataService} from '../mock-api/in-memory-data.service';
import {UrlService} from '../config/url.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient,
              private readonly urlService: UrlService,
              private readonly inMemoryDataService: InMemoryDataService) {
  }

  get<T>(patternKey: string,
      pathParams: Dictionary<string> = {},
      queryParams: Dictionary<string> = {},
      headers: Dictionary<string> = {}): Observable<T> {
    const options = {
      headers: headers,
      params: queryParams,
      reportProgress: false,
    };
    const url = this.urlService.prepareUrlForKey(patternKey, pathParams);
    if (appConfig.inMemoryApiEnabled) {
      return of(this.inMemoryDataService.get<T>(url, options));
    }
    return this.httpClient.get<T>(url, options);
  }
}
