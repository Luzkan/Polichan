import {Dictionary} from '../types/dictionary.model';
import {ApiService} from './api.service';

export abstract class BaseApiService {
  constructor(protected readonly apiService: ApiService) {
  }

  protected addOptionalEntry<T>(dict: Dictionary<T>, key: string, value?: T): void {
    if (value != null) {
      dict[key] = value;
    }
  }
}
