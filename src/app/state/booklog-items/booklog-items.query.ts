import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BooklogItemsStore, BooklogItemsState } from './booklog-items.store';

@Injectable({ providedIn: 'root' })
export class BooklogItemsQuery extends QueryEntity<BooklogItemsState> {
  constructor(override store: BooklogItemsStore) {
    super(store);
  }
}
