import {Injectable} from '@angular/core';
import {Order, QueryConfig, QueryEntity} from '@datorama/akita';
import {BooklogItemsState, BooklogItemsStore} from './booklog-items.store';

@Injectable({ providedIn: 'root' })
@QueryConfig({
  sortBy: 'createAt',
  sortByOrder: Order.ASC
})
export class BooklogItemsQuery extends QueryEntity<BooklogItemsState> {
  constructor(override store: BooklogItemsStore) {
    super(store);
  }
}
