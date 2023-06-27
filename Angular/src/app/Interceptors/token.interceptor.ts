import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router, RouterModule } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toast:NgToastService, private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();
    
    if(myToken){
      request = request.clone({
      setHeaders: {Authorization:'***authorized***'}
      })
    }
    
    return next.handle(request);
    
  }
}
