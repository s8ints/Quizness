var chosenTopic = "";
var chosenSession = "";
var requestReviewed = false;

function clearRequestPreview() {
  requestReviewed = false;
  document.getElementById("review").setAttribute("class", "demo-note request-summary");
  document.getElementById("request-done").setAttribute("class", "demo-note request-confirmation");
}

function chooseTopic(name, buttonId) {
  chosenTopic = name;
  document.getElementById("topic-percentages").setAttribute("aria-pressed", "false");
  document.getElementById("topic-ratios").setAttribute("aria-pressed", "false");
  document.getElementById("topic-equations").setAttribute("aria-pressed", "false");
  document.getElementById(buttonId).setAttribute("aria-pressed", "true");
  clearRequestPreview();
  document.getElementById("request-message").textContent = "Topic: " + name + ". Choose a session length, then review.";
}

function chooseSession(name, buttonId) {
  chosenSession = name;
  document.getElementById("session-30").setAttribute("aria-pressed", "false");
  document.getElementById("session-60").setAttribute("aria-pressed", "false");
  document.getElementById("session-120").setAttribute("aria-pressed", "false");
  document.getElementById(buttonId).setAttribute("aria-pressed", "true");
  clearRequestPreview();
  document.getElementById("request-message").textContent = "Session: " + name + ". Choose a topic, then review.";
}

function reviewRequest() {
  if (chosenTopic === "" || chosenSession === "") {
    document.getElementById("request-message").textContent = "Choose both a topic and a session length before reviewing.";
    return false;
  }
  document.getElementById("choice").textContent = "Topic: " + chosenTopic + " | Session: " + chosenSession;
  document.getElementById("review").setAttribute("class", "demo-note request-summary is-open");
  document.getElementById("request-message").textContent = "Review the fictional request below. Nothing has been sent or saved.";
  requestReviewed = true;
}

function editRequest() {
  document.getElementById("request-message").textContent = "Change the topic or session above, then review again.";
}

function finishRequest() {
  if (requestReviewed === false) {
    document.getElementById("request-message").textContent = "Review your choices before confirming.";
    return false;
  }
  document.getElementById("request-done").setAttribute("class", "demo-note request-confirmation is-open");
  document.getElementById("request-message").textContent = "Demonstration complete. Nothing was sent or saved.";
}

function resetRequest() {
  chosenTopic = "";
  chosenSession = "";
  clearRequestPreview();
  document.getElementById("topic-percentages").setAttribute("aria-pressed", "false");
  document.getElementById("topic-ratios").setAttribute("aria-pressed", "false");
  document.getElementById("topic-equations").setAttribute("aria-pressed", "false");
  document.getElementById("session-30").setAttribute("aria-pressed", "false");
  document.getElementById("session-60").setAttribute("aria-pressed", "false");
  document.getElementById("session-120").setAttribute("aria-pressed", "false");
  document.getElementById("choice").textContent = "";
  document.getElementById("request-message").textContent = "Choose a topic and session, then review the example. Nothing will be sent or saved.";
}

function finishApplication() {
  document.getElementById("application-done").setAttribute("class", "demo-note request-confirmation is-open");
}

function resetApplication() {
  document.getElementById("application-done").setAttribute("class", "demo-note request-confirmation");
}
