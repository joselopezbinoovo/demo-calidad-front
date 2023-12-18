import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { XBveEmpleadosFields } from 'src/app/shared/modules/api-client/model/xBveEmpleadosFields';
import { XBveEmpleadosControllerService } from 'src/app/shared/modules/api-client/api/api';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
export interface ILoginRequest {
  user: string;
  pin: string;
}

@Injectable({
  providedIn: 'root',
})

export class LoginService {

  public isAuthenticated$: BehaviorSubject<boolean>;
  public loggedUser$: BehaviorSubject<any>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private router: Router,
    private xBveEmpleadosControllerService: XBveEmpleadosControllerService,
    private snackBar: MatSnackBar,
  ) {
    this.isAuthenticated$ = new BehaviorSubject<boolean>(this.isAuthenticated());
    this.loggedUser$ = new BehaviorSubject<any>(this.getEmpleado());
  }

  public loginUser(request: ILoginRequest) {
    this.xBveEmpleadosControllerService.xBveEmpleadosControllerLogin(request)
      .subscribe((response) => {
        localStorage.setItem('token', response.token);
        this.xBveEmpleadosControllerService.xBveEmpleadosControllerChecktoken(response.token)
          .subscribe((user) => {
            localStorage.setItem('user', JSON.stringify(user));
            this.isAuthenticated$.next(true);
            this.loggedUser$.next(user);
            this.router.navigate(['home']);
          }, error => console.log('error'));
      }, error => {
        this.snackBar.open(`El usuario o la contraseña son incorrectos`, '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: 'error'
        });
      });
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  public logoutUser(): void {
    localStorage.clear();
    this.isAuthenticated$.next(false);
    this.loggedUser$.next(null);
    this.router.navigate(['/']);
  }

  public getEmpleado(): XBveEmpleadosFields {
    const userRaw = localStorage.getItem('user');
    return userRaw ? JSON.parse(userRaw) : null;
  }

}
