import {ThreadCategory} from './thread-category.model';

export interface Thread {
  id: string,
  category: ThreadCategory,
  nickname: string,
  content: string,
  imgUrl: string,
  date: Date
}
