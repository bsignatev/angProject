import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService{

    login(login:string, password:string):Observable<boolean>{
  
       return new Observable<boolean>()
    }
  
    logOff(){
      
    }

    isLoggedIn(){
       
    }
}