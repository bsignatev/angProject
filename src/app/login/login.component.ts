import { Component } from '@angular/core';
import { AppState } from '../app.service';
import {Router} from '@angular/router';
import {LoginService} from '../services';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'login-page',  
  providers: [LoginService],
  styleUrls: [ './login.component.css' ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
 
  loginForm: FormGroup;

  constructor( 
    private loginService: LoginService, 
    private route: Router,
    private formBuilder: FormBuilder
    ) 
    {

      this.loginForm = this.formBuilder.group({
      login: [ '' , Validators.required],
      password: ['' , Validators.required]
    });


    }
    
  ngOnInit() {
       
  }
  
  login(login: string, password: string) {


  }

  showError(field, error) {
    return field.errors && field.errors[error] && field.touched;
  }
}
