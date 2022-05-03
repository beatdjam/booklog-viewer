import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

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
            // TODO タグとか入ってる項目があるのでcsvのパースは自前じゃなくてなんかのライブラリ使う
            const items = result.split('\r\n').map(row => {
                const r = row.split(",").map(value => value.substring(1, value.length - 1));
                return new Item(
                    r[0],
                    r[1],
                    r[2],
                    r[3],
                    r[4],
                    r[5],
                    r[6],
                    r[7],
                    r[8],
                    r[9],
                    r[10],
                    r[11],
                    r[12],
                    r[13],
                    r[14],
                    r[15],
                    r[16]);
            });
            return this.input = items.map(item => item.title).join('\r\n ');
        })
    }

    // csv読み込み
    private readAsText(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = () => {
                reject(reader.error);
            };
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