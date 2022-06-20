import {Component} from '@angular/core';
import {DateRange} from "./ui/date-picker/date-picker.component";
import {parse} from "csv-parse/sync";
import {Item} from "./ui/file-upload-form/file-upload-form.model";
import {BooklogItemsStore} from "./state/booklog-items/booklog-items.store";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private itemStore: BooklogItemsStore) {
    }

    dateChange($event: DateRange) {
        // TODO DatePickerの変更を受け取る
        console.log($event);
    }

    uploadFile($event: string) {
        // TODO エラー時の通知考える
        this.itemStore.set(this.parseCSV($event));
    }

    // TODO エラーハンドリング
    private parseCSV(result: string): Item[] {
        try {
            const records = parse(result) as string[][];
            return records.map(record => {
                return new Item(
                    record[0],
                    record[1],
                    record[2],
                    record[3],
                    record[4],
                    record[5],
                    record[6],
                    record[7],
                    record[8],
                    record[9],
                    record[10],
                    record[11],
                    record[12],
                    record[13],
                    record[14],
                    record[15],
                    record[16],
                )
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}

