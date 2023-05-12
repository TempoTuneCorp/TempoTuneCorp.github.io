import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl:string = "https://localhost:7267/api/User/"; 
  constructor(private http : HttpClient) { }

  login(loginObj:any)
  {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj)
  }

  
  register(userObj:any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj)
  }

  
  

}
