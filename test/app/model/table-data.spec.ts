import {BooklogItem} from "../../../src/app/model/booklog-item";
import {TableData} from "../../../src/app/model/table-data";

describe('TableData', () => {
    it('BooklogItem[]から描画用のデータが生成できる', () => {
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
                "2020-03-21 19:25:23",
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
                "2020-08-21 19:25:23",
                "0000-00-00 00:00:00",
                "Java言語で学ぶデザインパターン入門",
                "結城 浩",
                "ソフトバンククリエイティブ",
                "",
                "本",
                "480"
            )
        ];
        const actual = new TableData(booklogItems, new Date(2021, 2, 1));
        const expectedLabel = [
            '2020-02',
            '2020-03',
            '2020-04',
            '2020-05',
            '2020-06',
            '2020-07',
            '2020-08',
            '2020-09',
            '2020-10',
            '2020-11',
            '2020-12',
            '2021-01',
            '2021-02'
        ];

        const expectedDataSets = [
            {
                data: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                label: '積読',
                stack: 'a',
                sum: 1
            },
            {
                data: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                label: '未設定',
                stack: 'a',
                sum: 1
            },
            {
                data: [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                label: '読み終わった',
                stack: 'a',
                sum: 2
            }
        ];

        const expectedSumRow = {
            data: [2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            label: '',
            stack: '',
            sum: 4
        };

        expect(actual.labels).toEqual(expectedLabel);
        expect(actual.dataSets).toEqual(expectedDataSets);
        expect(actual.sumRow).toEqual(expectedSumRow);
    });
});
