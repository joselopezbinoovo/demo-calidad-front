import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderService, IHeaderParam } from '../../services/header.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { XBveEmpleadosFields } from 'src/app/shared/modules/api-client/model/xBveEmpleadosFields';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public params$: Observable<IHeaderParam[]>;
  public user: XBveEmpleadosFields;

  constructor( private headerService: HeaderService, private loginService: LoginService) {
    this.params$ = this.headerService.getParams();
    this.user = {};
   }

  ngOnInit(): void {
    this.loginService.loggedUser$.subscribe((user) => {
      this.user = user
    })
  }

  logOut(){
    this.loginService.logoutUser();
  }


}
