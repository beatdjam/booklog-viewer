import {ChartData} from "chart.js";
import {BooklogItem} from "../../model/BooklogItem";
import {TableData} from "../../model/TableData";

export class StatusGraphViewModel {
    public chartData: ChartData;

    constructor(items: BooklogItem[]) {
        const tableData = new TableData(items);
        this.chartData = {
            labels: tableData.labels,
            datasets: tableData.dataSets
        };
    }
}