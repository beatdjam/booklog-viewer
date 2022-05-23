import {ChartData} from "chart.js";
import {BooklogItem} from "../../state/booklog-items/booklog-item.model";
import {createMonthLabels} from "../../util/BooklogItemUtil";

export class StatusGraphViewModel {
    public chartData: ChartData;

    constructor(items: BooklogItem[]) {
        const sorted = items.sort((a, b) => {
            if (a.createAt > b.createAt) return 1;
            if (a.createAt < b.createAt) return -1;
            return 0;
        });
        const labels = createMonthLabels(sorted);
        this.chartData = {
            labels: labels,
            datasets: this.createDataSets(items, labels)
        };
    }

    /**
     * 月・ステータス別のデータセットを作成する
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
                stack: 'a'
            };
        });
    }
}