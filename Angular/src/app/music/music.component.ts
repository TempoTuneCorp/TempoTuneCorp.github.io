import { Component, Inject } from '@angular/core';
import { Track } from '../models/track.model'
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent {
  constructor(@Inject(DOCUMENT) document: Document){
    
  }

  setCurrentSong(track: Track) {
    (<HTMLAudioElement>document.getElementById('player')).src = track.Path;
    (<HTMLAudioElement>document.getElementById('player')).play();
  }

  

  tracks: Track[] = [
    {
      Title: "poohead",
      Path: "assets\\TestAudio\\Free_Test_Data_1MB_MP3.mp3",
      Album: "WooYeah",
      Artist: "Rasmus"
    },
    {
      Title: "Dumme",
      Path: "assets\\TestAudio\\Hvad er det farligste dyr i verden.mp3",
      Album: "WooYeah",
      Artist: "Rasmus"
    },
    {
      Title: "Grimme",
      Path: "assets\\TestAudio\\Mcdonalds Idioten.mp3",
      Album: "WooYeah",
      Artist: "Rasmus"
    },
    {
      Title: "Rasmus",
      Path: "assets\\TestAudio\\Steen med det ekstra ben.mp3",
      Album: "WooYeah",
      Artist: "Rasmus"
    }
  ];

  
  
}
