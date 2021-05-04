import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Thread} from '../../main/models/thread.model';
import {Post} from '../../main/models/post.model';
import {groupBy} from 'lodash-es';
import * as faker from 'faker';
import {MockedDataWrapper} from './mocked-data-wrapper.model';
import {Dictionary} from '../types/dictionary.model';
import {ThreadService} from '../../main/services/thread.service';
import {ApiService} from '../api/api.service';
import {PostService} from '../../main/services/post.service';
import {ThreadCategory} from '../../main/models/thread-category.model';


@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): {} {
    const db: Dictionary<MockedDataWrapper<any>[]> = {};
    const threadIdGen = this.createNumberGenerator();
    const postIdGen = this.createNumberGenerator();

    const threads = this.createThreads(4, threadIdGen);
    this.addPathData(db, ApiService.prepareMockerApiUrl(ThreadService.THREADS_URL), threads);

    threads.forEach((thread) => {
      this.addPathData(db, ApiService.prepareMockerApiUrl(ThreadService.THREAD_URL, {id: thread.id}), thread);
    });

    const threadByCategory = groupBy(threads, (thread) => thread.category);
    Object.entries(threadByCategory).forEach(([category, threads]) => {
      const url = `${ApiService.prepareMockerApiUrl(ThreadService.THREADS_URL)}?category=${category}`;
      this.addPathData(db, url, threads);
    });

    const posts = this.createPosts(2, threads, postIdGen);
    posts.forEach((post) => {
      this.addPathData(db, ApiService.prepareMockerApiUrl(PostService.POST_URL, {id: post.id}), post);
    });

    const postsByThreadId = groupBy(posts, (post) => post.threadId);
    Object.entries(postsByThreadId).forEach(([threadId, posts]) => {
      this.addPathData(db, ApiService.prepareMockerApiUrl(PostService.POSTS_URL, {id: threadId}), posts);
    });
    return db;
  }

  private createThreads(n: number, idGen: { next: () => string }): Thread[] {
    return Array(n).fill(0).map(() => this.createFakeThread(idGen.next()));
  }

  private createPosts(n: number, threads: Thread[], idGen: { next: () => string }): Post[] {
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

  private createNumberGenerator(): { next: () => string } {
    let i = 0;
    return {
      next: () => {
        i += 1;
        return i.toString();
      },
    };
  }

  private addPathData<T>(db: Dictionary<MockedDataWrapper<any>[]>, path: string, data: T): void {
    const state: MockedDataWrapper<any>[] = db[ApiService.IN_MEMORY_ROOT_PATH] ?? [];
    state.push({id: path, data});
    db[ApiService.IN_MEMORY_ROOT_PATH] = state;
  }
}
