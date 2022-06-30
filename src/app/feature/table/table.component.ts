import {Component, Input, SimpleChanges} from '@angular/core';
import {combineLatest, filter, map, Subject} from "rxjs";
import {BooklogItemsQuery} from "../../state/booklog-items/booklog-items.query";
import {TableViewModel} from "./table.viewmodel";
import {DateRange} from "../../ui/date-picker/date-range";
import {StatusGraphViewModel} from "../stats-graph/status-graph.viewmodel";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent {
    private dateRangeSubject = new Subject<DateRange | null>();
    state$ = combineLatest([this.booklogItemsQuery.selectAll(), this.dateRangeSubject.asObservable()])
        .pipe(
            map(([items, dateRange]) => items.filter(item => dateRange === null || (dateRange.start <= item.createAt && item.createAt <= dateRange.end))),
            map(items =>  new TableViewModel(items))
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