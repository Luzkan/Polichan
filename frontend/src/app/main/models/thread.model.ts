import {ThreadCategory} from './thread-category.model';

export interface Thread {
  id: string,
  nickname: string,
  date: Date,
  category: ThreadCategory,
}
