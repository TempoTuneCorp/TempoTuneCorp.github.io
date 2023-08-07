const chr1spells =[];
const chr2spells =[];
const chr3spells =[];
const chrSpells = [chr1spells,chr2spells,chr3spells];
const enemyHp = [0,10,0];
var gold = 0;

function callStart(){


}


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}




function useSpell(Spell){
  rndfound = false;

  while(rndfound == false)
  {
    rnd= getRandomArbitrary(1, 4);//1 til 3
    if(enemyHp[rnd] >= 0){rndfound=true}
  }

if(Spell.isAOE){
  enemyHp[0] =enemyHp[0] -Spell.damage;
  enemyHp[1] =enemyHp[1] -Spell.damage;
  enemyHp[2] =enemyHp[2] -Spell.damage;
}
else{
  enemyHp[rnd] = enemyHp[rnd] -Spell.damage;
}
  console.log(enemyHp);
}


function setSpell(ch,spellname){
  spellArray.forEach(item => {
  if(spellname==item.name)
  {
    foundSpell = item;
  }
});
if(ch == "chr1"){
  chr1spells[0] = foundSpell;
  return chr1spells[0].name;
}else{return "yuuu should add chr"}

}


//spells

function Spell(cost, damage, cooldown, name,isAOE,spechial,minigame) {
  this.cost= cost;
  this.damage = damage;
  this.cooldown = cooldown;
  this.name = name;
  this.isAOE = isAOE;
  this.spechial = spechial;
  this.minigame = minigame;
}



const spellArray =[
  stab = new Spell (
    1,
    2,
     3,
     "stab",
     false
  ),

  strike = new Spell(
    2,
    5,
    3,
    "strike",
    false

  )
]
