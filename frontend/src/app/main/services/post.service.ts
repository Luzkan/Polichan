import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Thread} from '../models/thread.model';
import {ApiService} from '../../core/api/api.service';
import {Dictionary} from '../../core/types/dictionary.model';
import {Post} from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private static POST_URL = '/api/posts/{id}';
  private static POSTS_URL = '/api/thread/{id}/posts';

  constructor(private readonly apiService: ApiService) {
  }

  getPost(id: string): Observable<Thread> {
    const pathParams: Dictionary<string> = {'id': id};
    return this.apiService.get<Thread>(PostService.POST_URL, pathParams);
  }

  getPostsForThreadId(threadId: string): Observable<Post[]> {
    const pathParams: Dictionary<string> = {'id': threadId};
    return this.apiService.get<Thread[]>(PostService.POSTS_URL, pathParams);
  }
}
