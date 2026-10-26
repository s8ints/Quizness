/* Each page starts only its own demonstration. Functions, variables, arrays,
   events, and DOM updates use introductory concepts from Chapters 21-22. */
function initializeLearning() {
  /* Quizzness sample quest. No accounts, network requests, or saved data.
     Chapter 21: variables, arrays, functions, conditions, loops, and events.
     Chapter 22: find elements and update their content, attributes, and styles. */

  // The questions and explanations are kept separate from the display functions.
  var questions = ["What is 20% of BBD 50?", "What is 25% of BBD 80?"];
  var answers = [
    ["A. BBD 5", "B. BBD 10", "C. BBD 20"],
    ["A. BBD 10", "B. BBD 20", "C. BBD 25"]
  ];
  var correctAnswers = [1, 1];
  var explanations = [
    [
      "Try again. BBD 5 is 10% of BBD 50, because 0.10 &times; 50 = 5. The question asks for 20%, which is twice that amount.",
      "Correct! 20 &divide; 100 = 0.20. Then 0.20 &times; 50 = 10. The answer is BBD 10.",
      "Try again. 20% is a proportion, not a fixed currency amount. Multiply 0.20 by 50. BBD 20 would be 40% of BBD 50."
    ],
    [
      "Try again. BBD 10 is one eighth of 80, or 12.5%. For 25%, find one quarter of 80.",
      "Correct! 25 &divide; 100 = 0.25. Then 0.25 &times; 80 = 20. You can also divide 80 by 4 because 25% is one quarter.",
      "Try again. The percentage is 25%, not BBD 25. Apply it to the amount: 0.25 &times; 80 = 20."
    ]
  ];

  // These values exist only while this page is open. Refreshing starts again.
  var currentQuestion = 0;
  var completedQuestions = 0;
  var answered = false;
  var answerCorrect = false;
  var activeScreen = "course-screen";

  var screens = document.getElementsByClassName("demo-screen");
  var answerButtons = document.getElementsByClassName("demo-answer");
  var feedback = document.getElementById("feedback-message");
  var retryButton = document.getElementById("retry-answer");
  var nextButton = document.getElementById("next-question");
  var progress = document.getElementById("visit-progress");
  var stage = document.getElementById("visit-stage");

  // Show one stage and move keyboard focus to its heading.
  function showScreen(screenId) {
    for (var i = 0; i < screens.length; i++) {
      screens[i].style.display = "none";
    }
    var screen = document.getElementById(screenId);
    screen.style.display = "block";
    activeScreen = screenId;
    screen.getElementsByTagName("h2")[0].focus();
  }

  function updateProgress() {
    progress.innerHTML = completedQuestions + " of " + questions.length + " questions complete this visit.";
  }

  function showLesson() {
    stage.innerHTML = "<strong>Current step:</strong> Learn percentages";
    showScreen("lesson-screen");
  }

  function showQuestion() {
    answered = false;
    answerCorrect = false;
    document.getElementById("question-title").innerHTML = "Question " + (currentQuestion + 1) + " of " + questions.length;
    document.getElementById("question-text").innerHTML = questions[currentQuestion];
    for (var i = 0; i < answerButtons.length; i++) {
      answerButtons[i].innerHTML = answers[currentQuestion][i];
      answerButtons[i].disabled = false;
      answerButtons[i].setAttribute("class", "demo-answer");
    }
    feedback.innerHTML = "Choose an answer to see feedback.";
    feedback.setAttribute("class", "demo-feedback");
    retryButton.style.display = "none";
    nextButton.style.display = "none";
    if (currentQuestion === questions.length - 1) {
      nextButton.innerHTML = "View completion summary";
    } else {
      nextButton.innerHTML = "Continue to question 2";
    }
    stage.innerHTML = "<strong>Current step:</strong> Practise percentages";
    showScreen("quiz-screen");
  }

  function checkAnswer(choice) {
    // Ignore repeat clicks and events from a screen that is no longer shown.
    if (answered || activeScreen !== "quiz-screen") {
      return;
    }
    answered = true;
    for (var i = 0; i < answerButtons.length; i++) {
      answerButtons[i].disabled = true;
    }
    answerButtons[choice].setAttribute("class", "demo-answer demo-selected");
    // Only fixed, authored explanations are inserted; no student text is used.
    feedback.innerHTML = explanations[currentQuestion][choice];
    if (choice === correctAnswers[currentQuestion]) {
      answerCorrect = true;
      completedQuestions++;
      updateProgress();
      feedback.setAttribute("class", "demo-feedback demo-correct");
      nextButton.style.display = "inline-block";
    } else {
      feedback.setAttribute("class", "demo-feedback demo-incorrect");
      retryButton.style.display = "inline-block";
    }
    feedback.focus();
  }

  function retryQuestion() {
    if (activeScreen === "quiz-screen" && answered && !answerCorrect) {
      showQuestion();
    }
  }

  function continueQuest() {
    if (activeScreen !== "quiz-screen" || !answerCorrect) {
      return;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      stage.innerHTML = "<strong>Current step:</strong> Quest complete";
      showScreen("complete-screen");
    }
  }

  function resetDemo() {
    currentQuestion = 0;
    completedQuestions = 0;
    answered = false;
    answerCorrect = false;
    feedback.innerHTML = "Choose an answer to see feedback.";
    feedback.setAttribute("class", "demo-feedback");
    retryButton.style.display = "none";
    nextButton.style.display = "none";
    updateProgress();
    stage.innerHTML = "<strong>Current step:</strong> Choose a world";
    showScreen("course-screen");
  }

  // The script is loaded after the HTML, so the controls already exist.
  document.getElementById("select-maths").addEventListener("click", showLesson);
  document.getElementById("start-quiz").addEventListener("click", showQuestion);
  document.getElementById("back-courses").addEventListener("click", resetDemo);
  document.getElementById("reset-demo").addEventListener("click", resetDemo);
  answerButtons[0].addEventListener("click", function () { checkAnswer(0); });
  answerButtons[1].addEventListener("click", function () { checkAnswer(1); });
  answerButtons[2].addEventListener("click", function () { checkAnswer(2); });
  retryButton.addEventListener("click", retryQuestion);
  nextButton.addEventListener("click", continueQuest);
  document.getElementById("select-maths").disabled = false;
  document.getElementById("reset-demo").disabled = false;
}

function initializeTutoring() {
  // These are fixed prototype choices, not tutor availability or student data.
  var topics = ["Percentages", "Ratios", "Solving equations"];
  var sessions = ["15-minute explanation", "30-minute worked example"];
  var preferences = ["Weekday afternoon (illustrative; not agreed)", "Weekday evening (illustrative; not agreed)"];
  var topicSelect = document.getElementById("request-topic");
  var sessionSelect = document.getElementById("request-session");
  var optionsPanel = document.getElementById("request-options");
  var summaryPanel = document.getElementById("request-summary");
  var confirmationPanel = document.getElementById("request-confirmation");
  var message = document.getElementById("request-message");
  var confirmButton = document.getElementById("confirm-request");
  var reviewed = false;
  var confirmed = false;

  function clearPreview() {
    reviewed = false;
    confirmed = false;
    summaryPanel.style.display = "none";
    confirmationPanel.style.display = "none";
    optionsPanel.style.display = "block";
    confirmButton.style.display = "inline-block";
    topicSelect.setAttribute("aria-invalid", "false");
    sessionSelect.setAttribute("aria-invalid", "false");
    message.innerHTML = "Choose a topic and session, then review the example.";
  }

  function reviewRequest() {
    // Index 0 is the prompt. The actual choices start at index 1.
    var topicIndex = topicSelect.selectedIndex - 1;
    var sessionIndex = sessionSelect.selectedIndex - 1;
    clearPreview();
    if (topicIndex < 0 || topicIndex >= topics.length || sessionIndex < 0 || sessionIndex >= sessions.length) {
      if (topicIndex < 0 || topicIndex >= topics.length) {
        topicSelect.setAttribute("aria-invalid", "true");
      }
      if (sessionIndex < 0 || sessionIndex >= sessions.length) {
        sessionSelect.setAttribute("aria-invalid", "true");
      }
      message.innerHTML = "Choose a topic and a session before reviewing your sample request.";
      message.focus();
      return;
    }
    // Insert only our authored choices, not user-entered text.
    document.getElementById("summary-topic").innerHTML = topics[topicIndex];
    document.getElementById("summary-session").innerHTML = sessions[sessionIndex];
    document.getElementById("summary-time").innerHTML = preferences[sessionIndex];
    reviewed = true;
    optionsPanel.style.display = "none";
    summaryPanel.style.display = "block";
    document.getElementById("request-summary-title").focus();
  }

  function confirmRequest() {
    if (!reviewed || confirmed) {
      return;
    }
    confirmed = true;
    confirmButton.style.display = "none";
    confirmationPanel.style.display = "block";
    document.getElementById("request-confirmation-title").focus();
    // This changes the display only. It never changes the GiveBack Wallet.
  }

  function changeRequest() {
    clearPreview();
    document.getElementById("request-options-title").focus();
  }

  function anotherRequest() {
    topicSelect.selectedIndex = 0;
    sessionSelect.selectedIndex = 0;
    changeRequest();
  }

  document.getElementById("review-request").addEventListener("click", reviewRequest);
  confirmButton.addEventListener("click", confirmRequest);
  document.getElementById("change-request").addEventListener("click", changeRequest);
  document.getElementById("another-request").addEventListener("click", anotherRequest);
  topicSelect.addEventListener("change", clearPreview);
  sessionSelect.addEventListener("change", clearPreview);
  document.getElementById("review-request").disabled = false;
}

// Loading this shared file must not look for learning controls on the tutor page.
if (document.getElementById("select-maths")) {
  initializeLearning();
}
if (document.getElementById("review-request")) {
  initializeTutoring();
}

