import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string = "https://localhost:7267/api/User/";
  private userPayload:any;

  constructor(private http : HttpClient) {
    this.userPayload = this.decodedToken();
   }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj)
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
  }

  sendEmailResetPassword(userObj:any){
    return this.http.post<any>(`${this.baseUrl}SendEmailResetPassword`,userObj)
  }

  validateResetToken(userObj: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}ValidateUserToResetPassword`,userObj);
  }

  updatePassword(userObj: any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}updatePassword`,userObj);
  }
  
  signOut(){
    localStorage.clear();

  }

  removeToken(tokenValue: any){
    localStorage.removeItem(tokenValue)
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedin():boolean{
    // !! converts string to boolean value - if there is a token, return true
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    // console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token);
  }

  getUsernameFromToken(){
    if(this.userPayload)
    return this.userPayload.unique_name;
  }

  getEmailFromToken(){
    if(this.userPayload)
    return this.userPayload.email;
  }

  getUserIdFromToken(){
    if(this.userPayload)
    return this.userPayload.id;
  }
  getProfilePictureFromToken(){
    if(this.userPayload)
    return this.userPayload.profilePicture;
  }
}
