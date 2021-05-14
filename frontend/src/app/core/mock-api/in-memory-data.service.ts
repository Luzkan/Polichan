import {Injectable} from '@angular/core';
import {Thread} from '../../main/models/thread.model';
import {Post} from '../../main/models/post.model';
import {groupBy, isNil} from 'lodash-es';
import * as faker from 'faker';
import {Dictionary} from '../types/dictionary.model';
import {ThreadCategory} from '../../main/models/thread-category.model';
import {isNotNil} from '../operators/is-not-nill';
import {UrlService} from '../config/url.service';
import {ApiPatternKey} from '../api/api-pattern-key.model';

type Predicate<I> = (value: I) => boolean
type PipeReducer<I, O> = (data: I, params: Dictionary<string>) => I | O
type DataReducer<I, O> = (param: string, input: I) => O
type IdGenerator = { next: () => string };
type Options = { params: Dictionary<string>, headers: Dictionary<string> };

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  private database: Dictionary<any> = {};
  private paramReducer: PipeReducer<any, any>;
  private headerReducer: PipeReducer<any, any>;

  constructor(private readonly urlService: UrlService) {
    this.initDB();
    this.paramReducer = this.createParamReducer();
    this.headerReducer = this.createHeaderReducer();
  }

  initDB(): void {
    const threadIdGen = this.createIdGenerator();
    const postIdGen = this.createIdGenerator();

    const threads = this.createThreads(4, threadIdGen);
    this.setPathData(this.prepareUrl(ApiPatternKey.THREADS), threads);

    threads.forEach((thread) => {
      this.setPathData(this.prepareUrl(ApiPatternKey.THREAD, {id: thread.id}), thread);
    });

    const posts = this.createPosts(2, threads, postIdGen);
    posts.forEach((post) => {
      this.setPathData(this.prepareUrl(ApiPatternKey.POST, {id: post.id}), post);
    });

    const postsByThreadId = groupBy(posts, (post) => post.threadId);
    Object.entries(postsByThreadId).forEach(([threadId, posts]) => {
      this.setPathData(this.prepareUrl(ApiPatternKey.THREAD_POSTS, {id: threadId}), posts);
    });
  }

  private createThreads(n: number, idGen: IdGenerator): Thread[] {
    return Array(n).fill(0).map(() => this.createFakeThread(idGen.next()));
  }

  private createPosts(n: number, threads: Thread[], idGen: IdGenerator): Post[] {
    return threads.map((thread) => (Array(n).fill(0).map(() => this.createFakePost(idGen.next(), thread.id))))
        .reduce((flat, next) => flat.concat(next), []);
  }

  private createFakeThread(id: string): Thread {
    return {
      id: id,
      nickname: faker.name.firstName(),
      date: faker.date.past(2),
      category: faker.random.arrayElement(Object.values(ThreadCategory)),
    };
  }

  private createFakePost(id: string, threadId: string): Post {
    return {
      id: id,
      threadId: threadId,
      nickname: faker.name.firstName(),
      content: faker.lorem.lines(8),
      date: faker.date.past(2),
      imgUrl: 'assets/images/obrazek1.jpg',
    };
  }

  private createIdGenerator(): IdGenerator {
    let i = 0;
    return {
      next: () => {
        i += 1;
        return i.toString();
      },
    };
  }

  private setPathData<T>(path: string, data: T): void {
    this.database[path] = data;
  }

  public get<T>(path: string, options: Options): T {
    const data = this.database[path];
    return this.handleOptions(data, options);
  }

  private handleOptions<T>(data: any, options: Options): T {
    const dataAfterHeader = this.handleHeaders<T>(data, options.headers);
    const dataAfterParams = this.handleParams<T>(dataAfterHeader, options.params);
    return dataAfterParams;
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
    const categoryPredicate = <I>(data: I) => Array.isArray(data) && data.every((e) => isNotNil(e.category));

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
      return isNotNil(param) && predicatePass ? func(param, data): data;
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
