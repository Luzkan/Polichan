import {ThreadCategory} from './thread-category.model';

export interface Thread {
  id: string,
  date: Date,
  topic: string,
  nickname: string,
  category: ThreadCategory,
}
