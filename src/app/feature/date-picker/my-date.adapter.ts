import {NativeDateAdapter} from "@angular/material/core";

export class MyDateAdapter extends NativeDateAdapter {
    override getDateNames(): string[] {
        return [...Array(31).keys()].map(i => String(i + 1));
    }
}