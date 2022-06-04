import {Component} from '@angular/core';
import {filter, map} from "rxjs";
import {BooklogItemsQuery} from "../../state/booklog-items/booklog-items.query";
import {TableViewModel} from "./table.viewmodel";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent {
    state$ = this.booklogItemsQuery.selectAll()
        .pipe(
            filter(items => items.length > 0),
            map(items => new TableViewModel(items))
        );

    constructor(private booklogItemsQuery: BooklogItemsQuery) {
    }
}