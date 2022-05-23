import {BooklogItem} from "../state/booklog-items/booklog-item.model";

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