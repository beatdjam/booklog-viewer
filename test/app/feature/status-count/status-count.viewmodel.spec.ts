import {StatusCountViewModel} from "../../../../src/app/feature/status-count/status-count.viewmodel";
import {BooklogItem} from "../../../../src/app/model/booklog-item";

describe('StatusCountViewModel', () => {
    it('BooklogItem[]からグラフ表示用のデータが生成できる', () => {
        const booklogItems: BooklogItem[] = [
            new BooklogItem(
                "1",
                "4822283585",
                "9784822283582",
                "",
                "",
                "積読",
                "",
                "設計",
                "",
                "2020-02-21 19:25:07",
                "0000-00-00 00:00:00",
                "UMLモデリング入門",
                "児玉 公信",
                "日経BP",
                "2008",
                "本",
                "289",
            ),
            new BooklogItem(
                "1",
                "4797316462",
                "9784797316469",
                "",
                "",
                "未設定",
                "",
                "設計,Java",
                "",
                "2020-02-21 19:25:23",
                "0000-00-00 00:00:00",
                "Java言語で学ぶデザインパターン入門",
                "結城 浩",
                "ソフトバンククリエイティブ",
                "",
                "本",
                "480"
            ),
            new BooklogItem(
                "1",
                "4797316464",
                "9784797316465",
                "",
                "",
                "読み終わった",
                "",
                "設計,Java",
                "",
                "2020-02-21 19:25:23",
                "0000-00-00 00:00:00",
                "Java言語で学ぶデザインパターン入門",
                "結城 浩",
                "ソフトバンククリエイティブ",
                "",
                "本",
                "480"
            ),
            new BooklogItem(
                "1",
                "4797316464",
                "9784797316465",
                "",
                "",
                "読み終わった",
                "",
                "設計,Java",
                "",
                "2020-02-21 19:25:23",
                "0000-00-00 00:00:00",
                "Java言語で学ぶデザインパターン入門",
                "結城 浩",
                "ソフトバンククリエイティブ",
                "",
                "本",
                "480"
            )
        ];
        const actual = new StatusCountViewModel(booklogItems);
        const expectedItemCount = new Map([
            ["積読", 1],
            ["未設定", 1],
            ["読み終わった", 2],
        ]);
        const expectedChartData = {
            labels: ["積読", "未設定", "読み終わった"],
            datasets: [{data: [1, 1, 2],}]
        }

        expect(actual.itemCount).toEqual(expectedItemCount);
        expect(actual.chartData).toEqual(expectedChartData);
    });
});
