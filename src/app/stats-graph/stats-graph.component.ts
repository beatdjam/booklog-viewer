import {Component, OnInit} from '@angular/core';
import {map} from "rxjs";
import {StatusCountViewModel} from "../status-count/status-count.viewmodel";
import {BooklogItemsQuery} from "../state/booklog-items/booklog-items.query";

@Component({
    selector: 'app-stats-graph',
    templateUrl: './stats-graph.component.html',
    styleUrls: ['./stats-graph.component.scss']
})
export class StatsGraphComponent implements OnInit {
    state$ = this.booklogItemsQuery.selectAll()
        .pipe(map(items => new StatusCountViewModel(items)));

    constructor(private booklogItemsQuery: BooklogItemsQuery) {
    }

    ngOnInit(): void {
    }
}

