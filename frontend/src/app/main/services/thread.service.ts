import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Thread} from '../models/thread.model';
import {ThreadCategory} from '../models/thread-category.model';
import {ApiService} from '../../core/api/api.service';
import {Dictionary} from '../../core/types/dictionary.model';
import {BaseApiService} from '../../core/api/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class ThreadService extends BaseApiService {
  private static THREAD_URL = '/api/threads/{id}';
  private static THREADS_URL = '/api/threads';

  constructor(apiService: ApiService) {
    super(apiService);
  }

  getThread(id: string): Observable<Thread> {
    const pathParams: Dictionary<string> = {};
    this.addOptionalEntry(pathParams, 'id', id);
    return this.apiService.get<Thread>(ThreadService.THREAD_URL, pathParams);
  }

  getThreads(category?: ThreadCategory): Observable<Thread[]> {
    const queryParams: Dictionary<string> = {};
    this.addOptionalEntry(queryParams, 'category', category);
    return this.apiService.get<Thread[]>(ThreadService.THREADS_URL, undefined, queryParams);
  }
}
