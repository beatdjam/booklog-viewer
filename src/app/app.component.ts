import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {parse} from 'csv-parse';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    form = this.fb.group({file: ['', [Validators.required]]});
    file: File | null = null;
    input = "";

    constructor(private fb: FormBuilder) {
    }

    get f() {
        return this.form.controls;
    }

    ngOnInit() {
    }

    onFileChange(event: any) {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
        }
    }

    submit() {
        this.readAsText(this.file!).then(result => {
            parse(result).on('data', (data) => {
                const array = data as string[];
                const item = new Item(
                    array[0],
                    array[1],
                    array[2],
                    array[3],
                    array[4],
                    array[5],
                    array[6],
                    array[7],
                    array[8],
                    array[9],
                    array[10],
                    array[11],
                    array[12],
                    array[13],
                    array[14],
                    array[15],
                    array[16],
                );
                console.log(item);
            });
        })
    }

    // csv読み込み
    private readAsText(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(reader.error);
            reader.readAsText(file, 'shift-jis');
        });
    }
}

export class Item {
    constructor(
        public serviceId: string,
        public itemId: string,
        public isbn13: string,
        public category: string,
        public rank: string,
        public status: string,
        public reviewComment: string,
        public tags: string,
        public memo: string,
        public createAt: string,
        public readAt: string,
        public title: string,
        public author: string,
        public publisher: string,
        public publishedAt: string,
        public genre: string,
        public pages: string,
    ) {
    }
}