import {Optional} from '../types/optional.model';

export class Pageable {
  limit: number;
  offset: Optional<number>;

  constructor(limit: number, offset?: number) {
    this.limit = limit;
    this.offset = offset;
  }

  static forLimit(limit: number, offset?: number): Pageable {
    return new Pageable(limit, offset);
  }

  nextPage(): Pageable {
    const offset = this.offset ?? 0;
    return Pageable.forLimit(this.limit, offset + this.limit);
  }
}
