import {Component} from '@angular/core';
import {filter, map} from "rxjs";
import {BooklogItemsQuery} from "../../state/booklog-items/booklog-items.query";
import {StatusGraphViewModel} from "./status-graph.viewmodel";

@Component({
    selector: 'app-stats-graph',
    templateUrl: './stats-graph.component.html',
    styleUrls: ['./stats-graph.component.scss']
})
export class StatsGraphComponent {
    state$ = this.booklogItemsQuery.selectAll()
        .pipe(
            filter(items => items.length > 0),
            map(items => new StatusGraphViewModel(items))
        );

    constructor(private booklogItemsQuery: BooklogItemsQuery) {
    }
}

