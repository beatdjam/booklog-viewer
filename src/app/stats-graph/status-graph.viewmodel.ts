import {ChartData} from "chart.js";
import {BooklogItem} from "../state/booklog-items/booklog-item.model";

export class StatusGraphViewModel {
    public chartData: ChartData;

    constructor(items: BooklogItem[]) {
        const sorted = items.sort((a, b) => {
            if (a.createAt > b.createAt) return 1;
            if (a.createAt < b.createAt) return -1;
            return 0;
        });
        const labels = StatusGraphViewModel.createMonthLabels(sorted);
        this.chartData = {
            labels: labels,
            datasets: this.createDataSets(items, labels)
        };
    }

    /**
     * 月・ステータス別のデータセットを作成する
     */
    private createDataSets(items: BooklogItem[], labels: string[]) {
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

    /**
     * 配列内に存在する最古から現在時点までの月ラベルを作成する
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