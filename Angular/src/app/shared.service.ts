import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})


export class SharedService {

  
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  CreateNewUser() {
    this.http.post(this.baseApiUrl + '/api/User', {});
  }
}
