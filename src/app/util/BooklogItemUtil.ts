import {TableDataRow} from "../model/TableDataRow";
import {BooklogItem} from "../model/BooklogItem";

// Note: 親オブジェクト作ってそこに持たせるか悩んでる
/**
 * 配列内に存在する最古から現在時点までの月ラベルを作成する
 */

export function createMonthLabels(sorted: BooklogItem[]): string[] {
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

/**
 * 月・ステータス別のデータセットを作成する
 */
export function createDataSets(items: BooklogItem[], labels: string[]): TableDataRow[] {
    // statusの一覧
    const datasetLabels = [...new Set(items.map(item => item.status))];
    return datasetLabels.map(datasetLabel => {
        const filteredByStatus = items.filter(item => item.status === datasetLabel);
        const data = labels.map(label => filteredByStatus.filter(item => item.createAt.indexOf(label) === 0).length);
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
export function summariseDataRow(dataSets: TableDataRow[]): TableDataRow {
    // data部分の集計
    const sumData: number[] = [];
    const length = dataSets[0]?.data.length;
    for (let index = 0; index < length; index++) {
        const sum = dataSets.map(dataSet => dataSet.data[index]).reduce((a, b) => a + b, 0);
        sumData.push(sum);
    }
    // 合計部分の集計
    const sums = dataSets.map(dataSet => dataSet.sum).reduce((a, b) => a + b, 0);
    return {
        data: sumData,
        label: "",
        stack: '',
        sum: sums
    };
}

// TODO QueryEntityのsortBy, sortByOrderに書き換える
export function sortByCreatedAt(items: BooklogItem[]): BooklogItem[] {
    return items.sort((a, b) => {
        if (a.createAt > b.createAt) return 1;
        if (a.createAt < b.createAt) return -1;
        return 0;
    });
}