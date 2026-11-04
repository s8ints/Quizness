// Replace an element's content with plain text.
function changeText(element, value) {
  element.innerHTML = "";
  element.appendChild(document.createTextNode(value));
}

function startGames() {
  var currentScreen = "course-menu";
  var chosenPercent = 0;
  var chosenButton;
  var answerHelp = "";
  var matches = 0;
  var matchingDone = false;
  var orderingDone = false;
  var stoneCount = 0;
  var firstStone = 0;
  var secondStone = 0;
  var thirdStone = 0;

  var percent20 = document.getElementById("percent20");
  var percent25 = document.getElementById("percent25");
  var percent50 = document.getElementById("percent50");
  var half = document.getElementById("fraction-half");
  var fifth = document.getElementById("fraction-fifth");
  var quarter = document.getElementById("fraction-quarter");
  var stone20 = document.getElementById("stone20");
  var stone6 = document.getElementById("stone6");
  var stone10 = document.getElementById("stone10");
  var matchMessage = document.getElementById("match-message");
  var orderMessage = document.getElementById("order-message");
  var tip = document.getElementById("panthy-tip");
  var nextButton = document.getElementById("next-game");
  var checkButton = document.getElementById("check-order");
  var clearButton = document.getElementById("clear-order");
  var doneButton = document.getElementById("finish-level");

  // Show one plank per chosen stone. A full bridge is only green after checking it.
  function updateBridge() {
    document.getElementById("plank1").className = "bridge-plank";
    document.getElementById("plank2").className = "bridge-plank";
    document.getElementById("plank3").className = "bridge-plank";
    if (stoneCount >= 1) {
      document.getElementById("plank1").className = "bridge-plank plank-placed";
    }
    if (stoneCount >= 2) {
      document.getElementById("plank2").className = "bridge-plank plank-placed";
    }
    if (stoneCount === 3) {
      document.getElementById("plank3").className = "bridge-plank plank-placed";
    }
    document.getElementById("bridge-picture").className = "bridge-picture";
    if (orderingDone) {
      document.getElementById("bridge-picture").className = "bridge-picture bridge-complete";
    }
  }

  // Hide the other learning sections, show the requested section, and update Panthy's tip.
  function showScreen(screenName, stage, instruction) {
    document.getElementById("course-menu").style.display = "none";
    document.getElementById("lesson-page").style.display = "none";
    document.getElementById("matching-game").style.display = "none";
    document.getElementById("ordering-game").style.display = "none";
    document.getElementById("game-finished").style.display = "none";
    var screen = document.getElementById(screenName);
    screen.style.display = "block";
    currentScreen = screenName;
    changeText(document.getElementById("game-step"), "Current step: " + stage);
    changeText(tip, instruction);
    screen.querySelector("h2").focus();
  }

  function updateScore() {
    var gamesDone = 0;
    if (matchingDone) {
      gamesDone = gamesDone + 1;
    }
    if (orderingDone) {
      gamesDone = gamesDone + 1;
    }
    // Count each finished game once, even if a button is clicked again.
    var gameXP = gamesDone * 50;
    changeText(document.getElementById("game-progress"), gamesDone + " of 2 checkpoints complete this visit.");
    changeText(document.getElementById("game-points"), gameXP + " XP earned this demo.");
  }

  // Remember which percentage was clicked and highlight just that button.
  function pickPercent(number, button) {
    if (currentScreen !== "matching-game" || button.disabled) {
      return;
    }
    percent20.setAttribute("aria-pressed", "false");
    percent25.setAttribute("aria-pressed", "false");
    percent50.setAttribute("aria-pressed", "false");
    chosenPercent = number;
    chosenButton = button;
    button.setAttribute("aria-pressed", "true");
    if (number === 20) {
      answerHelp = "20% is 20 out of 100, which simplifies to 1/5.";
    } else if (number === 25) {
      answerHelp = "25% is 25 out of 100, which simplifies to 1/4.";
    } else {
      answerHelp = "50% is 50 out of 100, which simplifies to 1/2.";
    }
    changeText(matchMessage, number + "% selected. Now choose its fraction.");
  }

  // Check the chosen percentage against a fraction; explain mistakes or mark a correct pair.
  function pickFraction(answer, button, label) {
    if (currentScreen !== "matching-game" || button.disabled || matchingDone) {
      return;
    }
    if (chosenPercent === 0) {
      changeText(matchMessage, "Choose a percentage first, then its matching fraction.");
      return;
    }
    chosenButton.setAttribute("aria-pressed", "false");
    if (chosenPercent !== answer) {
      chosenPercent = 0;
      changeText(matchMessage, "Try again. " + answerHelp);
      changeText(tip, "A percentage is a fraction out of 100. Simplify it, then choose another pair.");
      chosenButton.focus();
      return;
    }
    chosenButton.disabled = true;
    button.disabled = true;
    chosenButton.className = "answer-button percent-button matched-answer";
    button.className = "answer-button fraction-button matched-answer";
    changeText(chosenButton, chosenPercent + "% - Matched");
    changeText(button, label + " - Matched");
    chosenPercent = 0;
    matches = matches + 1;
    changeText(matchMessage, "Correct! " + answerHelp + " " + matches + " of 3 pairs matched.");
    changeText(tip, "Good match! Find the remaining pairs to open the temple gate.");
    if (matches === 3) {
      matchingDone = true;
      nextButton.disabled = false;
      changeText(document.getElementById("matching-status"), "Complete");
      changeText(document.getElementById("ordering-status"), "Current");
      changeText(tip, "Gate open! You earned 50 demo XP. Continue to build the bridge.");
      updateScore();
      document.getElementById("temple-gate").className = "temple-gate gate-open";
      changeText(document.getElementById("gate-caption"), "Gate open! Continue your adventure");
      nextButton.focus();
    } else if (!percent20.disabled) {
      percent20.focus();
    } else if (!percent25.disabled) {
      percent25.focus();
    } else {
      percent50.focus();
    }
  }

  // Add the clicked calculation to the bridge and prevent selecting the same stone twice.
  function pickStone(amount, button, label) {
    if (currentScreen !== "ordering-game" || orderingDone || button.disabled) {
      return;
    }
    stoneCount = stoneCount + 1;
    if (stoneCount === 1) {
      firstStone = amount;
    } else if (stoneCount === 2) {
      secondStone = amount;
    } else {
      thirdStone = amount;
    }
    button.disabled = true;
    var stone = document.createElement("li");
    changeText(stone, label);
    document.getElementById("stone-order").appendChild(stone);
    updateBridge();
    changeText(orderMessage, stoneCount + " of 3 stones placed. Use Clear order to start again.");
    checkButton.disabled = stoneCount !== 3;
    if (stoneCount === 3) {
      checkButton.focus();
    } else if (!stone20.disabled) {
      stone20.focus();
    } else if (!stone6.disabled) {
      stone6.focus();
    } else {
      stone10.focus();
    }
  }

  // Empty the bridge list and make all three stones available again.
  function clearOrder() {
    stoneCount = 0;
    firstStone = 0;
    secondStone = 0;
    thirdStone = 0;
    document.getElementById("stone-order").innerHTML = "";
    stone20.disabled = false;
    stone6.disabled = false;
    stone10.disabled = false;
    updateBridge();
    checkButton.disabled = true;
    changeText(orderMessage, "Choose the stone with the smallest result first.");
  }

  // Compare the three selected stone positions with the answer and award completion once.
  function checkOrder() {
    if (currentScreen !== "ordering-game" || orderingDone || stoneCount !== 3) {
      return;
    }
    if (firstStone !== 6 || secondStone !== 10 || thirdStone !== 20) {
      changeText(orderMessage, "Try again. 10% of BBD 60 is BBD 6; 20% of BBD 50 is BBD 10; 25% of BBD 80 is BBD 20. Clear your order and compare these results.");
      changeText(tip, "Compare the calculated amounts, not just the percentages. Clear the stones to try again.");
      return;
    }
    orderingDone = true;
    updateBridge();
    checkButton.disabled = true;
    clearButton.disabled = true;
    doneButton.disabled = false;
    changeText(orderMessage, "Bridge complete! BBD 6 < BBD 10 < BBD 20. You earned another 50 demo XP.");
    changeText(document.getElementById("ordering-status"), "Complete");
    changeText(tip, "You crossed the bridge! Both checkpoints are complete. View your level results.");
    updateScore();
    doneButton.focus();
  }

  // Clear both games, feedback and XP, then return to course selection.
  function resetTile(button, label, style) {
    button.disabled = false;
    button.className = style;
    changeText(button, label);
  }

  function resetDemo() {
    chosenPercent = 0;
    matches = 0;
    matchingDone = false;
    orderingDone = false;

    // Reset visual states along with the scores, so a new adventure starts fresh.
    document.getElementById("temple-gate").className = "temple-gate";
    changeText(document.getElementById("gate-caption"), "Match the runes to open the gate");
    resetTile(percent20, "20%", "answer-button percent-button");
    resetTile(percent25, "25%", "answer-button percent-button");
    resetTile(percent50, "50%", "answer-button percent-button");
    resetTile(half, "1/2", "answer-button fraction-button");
    resetTile(fifth, "1/5", "answer-button fraction-button");
    resetTile(quarter, "1/4", "answer-button fraction-button");
    percent20.setAttribute("aria-pressed", "false");
    percent25.setAttribute("aria-pressed", "false");
    percent50.setAttribute("aria-pressed", "false");
    clearOrder();
    nextButton.disabled = true;
    clearButton.disabled = false;
    doneButton.disabled = true;
    changeText(matchMessage, "Choose a percentage first, then a fraction.");
    changeText(document.getElementById("matching-status"), "Locked");
    changeText(document.getElementById("ordering-status"), "Locked");
    updateScore();
    showScreen("course-menu", "Choose a world", "Choose a subject to begin. There is no timer, so take your time!");
  }

  // Open the lesson when the student chooses Mathematics.
  function openLesson() {
    showScreen("lesson-page", "Learn percentages", "Read the examples. You will match fractions and compare calculated amounts.");
  }

  // Start the matching game after the student has opened the lesson.
  function startMatching() {
    if (currentScreen !== "lesson-page") {
      return;
    }
    changeText(document.getElementById("matching-status"), "Current");
    showScreen("matching-game", "Match the runes", "Choose a percentage rune, then its equivalent fraction. Match all three pairs. You can change your percentage before picking a fraction.");
  }

  // Open the bridge game only after all percentage pairs have been matched.
  function startOrdering() {
    if (matchingDone === false || currentScreen !== "matching-game") {
      return;
    }
    showScreen("ordering-game", "Build the bridge", "Work out each amount, then choose stones from smallest to largest. Use Clear order to change your choices, then Check order.");
  }

  // Show the results only when the student has finished both games.
  function finishLevel() {
    if (matchingDone === false || orderingDone === false || currentScreen !== "ordering-game") {
      return;
    }
    showScreen("game-finished", "Level complete", "Level cleared! You earned 100 demo XP. Reset to play again.");
  }

  // Let the student rearrange the bridge stones while the game is unfinished.
  function restartOrder() {
    if (currentScreen !== "ordering-game" || orderingDone) {
      return;
    }
    clearOrder();
    stone20.focus();
  }

  // Connect the main buttons to the named functions above.
  document.getElementById("select-maths").addEventListener("click", openLesson);
  document.getElementById("start-quiz").addEventListener("click", startMatching);
  nextButton.addEventListener("click", startOrdering);
  doneButton.addEventListener("click", finishLevel);
  document.getElementById("reset-demo").addEventListener("click", resetDemo);
  document.getElementById("back-courses").addEventListener("click", resetDemo);
  clearButton.addEventListener("click", restartOrder);
  checkButton.addEventListener("click", checkOrder);

  // Each button passes its own value directly to the game.
  percent20.onclick = function () { pickPercent(20, percent20); };
  percent25.onclick = function () { pickPercent(25, percent25); };
  percent50.onclick = function () { pickPercent(50, percent50); };
  half.onclick = function () { pickFraction(50, half, "1/2"); };
  fifth.onclick = function () { pickFraction(20, fifth, "1/5"); };
  quarter.onclick = function () { pickFraction(25, quarter, "1/4"); };
  stone20.onclick = function () { pickStone(20, stone20, "25% of BBD 80"); };
  stone6.onclick = function () { pickStone(6, stone6, "10% of BBD 60"); };
  stone10.onclick = function () { pickStone(10, stone10, "20% of BBD 50"); };

  // Show the starting XP and enable controls now that their click handlers exist.
  updateScore();
  document.getElementById("select-maths").disabled = false;
  document.getElementById("reset-demo").disabled = false;
}

startGames();
