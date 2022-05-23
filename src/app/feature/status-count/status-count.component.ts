import {Component, OnInit} from '@angular/core';
import {map} from "rxjs";
import {BooklogItemsQuery} from "../../state/booklog-items/booklog-items.query";
import {StatusCountViewModel} from "./status-count.viewmodel";

@Component({
    selector: 'app-status-count',
    templateUrl: './status-count.component.html',
    styleUrls: ['./status-count.component.scss']
})
export class StatusCountComponent implements OnInit {
    state$ = this.booklogItemsQuery.selectAll()
        .pipe(map(items => new StatusCountViewModel(items)));

    constructor(private booklogItemsQuery: BooklogItemsQuery) {
    }

    ngOnInit(): void {
    }
}

