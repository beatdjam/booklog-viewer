import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {parse} from "csv-parse/sync";
import {Item} from "./file-upload-form.model";
import {BooklogItemsStore} from "../../state/booklog-items/booklog-items.store";

@Component({
    selector: 'app-file-upload-form',
    templateUrl: './file-upload-form.component.html',
    styleUrls: ['./file-upload-form.component.scss']
})
export class FileUploadFormComponent {
    form = this.fb.group({file: ['', [Validators.required]]});
    file: File | null = null;

    constructor(private fb: FormBuilder, private itemStore: BooklogItemsStore) {
    }

    get f() {
        return this.form.controls;
    }

    onFileChange(event: any) {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
        }
    }

    // TODO fileのsubmit以降の処理を剥がしてuiの責務だけにする
    submit() {
        this.readAsText(this.file!).then(result => this.itemStore.set(this.parseCSV(result)));
    }

    private parseCSV(result: string) {
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
    }

    // アップロードされたファイルを読み込み、テキストとして返す
    private readAsText(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(reader.error);
            reader.readAsText(file, 'shift-jis');
        });
    }
}

