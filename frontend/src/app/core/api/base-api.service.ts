import {Dictionary} from '../types/dictionary.model';
import {ApiService} from './api.service';
import {Pageable} from './pageable.model';
import {Optional} from '../types/optional.model';
import {isNil} from 'lodash-es';

export abstract class BaseApiService {
  constructor(protected readonly apiService: ApiService) {
  }

  protected setPageableParams(queryParams: Dictionary<string>, pageable: Optional<Pageable>): void {
    this.setOptionalEntry(queryParams, 'limit', pageable?.limit?.toString());
    this.setOptionalEntry(queryParams, 'offset', pageable?.offset?.toString());
  }

  protected setOptionalEntry<T>(dict: Dictionary<T>, key: string, value?: T): void {
    if (!isNil(value)) {
      dict[key] = value;
    }
  }
}
