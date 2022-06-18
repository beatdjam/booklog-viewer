import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
// FIXME: これを消すと何故かテストが動かなくなる
import {parse} from "csv-parse/sync";

@Component({
    selector: 'app-file-upload-form',
    templateUrl: './file-upload-form.component.html',
    styleUrls: ['./file-upload-form.component.scss']
})
export class FileUploadFormComponent {
    form = this.fb.group({file: ['', [Validators.required]]});
    file: File | null = null;
    @Output() fileString: EventEmitter<string> = new EventEmitter<string>();

    constructor(private fb: FormBuilder) {
    }

    get f() {
        return this.form.controls;
    }

    onFileChange(event: any) {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
        }
    }

    submit() {
        this.readAsText(this.file!).then(result => this.fileString.emit(result)    );
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

