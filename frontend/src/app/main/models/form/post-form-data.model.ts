import {EntryFormData} from './base-form-data.model';

export interface PostFormData extends EntryFormData{
  threadId: string,
}
