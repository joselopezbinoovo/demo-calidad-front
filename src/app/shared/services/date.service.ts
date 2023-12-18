import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateService {

    constructor() { }

    public secondsToString(seconds: number): string {
        let hour: number | string = Math.floor(seconds / 3600);
        hour = (hour < 10) ? `0${hour}` : hour;

        let minute: number | string = Math.floor((seconds / 60) % 60);
        minute = (minute < 10) ? `0${minute}` : minute;

        let second: number | string = seconds % 60;
        second = (second < 10) ? `0${second}` : second;

        return `${hour}:${minute}:${second}`;
    }

    public getDate(inputDate: string = ''): string {
        const date = new Date();
        const dateTimeFormat = new Intl.DateTimeFormat('es', { year: 'numeric', month: '2-digit', day: '2-digit' });
        // const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date);
        // return `${day}/${month}/${year}`;
        return dateTimeFormat.format(date);
    }

    public getDiffDate(startDate, endDate): number {
        const date1 = new Date(startDate).getTime();
        const date2 = new Date(endDate).getTime();
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (60 * 60 * 24));
        // console.log(diffTime + ' milliseconds');
        // console.log(diffDays + ' days');
        // const str = this.secondsToString(diffTime * 1000);
        // console.log(str);
        return Math.floor(diffTime / 1000);
    }

    public getTimeFromEpoch(date): number {
        const epoch = new Date(1970, 0, 1).getTime();
        const date1 = new Date(date).getTime();

        const diffTime = Math.abs(date1 - epoch);

        return Math.floor(diffTime);
    }

    public setTimeElapsedEpoch(seconds): number {
        // const timeElapsed = new Date(1970, 0, 1).setSeconds(seconds)
        // timeElapsed.setSeconds(seconds);
        // return timeElapsed;
        return new Date(1970, 0, 1).setSeconds(seconds);
    }

    public getTomorrow(): number {
        // const today = new Date();
        // const tomorrow = new Date(today);
        // return tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrow = new Date();
        return tomorrow.setDate(new Date().getDate() + 1);
    }
}