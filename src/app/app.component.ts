import {Component, OnInit} from '@angular/core';
import {DateRange} from "./ui/date-picker/date-picker.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    dateChange($event: DateRange) {
        console.log($event);
    }
}

