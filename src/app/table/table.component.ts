import {Component, OnInit} from '@angular/core';
import {BooklogItem} from "../state/booklog-items/booklog-item.model";
import {filter, map} from "rxjs";
import {BooklogItemsQuery} from "../state/booklog-items/booklog-items.query";

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

type HeaderLabel = { year: string, month: string }
type TableDataRow = { data: number[]; label: string; stack: string; sum: number };

class TableViewModel {
    public headers: HeaderLabel[]
    public dataSets: TableDataRow[];
    public sumRow: TableDataRow;

    constructor(items: BooklogItem[]) {
        const sorted = items.sort((a, b) => {
            if (a.createAt > b.createAt) return 1;
            if (a.createAt < b.createAt) return -1;
            return 0;
        });

        const labels = TableViewModel.createMonthLabels(sorted);
        this.headers = this.createHeader(labels);
        this.dataSets = this.createDataSets(items, labels);
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

    /**
     * 月・ステータス別のデータセットを作成する
     * FIXME 共通化する
     */
    private createDataSets(items: BooklogItem[], labels: string[]) {
        // statusの一覧
        const datasetLabels = [...new Set(items.map(item => item.status))];
        return datasetLabels.map(datasetLabel => {
            const filteredByStatus = items.filter(item => item.status === datasetLabel);
            const data = labels.map(label => filteredByStatus.filter(item => item.createAt.indexOf(label) === 0).length);
            return {
                data: data,
                label: datasetLabel,
                stack: 'a',
                sum: data.reduce((a, b) => a + b, 0)
            };
        });
    }

    /**
     * 配列内に存在する最古から現在時点までの月ラベルを作成する
     * FIXME 共通化する
     */
    private static createMonthLabels(sorted: BooklogItem[]): string[] {
        const labels: string[] = [];
        const oldestDate = new Date(sorted[0]?.createAt);
        const now = new Date();
        let currentDate = new Date(oldestDate.getFullYear(), oldestDate.getMonth(), 1);
        while (currentDate < now) {
            const month = ('00' + (currentDate.getMonth() + 1)).slice(-2)
            labels.push(`${currentDate.getFullYear()}-${month}`);
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        }
        return labels;
    }
}