// app configs
const appConfigs = {
  userProfileStorageKey: "quizzes_user_profile",
  xpsToUpLevel: 20,
  xpsForCorrectQuestion: 1,
  xpsForCompletedQuiz: 2,
  minScoreToRewardQuizCompletation: 70
};

let quizzes = [];
let currentQuizQuestion = 0;
let currentQuizScore = 0;
let currentQuizHintsUsed = 0;
let currentQuizProgress = [];
let currentQuiz = null;
let hasLeveledUp = false;

// UI components
function getLevelUpBanner() {
  const profile = loadUserProfile();
  return `
      <div class="h-space"></div>
      <div class="completion-status-banner completion-status-level">
        <div class="banner-title">Level Up! Level ${profile.level}</div>
        <div class="banner-message">You achieved new <span class="bold">Level ${profile.level}</span></div>
      </div>
  `;
}

function getXpRewardBanner(xpReward) {
  //`Wow, you earned +${questionXpReward} XPs`;
  const profile = loadUserProfile();
  return `
      <div class="h-space"></div>
      <div class="completion-status-banner completion-status-xp">
        <div class="banner-title">+${xpReward}</div>
        <div class="banner-message">You earned <span class="bold">+${xpReward} XPs</span></div>
      </div>
  `;
}

// Utility function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


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

function startQuiz(quizIndex) {
  currentQuiz = quizzes[quizIndex];

  // Shuffle questions
  currentQuiz.questions = shuffleArray(currentQuiz.questions);

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
    let questionXpReward = 0;
    const q = currentQuiz.questions[currentQuizQuestion];
    const resultDiv = document.getElementById('result');
    if (choice === q.answer) {        
        currentQuizScore++;
        currentQuizProgress.push("✓");        
        updateUserProfileStats('totalXPPoints', appConfigs.xpsForCorrectQuestion);
        questionXpReward = appConfigs.xpsForCorrectQuestion;
        updateUserProfileStats('questionsCompletedCorrectly', 1);        

        resultDiv.innerHTML = `
            <div class="completion-status-banner status-success">
              <div class="banner-title">Correct 🙂</div>
              <div class="banner-message">You are right, the answer is:</div>
              <div class="banner-message">${q.options[q.answer]}</div>
            </div>
        `;

        if (questionXpReward > 0) {
          resultDiv.innerHTML += getXpRewardBanner(questionXpReward);
          questionXpReward = 0;
        }
        
        if (hasLeveledUp) {
          resultDiv.innerHTML += getLevelUpBanner();
          hasLeveledUp = false; // Reset flag
        }
      
    } else {
        currentQuizProgress.push("✗");
        resultDiv.innerHTML = `            
            <div class="completion-status-banner status-fail">
              <div class="banner-title">Incorrect</div>
              <div class="banner-message">The correct answer is:</div>
              <div class="banner-message">${q.options[q.answer]}</div>              
            </div>
        `;        
    }
    currentQuestionScored++;
    updateQuizInfo();
    updateUserProfileStats('questionsCompleted', 1);
    document.getElementById('options').innerHTML = '';
    document.getElementById('hint-btn').classList.add('hidden'); 
    document.getElementById('hint').textContent = '';
    document.getElementById('hint').classList.add('hidden'); 
    document.getElementById('next-btn').classList.remove('hidden'); 
}

// Show hint for the current question
function showHint() {
    const hintText = document.getElementById('hint');
    hintText.textContent = currentQuiz.questions[currentQuizQuestion].hint;
    hintText.classList.remove('hidden'); 
    currentQuizHintsUsed++;
    updateQuizInfo();
    document.getElementById('hint-btn').classList.add('hidden'); 
}

// Load the next question
function nextQuestion() {
    currentQuizQuestion++;
    let quizXpReward = 0;
    if (currentQuizQuestion < currentQuiz.questions.length) {     
      loadQuestion();
    } else {
      document.getElementById('question').textContent = "";
      document.getElementById('options').innerHTML = '';
      document.getElementById('hint-btn').classList.add('hidden'); 
      document.getElementById('next-btn').classList.add('hidden');      
      const quizScorePercent = Math.round((currentQuizScore / currentQuiz.questions.length) * 100);
      updateUserProfileStats('quizzesCompleted', 1);
      if (quizScorePercent >= appConfigs.minScoreToRewardQuizCompletation) {
        quizXpReward = appConfigs.xpsForCompletedQuiz;
        updateUserProfileStats('totalXPPoints', appConfigs.xpsForCompletedQuiz);
      }  

      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = `
          <div class="completion-status-banner status-neutral">
            <div class="banner-title">You completed the quiz!</div>
            <div class="banner-message">Your final score: ${currentQuizScore}/${currentQuiz.questions.length}</div>
            <div class="banner-scorecard">${quizScorePercent} %</div>
          </div>          
      `;

      if (quizXpReward > 0) {
        resultDiv.innerHTML += getXpRewardBanner(quizXpReward);
        quizXpReward = 0;
      }

      if (hasLeveledUp) {        
        resultDiv.innerHTML += getLevelUpBanner();
        hasLeveledUp = false; // Reset flag
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
  localStorage.setItem(appConfigs.userProfileStorageKey, JSON.stringify(profile));
}

// Load user profile from local storage
function loadUserProfile() {
  const profile = localStorage.getItem(appConfigs.userProfileStorageKey);
  return profile ? JSON.parse(profile) : null;
}

// Load user profile from local storage and populate profile screen
function loadUserProfileIntoUI(profileBeforeUpdate) {
  const profile = loadUserProfile(); // Function to load profile from localStorage (defined earlier)

  if (profile) {
    document.getElementById("topbar-totalXPPoints").textContent = `${profile.totalXPPoints}`;
    document.getElementById("topbar-currentLevel").textContent = `${profile.level}`;

    document.getElementById("info-name").textContent = `${profile.name}`;
    document.getElementById("stat-totalXPPoints").textContent = `${profile.totalXPPoints}`;
    document.getElementById("stat-currentLevel").textContent = `${profile.level}`;
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

function resetUserProfile(/*REMOVE:resetWithConfirmation*/) {
  const newUserProfile = {
    name: "user" + Math.floor(Math.random(100)*1000),
    email: "",
    avatar: "",
    quizzesCompleted: 0,
    questionsCompleted: 0,
    questionsCompletedCorrectly: 0,
    totalScore: 0,
    totalXPPoints: 0,
    achievements: [],
    level: 1,
    lastActiveDate: new Date().toISOString(),
    settings: {
      theme: "dark",
      notifications: false
    }
  };
  /*REMOVE:
  if (resetWithConfirmation === true) {
    if (confirm("!!! Are you sure you want to reset (delete) your profile?") === true) {
      saveUserProfile(newUserProfile);
      loadUserProfileIntoUI();
    }
  } else {
    saveUserProfile(newUserProfile);
    loadUserProfileIntoUI();
  }
  */
  saveUserProfile(newUserProfile);
  loadUserProfileIntoUI();
}

// Export user profile to JSON file
function exportUserProfile() {
  const profile = loadUserProfile();
  const json = JSON.stringify(profile, null, 2); // Pretty-print the JSON with 2 spaces
  const blob = new Blob([json], {type: 'application/json'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'quizzes_user_profile.json';
  link.click();
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

  // snapshot of last profile stats using object deep copy
  const profileBeforeUpdate = JSON.parse(JSON.stringify(profile));; 

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
  profile.level = Math.floor(profile.totalXPPoints / appConfigs.xpsToUpLevel) + 1; //calculatedLevel > 0 ? calculatedLevel : 1;

  profile.lastActiveDate = new Date().toISOString();

  // Save the updated profile back to localStorage
  saveUserProfile(profile);

  // Check if the level has increased
  if (profile.level > profileBeforeUpdate.level) {
    hasLeveledUp = true; // Set flag
  }

  // Refresh the profile screen UI with the updated values
  loadUserProfileIntoUI();
}

// Show a confirmation dialog for reseting profile
function showResetUserProfileConfirmation() {
  if (confirm("!!! Are you sure you want to reset (delete) your profile?")) {
    resetUserProfile();
  }
}

// Show a confirmation dialog for importing profile
function showImportUserProfileConfirmation() {
  if (confirm("When you import the profile, current profile data will be overwritten. Do you want to import it?")) {
    importUserProfile();
  }
}

// Import user profile from a JSON file
function importUserProfile() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';

  input.onchange = function(event) {
    const file = event.target.files[0];
    if (!file) {
      alert("No file selected.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const importedProfile = JSON.parse(e.target.result);
        // Validate the structure of the imported profile before saving
        if (validateUserProfile(importedProfile)) {
          saveUserProfile(importedProfile);
          loadUserProfileIntoUI();
          alert("Profile successfully imported.");
        } else {
          alert("Invalid profile format.");
        }
      } catch (err) {
        alert("Error reading profile file.");
      }
    };
    reader.readAsText(file);
  };

  input.click(); // Trigger file selection dialog
}

// Validate the structure of the imported profile
function validateUserProfile(profile) {
  return profile && 
    typeof profile.name === "string" &&
    typeof profile.quizzesCompleted === "number" &&
    typeof profile.questionsCompleted === "number" &&
    typeof profile.questionsCompletedCorrectly === "number" &&
    typeof profile.totalScore === "number" &&
    typeof profile.totalXPPoints === "number" &&
    typeof profile.level === "number" &&
    typeof profile.lastActiveDate === "string" &&
    typeof profile.settings === "object" &&
    typeof profile.achievements === "object";
}

// Initialize the app 
// fetching quiz data
fetchQuizData();

// Initializing a new profile if none exists
let userProfile = loadUserProfile();
if (!userProfile) {
  resetUserProfile();
}
loadUserProfileIntoUI();
