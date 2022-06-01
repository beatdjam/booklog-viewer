import {HeaderLabel} from "../../model/header-label";
import {TableData} from "../../model/table-data";
import {BooklogItem} from "../../model/booklog-item";

export class TableViewModel {
    public headers: HeaderLabel[]
    public tableData: TableData;

    constructor(items: BooklogItem[]) {
        this.tableData = new TableData(items, new Date());
        this.headers = this.createHeader(this.tableData.labels);
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