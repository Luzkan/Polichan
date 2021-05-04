import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../core/api/api.service';
import {Dictionary} from '../../core/types/dictionary.model';
import {Post} from '../models/post.model';
import {BaseApiService} from '../../core/api/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class PostService extends BaseApiService {
   static POST_URL = '/api/posts/{id}';
   static POSTS_URL = '/api/thread/{id}/posts';

   constructor(apiService: ApiService) {
     super(apiService);
   }

   getPost(id: string): Observable<Post> {
     const pathParams: Dictionary<string> = {'id': id};
     return this.apiService.get<Post>(PostService.POST_URL, pathParams);
   }

   getPosts(threadId: string, limit?: number): Observable<Post[]> {
     const queryParam: Dictionary<string> = {};
     const pathParams: Dictionary<string> = {};
     this.addOptionalEntry(queryParam, 'limit', String(limit));
     this.addOptionalEntry(pathParams, 'id', threadId);
     return this.apiService.get<Post[]>(PostService.POSTS_URL, pathParams, queryParam);
   }
}
