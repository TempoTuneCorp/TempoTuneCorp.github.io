import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl:string = "https://localhost:7267/api/User/";
  

  private username$ = new BehaviorSubject<string>("");  
  private email$ = new BehaviorSubject<string>("");

  constructor(private http : HttpClient, private auth:AuthService) { }

  public getUsername(){
    return this.username$.asObservable();
  }

  public setUsername(username: string){
    this.username$.next(username);
  }

  public getEmail(){
    return this.email$.asObservable();
  }

  public setEmail(email: string){
    this.email$.next(email);
  }

  // public updateUsername(userId: number, userObj: string){
  //   return this.http.post<any>(`${this.baseUrl}update/{id}`,userId)
  // }

  updateUsername(userObj: any): Observable<any>{
    // const useridtoint = parseInt(userId);
    // const updateUser = {useridtoint, username};
    // console.log(typeof useridtoint);
    // console.log(useridtoint);
    console.log(userObj);
    return this.http.put<any>(`${this.baseUrl}update`, userObj);

  }
}
