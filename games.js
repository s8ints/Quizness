var gameStage = 0;
var chosenPercent = 0;
var chosenButtonId = "";
var answerHelp = "";
var matches = 0;
var matchingDone = false;
var orderingDone = false;
var stoneCount = 0;
var firstStone = 0;
var secondStone = 0;
var thirdStone = 0;

function updateScore() {
  var completed = 0;
  if (matchingDone) { completed = completed + 1; }
  if (orderingDone) { completed = completed + 1; }
  document.getElementById("game-progress").textContent = completed + " of 2 checkpoints complete this visit.";
  document.getElementById("game-points").textContent = completed * 50 + " XP earned this demo.";
}

function openLesson() {
  if (gameStage === 0) {
    gameStage = 1;
    document.getElementById("lesson-page").setAttribute("class", "game-screen game-box is-open");
    document.getElementById("game-step").textContent = "Current step: Learn percentages";
    document.getElementById("panthy-tip").textContent = "Read the examples, then enter Percent Path.";
  }
}

function startMatching() {
  if (gameStage !== 1) { return false; }
  gameStage = 2;
  document.getElementById("matching-game").setAttribute("class", "game-screen game-box game-area is-open");
  document.getElementById("matching-status").textContent = "Current";
  document.getElementById("game-step").textContent = "Current step: Match the runes";
  document.getElementById("panthy-tip").textContent = "Choose a percentage, then its matching fraction.";
}

function pickPercent(number, buttonId) {
  var button = document.getElementById(buttonId);
  if (gameStage !== 2 || matchingDone) { return false; }
  if (button.getAttribute("data-matched") === "yes") {
    document.getElementById("match-message").textContent = "That percentage is already matched. Choose another.";
    return false;
  }
  chosenPercent = number;
  chosenButtonId = buttonId;
  document.getElementById("percent20").setAttribute("aria-pressed", "false");
  document.getElementById("percent25").setAttribute("aria-pressed", "false");
  document.getElementById("percent50").setAttribute("aria-pressed", "false");
  button.setAttribute("aria-pressed", "true");
  if (number === 20) {
    answerHelp = "20% is 20 out of 100, which simplifies to 1/5.";
  } else {
    if (number === 25) {
      answerHelp = "25% is 25 out of 100, which simplifies to 1/4.";
    } else {
      answerHelp = "50% is 50 out of 100, which simplifies to 1/2.";
    }
  }
  document.getElementById("match-message").textContent = number + "% selected. Now choose its fraction.";
}

function pickFraction(answer, buttonId, label) {
  var button = document.getElementById(buttonId);
  if (gameStage !== 2 || matchingDone) { return false; }
  if (button.getAttribute("data-matched") === "yes") {
    document.getElementById("match-message").textContent = "That fraction is already matched. Choose another.";
    return false;
  }
  if (chosenPercent === 0) {
    document.getElementById("match-message").textContent = "Choose a percentage first, then its fraction.";
    return false;
  }
  var chosenButton = document.getElementById(chosenButtonId);
  chosenButton.setAttribute("aria-pressed", "false");
  if (chosenPercent !== answer) {
    document.getElementById("match-message").textContent = "Try again. " + answerHelp;
    document.getElementById("panthy-tip").textContent = "Simplify the percentage as a fraction out of 100, then try again.";
    chosenPercent = 0;
    return false;
  }
  chosenButton.setAttribute("data-matched", "yes");
  button.setAttribute("data-matched", "yes");
  chosenButton.setAttribute("class", "answer-button percent-button matched-answer");
  button.setAttribute("class", "answer-button fraction-button matched-answer");
  chosenButton.textContent = chosenPercent + "% - Matched";
  button.textContent = label + " - Matched";
  chosenPercent = 0;
  matches = matches + 1;
  document.getElementById("match-message").textContent = "Correct! " + answerHelp + " " + matches + " of 3 pairs matched.";
  if (matches === 3) {
    matchingDone = true;
    document.getElementById("temple-gate").setAttribute("class", "temple-gate gate-open");
    document.getElementById("gate-caption").textContent = "Gate open! Continue your adventure.";
    document.getElementById("matching-status").textContent = "Complete";
    document.getElementById("ordering-status").textContent = "Ready";
    document.getElementById("panthy-tip").textContent = "Gate open! You earned 50 demo XP. Continue to the bridge.";
    updateScore();
  } else {
    document.getElementById("panthy-tip").textContent = "Good match! Find the remaining pairs.";
  }
}

function startOrdering() {
  if (gameStage !== 2 || matchingDone === false) {
    document.getElementById("match-message").textContent = "Match all three pairs before continuing to the bridge.";
    return false;
  }
  gameStage = 3;
  document.getElementById("ordering-game").setAttribute("class", "game-screen game-box game-area is-open");
  document.getElementById("ordering-status").textContent = "Current";
  document.getElementById("game-step").textContent = "Current step: Build the bridge";
  document.getElementById("panthy-tip").textContent = "Calculate each amount. Choose stones from smallest to largest.";
}

function pickStone(amount, buttonId, label) {
  var button = document.getElementById(buttonId);
  if (gameStage !== 3 || orderingDone) { return false; }
  if (button.getAttribute("data-selected") === "yes") {
    document.getElementById("order-message").textContent = "That stone is already on the bridge. Choose another or clear the order.";
    return false;
  }
  if (stoneCount === 3) {
    document.getElementById("order-message").textContent = "All three stones are placed. Check the order or clear it.";
    return false;
  }
  button.setAttribute("data-selected", "yes");
  stoneCount = stoneCount + 1;
  if (stoneCount === 1) { firstStone = amount; }
  if (stoneCount === 2) { secondStone = amount; }
  if (stoneCount === 3) { thirdStone = amount; }
  var slot = document.getElementById("stone-slot-" + stoneCount);
  slot.textContent = label;
  slot.setAttribute("class", "stone-slot is-filled");
  document.getElementById("plank" + stoneCount).setAttribute("class", "bridge-plank plank-placed");
  document.getElementById("order-message").textContent = stoneCount + " of 3 stones placed. Use Clear order to try again.";
}

function clearOrder() {
  stoneCount = 0;
  firstStone = 0;
  secondStone = 0;
  thirdStone = 0;
  document.getElementById("stone20").setAttribute("data-selected", "no");
  document.getElementById("stone6").setAttribute("data-selected", "no");
  document.getElementById("stone10").setAttribute("data-selected", "no");
  document.getElementById("stone-slot-1").textContent = "";
  document.getElementById("stone-slot-2").textContent = "";
  document.getElementById("stone-slot-3").textContent = "";
  document.getElementById("stone-slot-1").setAttribute("class", "stone-slot");
  document.getElementById("stone-slot-2").setAttribute("class", "stone-slot");
  document.getElementById("stone-slot-3").setAttribute("class", "stone-slot");
  document.getElementById("plank1").setAttribute("class", "bridge-plank");
  document.getElementById("plank2").setAttribute("class", "bridge-plank");
  document.getElementById("plank3").setAttribute("class", "bridge-plank");
  document.getElementById("bridge-picture").setAttribute("class", "bridge-picture");
  document.getElementById("order-message").textContent = "Choose the stone with the smallest result first.";
}

function restartOrder() {
  if (gameStage !== 3 || orderingDone) {
    document.getElementById("order-message").textContent = "Reset the demonstration to play this checkpoint again.";
    return false;
  }
  clearOrder();
}

function checkOrder() {
  if (gameStage !== 3 || orderingDone) { return false; }
  if (stoneCount !== 3) {
    document.getElementById("order-message").textContent = "Place all three stones before checking the order.";
    return false;
  }
  if (firstStone !== 6 || secondStone !== 10 || thirdStone !== 20) {
    document.getElementById("order-message").textContent = "Try again. 10% of BBD 60 is BBD 6; 20% of BBD 50 is BBD 10; 25% of BBD 80 is BBD 20. Clear your order and compare these results.";
    document.getElementById("panthy-tip").textContent = "Compare the amounts, then clear the stones to try again.";
    return false;
  }
  orderingDone = true;
  document.getElementById("bridge-picture").setAttribute("class", "bridge-picture bridge-complete");
  document.getElementById("order-message").textContent = "Bridge complete! BBD 6 < BBD 10 < BBD 20. You earned another 50 demo XP.";
  document.getElementById("ordering-status").textContent = "Complete";
  document.getElementById("panthy-tip").textContent = "You crossed the bridge! View your level results.";
  updateScore();
}

function finishLevel() {
  if (gameStage !== 3 || orderingDone === false) {
    document.getElementById("order-message").textContent = "Complete the bridge before viewing your results.";
    return false;
  }
  gameStage = 4;
  document.getElementById("game-finished").setAttribute("class", "game-screen game-box is-open");
  document.getElementById("game-step").textContent = "Current step: Level complete";
  document.getElementById("panthy-tip").textContent = "Level cleared! You earned 100 demo XP. Reset to play again.";
}

function resetDemo() {
  gameStage = 0;
  chosenPercent = 0;
  chosenButtonId = "";
  matches = 0;
  matchingDone = false;
  orderingDone = false;
  document.getElementById("percent20").textContent = "20%";
  document.getElementById("percent25").textContent = "25%";
  document.getElementById("percent50").textContent = "50%";
  document.getElementById("fraction-half").textContent = "1/2";
  document.getElementById("fraction-fifth").textContent = "1/5";
  document.getElementById("fraction-quarter").textContent = "1/4";
  document.getElementById("percent20").setAttribute("class", "answer-button percent-button");
  document.getElementById("percent25").setAttribute("class", "answer-button percent-button");
  document.getElementById("percent50").setAttribute("class", "answer-button percent-button");
  document.getElementById("fraction-half").setAttribute("class", "answer-button fraction-button");
  document.getElementById("fraction-fifth").setAttribute("class", "answer-button fraction-button");
  document.getElementById("fraction-quarter").setAttribute("class", "answer-button fraction-button");
  document.getElementById("percent20").setAttribute("data-matched", "no");
  document.getElementById("percent25").setAttribute("data-matched", "no");
  document.getElementById("percent50").setAttribute("data-matched", "no");
  document.getElementById("fraction-half").setAttribute("data-matched", "no");
  document.getElementById("fraction-fifth").setAttribute("data-matched", "no");
  document.getElementById("fraction-quarter").setAttribute("data-matched", "no");
  document.getElementById("percent20").setAttribute("aria-pressed", "false");
  document.getElementById("percent25").setAttribute("aria-pressed", "false");
  document.getElementById("percent50").setAttribute("aria-pressed", "false");
  clearOrder();
  document.getElementById("temple-gate").setAttribute("class", "temple-gate");
  document.getElementById("gate-caption").textContent = "Match the runes to open the gate";
  document.getElementById("course-menu").setAttribute("class", "game-screen game-box game-overview is-open");
  document.getElementById("lesson-page").setAttribute("class", "game-screen game-box");
  document.getElementById("matching-game").setAttribute("class", "game-screen game-box game-area");
  document.getElementById("ordering-game").setAttribute("class", "game-screen game-box game-area");
  document.getElementById("game-finished").setAttribute("class", "game-screen game-box");
  document.getElementById("matching-status").textContent = "Locked";
  document.getElementById("ordering-status").textContent = "Locked";
  document.getElementById("match-message").textContent = "Choose a percentage first, then a fraction.";
  document.getElementById("game-step").textContent = "Current step: Choose a world";
  document.getElementById("panthy-tip").textContent = "Choose a subject to begin. There is no timer, so take your time!";
  updateScore();
}
