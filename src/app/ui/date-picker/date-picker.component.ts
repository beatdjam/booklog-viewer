import {Component, EventEmitter, Output} from '@angular/core';
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {MyDateAdapter} from "./my-date.adapter";
import {DateRange} from "./date-range";

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
    @Output() dateRange: EventEmitter<DateRange | null> = new EventEmitter<DateRange | null>();

    startDate: string = "";
    endDate: string = "";

    dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
        if (!!dateRangeStart.value && !!dateRangeEnd.value) {
            this.dateRange.emit(new DateRange(dateRangeStart.value, dateRangeEnd.value));
        }
    }

    reset() {
        this.startDate = "";
        this.endDate = "";
        this.dateRange.emit(null);
    }
}

