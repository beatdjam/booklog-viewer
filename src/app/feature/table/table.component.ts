import {Component, OnInit} from '@angular/core';
import {BooklogItem} from "../../state/booklog-items/booklog-item.model";
import {filter, map} from "rxjs";
import {BooklogItemsQuery} from "../../state/booklog-items/booklog-items.query";
import {createDataSets, createMonthLabels, sortByCreatedAt} from "../../util/BooklogItemUtil";
import {TableDataRow} from "../../model/tableDataRow";
import {HeaderLabel} from "../../model/headerLabel";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    state$ = this.booklogItemsQuery.selectAll()
        .pipe(
            filter(items => items.length > 0),
            map(items => new TableViewModel(items))
        );

    constructor(private booklogItemsQuery: BooklogItemsQuery) {
    }

    ngOnInit(): void {
    }
}

class TableViewModel {
    public headers: HeaderLabel[]
    public dataSets: TableDataRow[];
    public sumRow: TableDataRow;

    constructor(items: BooklogItem[]) {
        const sorted = sortByCreatedAt(items);
        const labels = createMonthLabels(sorted);
        this.headers = this.createHeader(labels);
        this.dataSets = createDataSets(items, labels);
        this.sumRow = this.createSumRow(this.dataSets);
    }

    /**
     * 合計行作成
     */
    private createSumRow(dataSets: TableDataRow[]) {
        // data部分の集計
        const sumData: number[] = [];
        const length = dataSets[0]?.data.length;
        for (let index = 0; index < length; index++) {
            const sum = dataSets.map(dataSet => dataSet.data[index]).reduce((a, b) => a + b, 0);
            sumData.push(sum);
        }
        // 合計部分の集計
        const sums = dataSets.map(dataSet => dataSet.sum).reduce((a, b) => a + b, 0);
        return {
            data: sumData,
            label: "",
            stack: '',
            sum: sums
        };
    }

    /**
     * データの先頭か1月の場合はラベルに西暦年をつける
     */
    private createHeader(label: string[]) {
        return label.map((l, i) => {
            const [year, month] = l.split("-");
            const dispYear = i === 0 || month === "01" ? year : "";
            return {
                year: dispYear,
                month: parseInt(month).toString()
            }
        });
    }
}