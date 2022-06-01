import {ChartData} from "chart.js";
import {BooklogItem} from "../../model/booklog-item";
import {TableData} from "../../model/table-data";

export class StatusGraphViewModel {
    public chartData: ChartData;

    constructor(items: BooklogItem[]) {
        const tableData = new TableData(items, new Date());
        this.chartData = {
            labels: tableData.labels,
            datasets: tableData.dataSets
        };
    }
}