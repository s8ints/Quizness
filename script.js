/* HOW TO READ THIS FILE
   1. initializeLearning runs the two minigames and friends leaderboard.
   2. initializeTutoring runs the sample tutor booking.
   3. initializeTutorApplication runs the application form.
   The checks at the bottom start only the code needed by the current page.

   getElementById finds an HTML element using its id.
   textContent changes the words inside an element.
   disabled = true stops a button being used; false enables it.
   focus() moves the keyboard cursor to a button or heading.
   addEventListener connects a button click to a function.
   Array positions start at 0: position 0 is the first item, 1 is the second.
   === means "is equal to"; !== means "is not equal to".
   || means "or". return stops the current function and waits for another action.
*/
// Set up the two minigames, their progress, and the sample friends list.
function initializeLearning() {
  // Learning content stays separate from the functions that run the games.
  var percentages = [20, 25, 50];
  var fractions = ["1/2", "1/5", "1/4"];
  // Each number below belongs to the fraction in the same array position.
  // For example, fractions[0] is 1/2, so fractionPercentages[0] is 50.
  var fractionPercentages = [50, 20, 25];
  var matchExplanations = [
    "20% means 20 out of 100. Dividing both by 20 gives 1/5.",
    "25% means 25 out of 100. Dividing both by 25 gives 1/4.",
    "50% means 50 out of 100, which is one half: 1/2."
  ];
  var stones = ["25% of BBD 80", "10% of BBD 60", "20% of BBD 50"];
  var correctStoneIndexes = [1, 2, 0]; // Results: BBD 6, BBD 10, BBD 20.
  var sampleLifetimeXP = 320; // Your fictional XP before playing this demo.

  // All progress exists only until refresh or reset. Nothing is saved or sent.
  var activeScreen = "course-screen";
  var selectedPercentageIndex = -1; // -1 means no percentage has been chosen.
  var matchedPairs = 0;
  var matchingComplete = false;
  var orderingComplete = false;
  var chosenStoneIndexes = []; // Stores stone positions in the order you click them.
  var lastFriendButtonId = "";
  var screens = document.getElementsByClassName("demo-screen");
  var percentButtons = document.getElementsByClassName("percent-tile");
  var fractionButtons = document.getElementsByClassName("fraction-tile");
  var orderButtons = document.getElementsByClassName("order-tile");
  var matchingFeedback = document.getElementById("matching-feedback");
  var orderingFeedback = document.getElementById("ordering-feedback");
  var tip = document.getElementById("panthy-tip");
  var nextGame = document.getElementById("next-game");
  var checkOrderButton = document.getElementById("check-order");
  var clearOrderButton = document.getElementById("clear-order");
  var finishButton = document.getElementById("finish-level");

  // Hide the other learning sections, show the requested section, and update Panthy's tip.
  function showScreen(screenId, stage, instruction) {
    for (var i = 0; i < screens.length; i++) {
      screens[i].style.display = "none";
    }
    var screen = document.getElementById(screenId);
    screen.style.display = "block";
    activeScreen = screenId;
    document.getElementById("visit-stage").textContent = "Current step: " + stage;
    tip.textContent = instruction;
    screen.getElementsByTagName("h2")[0].focus();
  }

  // Show one friend's sample information and remember which button opened it.
  function showFriend(friendName, friendXP, subject, buttonId) {
    lastFriendButtonId = buttonId;
    document.getElementById("friend-name").textContent = friendName + " (fictional friend)";
    document.getElementById("friend-info").textContent = "Sample lifetime XP: " + friendXP +
      ". Preferred subject: " + subject + ".";
    document.getElementById("friend-details").hidden = false;
    document.getElementById("friend-name").focus();
  }

  // Close the details and return keyboard focus to the same friend's button.
  function closeFriend() {
    document.getElementById("friend-details").hidden = true;
    if (lastFriendButtonId !== "") {
      document.getElementById(lastFriendButtonId).focus();
    }
  }

  // Move the four existing HTML rows into the right order for your sample XP.
  // Friends' XP stays fixed: Maya has 400, Jordan has 350, and Alex has 280.
  // Only your total changes: 320 at the start, 370 after one game, 420 after both.
  function updateLeaderboard() {
    var rowOrder = ["maya-row", "jordan-row", "your-row", "alex-row"];

    if (sampleLifetimeXP > 400) {
      rowOrder = ["your-row", "maya-row", "jordan-row", "alex-row"];
    } else if (sampleLifetimeXP > 350) {
      rowOrder = ["maya-row", "your-row", "jordan-row", "alex-row"];
    }

    document.getElementById("your-xp").textContent = sampleLifetimeXP;
    var leaderboard = document.getElementById("leaderboard-body");

    for (var i = 0; i < rowOrder.length; i++) {
      var row = document.getElementById(rowOrder[i]);
      var rank = i + 1;
      row.cells[0].textContent = rank; // The first table cell shows the rank.
      leaderboard.appendChild(row); // Moves this existing row to the bottom.
      if (rowOrder[i] === "your-row") {
        document.getElementById("ranking-message").textContent = "Your sample rank: " + rank + " of 4.";
      }
    }
  }

  // Count completed games, calculate demo XP, and update the leaderboard.
  function updateProgress() {
    var completed = 0;
    if (matchingComplete) {
      completed = completed + 1;
    }
    if (orderingComplete) {
      completed = completed + 1;
    }
    // Recalculate XP from completed games instead of adding it after every click.
    // This prevents the same completed game from giving XP twice.
    var earnedXP = completed * 50;
    sampleLifetimeXP = 320 + earnedXP;
    document.getElementById("visit-progress").textContent = completed + " of 2 checkpoints complete this visit.";
    document.getElementById("demo-xp").textContent = earnedXP + " XP earned this demo.";
    updateLeaderboard();
  }

  // Remember which percentage was clicked and highlight just that button.
  function choosePercentage(index) {
    if (activeScreen !== "matching-screen" || percentButtons[index].disabled) {
      return;
    }
    selectedPercentageIndex = index;
    for (var i = 0; i < percentButtons.length; i++) {
      percentButtons[i].setAttribute("aria-pressed", "false");
    }
    // Mark the chosen button so its selected style and screen reader state agree.
    percentButtons[index].setAttribute("aria-pressed", "true");
    matchingFeedback.textContent = percentages[index] + "% selected. Now choose its fraction.";
  }

  // Check the chosen percentage against a fraction; explain mistakes or mark a correct pair.
  function chooseFraction(index) {
    if (activeScreen !== "matching-screen" || fractionButtons[index].disabled || matchingComplete) {
      return;
    }
    if (selectedPercentageIndex === -1) {
      matchingFeedback.textContent = "Choose a percentage first, then its matching fraction.";
      return;
    }
    var selected = selectedPercentageIndex;
    percentButtons[selected].setAttribute("aria-pressed", "false");
    selectedPercentageIndex = -1;
    if (percentages[selected] !== fractionPercentages[index]) {
      matchingFeedback.textContent = "Try again. " + matchExplanations[selected];
      tip.textContent = "A percentage is a fraction out of 100. Simplify it, then choose another pair.";
      percentButtons[selected].focus();
      return;
    }
    percentButtons[selected].disabled = true;
    fractionButtons[index].disabled = true;
    percentButtons[selected].textContent = percentages[selected] + "% - Matched";
    fractionButtons[index].textContent = fractions[index] + " - Matched";
    matchedPairs = matchedPairs + 1;
    matchingFeedback.textContent = "Correct! " + matchExplanations[selected] + " " + matchedPairs + " of 3 pairs matched.";
    tip.textContent = "Good match! Find the remaining pairs to open the temple gate.";
    if (matchedPairs === 3) {
      matchingComplete = true;
      nextGame.disabled = false;
      document.getElementById("checkpoint-match").textContent = "Complete";
      document.getElementById("checkpoint-order").textContent = "Current";
      tip.textContent = "Gate open! You earned 50 demo XP. Continue to build the bridge.";
      updateProgress();
      nextGame.focus();
    } else {
      // Keep keyboard focus on an available percentage after a pair is removed.
      for (var i = 0; i < percentButtons.length; i++) {
        if (percentButtons[i].disabled === false) {
          percentButtons[i].focus();
          break;
        }
      }
    }
  }

  // Add the clicked calculation to the bridge and prevent selecting the same stone twice.
  function chooseStone(index) {
    if (activeScreen !== "ordering-screen" || orderingComplete || orderButtons[index].disabled) {
      return;
    }
    chosenStoneIndexes.push(index); // Add this stone's position to the end of the array.
    orderButtons[index].disabled = true;
    var stone = document.createElement("li"); // Make a new numbered-list item.
    stone.textContent = stones[index];
    document.getElementById("chosen-order").appendChild(stone); // Add it to the visible bridge.
    orderingFeedback.textContent = chosenStoneIndexes.length + " of 3 stones placed. Use Clear order to start again.";
    if (chosenStoneIndexes.length === 3) {
      checkOrderButton.disabled = false;
    } else {
      checkOrderButton.disabled = true;
    }
    if (chosenStoneIndexes.length === 3) {
      checkOrderButton.focus();
    } else {
      for (var i = 0; i < orderButtons.length; i++) {
        if (orderButtons[i].disabled === false) {
          orderButtons[i].focus();
          break;
        }
      }
    }
  }

  // Empty the bridge list and make all three stones available again.
  function clearOrder() {
    chosenStoneIndexes = [];
    document.getElementById("chosen-order").textContent = "";
    for (var i = 0; i < orderButtons.length; i++) {
      orderButtons[i].disabled = false;
    }
    checkOrderButton.disabled = true;
    orderingFeedback.textContent = "Choose the stone with the smallest result first.";
  }

  // Compare the three selected stone positions with the answer and award completion once.
  function checkOrder() {
    if (activeScreen !== "ordering-screen" || orderingComplete || chosenStoneIndexes.length !== 3) {
      return;
    }
    for (var i = 0; i < correctStoneIndexes.length; i++) {
      if (chosenStoneIndexes[i] !== correctStoneIndexes[i]) {
        orderingFeedback.textContent = "Try again. 10% of BBD 60 is BBD 6; 20% of BBD 50 is BBD 10; 25% of BBD 80 is BBD 20. Clear your order and compare these results.";
        tip.textContent = "Compare the calculated amounts, not just the percentages. Clear the stones to try again.";
        return;
      }
    }
    orderingComplete = true;
    checkOrderButton.disabled = true;
    clearOrderButton.disabled = true;
    finishButton.disabled = false;
    orderingFeedback.textContent = "Bridge complete! BBD 6 < BBD 10 < BBD 20. You earned another 50 demo XP.";
    document.getElementById("checkpoint-order").textContent = "Complete";
    tip.textContent = "You crossed the bridge! Both checkpoints are complete. View your level results.";
    updateProgress();
    finishButton.focus();
  }

  // Clear both games, feedback, XP, and friend details, then return to course selection.
  function resetDemo() {
    selectedPercentageIndex = -1;
    matchedPairs = 0;
    matchingComplete = false;
    orderingComplete = false;
    for (var i = 0; i < percentButtons.length; i++) {
      percentButtons[i].disabled = false;
      percentButtons[i].textContent = percentages[i] + "%";
      percentButtons[i].setAttribute("aria-pressed", "false");
      fractionButtons[i].disabled = false;
      fractionButtons[i].textContent = fractions[i];
    }
    clearOrder();
    nextGame.disabled = true;
    clearOrderButton.disabled = false;
    finishButton.disabled = true;
    matchingFeedback.textContent = "Choose a percentage first, then a fraction.";
    document.getElementById("checkpoint-match").textContent = "Locked";
    document.getElementById("checkpoint-order").textContent = "Locked";
    document.getElementById("friend-details").hidden = true;
    document.getElementById("friend-name").textContent = "";
    document.getElementById("friend-info").textContent = "";
    lastFriendButtonId = "";
    updateProgress();
    showScreen("course-screen", "Choose a world", "Choose a subject to begin. There is no timer, so take your time!");
  }

  // Open the lesson when the student chooses Mathematics.
  function openLesson() {
    showScreen("lesson-screen", "Learn percentages", "Read the examples. You will match fractions and compare calculated amounts.");
  }

  // Start the matching game after the student has opened the lesson.
  function startMatching() {
    if (activeScreen !== "lesson-screen") {
      return;
    }
    document.getElementById("checkpoint-match").textContent = "Current";
    showScreen("matching-screen", "Match the runes", "Choose a percentage rune, then its equivalent fraction. Match all three pairs. You can change your percentage before picking a fraction.");
  }

  // Open the bridge game only after all percentage pairs have been matched.
  function startOrdering() {
    if (matchingComplete === false || activeScreen !== "matching-screen") {
      return;
    }
    showScreen("ordering-screen", "Build the bridge", "Work out each amount, then choose stones from smallest to largest. Use Clear order to change your choices, then Check order.");
  }

  // Show the results only when the student has finished both games.
  function finishLevel() {
    if (matchingComplete === false || orderingComplete === false || activeScreen !== "ordering-screen") {
      return;
    }
    showScreen("complete-screen", "Level complete", "Level cleared! You earned 100 demo XP. Explore your friends or reset to play again.");
  }

  // Let the student rearrange the bridge stones while the game is unfinished.
  function restartOrder() {
    if (activeScreen !== "ordering-screen" || orderingComplete) {
      return;
    }
    clearOrder();
    orderButtons[0].focus();
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
  nextGame.addEventListener("click", startOrdering);
  finishButton.addEventListener("click", finishLevel);
  document.getElementById("reset-demo").addEventListener("click", resetDemo);
  document.getElementById("back-courses").addEventListener("click", resetDemo);
  clearOrderButton.addEventListener("click", restartOrder);
  checkOrderButton.addEventListener("click", checkOrder);
  document.getElementById("close-friend").addEventListener("click", closeFriend);
  document.getElementById("maya-details").addEventListener("click", showMaya);
  document.getElementById("jordan-details").addEventListener("click", showJordan);
  document.getElementById("alex-details").addEventListener("click", showAlex);

  // Each small function below tells the game exactly which tile was clicked.
  // Select the first percentage: 20%.
  percentButtons[0].addEventListener("click", function () {
    choosePercentage(0);
  });
  // Select the second percentage: 25%.
  percentButtons[1].addEventListener("click", function () {
    choosePercentage(1);
  });
  // Select the third percentage: 50%.
  percentButtons[2].addEventListener("click", function () {
    choosePercentage(2);
  });
  // Check the first fraction: 1/2.
  fractionButtons[0].addEventListener("click", function () {
    chooseFraction(0);
  });
  // Check the second fraction: 1/5.
  fractionButtons[1].addEventListener("click", function () {
    chooseFraction(1);
  });
  // Check the third fraction: 1/4.
  fractionButtons[2].addEventListener("click", function () {
    chooseFraction(2);
  });
  // Place the first stone: 25% of BBD 80.
  orderButtons[0].addEventListener("click", function () {
    chooseStone(0);
  });
  // Place the second stone: 10% of BBD 60.
  orderButtons[1].addEventListener("click", function () {
    chooseStone(1);
  });
  // Place the third stone: 20% of BBD 50.
  orderButtons[2].addEventListener("click", function () {
    chooseStone(2);
  });

  // Show the starting XP and enable controls now that their click handlers exist.
  updateProgress();
  document.getElementById("select-maths").disabled = false;
  document.getElementById("reset-demo").disabled = false;
  document.getElementById("maya-details").disabled = false;
  document.getElementById("jordan-details").disabled = false;
  document.getElementById("alex-details").disabled = false;
}

// Set up the sample tutor request: choose options, review them, then confirm the demo.
function initializeTutoring() {
  // These are fixed prototype choices, not tutor availability or student data.
  var topics = ["Percentages", "Ratios", "Solving equations"];
  var sessions = ["30 minutes", "1 hour", "2 hours"];
  var preferences = ["Weekday afternoon (illustrative; not agreed)", "Weekday evening (illustrative; not agreed)", "Weekend afternoon (illustrative; not agreed)"];
  var topicSelect = document.getElementById("request-topic");
  var sessionSelect = document.getElementById("request-session");
  var optionsPanel = document.getElementById("request-options");
  var summaryPanel = document.getElementById("request-summary");
  var confirmationPanel = document.getElementById("request-confirmation");
  var message = document.getElementById("request-message");
  var confirmButton = document.getElementById("confirm-request");
  var reviewed = false;
  var confirmed = false;

  // Hide old summaries and confirmations whenever the request options change.
  function clearPreview() {
    reviewed = false;
    confirmed = false;
    summaryPanel.style.display = "none";
    confirmationPanel.style.display = "none";
    optionsPanel.style.display = "block";
    confirmButton.style.display = "inline-block";
    topicSelect.setAttribute("aria-invalid", "false");
    sessionSelect.setAttribute("aria-invalid", "false");
    message.textContent = "Choose a topic and session, then review the example.";
  }

  // Check the topic and duration, then show a summary of the selected sample session.
  function reviewRequest() {
    // Index 0 is the prompt. The actual choices start at index 1.
    var topicIndex = topicSelect.selectedIndex - 1;
    var sessionIndex = sessionSelect.selectedIndex - 1;
    clearPreview();

    // A prompt has no matching array item. Check each dropdown separately.
    var topicMissing = topicIndex < 0 || topicIndex >= topics.length;
    var sessionMissing = sessionIndex < 0 || sessionIndex >= sessions.length;
    if (topicMissing) {
      topicSelect.setAttribute("aria-invalid", "true");
    }
    if (sessionMissing) {
      sessionSelect.setAttribute("aria-invalid", "true");
    }
    if (topicMissing || sessionMissing) {
      message.textContent = "Choose a topic and a session before reviewing your sample request.";
      message.focus();
      return;
    }
    // Insert only our authored choices, not user-entered text.
    document.getElementById("summary-topic").textContent = topics[topicIndex];
    document.getElementById("summary-session").textContent = sessions[sessionIndex];
    document.getElementById("summary-time").textContent = preferences[sessionIndex];
    reviewed = true;
    optionsPanel.style.display = "none";
    summaryPanel.style.display = "block";
    document.getElementById("request-summary-title").focus();
  }

  // Show the demonstration confirmation once, without sending a booking.
  function confirmRequest() {
    if (reviewed === false || confirmed) {
      return;
    }
    confirmed = true;
    confirmButton.style.display = "none";
    confirmationPanel.style.display = "block";
    document.getElementById("request-confirmation-title").focus();
    // This changes the display only. It never changes the GiveBack Wallet.
  }

  // Return to the topic and session choices so the student can edit them.
  function changeRequest() {
    clearPreview();
    document.getElementById("request-options-title").focus();
  }

  // Clear both dropdown choices and start a fresh sample tutor request.
  function anotherRequest() {
    topicSelect.selectedIndex = 0;
    sessionSelect.selectedIndex = 0;
    changeRequest();
  }

  // Buttons move through the demo; changing a dropdown clears any old preview.
  document.getElementById("review-request").addEventListener("click", reviewRequest);
  confirmButton.addEventListener("click", confirmRequest);
  document.getElementById("change-request").addEventListener("click", changeRequest);
  document.getElementById("another-request").addEventListener("click", anotherRequest);
  topicSelect.addEventListener("change", clearPreview);
  sessionSelect.addEventListener("change", clearPreview);
  document.getElementById("review-request").disabled = false;
}

// Set up the application demo and its reset button. No files are uploaded.
function initializeTutorApplication() {
  var form = document.getElementById("tutor-application");
  var confirmation = document.getElementById("application-confirmation");

  // The browser checks required fields before calling this function.
  // Stop the form from leaving the page and show the demo confirmation instead.
  function submitApplication(event) {
    event.preventDefault(); // Keep the form on this page instead of sending it.
    form.style.display = "none";
    confirmation.style.display = "block";
    document.getElementById("application-confirmation-title").focus();
  }

  // Clear the name, chosen subjects, and files, then let the student try again.
  function resetApplication() {
    form.reset(); // The browser clears all the form fields for us.
    confirmation.style.display = "none";
    form.style.display = "block";
    document.getElementById("tutor-name").focus();
  }

  // Connect the application buttons to the two functions above.
  form.addEventListener("submit", submitApplication);
  document.getElementById("reset-application").addEventListener("click", resetApplication);
  document.getElementById("preview-application").disabled = false;
}

// Loading this shared file must not look for learning controls on the tutor page.
if (document.getElementById("select-maths")) {
  initializeLearning();
}
if (document.getElementById("review-request")) {
  initializeTutoring();
}
if (document.getElementById("tutor-application")) {
  initializeTutorApplication();
}

