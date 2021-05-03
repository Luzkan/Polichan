import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Thread} from '../models/thread.model';
import {ThreadCategory} from '../models/thread-category.model';
import {ApiService} from '../../core/api/api.service';
import {Dictionary} from '../../core/types/dictionary.model';

@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  private static THREAD_URL = '/api/threads/{id}';
  private static THREADS_URL = '/api/threads';

  constructor(private readonly apiService: ApiService) {
  }

  getThread(id: string): Observable<Thread> {
    const pathParams: Dictionary<string> = {'id': id};
    return this.apiService.get<Thread>(ThreadService.THREAD_URL, pathParams);
  }

  getThreads(): Observable<Thread[]> {
    return this.apiService.get<Thread[]>(ThreadService.THREADS_URL);
  }

  getThreadsForCategory(category: ThreadCategory): Observable<Thread[]> {
    const queryParams: Dictionary<string> = {category};
    return this.apiService.get<Thread[]>(ThreadService.THREADS_URL, undefined, queryParams);
  }
}
