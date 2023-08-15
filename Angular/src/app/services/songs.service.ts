import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private baseUrl:string = "https://localhost:7267/api/Track/";
  private userPayload:any;

  private username$ = new BehaviorSubject<string>("");
  private email$ = new BehaviorSubject<string>("");


  constructor(private http : HttpClient,private auth : AuthService )
  {

    this.userPayload = this.auth.decodedToken();
  }
}
