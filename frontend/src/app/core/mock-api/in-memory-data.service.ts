import {Injectable} from '@angular/core';
import {Thread} from '../../main/models/thread.model';
import {Post} from '../../main/models/post.model';
import {flatMap, isNil} from 'lodash-es';
import * as faker from 'faker';
import {Dictionary} from '../types/dictionary.model';
import {ThreadCategory} from '../../main/models/thread-category.model';
import {UrlService} from '../config/url.service';
import {ApiPatternKey} from '../api/api-pattern-key.model';
import {ImageResource} from '../../main/models/form/image-resource.model';
import {PostFormData} from '../../main/models/form/post-form-data.model';
import {ThreadFormData} from '../../main/models/form/thread-form-data.model';

type Predicate<I> = (value: I) => boolean
type PipeReducer<I, O> = (data: I, params: Dictionary<string>) => I | O
type DataReducer<I, O> = (param: string, input: I) => O
type IdGenerator = { next: () => string };
type Options = { params: Dictionary<string>, headers: Dictionary<string> };

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  private static readonly ImageURL = 'assets/images/obrazek1.jpg';
  private database: Dictionary<any> = {};
  private readonly paramReducer: PipeReducer<any, any>;
  private readonly headerReducer: PipeReducer<any, any>;
  private threadIdGen = InMemoryDataService.createIdGenerator();
  private postIdGen = InMemoryDataService.createIdGenerator();

  constructor(private readonly urlService: UrlService) {
    this.initDB();
    this.paramReducer = this.createParamReducer();
    this.headerReducer = this.createHeaderReducer();
  }

  initDB(): void {
    const threads = this.createThreads(10).map((thread) => this.saveThread(thread));
    this.createPosts(5, threads).map((post) => this.savePost(post));
  }

  private createThreads(n: number): ThreadFormData[] {
    return Array(n).fill(0).map(() => this.createFakeThread());
  }

  private createPosts(n: number, threads: Thread[]): PostFormData[] {
    return flatMap(threads.map((thread) => (Array(n).fill(0).map(() => this.createFakePost(thread.id)))));
  }

  private createFakeThread(): ThreadFormData {
    return {
      nickname: faker.name.firstName(),
      password: faker.name.firstName(),
      content: faker.lorem.lines(8),
      category: faker.random.arrayElement(Object.values(ThreadCategory)),
    };
  }

  private createFakePost(threadId: string): PostFormData {
    return {
      threadId: threadId,
      nickname: faker.name.firstName(),
      password: faker.name.firstName(),
      content: faker.lorem.lines(3),
    };
  }

  private static createIdGenerator(): IdGenerator {
    let i = 0;
    return {
      next: () => {
        i += 1;
        return i.toString();
      },
    };
  }

  private savePost(postData: PostFormData): Post {
    const post: Post = {
      id: this.postIdGen.next(),
      threadId: postData.threadId,
      nickname: postData.nickname,
      content: postData.content,
      date: faker.date.past(2),
      imgUrl: InMemoryDataService.ImageURL,
    };

    const postsPath = this.prepareUrl(ApiPatternKey.POSTS);
    this.saveInArray(postsPath, post);

    const threadPostsPath = this.prepareUrl(ApiPatternKey.THREAD_POSTS, {id: post.threadId});
    this.saveInArray(threadPostsPath, post);
    return post;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private saveImage(post: FormData): ImageResource {
    return {id: '1', imgUrl: InMemoryDataService.ImageURL};
  }

  private saveThread(threadData: ThreadFormData): Thread {
    const thread: Thread = {
      id: this.threadIdGen.next(),
      category: threadData.category,
      nickname: threadData.nickname,
      content: threadData.content,
      date: faker.date.past(2),
      imgUrl: InMemoryDataService.ImageURL,
    };
    const path = this.prepareUrl(ApiPatternKey.THREADS);
    this.saveInArray(path, thread);

    const detailsPath = this.prepareUrl(ApiPatternKey.THREAD, {id: thread.id});
    this.setPathData(detailsPath, thread);

    const threadPostsPath = this.prepareUrl(ApiPatternKey.THREAD_POSTS, {id: thread.id});
    this.setPathData(threadPostsPath, []);

    return thread;
  }

  private saveInArray<T>(path: string, value: T): void {
    const data = this.database[path] ?? [];
    if (!Array.isArray(data)) {
      throw new Error('Path is bussy and is not array');
    }
    this.database[path] = data.concat(value);
  }

  private setPathData<T>(path: string, data: T): void {
    this.database[path] = data;
  }

  post(path: string, payload: any): any {
    const threadsPath = this.prepareUrl(ApiPatternKey.THREADS);
    const postsPath = this.prepareUrl(ApiPatternKey.POSTS);
    const imagePath = this.prepareUrl(ApiPatternKey.IMAGE_UPLOAD);
    console.log('--------------------------');
    console.log('POST', path);
    switch (path) {
      case threadsPath:
        return this.saveThread(payload);
      case postsPath:
        return this.savePost(payload);
      case imagePath:
        return this.saveImage(payload);
      default:
        throw new Error(`POST path not handled ${path}`);
    }
  }

  public get<T>(path: string, options: Options): T {
    const data = this.database[path];
    console.log('--------------------------');
    console.log('GET', path, data);
    const outData = this.handleOptions<T>(data, options);
    console.log(options, outData);
    return outData;
  }

  private handleOptions<T>(data: any, options: Options): T {
    const dataAfterHeader = this.handleHeaders<T>(data, options.headers);
    return this.handleParams<T>(dataAfterHeader, options.params);
  }

  private handleHeaders<T>(data: any, headers: Dictionary<string>): T {
    return this.headerReducer(data, headers);
  }

  private handleParams<T>(data: any, queryParams: Dictionary<string>): T {
    return this.paramReducer(data, queryParams);
  }

  private createHeaderReducer(): PipeReducer<any, any> {
    return this.reducerPipe();
  }

  private createParamReducer(): PipeReducer<any, any> {
    const arrayPredicate = <I>(data: I) => Array.isArray(data);
    const categoryPredicate = <I>(data: I) => Array.isArray(data) && data.every((e) => !isNil(e.category));

    const offsetReducer = <T>(offset: string, data: T[]) => data.slice(Number(offset));
    const limitReducer = <T>(limit: string, data: T[]) => data.slice(0, Number(limit));
    const categoryReducer = (category: string, data: Thread[]) => data.filter((e) => e.category == category);

    return this.reducerPipe(
        this.safeReducer(categoryReducer, 'category', categoryPredicate),
        this.safeReducer(offsetReducer, 'offset', arrayPredicate),
        this.safeReducer(limitReducer, 'limit', arrayPredicate),
    );
  }

  private safeReducer<I, O>(func: DataReducer<I, O>, paramKey: string, predicate?: Predicate<I>): PipeReducer<I, O> {
    return (data: I, params: Dictionary<string>) => {
      const param = params[paramKey];
      const predicatePass = isNil(predicate) ? true : predicate(data);
      return !isNil(param) && predicatePass ? func(param, data) : data;
    };
  }

  // @ts-ignore
  private reducerPipe<I, O>(...functions: PipeReducer[]): PipeReducer<I, O> {
    return (initialVal: I, dict: Dictionary<string>) => (functions.reduce((g, f) => f(g, dict), initialVal) as O);
  }

  private prepareUrl(patternKey: string, pathParams: Dictionary<string> = {}): string {
    return this.urlService.prepareUrlForKey(patternKey, pathParams);
  }
}
