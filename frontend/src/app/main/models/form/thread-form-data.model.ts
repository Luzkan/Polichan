import {EntryFormData} from './base-form-data.model';
import {ThreadCategory} from '../thread-category.model';

export interface ThreadFormData extends EntryFormData {
  category: ThreadCategory,
}
