import { Component, OnInit } from '@angular/core';


interface Enemy {
  space: number;
  name?: string;
  hp?: number;
  picute?: string;
}



var enemy1:Enemy ={space:0};
var enemy2:Enemy ={space:1, name:"firstenemy",hp:12};
var enemy3:Enemy ={space:2};

declare function callStart():void;
declare function findAndCastSpell(spellName:string):void;
declare function setSpell(ch: string,spellName: string):string;
declare function updateEnemy(enemy:Enemy):Enemy;

var chr1Cooldown = 10;
setInterval(() => {
  findAndCastSpell("stab");
  updateEnemy(enemy2);
  console.log(enemy2);
}, chr1Cooldown * 1000);


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
  enemy2 = enemy2;
  enemy1 = enemy1;
  enemy3 = enemy3;

  ngOnInit(): void {
    callStart();
    this.Chr1Spell = setSpell("chr1","stab");
    enemy2 = enemy2;
    enemy1 = enemy1;
    enemy3 = enemy3;

  }


}
