// CREATURE CLASS
// Base class in the game

class Creature {
  constructor(hp, ac, dam) {
    this.level = 1;
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


function actionAttack() {
  alert("Kill! Kill! Kill!");
}


function actionHeal() {
  alert("Ahh, that's better");
}


function actionFlee() {
  alert("Run away! Run away!");
}


function displayRoundHeader() {
  roundHeader = document.getElementById("headerMessage");
  roundHeader.innerHTML = "<h2>Round " + combatRound + "</h2>";

  tableHeader = document.getElementById('tableHeader');
  tableHeader.innerHTML = "<th>Player - Level " + pc.level + "</th>" +
                          "<th>Monster - Level " + monster.level + "</th>";
}


function displayCombatMenu() {
  buttonMenu = document.getElementById('buttonMenu');
  buttonMenu.innerHTML = " ";

  // Attack Button
  var attackButton = document.createElement('button');
  var attackButtonText = document.createTextNode('Attack');
  attackButton.appendChild(attackButtonText);
  attackButton.onclick = function() {
    actionAttack();
  }
  buttonMenu.appendChild(attackButton);

  // Heal Button
  var healButton = document.createElement('button');
  var healButtonText = document.createTextNode('Heal');
  healButton.appendChild(healButtonText);
  healButton.onclick = function() {
    actionHeal();
  }
  buttonMenu.appendChild(healButton);

  // Flee button
  var fleeButton = document.createElement('button');
  var fleeButtonText = document.createTextNode('Flee');
  fleeButton.appendChild(fleeButtonText);
  fleeButton.onclick = function() {
    actionFlee();
  }
  buttonMenu.appendChild(fleeButton);

} // displayCombatMenu()


function displayGameMessage(message) {
  gameMessage = document.getElementById("gameMessage");
  gameMessage.innerHTML = "<p>" + message + "</p>";
}


function updatePlayerStats() {
  playerStats = document.getElementById('playerStats');

  playerStats.innerHTML = "<ul>" +
                            "<li>Damage: 1d" + pc.attackDamage + "</li>" +
                            "<li>Armor Class: " + pc.armorClass + "</li>" +
                            "<li>Healing: 1d" + pc.healing + "</li>" +
                          "</ul>";
}


function updatePlayerHP() {
  playerHP = document.getElementById('playerHP');
  playerHP.innerHTML = "<p>Hit Points: " + pc.hitPoints + "<p>";
}


function updateMonsterStats() {
  monsterStats = document.getElementById('monsterStats');

  monsterStats.innerHTML = "<ul>" +
                            "<li>Damage: 1d" + monster.attackDamage + "</li>" +
                            "<li>Armor Class: " + monster.armorClass + "</li>" +
                          "</ul>";

}


function updateMonsterHP() {
  monsterHP = document.getElementById('monsterHP');
  monsterHP.innerHTML = "<p>Hit Points: " + monster.hitPoints + "<p>";
}


function displayNewStats() {
  updatePlayerStats();
  updatePlayerHP();

  updateMonsterStats();
  updateMonsterHP();
}

function setupNewCombat() {
  displayRoundHeader();
  displayNewStats();
  displayGameMessage("Let the batttle begin!");
  displayCombatMenu();
}


// INTRO SCREEN TO THE GAME

function displayIntro() {
  var introMessage = document.getElementById("headerMessage");

  introMessage.innerHTML = "<h2>Welcome to the game!</h2>" +
    "<p>RPG Battle is a basic game where you battle against various opponents" +
    "and level up each time you achieve a victory.<p>" +
    "<p>Each round, you may attack, heal or flee. If you attack, you have a" +
    "hance to hit your opponent and cause damage. If you choose to heal, you" +
    "cast a heal spell, which has a slight chance of backfiring. If it does," +
    "instead of healing you take one point of damage. If you choose to flee," +
    "the opponent gets an extra attack, and if you survive, battle ends.<p>" +
    "<p>And the end of each combat encounter, you gain a level if you survive" +
    "and did not flee. Leveling up increases your stats.<p>" +
    "<p>Each encounter, the opponent gets stronger and more difficult to" +
    "defeat. See how many encounters you can survive!<p>";

  var beginPlayButton = document.createElement('button');
  var buttonText = document.createTextNode("Click to play!")
  beginPlayButton.appendChild(buttonText);
  beginPlayButton.onclick = function() {
    setupNewCombat();
  }

  var startMenu = document.getElementById("buttonMenu");
  startMenu.appendChild(beginPlayButton);

} // displayIntro


/* START GAME */

displayIntro();

/* THE GAME FLOW

 displayIntro() -- headertext ID with a paragraph to explain the game
                     also sets up buttonMenu with "Begin play" button.

  onClick, begin play -- sets up combatant message, switches header text to
                      round info, gameMessage says something like "Select your
                      action." buttonMenu displays combat actions

                      setupNewCombat()
                        displayRoundHeader()
                        displayNewStats()
                          updatePlayerHP()
                          updateMonsterHP()
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
                        updateGameMessage()
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
