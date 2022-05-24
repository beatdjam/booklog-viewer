import {ChartData} from "chart.js";
import {BooklogItem} from "../../state/booklog-items/booklog-item.model";
import {createDataSets, createMonthLabels, sortByCreatedAt} from "../../util/BooklogItemUtil";

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