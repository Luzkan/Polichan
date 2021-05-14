import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Thread} from '../models/thread.model';
import {ThreadCategory} from '../models/thread-category.model';
import {ApiService} from '../../core/api/api.service';
import {Dictionary} from '../../core/types/dictionary.model';
import {BaseApiService} from '../../core/api/base-api.service';
import {ApiPatternKey} from '../../core/api/api-pattern-key.model';
import {Pageable} from '../../core/api/pageable.model';

@Injectable({
  providedIn: 'root',
})
export class ThreadService extends BaseApiService {
  constructor(apiService: ApiService) {
    super(apiService);
  }

  getThread(id: string): Observable<Thread> {
    const pathParams: Dictionary<string> = {};
    this.setOptionalEntry(pathParams, 'id', id);
    return this.apiService.get<Thread>(ApiPatternKey.THREAD, pathParams);
  }

  getThreads(category?: ThreadCategory, pageable?: Pageable): Observable<Thread[]> {
    const queryParams: Dictionary<string> = {};
    this.setOptionalEntry(queryParams, 'category', category);
    this.setPageableParams(queryParams, pageable);
    return this.apiService.get<Thread[]>(ApiPatternKey.THREADS, undefined, queryParams);
  }

  getRandomThreads(pageable?: Pageable): Observable<Thread[]> {
    const queryParams: Dictionary<string> = {};
    this.setPageableParams(queryParams, pageable);
    return this.apiService.get<Thread[]>(ApiPatternKey.THREADS);
  }

  saveThread(thread: Thread): Observable<Thread> {
    return this.apiService.post(ApiPatternKey.THREADS, thread);
  }
}
