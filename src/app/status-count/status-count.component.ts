import {Component, OnInit} from '@angular/core';
import {map} from "rxjs";
import {BooklogItem} from "../state/booklog-items/booklog-item.model";
import {BooklogItemsQuery} from "../state/booklog-items/booklog-items.query";

@Component({
    selector: 'app-status-count',
    templateUrl: './status-count.component.html',
    styleUrls: ['./status-count.component.scss']
})
export class StatusCountComponent implements OnInit {
    itemCount$ = this.booklogItemsQuery.selectAll()
        .pipe(map(items => this.countByStatus(items)));

    private countByStatus(items: BooklogItem[]) {
        const count = new Map<string, number>();
        items.forEach(item => {
            if (count.get(item.status)) {
                count.set(item.status, count.get(item.status)! + 1);
            } else {
                count.set(item.status, 1);
            }
        });
        return count;
    }

    constructor(private booklogItemsQuery: BooklogItemsQuery) {
    }

    ngOnInit(): void {
    }
}
