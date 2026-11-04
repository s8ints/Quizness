// Chapter 22: create a text node, remove old children, and append the new text.
function changeText(element, value) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  element.appendChild(document.createTextNode(value));
}

// Chapter 21 loops and arrays; Chapter 22 className controls the CSS classes.
function changeClass(element, name, enabled) {
  var classes = element.className.split(" ");
  var result = "";
  for (var i = 0; i < classes.length; i++) {
    if (classes[i] !== "" && classes[i] !== name) {
      if (result !== "") { result = result + " "; }
      result = result + classes[i];
    }
  }
  if (enabled) {
    if (result !== "") { result = result + " "; }
    result = result + name;
  }
  element.className = result;
}


function startGames() {
  // Learning content stays separate from the functions that run the games.
  var percentages = [20, 25, 50];
  var fractions = ["1/2", "1/5", "1/4"];
  // Each number below belongs to the fraction in the same array position.
  // For example, fractions[0] is 1/2, so fractionAnswers[0] is 50.
  var fractionAnswers = [50, 20, 25];
  var answerHelp = [
    "20% means 20 out of 100. Dividing both by 20 gives 1/5.",
    "25% means 25 out of 100. Dividing both by 25 gives 1/4.",
    "50% means 50 out of 100, which is one half: 1/2."
  ];
  var stones = ["25% of BBD 80", "10% of BBD 60", "20% of BBD 50"];
  var correctOrder = [1, 2, 0]; // Results: BBD 6, BBD 10, BBD 20.
  var totalXP = 320; // Your fictional XP before playing this demo.

  // All progress exists only until refresh or reset. Nothing is saved or sent.
  var currentScreen = "course-screen";
  var chosenPercent = -1; // -1 means no percentage has been chosen.
  var matches = 0;
  var matchingDone = false;
  var orderingDone = false;
  var chosenStones = []; // Stores stone positions in the order you click them.
  var friendButton = "";
  var screens = document.getElementsByClassName("game-screen");
  var percentBtns = document.getElementsByClassName("percent-tile");
  var fractionBtns = document.getElementsByClassName("fraction-tile");
  var stoneBtns = document.getElementsByClassName("order-tile");
  var matchMessage = document.getElementById("match-message");
  var orderMessage = document.getElementById("order-message");
  var tip = document.getElementById("panthy-tip");
  var nextButton = document.getElementById("next-game");
  var checkButton = document.getElementById("check-order");
  var clearButton = document.getElementById("clear-order");
  var doneButton = document.getElementById("finish-level");

  // Show one plank per chosen stone. A full bridge is only green after checking it.
  function updateBridge() {
    var planks = document.getElementsByClassName("bridge-plank");
    for (var i = 0; i < planks.length; i++) {
      changeClass(planks[i], "plank-placed", i < chosenStones.length);
    }
    changeClass(document.getElementById("bridge-scene"), "bridge-complete", orderingDone);
  }

  // Hide the other learning sections, show the requested section, and update Panthy's tip.
  function showScreen(screenName, stage, instruction) {
    for (var i = 0; i < screens.length; i++) {
      screens[i].style.display = "none";
    }
    var screen = document.getElementById(screenName);
    screen.style.display = "block";
    currentScreen = screenName;
    changeText(document.getElementById("game-step"), "Current step: " + stage);
    changeText(tip, instruction);
    screen.getElementsByTagName("h2")[0].focus();
  }

  // Show one friend's sample information and remember which button opened it.
  function showFriend(friendName, friendPoints, subject, buttonId) {
    friendButton = buttonId;
    changeText(document.getElementById("friend-name"), friendName + " (fictional friend)");
    changeText(document.getElementById("friend-info"), "Sample lifetime XP: " + friendPoints +
      ". Preferred subject: " + subject + ".");
    document.getElementById("friend-details").hidden = false;
    document.getElementById("friend-name").focus();
  }

  // Close the details and return keyboard focus to the same friend's button.
  function closeFriend() {
    document.getElementById("friend-details").hidden = true;
    if (friendButton !== "") {
      document.getElementById(friendButton).focus();
    }
  }

  // Move the four existing HTML rows into the right order for your sample XP.
  // Friends' XP stays fixed: Maya has 400, Jordan has 350, and Alex has 280.
  // Only your total changes: 320 at the start, 370 after one game, 420 after both.
  function updateRanks() {
    var friendOrder = ["maya-row", "jordan-row", "your-row", "alex-row"];

    if (totalXP > 400) {
      friendOrder = ["your-row", "maya-row", "jordan-row", "alex-row"];
    } else if (totalXP > 350) {
      friendOrder = ["maya-row", "your-row", "jordan-row", "alex-row"];
    }

    changeText(document.getElementById("your-xp"), totalXP);
    var leaderboard = document.getElementById("rank-list");

    for (var i = 0; i < friendOrder.length; i++) {
      var row = document.getElementById(friendOrder[i]);
      var rank = i + 1;
      changeText(row.cells[0], rank);
      leaderboard.appendChild(row); // Moves this existing row to the bottom.
      if (friendOrder[i] === "your-row") {
        changeText(document.getElementById("ranking-message"), "Your sample rank: " + rank + " of 4.");
      }
    }
  }

  // Count gamesDone games, calculate demo XP, and update the leaderboard.
  function updateScore() {
    var gamesDone = 0;
    if (matchingDone) {
      gamesDone = gamesDone + 1;
    }
    if (orderingDone) {
      gamesDone = gamesDone + 1;
    }
    // Recalculate XP from gamesDone games instead of adding it after every click.
    // This prevents the same gamesDone game from giving XP twice.
    var gameXP = gamesDone * 50;
    totalXP = 320 + gameXP;
    changeText(document.getElementById("game-progress"), gamesDone + " of 2 checkpoints complete this visit.");
    changeText(document.getElementById("demo-xp"), gameXP + " XP earned this demo.");
    updateRanks();
  }

  // Remember which percentage was clicked and highlight just that button.
  function pickPercent(index) {
    if (currentScreen !== "matching-screen" || percentBtns[index].disabled) {
      return;
    }
    chosenPercent = index;
    for (var i = 0; i < percentBtns.length; i++) {
      percentBtns[i].setAttribute("aria-pressed", "false");
    }
    // Mark the chosen button so its selected style and screen reader state agree.
    percentBtns[index].setAttribute("aria-pressed", "true");
    changeText(matchMessage, percentages[index] + "% selected. Now choose its fraction.");
  }

  // Check the chosen percentage against a fraction; explain mistakes or mark a correct pair.
  function pickFraction(index) {
    if (currentScreen !== "matching-screen" || fractionBtns[index].disabled || matchingDone) {
      return;
    }
    if (chosenPercent === -1) {
      changeText(matchMessage, "Choose a percentage first, then its matching fraction.");
      return;
    }
    var selected = chosenPercent;
    percentBtns[selected].setAttribute("aria-pressed", "false");
    chosenPercent = -1;
    if (percentages[selected] !== fractionAnswers[index]) {
      changeText(matchMessage, "Try again. " + answerHelp[selected]);
      changeText(tip, "A percentage is a fraction out of 100. Simplify it, then choose another pair.");
      percentBtns[selected].focus();
      return;
    }
    percentBtns[selected].disabled = true;
    fractionBtns[index].disabled = true;
    // Keep the green style on each matched pair.
    changeClass(percentBtns[selected], "rune-matched", true);
    changeClass(fractionBtns[index], "rune-matched", true);
    changeText(percentBtns[selected], percentages[selected] + "% - Matched");
    changeText(fractionBtns[index], fractions[index] + " - Matched");
    matches = matches + 1;
    changeText(matchMessage, "Correct! " + answerHelp[selected] + " " + matches + " of 3 pairs matched.");
    changeText(tip, "Good match! Find the remaining pairs to open the temple gate.");
    if (matches === 3) {
      matchingDone = true;
      nextButton.disabled = false;
      changeText(document.getElementById("checkpoint-match"), "Complete");
      changeText(document.getElementById("checkpoint-order"), "Current");
      changeText(tip, "Gate open! You earned 50 demo XP. Continue to build the bridge.");
      updateScore();
      changeClass(document.getElementById("temple-gate"), "gate-open", true);
      changeText(document.getElementById("gate-caption"), "Gate open! Continue your adventure");
      nextButton.focus();
    } else {
      // Keep keyboard focus on an available percentage after a pair is removed.
      for (var i = 0; i < percentBtns.length; i++) {
        if (percentBtns[i].disabled === false) {
          percentBtns[i].focus();
          break;
        }
      }
    }
  }

  // Add the clicked calculation to the bridge and prevent selecting the same stone twice.
  function pickStone(index) {
    if (currentScreen !== "ordering-screen" || orderingDone || stoneBtns[index].disabled) {
      return;
    }
    chosenStones.push(index); // Add this stone's position to the end of the array.
    stoneBtns[index].disabled = true;
    var stone = document.createElement("li"); // Make a new numbered-list item.
    changeText(stone, stones[index]);
    document.getElementById("stone-order").appendChild(stone); // Add it to the visible bridge.
    updateBridge();
    changeText(orderMessage, chosenStones.length + " of 3 stones placed. Use Clear order to start again.");
    if (chosenStones.length === 3) {
      checkButton.disabled = false;
    } else {
      checkButton.disabled = true;
    }
    if (chosenStones.length === 3) {
      checkButton.focus();
    } else {
      for (var i = 0; i < stoneBtns.length; i++) {
        if (stoneBtns[i].disabled === false) {
          stoneBtns[i].focus();
          break;
        }
      }
    }
  }

  // Empty the bridge list and make all three stones available again.
  function clearOrder() {
    chosenStones = [];
    changeText(document.getElementById("stone-order"), "");
    updateBridge();
    for (var i = 0; i < stoneBtns.length; i++) {
      stoneBtns[i].disabled = false;
    }
    checkButton.disabled = true;
    changeText(orderMessage, "Choose the stone with the smallest result first.");
  }

  // Compare the three selected stone positions with the answer and award completion once.
  function checkOrder() {
    if (currentScreen !== "ordering-screen" || orderingDone || chosenStones.length !== 3) {
      return;
    }
    for (var i = 0; i < correctOrder.length; i++) {
      if (chosenStones[i] !== correctOrder[i]) {
        changeText(orderMessage, "Try again. 10% of BBD 60 is BBD 6; 20% of BBD 50 is BBD 10; 25% of BBD 80 is BBD 20. Clear your order and compare these results.");
        changeText(tip, "Compare the calculated amounts, not just the percentages. Clear the stones to try again.");
        return;
      }
    }
    orderingDone = true;
    updateBridge();
    checkButton.disabled = true;
    clearButton.disabled = true;
    doneButton.disabled = false;
    changeText(orderMessage, "Bridge complete! BBD 6 < BBD 10 < BBD 20. You earned another 50 demo XP.");
    changeText(document.getElementById("checkpoint-order"), "Complete");
    changeText(tip, "You crossed the bridge! Both checkpoints are complete. View your level results.");
    updateScore();
    doneButton.focus();
  }

  // Clear both games, feedback, XP, and friend details, then return to course selection.
  function resetDemo() {
    chosenPercent = -1;
    matches = 0;
    matchingDone = false;
    orderingDone = false;
    // Reset visual states along with the scores, so a new adventure starts fresh.
    changeClass(document.getElementById("temple-gate"), "gate-open", false);
    changeText(document.getElementById("gate-caption"), "Match the runes to open the gate");
    changeClass(document.getElementById("game-panthy"), "panthy-celebrate", false);
    for (var i = 0; i < percentBtns.length; i++) {
      percentBtns[i].disabled = false;
      changeText(percentBtns[i], percentages[i] + "%");
      percentBtns[i].setAttribute("aria-pressed", "false");
      fractionBtns[i].disabled = false;
      changeText(fractionBtns[i], fractions[i]);
      changeClass(percentBtns[i], "rune-matched", false);
      changeClass(percentBtns[i], "rune-success", false);
      changeClass(fractionBtns[i], "rune-matched", false);
      changeClass(fractionBtns[i], "rune-success", false);
    }
    clearOrder();
    nextButton.disabled = true;
    clearButton.disabled = false;
    doneButton.disabled = true;
    changeText(matchMessage, "Choose a percentage first, then a fraction.");
    changeText(document.getElementById("checkpoint-match"), "Locked");
    changeText(document.getElementById("checkpoint-order"), "Locked");
    document.getElementById("friend-details").hidden = true;
    changeText(document.getElementById("friend-name"), "");
    changeText(document.getElementById("friend-info"), "");
    friendButton = "";
    updateScore();
    showScreen("course-screen", "Choose a world", "Choose a subject to begin. There is no timer, so take your time!");
  }

  // Open the lesson when the student chooses Mathematics.
  function openLesson() {
    showScreen("lesson-screen", "Learn percentages", "Read the examples. You will match fractions and compare calculated amounts.");
  }

  // Start the matching game after the student has opened the lesson.
  function startMatching() {
    if (currentScreen !== "lesson-screen") {
      return;
    }
    changeText(document.getElementById("checkpoint-match"), "Current");
    showScreen("matching-screen", "Match the runes", "Choose a percentage rune, then its equivalent fraction. Match all three pairs. You can change your percentage before picking a fraction.");
  }

  // Open the bridge game only after all percentage pairs have been matched.
  function startOrdering() {
    if (matchingDone === false || currentScreen !== "matching-screen") {
      return;
    }
    showScreen("ordering-screen", "Build the bridge", "Work out each amount, then choose stones from smallest to largest. Use Clear order to change your choices, then Check order.");
  }

  // Show the results only when the student has finished both games.
  function finishLevel() {
    if (matchingDone === false || orderingDone === false || currentScreen !== "ordering-screen") {
      return;
    }
    showScreen("complete-screen", "Level complete", "Level cleared! You earned 100 demo XP. Explore your friends or reset to play again.");
  }

  // Let the student rearrange the bridge stones while the game is unfinished.
  function restartOrder() {
    if (currentScreen !== "ordering-screen" || orderingDone) {
      return;
    }
    clearOrder();
    stoneBtns[0].focus();
  }

  // These three functions supply the fixed details for each fictional friend.
  // Show Maya's XP and preferred subject.
  function showMaya() {
    showFriend("Maya", 400, "Mathematics", "maya-details");
  }

  // Show Jordan's XP and preferred subject.
  function showJordan() {
    showFriend("Jordan", 350, "Programming", "jordan-details");
  }

  // Show Alex's XP and preferred subject.
  function showAlex() {
    showFriend("Alex", 280, "Statistics", "alex-details");
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
  document.getElementById("close-friend").addEventListener("click", closeFriend);
  document.getElementById("maya-details").addEventListener("click", showMaya);
  document.getElementById("jordan-details").addEventListener("click", showJordan);
  document.getElementById("alex-details").addEventListener("click", showAlex);

  // Each small function below tells the game exactly which tile was clicked.
  // Select the first percentage: 20%.
  percentBtns[0].addEventListener("click", function () {
    pickPercent(0);
  });
  // Select the second percentage: 25%.
  percentBtns[1].addEventListener("click", function () {
    pickPercent(1);
  });
  // Select the third percentage: 50%.
  percentBtns[2].addEventListener("click", function () {
    pickPercent(2);
  });
  // Check the first fraction: 1/2.
  fractionBtns[0].addEventListener("click", function () {
    pickFraction(0);
  });
  // Check the second fraction: 1/5.
  fractionBtns[1].addEventListener("click", function () {
    pickFraction(1);
  });
  // Check the third fraction: 1/4.
  fractionBtns[2].addEventListener("click", function () {
    pickFraction(2);
  });
  // Place the first stone: 25% of BBD 80.
  stoneBtns[0].addEventListener("click", function () {
    pickStone(0);
  });
  // Place the second stone: 10% of BBD 60.
  stoneBtns[1].addEventListener("click", function () {
    pickStone(1);
  });
  // Place the third stone: 20% of BBD 50.
  stoneBtns[2].addEventListener("click", function () {
    pickStone(2);
  });

  // Show the starting XP and enable controls now that their click handlers exist.
  updateScore();
  document.getElementById("select-maths").disabled = false;
  document.getElementById("reset-demo").disabled = false;
  document.getElementById("maya-details").disabled = false;
  document.getElementById("jordan-details").disabled = false;
  document.getElementById("alex-details").disabled = false;
}

// Set up the sample tutor request: choose options, review them, then confirm the demo.
function startTutoring() {
  // These are fixed prototype choices, not tutor availability or student data.
  var topics = ["Percentages", "Ratios", "Solving equations"];
  var sessions = ["30 minutes", "1 hour", "2 hours"];
  var sessionTimes = ["Weekday afternoon (illustrative; not agreed)", "Weekday evening (illustrative; not agreed)", "Weekend afternoon (illustrative; not agreed)"];
  var topicMenu = document.getElementById("request-topic");
  var sessionMenu = document.getElementById("request-session");
  var requestOptions = document.getElementById("request-options");
  var requestSummary = document.getElementById("request-summary");
  var requestResult = document.getElementById("request-result");
  var message = document.getElementById("request-message");
  var confirmBtn = document.getElementById("confirm-request");
  var requestChecked = false;
  var requestDone = false;

  // Hide old summaries and confirmations whenever the request options change.
  function clearRequest() {
    requestChecked = false;
    requestDone = false;
    requestSummary.style.display = "none";
    requestResult.style.display = "none";
    requestOptions.style.display = "block";
    confirmBtn.style.display = "inline-block";
    topicMenu.setAttribute("aria-invalid", "false");
    sessionMenu.setAttribute("aria-invalid", "false");
    changeText(message, "Choose a topic and session, then review the example.");
  }

  // Check the topic and duration, then show a summary of the selected sample session.
  function reviewRequest() {
    // Index 0 is the prompt. The actual choices start at index 1.
    var topicChoice = topicMenu.selectedIndex - 1;
    var sessionChoice = sessionMenu.selectedIndex - 1;
    clearRequest();

    // A prompt has no matching array item. Check each dropdown separately.
    var noTopic = topicChoice < 0 || topicChoice >= topics.length;
    var noSession = sessionChoice < 0 || sessionChoice >= sessions.length;
    if (noTopic) {
      topicMenu.setAttribute("aria-invalid", "true");
    }
    if (noSession) {
      sessionMenu.setAttribute("aria-invalid", "true");
    }
    if (noTopic || noSession) {
      changeText(message, "Choose a topic and a session before reviewing your sample request.");
      message.focus();
      return;
    }
    // Insert only our authored choices, not user-entered text.
    changeText(document.getElementById("summary-topic"), topics[topicChoice]);
    changeText(document.getElementById("summary-session"), sessions[sessionChoice]);
    changeText(document.getElementById("summary-time"), sessionTimes[sessionChoice]);
    requestChecked = true;
    requestOptions.style.display = "none";
    requestSummary.style.display = "block";
    document.getElementById("summary-title").focus();
  }

  // Show the demonstration confirmation once, without sending a booking.
  function confirmRequest() {
    if (requestChecked === false || requestDone) {
      return;
    }
    requestDone = true;
    confirmBtn.style.display = "none";
    requestResult.style.display = "block";
    document.getElementById("result-title").focus();
    // This changes the display only. It never changes the GiveBack Wallet.
  }

  // Return to the topic and session choices so the student can edit them.
  function changeRequest() {
    clearRequest();
    document.getElementById("options-title").focus();
  }

  // Clear both dropdown choices and start a fresh sample tutor request.
  function anotherRequest() {
    topicMenu.selectedIndex = 0;
    sessionMenu.selectedIndex = 0;
    changeRequest();
  }

  // Buttons move through the demo; changing a dropdown clears any old preview.
  document.getElementById("review-request").addEventListener("click", reviewRequest);
  confirmBtn.addEventListener("click", confirmRequest);
  document.getElementById("change-request").addEventListener("click", changeRequest);
  document.getElementById("another-request").addEventListener("click", anotherRequest);
  topicMenu.addEventListener("change", clearRequest);
  sessionMenu.addEventListener("change", clearRequest);
  document.getElementById("review-request").disabled = false;
}

// Set up the application demo and its reset button. No files are uploaded.
function startTutorForm() {
  var form = document.getElementById("tutor-application");
  var confirmation = document.getElementById("form-result");

  // The browser checks required fields before calling this function.
  // Stop the form from leaving the page and show the demo confirmation instead.
  function submitApplication() {
    form.style.display = "none";
    confirmation.style.display = "block";
    document.getElementById("form-result-title").focus();
  }

  // Clear the name, chosen subjects, and files, then let the student try again.
  function resetApplication() {
    form.reset(); // The browser clears all the form fields for us.
    confirmation.style.display = "none";
    form.style.display = "block";
    document.getElementById("tutor-name").focus();
  }

  // Connect the application buttons to the two functions above.
  form.onsubmit = function () {
    submitApplication();
    return false; // Keep the demonstration form on this page.
  };
  document.getElementById("reset-application").addEventListener("click", resetApplication);
  document.getElementById("submit-application").disabled = false;
}

// Loading this shared file must not look for learning controls on the tutor page.
if (document.getElementById("select-maths")) {
  startGames();
}
if (document.getElementById("review-request")) {
  startTutoring();
}
if (document.getElementById("tutor-application")) {
  startTutorForm();
}

