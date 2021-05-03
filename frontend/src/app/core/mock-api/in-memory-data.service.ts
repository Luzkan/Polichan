import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Thread} from '../../main/models/thread.model';
import {Post} from '../../main/models/post.model';
import {groupBy} from 'lodash-es';
import * as faker from 'faker';


@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const threadIdGen = this.createNumberGenerator();
    const postIdGen = this.createNumberGenerator();
    const threads = this.createThreads(4, threadIdGen);
    const posts = this.createPosts(2, threads, postIdGen);
    const postsByThreadId = groupBy(posts, (post) => post.threadId);
    return {threads, posts, ...postsByThreadId};
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
}
