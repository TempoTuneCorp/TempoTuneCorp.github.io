import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  private id$ = new BehaviorSubject<number>(0);
  private profilePicture$ = new BehaviorSubject<string>("");

  constructor(private http : HttpClient, private auth:AuthService) { }

  public getProfilePicture(){
    return this.profilePicture$.asObservable();
  }

  public setProfilePicture(profilePicture: string){
    this.profilePicture$.next(profilePicture);
  }

  public getUsername(){
    return this.username$.asObservable();
  }

  public setUsername(username: string){
    this.username$.next(username);
  }

  public getUserId(){
    return this.id$.asObservable();
  }

  public setUserId(id: any){
    this.id$.next(id);
  }

  public getEmail(){
    return this.email$.asObservable();
  }

  public setEmail(email: string){
    this.email$.next(email);
  }

  updateUsername(userObj: any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}updateUsername`, userObj);
  }

  updateEmail(userObj: any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}updateEmail`, userObj);
  }

  deleteUser(id: any): Observable<any>{
    const params = new HttpParams().set('id', id);
    const options = {
      params: params
    };
    return this.http.delete<any>(`${this.baseUrl}deleteUser`, options);
  }

  getUserById(id: any): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}getById`, id);
  }

  uploadProfilePicture(picture: File, id:any): Observable<any>{
    const formData = new FormData();
    formData.append('picture', picture);
    return this.http.post<any>(`${this.baseUrl}uploadProfilePicture/${id}`, formData);
  }

  getPictureUrl(id: any): Observable<string> {
    return this.http.get(`${this.baseUrl}getPictureUrl/${id}`, {
      responseType: 'text' // Specify that you expect a text response
    }) as Observable<string>; // Cast the result to Observable<string>
  }

}
