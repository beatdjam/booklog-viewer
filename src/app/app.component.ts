import {Component} from '@angular/core';
import {parse} from "csv-parse/sync";
import {BooklogItemsStore} from "./state/booklog-items/booklog-items.store";
import {BooklogItem} from "./model/booklog-item";
import {DateRange} from "./ui/date-picker/date-range";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    dateRange: DateRange | null = null;

    constructor(private itemStore: BooklogItemsStore) {
    }

    dateChange($event: DateRange) {
        this.dateRange = $event;
    }

    uploadFile($event: string) {
        try {
            this.itemStore.set(this.parseCSV($event));
        } catch (e) {
            // FIXME エラー時はトーストとか出したいけど暫定的にalert
            alert(e);
        }
    }

    private parseCSV(result: string): BooklogItem[] {
        const records = parse(result) as string[][];
        return records.map(record => {
            return new BooklogItem(
                record[0],
                record[1],
                record[2],
                record[3],
                record[4],
                record[5],
                record[6],
                record[7],
                record[8],
                new Date(record[9]),
                new Date(record[10]),
                record[11],
                record[12],
                record[13],
                new Date(record[14]),
                record[15],
                record[16],
            )
        });
    }
}

