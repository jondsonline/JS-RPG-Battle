// CREATURE CLASS
// Base class in the game

class Creature {
  constructor(hp, ac, dam) {
    this.maxHitPoints = hp;
    this.hitPoints = hp;
    this.armorClass = ac;
    this.attackDamage = dam;
    this.alive = true;
  }

  takeDamage(dam) {
    this.hitPoints -= dam;
    if (this.hitPoints < 1) {
      this.alive = false;
    }
  }

  attackRoll() {
    var roll = Math.floor((Math.random() * 10) + 1);
    return roll;
  }

  toHit(targetAC) {
    if (this.attackRoll() >= targetAC) {
      return true;
    } else {
      return false;
    }
  }

  damageRoll() {
    var roll = Math.floor((Math.random() * this.attackDamage) + 1);
    return roll;
  }
}


class Player extends Creature {
  constructor(hp, ac, dam) {
    super(hp, ac, dam);
    this.healing = 5;
    this.level = 1;
  }
}

/*
  heal() {
    var healChance = Math.floor((Math.random() * 5) + 1);

    if (healChance == this.healing) {
      // output: "The healing spell backfires! You take 1 point of damage!"
      this.takeDamage(1);
    } else {
      this.hitPoints += healChance;
      if (this.hitPoints > this.maxHitPoints) {
        this.hitPoints = this.maxHitPoints;
      }
    }
  }

  levelUp() {
    this.level += 1;
    // outPut:
  }
}
*/

var pc = new Player(20, 6, 6);
var monster = new Creature(12, 6, 5);

contant combatAction = {
  ATTACK: 'attack',
  HEAL: 'heal',
  FLEE: 'flee'
}

/* THE GAME ROUTINE */


var gameContinues = true;

while (gameContinues) {

  var combatContinues = true;
  var combatRound = 0;
  var playerLevelsUp = true;

  while (combatContinues) {

    combatRound += 1;
    var playingAnotherRound = true;

    displayRoundHeader();
    displayCombatantInfo();
    displayCombatButtons();

    while (playingAnotherRound) {
      var selectAction = getAction();

      // NOTE: action routines must reutrn boolean about
      // whether player or monster is dead

      switch (selectAction) {
        case combatAction.ATTACK:
          playingAnotherRound = playerAttacks();
          break;
        case combatAction.HEAL:
          playingAnotherRound = playerHeals();
          break;
        case combatAction.FLEE;
          playingAnotherRound = playerFlees();
          break;
      } // switch selectAction

    }  // playingAnotherRound

    combatContinues = false;

  } // combatContinues

} // gameContinues
