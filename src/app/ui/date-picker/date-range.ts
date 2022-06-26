export class DateRange {
    constructor(private _start: string, private _end: string) {
    }

    get start(): Date {
        return new Date(this._start);
    }

    get end(): Date {
        return new Date(this._end);
    }
}