import {ChartData} from "chart.js";
import {createDataSets, createMonthLabels} from "../../util/BooklogItemUtil";
import {BooklogItem} from "../../model/BooklogItem";

export class StatusGraphViewModel {
    public chartData: ChartData;

    constructor(items: BooklogItem[]) {
        const labels = createMonthLabels(items);
        this.chartData = {
            labels: labels,
            datasets: createDataSets(items, labels)
        };
    }
}