import {BooklogItem} from "./booklog-item";

export class TableData {
    public labels: string[];
    public dataSets: TableDataRow[];
    public sumRow: TableDataRow;
    
    constructor(private items: BooklogItem[], now: Date) {
       this.labels = this.createMonthLabels(now);
       this.dataSets = this.createDataSets();
       this.sumRow = this.summariseDataRow();
    }

    /**
     * 配列内に存在する最古から現在時点までの月ラベルを作成する
     */
    private createMonthLabels(toDate: Date): string[] {
        const labels: string[] = [];

        const oldestDate = new Date(this.items[0]?.createAt);
        let currentDate = new Date(oldestDate.getFullYear(), oldestDate.getMonth(), 1);
        while (currentDate < toDate) {
            const month = ('00' + (currentDate.getMonth() + 1)).slice(-2)
            labels.push(`${currentDate.getFullYear()}-${month}`);
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        }
        return labels;
    }

    /**
     * 月・ステータス別のデータセットを作成する
     */
    private createDataSets(): TableDataRow[] {
        // statusの一覧
        const datasetLabels = [...new Set(this.items.map(item => item.status))];
        return datasetLabels.map(datasetLabel => {
            const filteredByStatus = this.items.filter(item => item.status === datasetLabel);
            const data = this.labels.map(label => filteredByStatus.filter(item => item.createAt.indexOf(label) === 0).length);
            return {
                data: data,
                label: datasetLabel,
                stack: 'a',
                sum: data.reduce((a, b) => a + b, 0)
            };
        });
    }

    /**
     * 合計行作成
     */
    private summariseDataRow(): TableDataRow {
        // data部分の集計
        const sumData: number[] = [];
        const length = this.dataSets[0]?.data.length;
        for (let index = 0; index < length; index++) {
            const sum = this.dataSets.map(dataSet => dataSet.data[index]).reduce((a, b) => a + b, 0);
            sumData.push(sum);
        }
        // 合計部分の集計
        const sums = this.dataSets.map(dataSet => dataSet.sum).reduce((a, b) => a + b, 0);
        return {
            data: sumData,
            label: "",
            stack: '',
            sum: sums
        };
    }
}
type TableDataRow = { data: number[]; label: string; stack: string; sum: number };