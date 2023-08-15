<<<<<<< HEAD
import { Component, Inject, ViewEncapsulation,OnInit  } from '@angular/core';
=======
import { Component, Inject, ViewEncapsulation } from '@angular/core';
>>>>>>> fb15c9123a9d931784749d5c369db149fbe59305
import { Track } from '../models/track.model'
import { DOCUMENT } from '@angular/common'
import { ExpressionType } from '@angular/compiler';
import { ReactiveFormsModule } from '@angular/forms';


declare function playByteArray():void;

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MusicComponent {
  constructor(@Inject(DOCUMENT) document: Document){

  }
  CurrentId: number = 0;
  playmode: Boolean = false;

  setFavorite(track: Track){
<<<<<<< HEAD
    track.Favorite = true;
  }

  deleteFavorite(track: Track){
    track.Favorite = false;
=======
    track.Favorite = true;    
>>>>>>> fb15c9123a9d931784749d5c369db149fbe59305
  }

  deleteFavorite(track: Track){
    track.Favorite = false;    
  }
  
  setCurrentSong(track: Track) {
    const player:any = <HTMLAudioElement>document.getElementById('player');
    player.src = track.Path;
    player.play();
    this.CurrentId = track.Id;
<<<<<<< HEAD
    (<HTMLDivElement>document.getElementById('card')).focus();
  }


  playSongFromDB(id: any)
  {
    var track;

    return;
=======
    (<HTMLDivElement>document.getElementById('card')).focus();  
>>>>>>> fb15c9123a9d931784749d5c369db149fbe59305
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
      divCard.setAttribute("class", "card");
<<<<<<< HEAD

=======
      
>>>>>>> fb15c9123a9d931784749d5c369db149fbe59305

      var divItemBig = document.createElement("Div");
      divItemBig.setAttribute("class", "item");

      var divPartNum = document.createElement("Div");
      this.createDivWithParagraph(divPartNum, track.Id.toString(), "part", "number");

      var divPartCov = document.createElement("Div");
      divPartCov.setAttribute("class", "part");
      var image = document.createElement("img");
      image.setAttribute("class", "small-cover");
      image.setAttribute("src", "assets\\images\\AbstractCover.png");
      divPartCov.appendChild(image);

      var divPartTit = document.createElement("Div");
      this.createDivWithParagraph(divPartTit, track.Title, "part", "title");

      divItemBig.append(divPartNum, divPartCov, divPartTit);

<<<<<<< HEAD

=======
      
>>>>>>> fb15c9123a9d931784749d5c369db149fbe59305
      var divItemArt = document.createElement("Div");
      this.createDivWithParagraph(divItemArt, track.Artist, "item", "artist");

      var divItemAlb = document.createElement("Div");
      this.createDivWithParagraph(divItemAlb, track.Album, "item", "album");

      var divItemTime = document.createElement("Div");
      this.createDivWithParagraph(divItemTime, track.Time, "item", "time");

      divCard.append(divItemBig, divItemArt, divItemAlb, divItemTime);
      document.getElementById("container")?.appendChild(divCard);

    }
  }
<<<<<<< HEAD

=======
  
>>>>>>> fb15c9123a9d931784749d5c369db149fbe59305

  ngOnInit(){
    // this.createCards();
    const audio = (<HTMLAudioElement>document.getElementById('player'))
    const timer = (<HTMLParagraphElement>document.getElementById('timer'))
    const endTimer = (<HTMLParagraphElement>document.getElementById('end-timer'))
    const progress = (<HTMLDivElement>document.getElementById('progress'))
    const bar = (<HTMLDivElement>document.getElementById('bar'))
    
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
