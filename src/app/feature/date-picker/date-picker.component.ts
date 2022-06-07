import {Component} from '@angular/core';
import {DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter} from "@angular/material/core";

class MyDateAdapter extends NativeDateAdapter {
    override getDateNames(): string[] {
        return [...Array(31).keys()].map(i => String(i + 1));
    }
}

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
        {provide: DateAdapter, useClass: MyDateAdapter},
    ],
})
export class DatePickerComponent {
}


