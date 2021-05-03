import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Thread} from '../../main/models/thread.model';


@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  get threads(): Thread[] {
    return [
      {name: 'name1'},
    ];
  }

  createDb() {
    return {
      threads: this.threads,
    };
  }
}
