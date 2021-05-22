import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../core/api/api.service';
import {Dictionary} from '../../core/types/dictionary.model';
import {Post} from '../models/post.model';
import {BaseApiService} from '../../core/api/base-api.service';
import {ApiPatternKey} from '../../core/api/api-pattern-key.model';
import {Pageable} from '../../core/api/pageable.model';
import {switchMap} from 'rxjs/operators';
import {PostFormData} from '../models/form/post-form-data.model';
import {ImageResourceService} from './image-resource.service';

@Injectable({
  providedIn: 'root',
})
export class PostService extends BaseApiService {
  constructor(private readonly imageResourceService: ImageResourceService,
      apiService: ApiService) {
    super(apiService);
  }

  getPosts(threadId: string, pageable?: Pageable): Observable<Post[]> {
    const queryParam: Dictionary<string> = {};
    const pathParams: Dictionary<string> = {};
    this.setOptionalEntry(pathParams, 'id', threadId);
    this.setPageableParams(queryParam, pageable);
    return this.apiService.get<Post[]>(ApiPatternKey.THREAD_POSTS, pathParams, queryParam);
  }

  savePost(postData: PostFormData): Observable<Post> {
    return this.imageResourceService.saveImageAndUpdateContainer(postData).pipe(
        switchMap((updatedPost) =>
          this.apiService.post<PostFormData, Post>(ApiPatternKey.POSTS, updatedPost)),
    );
  }
}
