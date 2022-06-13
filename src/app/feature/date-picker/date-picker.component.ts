import {Component, EventEmitter, Output} from '@angular/core';
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {MyDateAdapter} from "./my-date.adapter";

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
    @Output() dateRange: EventEmitter<DateRange> = new EventEmitter<DateRange>();
    dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
        if(!!dateRangeStart.value && !!dateRangeEnd.value) {
            this.dateRange.emit({start: dateRangeStart.value, end:dateRangeEnd.value})
        }
    }
}

export type DateRange = {
    start: string,
    end: string
}

