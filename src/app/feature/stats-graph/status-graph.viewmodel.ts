import {ChartData} from "chart.js";
import {createDataSets, createMonthLabels, sortByCreatedAt} from "../../util/BooklogItemUtil";
import {BooklogItem} from "../../model/BooklogItem";

export class StatusGraphViewModel {
    public chartData: ChartData;

    constructor(items: BooklogItem[]) {
        const sorted = sortByCreatedAt(items);
        const labels = createMonthLabels(sorted);
        this.chartData = {
            labels: labels,
            datasets: createDataSets(items, labels)
        };
    }
}