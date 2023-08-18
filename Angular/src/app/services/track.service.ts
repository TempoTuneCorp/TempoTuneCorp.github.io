import { Injectable } from '@angular/core';
import { Track } from '../models/track.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private http : HttpClient) {
    var dbTracks;
   }
  private baseUrl:string = "https://localhost:7267/api/Track/";

  getAllTracks(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}GetAllTracks`);
  }


  


  tracks: Track[] = [
    {
      Id: 1,
      Title: "poohead",
      Path: "assets\\TestAudio\\Free_Test_Data_1MB_MP3.mp3",
      Album: "WooYeah",
      Artist: "Rasmus",
      Time: "1:11",
      Favorite: false,
    },
    {
      Id: 2,
      Title: "Dumme",
      Path: "assets\\TestAudio\\Hvad er det farligste dyr i verden.mp3",
      Album: "WooYeah",
      Artist: "Rasmus",
      Time: "1:11",
      Favorite: false,
    },
    {
      Id: 3,
      Title: "Grimme",
      Path: "assets\\TestAudio\\Mcdonalds Idioten.mp3",
      Album: "WooYeah",
      Artist: "Rasmus",
      Time: "1:11",
      Favorite: false,
    },
    {
      Id: 4,
      Title: "Rasmus",
      Path: "assets\\TestAudio\\Steen med det ekstra ben.mp3",
      Album: "WooYeah",
      Artist: "Rasmus",
      Time: "1:11",
      Favorite: false,
    },
    {
      Id: 5,
      Title: "Rasmus",
      Path: "assets\\TestAudio\\Steen med det ekstra ben.mp3",
      Album: "WooYeah",
      Artist: "Rasmus",
      Time: "1:11",
      Favorite: false,
    },
    {
      Id: 6,
      Title: "Rasmus",
      Path: "assets\\TestAudio\\Steen med det ekstra ben.mp3",
      Album: "WooYeah",
      Artist: "Rasmus",
      Time: "1:11",
      Favorite: false,
    },
    {
      Id: 7,
      Title: "Rasmus",
      Path: "assets\\TestAudio\\Steen med det ekstra ben.mp3",
      Album: "WooYeah",
      Artist: "Rasmus",
      Time: "1:11",
      Favorite: false,
    },
    {
      Id: 8,
      Title: "Rasmus",
      Path: "assets\\TestAudio\\Steen med det ekstra ben.mp3",
      Album: "WooYeah",
      Artist: "Rasmus",
      Time: "1:11",
      Favorite: false,
    },
    {
      Id: 9,
      Title: "Rasmus",
      Path: "assets\\TestAudio\\Steen med det ekstra ben.mp3",
      Album: "WooYeah",
      Artist: "Rasmus",
      Time: "1:11",
      Favorite: false,
    },
    {
      Id: 10,
      Title: "Rasmus",
      Path: "assets\\TestAudio\\Steen med det ekstra ben.mp3",
      Album: "WooYeah",
      Artist: "Rasmus",
      Time: "1:11",
      Favorite: false,
    },
    {
      Id: 11,
      Title: "Rasmus",
      Path: "assets\\TestAudio\\Steen med det ekstra ben.mp3",
      Album: "WooYeah",
      Artist: "Rasmus",
      Time: "1:11",
      Favorite: false,
    },
    {
      Id: 12,
      Title: "Rasmus",
      Path: "assets\\TestAudio\\Steen med det ekstra ben.mp3",
      Album: "WooYeah",
      Artist: "Rasmus",
      Time: "1:11",
      Favorite: false,
    },
    {
      Id: 13,
      Title: "Rasmus",
      Path: "assets\\TestAudio\\Steen med det ekstra ben.mp3",
      Album: "WooYeah",
      Artist: "Rasmus",
      Time: "1:11",
      Favorite: false,
    },
    {
      Id: 14,
      Title: "Rasmus",
      Path: "assets\\TestAudio\\Steen med det ekstra ben.mp3",
      Album: "WooYeah",
      Artist: "Rasmus",
      Time: "1:11",
      Favorite: false,
    },
    {
      Id: 15,
      Title: "Rasmus",
      Path: "assets\\TestAudio\\Steen med det ekstra ben.mp3",
      Album: "WooYeah",
      Artist: "Rasmus",
      Time: "1:11",
      Favorite: false,
    },
  ];
}
