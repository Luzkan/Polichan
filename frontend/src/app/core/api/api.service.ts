import {Injectable} from '@angular/core';
import {Dictionary} from '../types/dictionary.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {
  }

  get<T>(urlPattern: string,
      pathParams: Dictionary<string> = {},
      queryParams: Dictionary<string> = {},
      headers: Dictionary<string> = {}): Observable<T> {
    const url = this.prepareUrl(urlPattern, pathParams);
    const options = {
      headers: headers,
      params: queryParams,
      reportProgress: false,
    };
    return this.httpClient.get<T>(url, options);
  }

  private prepareUrl(pattern: string, params: Dictionary<string>): string {
    return Object.entries(params).reduce((pattern, [key, value]) => {
      return pattern.replace(`{${key}}`, value);
    }, pattern);
  }
}
