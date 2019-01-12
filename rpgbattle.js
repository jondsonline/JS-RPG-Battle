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

var headerMessageText;
var gameMessageText;
var combatRound = 1;
var gameContinues = true;   // is this even needed?

/* THE GAME FLOW */

/* displayIntro() -- headertext ID with a paragraph to explain the game
                     also sets up buttonMenu with "Begin play" button.


  onClick, begin play -- sets up combatant message, switches header text to
                      round info, gameMessage says something like "Select your
                      action." buttonMenu displays combat actions

                      setupNewCombat()
                        displayRoundHeader()
                        displayNewStats()
                          updatePlayerHP()
                          updateMonster(HP)
                        displayCombatMenu()

  NEW MENU/DISPLAY -- COMBAT

  onClick, attack -- Player attacks, new message to header text, check if
                    monster alive, monster attacks, new message to header text,
                    check if player alive. End combat as appropriate and
                    display game over or new round info

                    actionAttack()
                      playerAttacks()
                      monsterAttacks()
                      updateCombatRound()
                        displayRoundHeader()
                        updatePlayerHP()
                        updateMonsterHP()
                        displayGameMessage()
                      if player dies: displayPlayNewGameMenu()
                      if monster dies: displayNewEncounterMenu()
                      if continues: Already taken care of!

  onlick, heal -- Player heals, check for backfire and death. Monster attacks.
                  Check for death. End combat as appropriate.

                  actionHeal()
                    playerHeals()
                      if die: updateCombatRound()*
                              displayNewGameMenu()
                    monsterAttacks()
                    updateCombatRound()*
                    if continues: keep menus

  onclick, flee -- Monster gets free attack. If survive, end combat and
                  continue without leveling up.

                  actionFlee()
                    monsterAttacks()
                    updateCombatRound()*
                    if player dies: displayPlayNewGameMenu()
                    if player survives: displayNewEncounterMenu()

  END COMBAT MENUS

  onclick, level up -- go through level up routine.
                  display what levels up in headerMessage/gameMessage
                  instantly update combat stats, do new round buttonMenu

                  playerLevelsUp()
                  monsterLevelsUP()
                  combatRound = 1
                  setupNewCombat()*

  onclick, new encounter -- survival after fleeing

                  monsterLevelsUp()
                  combatRound = 1
                  setupNewCombat()*

  END GAME MENUS

  onclick, play again -- reset player and monster info. begin new combat
                  round

                  resetCombatantStats()
                  combatRound = 1
                  setupNewCombat()*

*/
