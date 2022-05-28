import {BooklogItem} from "../../state/booklog-items/booklog-item.model";
import {createDataSets, createMonthLabels, sortByCreatedAt, summariseDataRow} from "../../util/BooklogItemUtil";
import {HeaderLabel} from "../../model/HeaderLabel";
import {TableDataRow} from "../../model/TableDataRow";

export class TableViewModel {
    public headers: HeaderLabel[]
    public dataSets: TableDataRow[];
    public sumRow: TableDataRow;

    constructor(items: BooklogItem[]) {
        const sorted = sortByCreatedAt(items);
        const labels = createMonthLabels(sorted);
        this.headers = this.createHeader(labels);
        this.dataSets = createDataSets(items, labels);
        this.sumRow = summariseDataRow(this.dataSets);
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