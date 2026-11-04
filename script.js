/* Root school prototype: temporary sample progress, no network or storage.
   JavaScript follows Learning Web Design Chapters 21-22 and Lab Exercise 8. */

// Sample learning answers and state. Chapter 21: variables, arrays and functions.
var percentages = [20, 25, 50];
var fractions = ["1/2", "1/5", "1/4"];
var fractionValues = [50, 20, 25];
var explanations = [
  "20% means 20 out of 100. Dividing both by 20 gives 1/5.",
  "25% means 25 out of 100. Dividing both by 25 gives 1/4.",
  "50% means 50 out of 100, which is one half: 1/2."
];
var stones = ["25% of BBD 80", "10% of BBD 60", "20% of BBD 50"];
var learningStage = 0;
var chosenPercentage = -1;
var pairsMatched = 0;
var matchingComplete = false;
var orderingComplete = false;
var stoneCount = 0;
var firstStone = -1;
var secondStone = -1;
var thirdStone = -1;
var lifetimeXP = 320;
var leaderboardOrder = [0, 1, 2, 3];

function openLearningStage(id, className, stage, tip) {
  document.getElementById(id).setAttribute("class", className);
  document.getElementById("visit-stage").textContent = "Current step: " + stage;
  document.getElementById("panthy-tip").textContent = tip;
}

function updateLeaderboard() {
  var names = ["Maya", "Jordan", "You", "Alex"];
  var xp = [400, 350, lifetimeXP, 280];
  leaderboardOrder = [0, 1, 2, 3];
  if (lifetimeXP > 400) {
    leaderboardOrder = [2, 0, 1, 3];
  } else {
    if (lifetimeXP > 350) {
      leaderboardOrder = [0, 2, 1, 3];
    }
  }
  for (var i = 0; i < leaderboardOrder.length; i++) {
    var rank = i + 1;
    var row = document.getElementById("leaderboard-place-" + rank);
    document.getElementById("leaderboard-name-" + rank).textContent = names[leaderboardOrder[i]];
    document.getElementById("leaderboard-xp-" + rank).textContent = xp[leaderboardOrder[i]];
    row.setAttribute("class", "");
    if (leaderboardOrder[i] === 2) {
      row.setAttribute("class", "leaderboard-you");
      document.getElementById("ranking-message").textContent = "Your sample rank: " + rank + " of 4.";
    }
  }
}

function updateProgress() {
  var completed = 0;
  if (matchingComplete) { completed = completed + 1; }
  if (orderingComplete) { completed = completed + 1; }
  lifetimeXP = 320 + completed * 50;
  document.getElementById("visit-progress").textContent = completed + " of 2 checkpoints complete this visit.";
  document.getElementById("demo-xp").textContent = completed * 50 + " XP earned this demo.";
  updateLeaderboard();
}

function openLesson() {
  if (learningStage < 1) {
    learningStage = 1;
    openLearningStage("lesson-screen", "demo-screen demo-panel is-open", "Learn percentages",
      "Read the examples. You will match fractions and compare calculated amounts.");
  }
}

function startMatching() {
  if (learningStage < 2) {
    learningStage = 2;
    document.getElementById("checkpoint-match").textContent = "Current";
    openLearningStage("matching-screen", "demo-screen demo-panel game-arena is-open", "Match the runes",
      "Choose a percentage, then its equivalent fraction. Match all three pairs.");
  }
}

function choosePercentage(index) {
  var button = document.getElementById("match-percent-" + index);
  var feedback = document.getElementById("matching-feedback");
  if (matchingComplete || button.getAttribute("data-matched") === "yes") {
    feedback.textContent = "That rune is already matched. Continue to the bridge when ready.";
    return false;
  }
  chosenPercentage = index;
  for (var i = 0; i < 3; i++) {
    document.getElementById("match-percent-" + i).setAttribute("aria-pressed", "false");
  }
  button.setAttribute("aria-pressed", "true");
  feedback.textContent = percentages[index] + "% selected. Now choose its fraction.";
}

function chooseFraction(index) {
  var button = document.getElementById("match-fraction-" + index);
  var feedback = document.getElementById("matching-feedback");
  if (matchingComplete || button.getAttribute("data-matched") === "yes") {
    feedback.textContent = "That fraction is already matched. Find an unmatched pair.";
    return false;
  }
  if (chosenPercentage === -1) {
    feedback.textContent = "Choose a percentage first, then its matching fraction.";
    return false;
  }
  var selected = chosenPercentage;
  chosenPercentage = -1;
  document.getElementById("match-percent-" + selected).setAttribute("aria-pressed", "false");
  if (percentages[selected] !== fractionValues[index]) {
    feedback.textContent = "Try again. " + explanations[selected];
    document.getElementById("panthy-tip").textContent = "A percentage is a fraction out of 100. Simplify it, then try again.";
    return false;
  }
  document.getElementById("match-percent-" + selected).setAttribute("data-matched", "yes");
  button.setAttribute("data-matched", "yes");
  document.getElementById("match-percent-" + selected).textContent = percentages[selected] + "% - Matched";
  button.textContent = fractions[index] + " - Matched";
  pairsMatched = pairsMatched + 1;
  feedback.textContent = "Correct! " + explanations[selected] + " " + pairsMatched + " of 3 pairs matched.";
  if (pairsMatched === 3) {
    matchingComplete = true;
    document.getElementById("checkpoint-match").textContent = "Complete";
    document.getElementById("checkpoint-order").textContent = "Ready";
    document.getElementById("panthy-tip").textContent = "Gate open! You earned 50 demo XP. Continue to build the bridge.";
    document.getElementById("temple-gate").setAttribute("class", "temple-gate gate-open");
    document.getElementById("gate-caption").textContent = "Gate open! Continue your adventure.";
    document.getElementById("game-panthy").setAttribute("class", "panthy-celebrate");
    document.getElementById("match-reward").setAttribute("class", "floating-xp is-visible");
    updateProgress();
  } else {
    document.getElementById("panthy-tip").textContent = "Good match! Find the remaining pairs.";
  }
}

function startOrdering() {
  if (matchingComplete === false) {
    document.getElementById("matching-feedback").textContent = "Match all three pairs before continuing to the bridge.";
    return false;
  }
  if (learningStage < 3) {
    learningStage = 3;
    document.getElementById("checkpoint-order").textContent = "Current";
    openLearningStage("ordering-screen", "demo-screen demo-panel game-arena is-open", "Build the bridge",
      "Choose stones from smallest result to largest. Use Clear order to try again.");
  }
}

function chooseStone(index) {
  var button = document.getElementById("order-" + index);
  var feedback = document.getElementById("ordering-feedback");
  if (orderingComplete) {
    feedback.textContent = "The bridge is complete. View results or reset the demonstration.";
    return false;
  }
  if (button.getAttribute("data-selected") === "yes") {
    feedback.textContent = "That stone is already on the bridge. Choose another or clear the order.";
    return false;
  }
  if (stoneCount === 3) {
    feedback.textContent = "All three stones are placed. Check the order or clear the bridge to try again.";
    return false;
  }
  button.setAttribute("data-selected", "yes");
  stoneCount = stoneCount + 1;
  if (stoneCount === 1) { firstStone = index; }
  if (stoneCount === 2) { secondStone = index; }
  if (stoneCount === 3) { thirdStone = index; }
  var stone = document.createElement("li");
  stone.textContent = stones[index];
  document.getElementById("chosen-order").appendChild(stone);
  document.getElementById("bridge-plank-" + stoneCount).setAttribute("class", "bridge-plank is-placed");
  feedback.textContent = stoneCount + " of 3 stones placed. Use Clear order to try again.";
}

function clearOrder() {
  stoneCount = 0;
  firstStone = -1;
  secondStone = -1;
  thirdStone = -1;
  document.getElementById("chosen-order").textContent = "";
  for (var i = 0; i < 3; i++) {
    document.getElementById("order-" + i).setAttribute("data-selected", "no");
    document.getElementById("bridge-plank-" + (i + 1)).setAttribute("class", "bridge-plank");
  }
  document.getElementById("bridge-scene").setAttribute("class", "bridge-scene");
  document.getElementById("ordering-feedback").textContent = "Choose the stone with the smallest result first.";
}

function restartOrder() {
  if (orderingComplete) {
    document.getElementById("ordering-feedback").textContent = "This checkpoint is complete. Reset the demonstration to play again.";
    return false;
  }
  clearOrder();
}

function checkOrder() {
  var feedback = document.getElementById("ordering-feedback");
  if (orderingComplete) {
    feedback.textContent = "The bridge is already complete. View your level results.";
    return false;
  }
  if (stoneCount !== 3) {
    feedback.textContent = "Place all three stones before checking your order.";
    return false;
  }
  if (firstStone !== 1 || secondStone !== 2 || thirdStone !== 0) {
    feedback.textContent = "Try again. 10% of BBD 60 is BBD 6; 20% of BBD 50 is BBD 10; 25% of BBD 80 is BBD 20. Clear your order and compare these results.";
    document.getElementById("panthy-tip").textContent = "Compare the calculated amounts, then clear the stones to try again.";
    return false;
  }
  orderingComplete = true;
  document.getElementById("bridge-scene").setAttribute("class", "bridge-scene bridge-complete");
  document.getElementById("order-reward").setAttribute("class", "floating-xp is-visible");
  feedback.textContent = "Bridge complete! BBD 6 < BBD 10 < BBD 20. You earned another 50 demo XP.";
  document.getElementById("checkpoint-order").textContent = "Complete";
  document.getElementById("panthy-tip").textContent = "You crossed the bridge! View your level results.";
  updateProgress();
}

function finishLevel() {
  if (orderingComplete === false) {
    document.getElementById("ordering-feedback").textContent = "Complete the bridge before viewing your results.";
    return false;
  }
  if (learningStage < 4) {
    learningStage = 4;
    openLearningStage("complete-screen", "demo-screen demo-panel is-open", "Level complete",
      "Level cleared! You earned 100 demo XP. Explore your friends or reset to play again.");
  }
}

function clearFriend() {
  document.getElementById("friend-name").textContent = "Friend details";
  document.getElementById("friend-info").textContent = "Choose a friend's name to see their fictional sample details.";
}
function showMaya() {
  document.getElementById("friend-name").textContent = "Maya (fictional friend)";
  document.getElementById("friend-info").textContent = "Sample lifetime XP: 400. Preferred subject: Mathematics.";
}
function showJordan() {
  document.getElementById("friend-name").textContent = "Jordan (fictional friend)";
  document.getElementById("friend-info").textContent = "Sample lifetime XP: 350. Preferred subject: Programming.";
}
function showYou() {
  document.getElementById("friend-name").textContent = "You (fictional sample)";
  document.getElementById("friend-info").textContent = "Your sample lifetime XP: " + lifetimeXP + ".";
}
function showAlex() {
  document.getElementById("friend-name").textContent = "Alex (fictional friend)";
  document.getElementById("friend-info").textContent = "Sample lifetime XP: 280. Preferred subject: Statistics.";
}
function showRank(index) {
  if (leaderboardOrder[index] === 0) { showMaya(); }
  if (leaderboardOrder[index] === 1) { showJordan(); }
  if (leaderboardOrder[index] === 2) { showYou(); }
  if (leaderboardOrder[index] === 3) { showAlex(); }
}

function resetLearning() {
  learningStage = 0;
  chosenPercentage = -1;
  pairsMatched = 0;
  matchingComplete = false;
  orderingComplete = false;
  document.getElementById("temple-gate").setAttribute("class", "temple-gate");
  document.getElementById("gate-caption").textContent = "Match the runes to open the gate";
  document.getElementById("game-panthy").setAttribute("class", "");
  document.getElementById("match-reward").setAttribute("class", "floating-xp");
  document.getElementById("order-reward").setAttribute("class", "floating-xp");
  for (var i = 0; i < 3; i++) {
    var percent = document.getElementById("match-percent-" + i);
    var fraction = document.getElementById("match-fraction-" + i);
    percent.setAttribute("data-matched", "no");
    percent.setAttribute("aria-pressed", "false");
    fraction.setAttribute("data-matched", "no");
    percent.textContent = percentages[i] + "%";
    fraction.textContent = fractions[i];
  }
  clearOrder();
  document.getElementById("lesson-screen").setAttribute("class", "demo-screen demo-panel");
  document.getElementById("matching-screen").setAttribute("class", "demo-screen demo-panel game-arena");
  document.getElementById("ordering-screen").setAttribute("class", "demo-screen demo-panel game-arena");
  document.getElementById("complete-screen").setAttribute("class", "demo-screen demo-panel");
  document.getElementById("matching-feedback").textContent = "Choose a percentage first, then a fraction.";
  document.getElementById("checkpoint-match").textContent = "Locked";
  document.getElementById("checkpoint-order").textContent = "Locked";
  clearFriend();
  updateProgress();
  document.getElementById("visit-stage").textContent = "Current step: Choose a world";
  document.getElementById("panthy-tip").textContent = "Choose a subject to begin. There is no timer, so take your time!";
}

function percent0() { choosePercentage(0); }
function percent1() { choosePercentage(1); }
function percent2() { choosePercentage(2); }
function fraction0() { chooseFraction(0); }
function fraction1() { chooseFraction(1); }
function fraction2() { chooseFraction(2); }
function stone0() { chooseStone(0); }
function stone1() { chooseStone(1); }
function stone2() { chooseStone(2); }
function rank0() { showRank(0); }
function rank1() { showRank(1); }
function rank2() { showRank(2); }
function rank3() { showRank(3); }

function initializeLearning() {
  document.getElementById("select-maths").addEventListener("click", openLesson);
  document.getElementById("start-quiz").addEventListener("click", startMatching);
  document.getElementById("next-game").addEventListener("click", startOrdering);
  document.getElementById("clear-order").addEventListener("click", restartOrder);
  document.getElementById("check-order").addEventListener("click", checkOrder);
  document.getElementById("finish-level").addEventListener("click", finishLevel);
  document.getElementById("reset-demo").addEventListener("click", resetLearning);
  document.getElementById("leaderboard-name-1").addEventListener("click", rank0);
  document.getElementById("leaderboard-name-2").addEventListener("click", rank1);
  document.getElementById("leaderboard-name-3").addEventListener("click", rank2);
  document.getElementById("leaderboard-name-4").addEventListener("click", rank3);
  document.getElementById("close-friend").addEventListener("click", clearFriend);
  document.getElementById("match-percent-0").addEventListener("click", percent0);
  document.getElementById("match-percent-1").addEventListener("click", percent1);
  document.getElementById("match-percent-2").addEventListener("click", percent2);
  document.getElementById("match-fraction-0").addEventListener("click", fraction0);
  document.getElementById("match-fraction-1").addEventListener("click", fraction1);
  document.getElementById("match-fraction-2").addEventListener("click", fraction2);
  document.getElementById("order-0").addEventListener("click", stone0);
  document.getElementById("order-1").addEventListener("click", stone1);
  document.getElementById("order-2").addEventListener("click", stone2);
  updateProgress();
}

// Fixed fictional tutoring choices. Buttons remain visible as details appear.
var topicNames = ["Percentages", "Ratios", "Solving equations"];
var sessionNames = ["30 minutes", "1 hour", "2 hours"];
var sessionTimes = ["Weekday afternoon (illustrative; not agreed)",
  "Weekday evening (illustrative; not agreed)", "Weekend afternoon (illustrative; not agreed)"];
var topicButtonIds = ["topic-percentages", "topic-ratios", "topic-equations"];
var sessionButtonIds = ["session-30", "session-60", "session-120"];
var chosenTopic = -1;
var chosenSession = -1;
var requestReviewed = false;
var requestConfirmed = false;

function clearRequestPreview() {
  requestReviewed = false;
  requestConfirmed = false;
  document.getElementById("request-summary").setAttribute("class", "request-summary");
  document.getElementById("request-confirmation").setAttribute("class", "request-confirmation");
  document.getElementById("request-message").textContent = "Choose a topic and session, then review the example.";
}
function chooseTopic(index) {
  chosenTopic = index;
  for (var i = 0; i < 3; i++) {
    document.getElementById(topicButtonIds[i]).setAttribute("aria-pressed", "false");
  }
  document.getElementById(topicButtonIds[index]).setAttribute("aria-pressed", "true");
  clearRequestPreview();
  document.getElementById("request-message").textContent = topicNames[index] + " selected. Choose a session length.";
}
function chooseSession(index) {
  chosenSession = index;
  for (var i = 0; i < 3; i++) {
    document.getElementById(sessionButtonIds[i]).setAttribute("aria-pressed", "false");
  }
  document.getElementById(sessionButtonIds[index]).setAttribute("aria-pressed", "true");
  clearRequestPreview();
  document.getElementById("request-message").textContent = sessionNames[index] + " selected. Review your sample request.";
}
function reviewRequest() {
  if (chosenTopic === -1 || chosenSession === -1) {
    document.getElementById("request-message").textContent = "Choose both a topic and a session before reviewing.";
    return false;
  }
  if (requestConfirmed) {
    document.getElementById("request-message").textContent = "This demonstration is complete. Choose another option or start again.";
    return false;
  }
  document.getElementById("summary-topic").textContent = topicNames[chosenTopic];
  document.getElementById("summary-session").textContent = sessionNames[chosenSession];
  document.getElementById("summary-time").textContent = sessionTimes[chosenSession];
  document.getElementById("request-summary").setAttribute("class", "request-summary is-open");
  document.getElementById("request-message").textContent = "Sample request ready below. Review it, then confirm the demonstration.";
  requestReviewed = true;
}
function confirmRequest() {
  if (requestReviewed === false || requestConfirmed === true) {
    document.getElementById("request-message").textContent = "Review a new sample request before confirming it.";
    return false;
  }
  requestConfirmed = true;
  document.getElementById("request-confirmation").setAttribute("class", "request-confirmation is-open");
  document.getElementById("request-message").textContent = "Demonstration complete. Nothing was sent or saved.";
}
function changeRequest() {
  document.getElementById("request-message").textContent = "Choose another topic or session above. Your current summary stays visible until you choose.";
}
function anotherRequest() {
  chosenTopic = -1;
  chosenSession = -1;
  for (var i = 0; i < 3; i++) {
    document.getElementById(topicButtonIds[i]).setAttribute("aria-pressed", "false");
    document.getElementById(sessionButtonIds[i]).setAttribute("aria-pressed", "false");
  }
  clearRequestPreview();
}
function topic0() { chooseTopic(0); }
function topic1() { chooseTopic(1); }
function topic2() { chooseTopic(2); }
function session0() { chooseSession(0); }
function session1() { chooseSession(1); }
function session2() { chooseSession(2); }
function initializeTutoring() {
  document.getElementById("topic-percentages").addEventListener("click", topic0);
  document.getElementById("topic-ratios").addEventListener("click", topic1);
  document.getElementById("topic-equations").addEventListener("click", topic2);
  document.getElementById("session-30").addEventListener("click", session0);
  document.getElementById("session-60").addEventListener("click", session1);
  document.getElementById("session-120").addEventListener("click", session2);
  document.getElementById("review-request").addEventListener("click", reviewRequest);
  document.getElementById("confirm-request").addEventListener("click", confirmRequest);
  document.getElementById("change-request").addEventListener("click", changeRequest);
  document.getElementById("another-request").addEventListener("click", anotherRequest);
}

// The application button does not submit the form; native reset clears fields.
function previewApplication() {
  document.getElementById("application-confirmation").setAttribute("class", "request-confirmation is-open");
}
function clearApplicationPreview() {
  document.getElementById("application-confirmation").setAttribute("class", "request-confirmation");
}
function initializeApplication() {
  document.getElementById("preview-application").addEventListener("click", previewApplication);
  document.getElementById("reset-application").addEventListener("click", clearApplicationPreview);
}

if (document.getElementById("select-maths")) { initializeLearning(); }
if (document.getElementById("review-request")) { initializeTutoring(); }
if (document.getElementById("tutor-application")) { initializeApplication(); }
