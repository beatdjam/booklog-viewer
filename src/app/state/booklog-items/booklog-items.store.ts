import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import {BooklogItem} from "../../model/booklog-item";

export interface BooklogItemsState extends EntityState<BooklogItem> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'BooklogItems',
  idKey: 'itemId'
})
export class BooklogItemsStore extends EntityStore<BooklogItemsState> {
  constructor() {
    super();
  }
}
