import { Component } from '@angular/core';
import { AppState } from '../app.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'login-page',
  providers: [LoginService],
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

    this.loginForm = this.formBuilder.group({
      login: ['',
        [
          Validators.required,
          Validators.pattern('[A-Za-z]+')
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.pattern('[A-Za-z0-9]+')
        ]
      ]
    });
  }

  ngOnInit() {

  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.login, this.loginForm.value.password)
        .subscribe(res => {
          if (res !== null) {
            this.router.navigate(['/courses']);
          } else {
            this.loginForm.controls['password']['setValue']('');
          }
        });
    }
  }

  showError(field, error) {
    return field.errors && field.errors[error] && field.touched;
  }
}
