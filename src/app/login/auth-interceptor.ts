import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { SpinnerService } from '../shared/services/spinner.service';
import { LoginService } from '../shared/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private spinnerService: SpinnerService,
    private loginService: LoginService
  ) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //this.spinnerService.show();
    const router: Router = this.injector.get(Router);

    if (request.url.match(/login/)) {
      return next.handle(request);
    }

    const token = localStorage.getItem('token');
    if (!token) {
      router.navigate(['']);
      return EMPTY;
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next
      .handle(request)
      .pipe(
        catchError(response => {
          this.spinnerService.hide();
          console.log('response status', response.status);

          if (response.status === 400) {
            this.loginService.logoutUser()
            /* router.navigate(['/']);
            return EMPTY; */
          }

          return throwError(response);
        })
      )
      .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this.spinnerService.hide();
        }
        return evt;
      }));
  }
}
