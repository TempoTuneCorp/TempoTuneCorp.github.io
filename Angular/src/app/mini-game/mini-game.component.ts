import { Component, OnInit } from '@angular/core';


interface Enemy {
  name: string;
  hp: number;
}



declare function callStart():void;
declare function setSpell(ch: string,spellName: string):string;
declare function updateEnemy(enemy:string):Enemy;

@Component({
  selector: 'app-mini-game',
  templateUrl: './mini-game.component.html',
  styleUrls: ['./mini-game.component.scss']
})
export class MiniGameComponent implements OnInit {
  chr1 = "chr1";
  chr2 = "chr2";
  chr3 = "chr3";
  gold = "1";
  Chr1Spell = "0";


  enemy1Name = "enemy";
  enemy1Hp = "2000000";
  enemy2Name = "";
  enemy2Hp = "";
  enemy3Name = "";
  enemy3Hp = "";

  ngOnInit(): void {
    callStart();
    this.Chr1Spell = setSpell("chr1","stab");
  }
}
