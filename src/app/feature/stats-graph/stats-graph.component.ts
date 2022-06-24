import {Component, Input, SimpleChanges} from '@angular/core';
import {filter, map, Subject, combineLatest} from "rxjs";
import {BooklogItemsQuery} from "../../state/booklog-items/booklog-items.query";
import {StatusGraphViewModel} from "./status-graph.viewmodel";
import {DateRange} from "../../ui/date-picker/date-picker.component";

@Component({
    selector: 'app-stats-graph',
    templateUrl: './stats-graph.component.html',
    styleUrls: ['./stats-graph.component.scss']
})
export class StatsGraphComponent {
    state$ = this.booklogItemsQuery.selectAll()
        .pipe(
            filter(items => items.length > 0),
            map(items => {
                if (this.dateRange === null) {
                    return items;
                } else {
                    return items.filter(item => this.dateRange!.start <= item.createAt && item.createAt <= this.dateRange!.end );
                }
            }),
            map(items => new StatusGraphViewModel(items))
        );

    @Input() dateRange: DateRange | null = null;

    constructor(private booklogItemsQuery: BooklogItemsQuery) {
    }

    ngOnChanges(changes: SimpleChanges) {
        // TODO 検知した変更をstateに流す
        const dateRange = changes['dateRange'].currentValue as DateRange | null;
        console.log(dateRange);
    }
}

