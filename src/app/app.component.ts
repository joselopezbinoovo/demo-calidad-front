import { Component, OnInit } from '@angular/core';
import { XBveEmpleadosControllerService } from './shared/modules/api-client';
import { LoginService } from './shared/services/login.service';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bsi-qf-front';
  showSpinner: boolean;

  constructor(
    public spinnerService: SpinnerService,
    private loginService: LoginService,
    private xBveEmpleadosControllerService: XBveEmpleadosControllerService
  ) {}

  ngOnInit(): void {
    this.isLogged();
    this.spinnerService.showSpinner.subscribe(spinnerFlag => {
      setTimeout(() => this.showSpinner = spinnerFlag, 0);
    });
  }

  isLogged() {
    const login = this.loginService.isAuthenticated();
    if (login) {
      const token = localStorage.getItem('token');
      this.xBveEmpleadosControllerService
        .xBveEmpleadosControllerChecktoken(token)
        .subscribe(
          (resp) => {
            console.log(resp)
          },
          (error) => {
            console.log(error);
            this.loginService.logoutUser();
          }
        );
    }
  }

}
