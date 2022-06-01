import {ChartData} from "chart.js";
import {BooklogItem} from "../../model/booklog-item";

export class StatusCountViewModel {
    public chartData: ChartData;
    public itemCount: Map<string, number>;

    constructor(items: BooklogItem[]) {
        this.itemCount = this.countByStatus(items);
        this.chartData = {
            labels: [...this.itemCount.keys()],
            datasets: [{data: [...this.itemCount.values()]},]
        };
    }

    private countByStatus(items: BooklogItem[]) {
        const count = new Map<string, number>();
        items.forEach(item => count.set(item.status, (count.get(item.status) ?? 0) + 1));
        return count;
    }
}