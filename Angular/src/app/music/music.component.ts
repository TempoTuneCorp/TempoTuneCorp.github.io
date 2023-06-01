import { Component } from '@angular/core';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent {
  tracks: string[] = ['Woo123123hoo', 'WooYeah', 'YeahYeah', 'YeahWoo' ];
}
