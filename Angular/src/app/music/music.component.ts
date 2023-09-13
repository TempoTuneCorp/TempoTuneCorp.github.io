import { AuthService } from './../services/auth.service';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { Track } from '../models/track.model'
import { DOCUMENT } from '@angular/common'
import { ExpressionType } from '@angular/compiler';
import { ReactiveFormsModule } from '@angular/forms';
import { TrackService } from '../services/track.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MusicComponent {
  constructor(@Inject(DOCUMENT) document: Document, private trackService:TrackService,private route: ActivatedRoute,private auth: AuthService){

  }
  CurrentId: number = 0;
  playmode: Boolean = false;
  tracks: Track[] = [];
  isOnFav: Boolean = false;
  userID: number = 0;


  setFavorite(track: Track){
    track.Favorite = true;
  }

  deleteFavorite(track: Track){
    track.Favorite = false;
  }

  setCurrentSong(track: Track) {
    const player:any = <HTMLAudioElement>document.getElementById('songplayer');
    player.src = track.Path;
    player.play();
    this.CurrentId = track.Id;
    (<HTMLDivElement>document.getElementById('card-songs')).focus();

  }

  skipSong(){
    for (const track of this.tracks) {
      if (track.Id === this.CurrentId + 1) {
        console.log("First loop");
        console.log(track);

        (<HTMLAudioElement>document.getElementById('songplayer')).src = track.Path;
        (<HTMLAudioElement>document.getElementById('songplayer')).play();
        this.CurrentId = track.Id;


        return; // Exit the for...of loop
      }
    }

    for (const track of this.tracks) {
      if (track.Id === 1) {
        console.log("second loop");
        console.log(track);

        (<HTMLAudioElement>document.getElementById('songplayer')).src = track.Path;
        (<HTMLAudioElement>document.getElementById('songplayer')).play();
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

        (<HTMLAudioElement>document.getElementById('songplayer')).src = track.Path;
        (<HTMLAudioElement>document.getElementById('songplayer')).play();
        this.CurrentId = track.Id;

        return; // Exit the for...of loop
      }
    }
  }

  createDivWithParagraph(div: Element, text :string, divClass: string, paragraphClass: string) {
    div.setAttribute("class", divClass);
    var number = document.createElement("P");
    number.setAttribute("class", paragraphClass);
    var numberText = document.createTextNode(text);
    number.appendChild(numberText);
    div.appendChild(number);
  }

  createCards() {
    for (const track of this.tracks) {
      var divCard = document.createElement("Div");
      divCard.setAttribute("class", "card-songs");


      var divItemBig = document.createElement("Div");
      divItemBig.setAttribute("class", "item-songs");

      var divPartNum = document.createElement("Div");
      this.createDivWithParagraph(divPartNum, track.Id.toString(), "part-songs", "number-songs");

      var divPartCov = document.createElement("Div");
      divPartCov.setAttribute("class", "part-songs");
      var image = document.createElement("img");
      image.setAttribute("class", "small-cover");
      image.setAttribute("src", "assets\\images\\AbstractCover.png");
      divPartCov.appendChild(image);

      var divPartTit = document.createElement("Div");
      this.createDivWithParagraph(divPartTit, track.Title, "part", "title-songs");

      divItemBig.append(divPartNum, divPartCov, divPartTit);


      var divItemArt = document.createElement("Div");
      this.createDivWithParagraph(divItemArt, track.Artist, "item-songs", "artist-songs");

      var divItemAlb = document.createElement("Div");
      this.createDivWithParagraph(divItemAlb, track.Album, "item-songs", "album-songs");

      var divItemTime = document.createElement("Div");
      this.createDivWithParagraph(divItemTime, track.Time, "item-songs", "time-songs");

      divCard.append(divItemBig, divItemArt, divItemAlb, divItemTime);
      document.getElementById("container-songs")?.appendChild(divCard);

    }
  }


  ngOnInit(){
    var dbTracks;
    let userIdFromToken = this.auth.getUserIdFromToken();
    this.userID = userIdFromToken;

    //checks route
    this.route.url.subscribe(([url]) => {
      const { path, parameters } = url;
      if(path != "main")
      {

      //gets favorite songs
      this.trackService.getAllFavTracks(this.userID).subscribe({
        next:(res) => {
          dbTracks = res;
          console.log(dbTracks);
          this.tracks = this.trackService.dbTracksToList(dbTracks);
        }
      })}

      //getting all songs
      else{
      this.trackService.getAllTracks().subscribe({
        next:(res) => {
          dbTracks = res;
          console.log(dbTracks);
          this.tracks = this.trackService.dbTracksToList(dbTracks);
        }
      })}
    });



    // this.createCards();
    const audio = (<HTMLAudioElement>document.getElementById('songplayer'))
    const timer = (<HTMLParagraphElement>document.getElementById('timer-songs'))
    const endTimer = (<HTMLParagraphElement>document.getElementById('end-timer-songs'))
    const progress = (<HTMLDivElement>document.getElementById('progress-songs'))
    const bar = (<HTMLDivElement>document.getElementById('bar-songs'))
    const card = (<HTMLDivElement>document.getElementById('card-songs'));

    audio.addEventListener('timeupdate', () => {
      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60);
      const minutesDuration = Math.floor(audio.duration / 60);
      const secondsDuration = Math.floor(audio.duration % 60);
      timer.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      endTimer.innerText = `${minutesDuration}:${secondsDuration < 10 ? '0' : ''}${secondsDuration}`;
      
    });

    audio.addEventListener('timeupdate', () => {
      const percent = (audio.currentTime / audio.duration * 100);
      progress.style.width = `${percent}%`;
    });

    audio.addEventListener('timeupdate', () => {
      if (audio.paused) {
        this.playmode = false;
      }
      if (!audio.paused) {
        this.playmode = true;
      }
    });

    audio.addEventListener('timeupdate', () => {
      if (audio.ended) {
        this.skipSong();
      }
    });

    
    bar.addEventListener("click", function(event) {
      var rect = bar.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;

      console.log("Coordinates: (X: " + x + ", y: " + y + ")");

      // får fat i bredden på baren, og gemmer den som en int i currentWidth.
      var style = window.getComputedStyle(bar);
      var currentWidth = parseInt(style.getPropertyValue('width'));
      console.log(currentWidth);

      // regner procent ud fra hvor du trykker på linjen.
      const percent = (x / currentWidth * 100);
      console.log(percent);

      audio.currentTime = (audio.duration*(percent/100));
      
    });

    card.addEventListener("click", () => {
      const background = (<HTMLDivElement>document.getElementById('card-songs'));
      background.style.backgroundColor = 'black';
    }
    );
  }


}
