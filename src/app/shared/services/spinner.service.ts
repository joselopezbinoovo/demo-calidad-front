import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    showSpinner: BehaviorSubject<boolean>;
    constructor() {
        this.showSpinner = new BehaviorSubject<boolean>(false);
    }

    show(): void {
        this.showSpinner.next(true);
    }

    hide(): void {
        this.showSpinner.next(false);
    }

}
