import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(
        private injector: Injector,
        private ngZone: NgZone
    ) { }

    handleError(wrapperError) {
/* 
        this.ngZone.run(() => {
            const data = wrapperError.rejection ? wrapperError.rejection : wrapperError;

            let error = 'unknown error';
            if (typeof (data) === 'string') {
                error = data;
            } else if (data.error?.error) {
                error = data.error.error.message;
            } else if (data.error) {
                error = data.error;
            }

            this.injector.get(ToastrService).error(error);
        });

 */
    }

}
