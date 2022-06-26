import {Component, Input, SimpleChanges} from '@angular/core';
import {combineLatest, map, Subject} from "rxjs";
import {BooklogItemsQuery} from "../../state/booklog-items/booklog-items.query";
import {StatusGraphViewModel} from "./status-graph.viewmodel";
import {DateRange} from "../../ui/date-picker/date-range";

@Component({
    selector: 'app-stats-graph',
    templateUrl: './stats-graph.component.html',
    styleUrls: ['./stats-graph.component.scss']
})
export class StatsGraphComponent {
    private dateRangeSubject = new Subject<DateRange | null>();
    state$ = combineLatest([this.booklogItemsQuery.selectAll(), this.dateRangeSubject.asObservable()])
        .pipe(
            map(([items, dateRange]) => items.filter(item => dateRange === null || (dateRange.start <= item.createAt && item.createAt <= dateRange.end))),
            map(items => new StatusGraphViewModel(items)) // TODO toDateを渡す
        )
    @Input() dateRange: DateRange | null = null;

    constructor(private booklogItemsQuery: BooklogItemsQuery) {
        this.dateRangeSubject.next(null);
    }

    ngOnChanges(changes: SimpleChanges) {
        const dateRange = changes['dateRange'].currentValue as DateRange | null;
        this.dateRangeSubject.next(dateRange);
    }
}

