let quizzes = [];
let currentQuizQuestion = 0;
let currentQuizScore = 0;
let currentQuizHintsUsed = 0;
let currentQuizProgress = [];
let currentQuiz = null;

// Universal function to navigate between screens
function navigateToScreen(screenId) {
    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.add('hidden'));

    // Show the targeted screen
    document.getElementById(screenId).classList.remove('hidden');
}

// Fetch quiz data from external JSON file
function fetchQuizData() {
    quizzes = jsFileQuizzesData;
    loadQuizList();
}

// Load quiz list on the home screen
function loadQuizList() {
    const quizListElement = document.getElementById('quiz-list');
    quizListElement.innerHTML = '';
    quizzes.forEach((quiz, index) => {
        const quizItem = document.createElement('li');
        quizItem.innerHTML = `
            <button class="card-item" onclick="startQuiz(${index})">                      
                <div class="card-content">
                <span class="card-title">${quiz.name}</span>
                <span class="card-badge">${quiz.questions.length} questions</span>
                </div>
            </button>`;
        quizListElement.appendChild(quizItem);
    });
}

// Start selected quiz
function startQuiz(quizIndex) {
    currentQuiz = quizzes[quizIndex];
    document.getElementById('quiz-title').textContent = currentQuiz.name;
    document.getElementById('questions-count').textContent = "Questions: " + currentQuiz.questions.length;
    resetQuiz();
    navigateToScreen('quiz-detail-screen');
    loadQuestion();
}

// Load current question
function loadQuestion() {
    const q = currentQuiz.questions[currentQuizQuestion];
    document.getElementById('question').textContent = q.question;
    const options = document.getElementById('options');
    options.innerHTML = '';
    q.options.forEach((option, i) => {
        options.innerHTML += `<button class="btn" onclick="checkAnswer(${i})">${option}</button>`;
    });
    document.getElementById('hint').textContent = '';
    document.getElementById('result').innerHTML = ''; //textContent = '';
    document.getElementById('hint-btn').classList.remove('hidden'); //.style.display = 'block';
    document.getElementById('next-btn').classList.add('hidden'); //.style.display = 'none';
}

// Check selected answer
function checkAnswer(choice) {
    const q = currentQuiz.questions[currentQuizQuestion];
    const resultDiv = document.getElementById('result');
    if (choice === q.answer) {
        resultDiv.innerHTML = `
            <div class="completion-status-banner status-success">
              <div class="banner-title">Correct :-)</div>
              <div class="banner-message">You are right, the answer is:</div>
              <div class="banner-message">${q.options[q.answer]}</div>
            </div>
        `;
        currentQuizScore++;
        currentQuizProgress.push("✓");        
        updateUserProfileStats('totalXPPoints', 1);
        updateUserProfileStats('questionsCompletedCorrectly', 1);        
      
    } else {
        resultDiv.innerHTML = `            
            <div class="completion-status-banner status-fail">
              <div class="banner-title">Incorrect</div>
              <div class="banner-message">The correct answer is:</div>
              <div class="banner-message">${q.options[q.answer]}</div>              
            </div>
        `;
        currentQuizProgress.push("✗");
    }
    currentQuestionScored++;
    updateQuizInfo();
    updateUserProfileStats('questionsCompleted', 1);
    document.getElementById('options').innerHTML = '';
    document.getElementById('hint-btn').classList.add('hidden'); //.style.display = 'none';
    document.getElementById('hint').textContent = '';
    document.getElementById('hint').classList.add('hidden'); //.style.display = 'none'; 
    document.getElementById('next-btn').classList.remove('hidden'); //.style.display = 'block';
}

// Show hint for the current question
function showHint() {
    const hintText = document.getElementById('hint');
    hintText.textContent = currentQuiz.questions[currentQuizQuestion].hint;
    hintText.classList.remove('hidden'); //.style.display = 'block';
    currentQuizHintsUsed++;
    updateQuizInfo();
    document.getElementById('hint-btn').classList.add('hidden'); //.style.display = 'none';
}

// Load the next question
function nextQuestion() {
    currentQuizQuestion++;
    if (currentQuizQuestion < currentQuiz.questions.length) {     
      loadQuestion();
    } else {
      document.getElementById('question').textContent = "";
      document.getElementById('options').innerHTML = '';
      document.getElementById('hint-btn').classList.add('hidden'); //.style.display = 'none';
      document.getElementById('next-btn').classList.add('hidden'); //.style.display = 'none';
      const quizScorePercent = Math.round((currentQuizScore / currentQuiz.questions.length) * 100);
      document.getElementById('result').innerHTML = `
          <div class="completion-status-banner status-neutral">
            <div class="banner-title">You completed the quiz!</div>
            <div class="banner-message">Your final score: ${currentQuizScore}/${currentQuiz.questions.length}</div>
            <div class="banner-scorecard">${quizScorePercent} %</div>
          </div>          
      `;
      updateUserProfileStats('quizzesCompleted', 1);
      if (quizScorePercent >= 70) {
        updateUserProfileStats('totalXPPoints', 2);         
      }      
    }
}

function updateQuizInfo() {
    document.getElementById('score').textContent = `Score: ${currentQuizScore}/${currentQuestionScored}`;
    document.getElementById('progress').textContent = `Progress: ${currentQuizProgress.join(" ")}`;
    document.getElementById('hints-used').textContent = `Hints used: ${currentQuizHintsUsed}`;
}

// Reset quiz state
function resetQuiz() {
    currentQuizQuestion = 0;
    currentQuestionScored = 0;
    currentQuizScore = 0;
    currentQuizHintsUsed = 0;
    currentQuizProgress = [];
    updateQuizInfo();            
}

// Profile
// Save user profile to local storage
function saveUserProfile(profile) {
  localStorage.setItem("quizzes_user_profile", JSON.stringify(profile));
}

// Load user profile from local storage
function loadUserProfile() {
  const profile = localStorage.getItem("quizzes_user_profile");
  return profile ? JSON.parse(profile) : null;
}

// Load user profile from local storage and populate profile screen
function loadUserProfileIntoUI() {
  const profile = loadUserProfile(); // Function to load profile from localStorage (defined earlier)

  if (profile) {
    document.getElementById("topbar-totalXPPoints").textContent = `${profile.totalXPPoints}`;
    document.getElementById("topbar-currentLevel").textContent = `${profile.currentLevel}`;

    document.getElementById("info-name").textContent = `${profile.name}`;
    document.getElementById("stat-totalXPPoints").textContent = `${profile.totalXPPoints}`;
    document.getElementById("stat-currentLevel").textContent = `${profile.currentLevel}`;
    document.getElementById("stat-totalScore").textContent = `${profile.totalScore} %`;
    document.getElementById("stat-quizzesCompleted").textContent = `${profile.quizzesCompleted}`;
    document.getElementById("stat-questionsCompleted").textContent = `${profile.questionsCompleted}`;
    document.getElementById("stat-questionsCompletedCorrectly").textContent = `${profile.questionsCompletedCorrectly}`;
    document.getElementById("stat-lastActiveDate").textContent = `${formatDateToCET(profile.lastActiveDate) || "N/A"}`;

    // Populate Achievements
    const achievementsList = document.getElementById("achievements-list");
    achievementsList.innerHTML = ''; // Clear previous list if any
    profile.achievements.forEach((achievement) => {
      const achievementItem = document.createElement("li");
      achievementItem.className = "text";
      achievementItem.textContent = achievement;
      achievementsList.appendChild(achievementItem);
    });
  }
}

// Initializing a new profile if none exists
let userProfile = loadUserProfile();
if (!userProfile) {
  userProfile = {
    name: "",
    email: "",
    avatar: "",
    quizzesCompleted: 0,
    questionsCompleted: 0,
    questionsCompletedCorrectly: 0,
    totalScore: 0,
    totalXPPoints: 0,
    achievements: [],
    currentLevel: 1,
    lastActiveDate: new Date().toISOString(),
    settings: {
      theme: "dark",
      notifications: false
    }
  };
  saveUserProfile(userProfile);
}

function formatDateToCET(dateString) {
  const date = new Date(dateString);
  const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Europe/Prague'
  };
  return date.toLocaleString('cs-CZ', options).replace(/,/, '');
}

// Universal function to update user profile statistics
function updateUserProfileStats(statName, value) {
  // Load the current profile from localStorage
  let profile = loadUserProfile();

  if (!profile) {
      console.error("User profile not found.");
      return;
  }

  // Update the specific statistic
  switch (statName) {
      case 'totalXPPoints':
          profile.totalXPPoints += value;
          break;
      case 'quizzesCompleted':
          profile.quizzesCompleted += value;
          break;
      case 'questionsCompleted':
          profile.questionsCompleted += value;
          break;
      case 'questionsCompletedCorrectly':
          profile.questionsCompletedCorrectly += value;
          break;
      default:
          console.warn(`Statistic ${statName} not recognized.`);
          return;
  }

  if (profile.questionsCompleted > 0) {
      profile.totalScore = Math.round((profile.questionsCompletedCorrectly / profile.questionsCompleted) * 100);
  }

  //const calculatedLevel = Math.floor(profile.totalXPPoints / 20);
  profile.currentLevel = Math.floor(profile.totalXPPoints / 20) + 1; //calculatedLevel > 0 ? calculatedLevel : 1;

  profile.lastActiveDate = new Date().toISOString();

  // Save the updated profile back to localStorage
  saveUserProfile(profile);

  // Refresh the profile screen UI with the updated values
  loadUserProfileIntoUI();
}

// Initialize the app 
// fetching quiz data
fetchQuizData();

// fetching profile data
loadUserProfileIntoUI()
