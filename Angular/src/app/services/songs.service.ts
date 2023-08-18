import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private baseUrl:string = "https://localhost:7267/api/Track/";


  constructor(private http : HttpClient,private auth : AuthService ,private user : UserService)
  {
    this.user.getUserId();
  }


  getSongByteArray(id: any): Observable<any>{
    const params = new HttpParams().set('id', id);
    const options = {
      params: params
    };
    return this.http.get<any>(`${this.baseUrl}GetFilesFromTrack`, options);
  }
}
