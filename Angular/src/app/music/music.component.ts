import { Component, Inject } from '@angular/core';
import { Track } from '../models/track.model'
import { DOCUMENT } from '@angular/common'
import { ExpressionType } from '@angular/compiler';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent {
  constructor(@Inject(DOCUMENT) document: Document){
    
  }
  CurrentId: number = 0;


  setCurrentSong(track: Track) {
    (<HTMLAudioElement>document.getElementById('player')).src = track.Path;
    (<HTMLAudioElement>document.getElementById('player')).play();
    this.CurrentId = track.Id;
  }

  skipSong(){
    for (const track of this.tracks) {
      if (track.Id === this.CurrentId + 1) {
        console.log("First loop");
        console.log(track);
    
        (<HTMLAudioElement>document.getElementById('player')).src = track.Path;
        (<HTMLAudioElement>document.getElementById('player')).play();
        this.CurrentId = track.Id;
    
        return; // Exit the for...of loop
      }
    }
    
    for (const track of this.tracks) {
      if (track.Id === 1) {
        console.log("second loop");
        console.log(track);
    
        (<HTMLAudioElement>document.getElementById('player')).src = track.Path;
        (<HTMLAudioElement>document.getElementById('player')).play();
        this.CurrentId = track.Id;
    
        return; // Exit the for...of loop
      }
    }
  }

  previousSong(){
    for (const track of this.tracks) {
      if (track.Id === this.CurrentId - 1) {
        console.log("First loop");
        console.log(track);
    
        (<HTMLAudioElement>document.getElementById('player')).src = track.Path;
        (<HTMLAudioElement>document.getElementById('player')).play();
        this.CurrentId = track.Id;
    
        return; // Exit the for...of loop
      }
    }
  }

  currentSongTime(){
    


  }

  ngOnInit(){
    const audio = (<HTMLAudioElement>document.getElementById('player'))
    const timer = (<HTMLParagraphElement>document.getElementById('timer'))

    audio.addEventListener('timeupdate', () => {
      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60);
      timer.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    });
  }

  

  tracks: Track[] = [
    {
      Id: 1,
      Title: "poohead",
      Path: "assets\\TestAudio\\Free_Test_Data_1MB_MP3.mp3",
      Album: "WooYeah",
      Artist: "Rasmus"
    },
    {
      Id: 2,
      Title: "Dumme",
      Path: "assets\\TestAudio\\Hvad er det farligste dyr i verden.mp3",
      Album: "WooYeah",
      Artist: "Rasmus"
    },
    {
      Id: 3,
      Title: "Grimme",
      Path: "assets\\TestAudio\\Mcdonalds Idioten.mp3",
      Album: "WooYeah",
      Artist: "Rasmus"
    },
    {
      Id: 4,
      Title: "Rasmus",
      Path: "assets\\TestAudio\\Steen med det ekstra ben.mp3",
      Album: "WooYeah",
      Artist: "Rasmus"
    }
  ];

  
  
}
