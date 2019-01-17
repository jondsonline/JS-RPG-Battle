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

// Starting stats (Level 1) for both combatants
const stat = {
  pcHP: 20,
  pcAC: 6,
  pcDamage: 6,
  monsterHP: 12,
  monsterAC: 6,
  monsterDamage: 5
};

var pc = new Player(stat.pcHP, stat.pcAC, stat.pcDamage);
var monster = new Creature(stat.monsterHP, stat.monsterAC, stat.monsterDamage);

var gameMessageText;
var combatRound = 0;
var doesPlayerLevelUp = true;
var fleeChances = Math.floor((Math.random() * 4) + 2);
var encounterNumber = 1;

function resetStats() {
  combatRound = 0;
  encounterNumber = 1;
  fleeChances = Math.floor((Math.random() * 4) + 2);

  pc.alive = true;
  pc.level = 1;
  pc.maxHitPoints = stat.pcHP;
  pc.hitPoints = pc.maxHitPoints;
  pc.armorClass = stat.pcAC;
  pc.attackDamage = stat.pcDamage;

  monster.level = 1;
  monster.maxHitPoints = stat.monsterHP;
  monster.hitPoints = monster.maxHitPoints;
  monster.armorClass = stat.monsterAC;
  monster.attackDamage = stat.monsterDamage;
}


function defineButton(buttonText) {
  var newButton = document.createElement('button');
  var newButtonText = document.createTextNode(buttonText);
  newButton.appendChild(newButtonText);

  return newButton;
}


function addButton(newButton) {
  var buttonMenu = document.getElementById('buttonMenu');
  buttonMenu.appendChild(newButton)
}


function clearButtonMenu() {
  var buttonMenu = document.getElementById('buttonMenu');
  buttonMenu.innerHTML = " ";
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
  playerHP.innerHTML = "<p>Hit Points: " + pc.hitPoints + "/" +
                        pc.maxHitPoints + "<p>";
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
  monsterHP.innerHTML = "<p>Hit Points: " + monster.hitPoints + "/" +
                        monster.maxHitPoints + "<p>";
}


function displayRoundHeader() {
  roundHeader = document.getElementById("headerMessage");
  roundHeader.innerHTML = "<h2>Battle " + encounterNumber +
                          "<br>Round " + combatRound + "</h2>";

  tableHeader = document.getElementById('tableHeader');
  tableHeader.innerHTML = "<th>Player - Level " + pc.level + "</th>" +
                          "<th>Monster - Level " + monster.level + "</th>";
}


function displayNewStats() {
  updatePlayerStats();
  updatePlayerHP();

  updateMonsterStats();
  updateMonsterHP();
}


function displayGameMessage(message) {
  gameMessage = document.getElementById("gameMessage");
  gameMessage.innerHTML = "<p>" + message + "</p>";
}


function updateCombatRound() {
    combatRound += 1;
    displayRoundHeader();
    updatePlayerHP();
    updateMonsterHP();
}


function startNewEncounter() {
  combatRound = 0;
  displayRoundHeader();
  displayNewStats();
  displayGameMessage("Let the battle begin!");
  displayCombatMenu();
}


function playerLevelsUp() {
  pc.level += 1;

  var increasedStat = Math.floor((Math.random() * 10) + 1);

  if (increasedStat >= 1 || increasedStat <= 5) {
    var hpIncrease = Math.floor((Math.random() * 4) + 2);
    pc.maxHitPoints += hpIncrease;
    pc.hitPoints = pc.maxHitPoints;
  } else if (increasedStat >= 6 || increasedStat <= 8) {
    pc.attackDamage += 1;
  } else if (increasedStat == 9) {
    pc.healing += 1
  } else {
    if (pc.armorClass < 8) {
      pc.armorClass += 1;
    } else {
      pc.maxHitPoints += 6;
      pc.hitPoints = pc.maxHitPoints;
    }
  }
}


function monsterLevelsUp() {
  monster.level += 1;
  monster.alive = true;
  var monsterHPIncrease = Math.floor((Math.random() * 3) + 2);
  monster.maxHitPoints += monsterHPIncrease;
  monster.hitPoints = monster.maxHitPoints;
  var attackIncreaseChance = Math.floor((Math.random() *2) + 1);
  if (attackIncreaseChance == 2) {
    monster.attackDamage += 1;
  }
}


function levelUp() {
  if (doesPlayerLevelUp) {
    playerLevelsUp();
  }
  doesPlayerLevelUp = true;
  monsterLevelsUp();
  encounterNumber += 1;
  startNewEncounter();
}


function playerAttacks() {
  var playerHits = pc.toHit(monster.armorClass);

  if (playerHits == true) {
    damage = pc.damageRoll()
    gameMessageText = "You hit the monster for " + damage + " point(s) of " +
                      "damage.";
    monster.takeDamage(damage);
  } else {
    gameMessageText = "You miss!";
  }
}


function monsterAttacks() {
  var monsterHits = monster.toHit(pc.armorClass);

  if (monsterHits == true) {
    damage = monster.damageRoll()
    gameMessageText += "<br>The monster hits you for " + damage + " point(s) " +
                      " of damage.";
    pc.takeDamage(damage);
  } else {
    gameMessageText += "<br>The monster misses!";
  }
}


function playerHeals() {
  healChance = Math.floor((Math.random() * pc.healing) + 1);

  if (healChance == pc.healing) {
    gameMessageText = "The healing spell backfires! You take 1 point of " +
                      " damage!";
    pc.takeDamage(1);
  } else {
    pc.hitPoints += healChance;
    if (pc.hitPoints > pc.maxHitPoints) {
      pc.hitPoints = pc.maxHitPoints
    }
    gameMessageText = "You healing spell heals " + healChance + " hit points.";
  }
}


function displayCombatMenu() {
  clearButtonMenu();

  // Attack Button
  var attackButton = defineButton("Attack");
  attackButton.onclick = function() {
    actionAttack();
  }
  addButton(attackButton);

  // Heal Button
  var healButton = defineButton("Heal");;
  healButton.onclick = function() {
    actionHeal();
  }
  addButton(healButton);

  // Flee button
  var fleeButton = defineButton("Flee")
  fleeButton.onclick = function() {
    actionFlee();
  }
  addButton(fleeButton);

} // displayCombatMenu()


function displayDeathMenu() {
  clearButtonMenu();
  var deathButton = defineButton("Play a New Game");
  deathButton.onclick = function() {
    resetStats();
    setupNewCombat();
  }
  addButton(deathButton);
}


function displaySurvivalMenu() {
  clearButtonMenu();
  var survivalButton = defineButton("Battle Again");
  survivalButton.onclick = function() {
    levelUp();
  }
  addButton(survivalButton);
}


function checkIfPlayerAlive() {
  if (!pc.alive) {
    gameMessageText += "<br>You are killed!";
    displayDeathMenu();
  }
}


function actionAttack() {
  playerAttacks();
  if (monster.alive) {
    monsterAttacks();
    checkIfPlayerAlive();
  } else {
    gameMessageText += "<br>The monster is killed!";
    displaySurvivalMenu();
  }
  displayGameMessage(gameMessageText);
  updateCombatRound();
}


function actionHeal() {
  playerHeals();
  checkIfPlayerAlive();
  if (pc.alive) {
    monsterAttacks();
    checkIfPlayerAlive();
  }
  displayGameMessage(gameMessageText);
  updateCombatRound();
}


function actionFlee() {
  doesPlayerLevelUp = false;
  gameMessageText = "You attempt to flee from battle!";
  monsterAttacks();
  checkIfPlayerAlive();
  updateCombatRound();
  if (pc.alive) {
    gameMessageText += "<br>You escape!";
    displaySurvivalMenu();
    fleeChances -= 1;
    if (fleeChances == 0) {
      gameMessageText += "<br>After fleeing so many battles," +
                        "<br>you are disgraced." +
                        "<br>You are forbidden from returning to the arena!";
      displayDeathMenu();
    } else {
      pc.hitPoints = pc.maxHitPoints;
    }
  }
  displayGameMessage(gameMessageText);
}


function setupNewCombat() {
  displayRoundHeader();
  displayNewStats();
  displayGameMessage("Let the batttle begin!");
  displayCombatMenu();
}


// INTRO SCREEN TO THE GAME

function displayIntro() {
  var introHeader = document.getElementById("headerMessage");

  introHeader.innerHTML = "<h2>Welcome to the game!</h2>";

  gameMessageText =  "<p>RPG Battle is a basic game where you battle " +
    "against various opponents" +
    " and level up each time you achieve a victory.</p>" +
    "<p>Each round, you may attack, heal or flee. If you attack, you have a " +
    "chance to hit your opponent and cause damage. If you choose to heal, you " +
    "cast a heal spell, which has a slight chance of backfiring. If it does, " +
    "instead of healing you take one point of damage. If you choose to flee, " +
    "the opponent gets an extra attack. " +
    "There are a limited amount of times you can flee from battle before " +
    "you are disgraced and ejected from the competition.</p>" +
    "<p>And the end of each combat encounter, you gain a level if you " +
    "survive and did not flee. Leveling up increases a random stat.</p>" +
    "<p>Each encounter, the opponent gets stronger and more difficult to " +
    "defeat. See how many encounters you can survive!</p>";

  displayGameMessage(gameMessageText);

  var beginPlayButton = defineButton("Click to play!");
  beginPlayButton.onclick = function() {
    gameMessageChange =  document.getElementById('gameMessage');
    gameMessageChange.style.textAlign = "center";
    gameMessageChange.style.height = "125px";
    setupNewCombat();
  }
  addButton(beginPlayButton);
} // displayIntro


/* START GAME */

displayIntro();
