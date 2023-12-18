import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isLogged();
    this.loginForm = new FormGroup({
      user: new FormControl('', { validators: [Validators.required] }),
      pin: new FormControl('', { validators: [Validators.required, Validators.minLength(4)] })
    });
  }

  public isLogged() {
    const login = this.loginService.isAuthenticated();
    if (login) {
      this.router.navigate(['/home']);
    }
  }

  public onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.loginService.loginUser({ ...this.loginForm.value })
  }

}
