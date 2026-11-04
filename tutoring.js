// Replace an element's content with plain text.
function changeText(element, value) {
  element.innerHTML = "";
  element.appendChild(document.createTextNode(value));
}

// HTML handles required fields. These functions only show or hide the demo steps.
function reviewRequest() {
  var topic = document.getElementById("topic").value;
  var session = document.getElementById("session-length").value;
  changeText(document.getElementById("choice"), "Topic: " + topic + " | Session: " + session);
  document.getElementById("tutor-request").hidden = true;
  document.getElementById("review").hidden = false;
}

function editRequest() {
  document.getElementById("tutor-request").hidden = false;
  document.getElementById("review").hidden = true;
  document.getElementById("request-done").hidden = true;
}

function finishRequest() {
  document.getElementById("review").hidden = true;
  document.getElementById("request-done").hidden = false;
}

function finishApplication() {
  document.getElementById("application-done").hidden = false;
}

function resetApplication() {
  document.getElementById("application-done").hidden = true;
}

document.getElementById("review-button").disabled = false;
document.getElementById("apply-button").disabled = false;
