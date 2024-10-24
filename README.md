
## App Overview
- **App Name:** Quizzes
- **App Description:** This is a simple quiz app designed to test users' knowledge. The app presents list of quizes, each quiz has multiple-choice questions, allows users to use hints, and keeps track of their score and progress throughout the quiz. After answering all the questions of a single quiz, the user's final score is displayed. The app provides instant feedback after each question, indicating whether the answer was correct or not.


## Core Functionality:

### Features:
- **List of quizzes**: Displays a list of available quizzes, showing the title and the total number of questions. Users can browse and select a quiz to start.
- **Multiple-choice questions**: Each question presents four possible answers, and the user selects one.
- **Shuffled Questions and Answers:** Each quiz will load with a random order of questions, and the answer options for each question will be randomly shuffled while maintaining the correct answer.
- **Hints**: Users can request a hint for each question. The app keeps track of how many hints the user has used.
- **Instant feedback**: After answering a question, users are informed if their answer was correct, along with the correct answer if they were wrong.
- **Progress tracking**: The app tracks the user's score and displays progress for each question answered. Users also earn experience points (XP).
- **Final score**: Upon completing the quiz, the user's final score is displayed.
- **Profile Management:** The app saves user profile data locally, allowing users to view achievements, current levels, and performance metrics. Users can also export, import and reset their profile.
  - **Export profile**:
  - **Import profile**: Users can import a profile from a JSON file, overwriting the current profile. Users are first prompted with a confirmation dialog to avoid accidental imports. The imported profile must be in the correct format. If the file structure is invalid, the user is notified of the error.
  - **Reset profile**:
- **XP System and Levels:** The app includes an XP system where users earn XP for correct answers and quiz completions. XP contributes to leveling up and overall user progression.
  - Users earn XP for each correct answer and for completing a quiz having at least 70% score.
  - XP is accumulated, and once a certain threshold is reached, the user progresses to the next level.
  - The XP thresholds for levels are calculated as follows: `Level = Math.floor(totalXPPoints / 20)`.
  - The profile screen and XP scorecard on home screen are dynamically updated to reflect the user's current level and XP.
- **Level-up notifications**: If a user reaches a new level, a visually appealing banner is displayed during question or quiz completion, instead of immediately when the stats are updated.


### User Actions (Stories)
**As a user** I want to:
- Answer a series of multiple-choice questions so that I can test my knowledge of a certain topic.
- Request a hint during a question to help me answer it if I’m unsure.
- Immediate feedback after I answer a question so that I know if I was correct.
- Track my progress so that I can see how well I am doing in the quiz.
- See my final score at the end of the quiz so that I know how many questions I got right.
- See a notification when I level up, integrated into the quiz completion banners.


## App Layout and UI Elements

### **Home Screen:**  
- **Purpose:** Displays a list of quizes available.
- **Content:** List of all quizes available.
- **UI Elements**:
  - Top bar nav
    - Logo
    - Status card (status level)
    - Status card (status xp)
    - Profile icon
  - Card list 
    - Card item - each item includes a badge displaying the number of questions per quiz, background color #1e1e1e, border 1px solid #333.
- **Navigation:** Users can tap a quiz item to go to the "quiz detail screen".

### **Quiz Detail Screen:**
- **Purpose:** The Quiz Detail Screen provides users with an interactive environment to answer questions in a selected quiz, track their progress, view hints, and see immediate feedback on their answers.
- **Content:** This screen displays the quiz title, the number of questions, and the user's score, progress, and hints used. It dynamically loads each question, allows the user to select an answer, and gives instant feedback on whether the selected answer is correct. A hint can be displayed upon request, and users can navigate through the quiz until all questions are completed​​.
- **UI Elements:**
  - Back button with left-arrow icon
  - Screen title (Quiz title)
  - Label (Number of quiz questions)
  - Label (Score info)
  - Label (Progress info)
  - Label (Hints used info)
  - Horizontal space
  - Header (Question title)
  - List of buttons (Options - List of asnwer options)
    - Button (Single answer option)
  - Button outline (Show hint)
  - Text (Text of shown hint)
  - Button primary (Next question)
  - Completion status banner based on situaction applied to:
    - Question correct answer
    - Question incorrect answer
    - Quiz completed
    - Level-up announcement
- **Navigation:** Users can tap a back icon to go to the "home screen".

### **Profile Screen:**  
- **Purpose:** Displays the user's profile information, including statistics, achievements, and performance metrics.
- **Content:** 
  - **User Info Section:** Displays the user's info - name, email, avatar. **[currently disabled]**
  - **Statistics Section:** Shows various performance metrics, including total XP points, current level, total score percentage, quizzes completed, questions completed, questions completed correctly, and last active date.
  - **Achievements Section:** Lists the achievements earned by the user. **[currently disabled]**
  - **Profile Data Management Section:** Shows buttons allowing to export, import and reset profile data.
- **UI Elements**:
  - Back button with left-arrow icon.
  - Screen title (Profile).
  - Section title (User info)
  - Text item list (Name)
  - Section title (Statistics)
  - Text item list (XP points, level, score, etc.)
  - Section title (Achievements)
  - Card list (Achievements)
  - Button outline (Export profile)
  - Button outline (Import profile)
  - Button outline (Reset profile)
- **Navigation:** Users can tap a back icon to go to the "home screen".
  

## Navigation Flow
Home --> Quiz detail --> Home
Home --> Profile --> Home


## Design and Style
It includes details like color schemes (color palette), font choices, icon styles, and spacing rules.
- Responsive Design
  - The app is designed to be mobile-friendly with a simple layout that works on small screens.
  - Small screens - mobile phones: main container has width 100% of the screen.
  - Bigger screens - tablet, desktop: max width of the main container is 600 px.
- Theme and Color palette:
  - Default theme: dark theme
  - Colors: 
    - note: they are also technically defined within the styles.css file using "CSS Custom Properties (CSS variables)". 
    ```css
        :root {  
          /* Primary Colors */
          --color-primary: #6c63ff; /* Main branding color. Used for primary actions like buttons and overlay buttons. */
          --color-primary-hover: #8178ff; /* Hover version of main */  
          --color-secondary: #5753c9; /* TODO: define color and its purpose (it should not be hover color of primary color, but standalone color */
          
          /* Background Colors */
          --bg-main: #121212; /* Main background of the app */
          --bg-main-hover: #1c1c1c; /* Hover version of main */
          --bg-secondary: #2b2b2b; /* Background for cards, input fields */
          --bg-secondary-hover: #373737; /* Hover version of secondary */
          --bg-tertiary: #444; /* Background for badges, overlay elements */
          --bg-tertiary-hover: #555; /* Hover version of tertiary */
          --bg-status-neutral: #457981;
          --bg-status-success: #73be85;
          --bg-status-fail: #b1676e; /* Error or validation warning messages */
          --bg-status-attention: #c0ac6e; /* Warning or caution */
          
          /* Text Colors */
          --text-main: #e0e0e0; /* Main text color */
          --text-secondary: #e0e0e0; /* Main text color */
          --text-tertiary: #e0e0e0;
          --text-muted: #9e9e9e; /* Muted text for placeholders, captions. Used for less important text, such as placeholders. */
          --text-inverted: #fff; /* Text on dark or colored backgrounds (e.g., buttons) or on hover states */  

          /* State Colors */
          --color-success: #73be85; /* Success messages */
          --color-error: #b1676e; /* Error or validation warning messages */
          --color-warning: #c0ac6e; /* Warning or caution */
        }
      ```


## Technical specifications
- **Minimal Dependencies**: The app is built with vanilla HTML, CSS, and JavaScript, with no external libraries or frameworks required.
- **SPA using "Fragmentation using HTML sections"** - each screen (view) is in a separate <section> tag. When displaying a specific screen, hide the others and make the desired one visible. Use universal function "navigateToScreen(screenId)" to navigate between screens.
- **Foundational UI elements** are defined in CSS file by classes. Then in HTML file these UI elements' css classes are utilized to build the UI aligned with the "App Layout and UI Elements" chapter of this dodument.
- **Use CSS Custom Properties** to define and use CSS variables. The main purpose is to define some values as "configurations" in one place as variables and then apply these variables within the CSS code. This is used for example to style UI elements by appling the defined colors (app color palette) variables.
Here's an example how to use custom properties.  
- **Using "spacing ui elements"** to apply some kind of margins and spacing, especially horizontal. In case there needs to be some "horizontal space" added at the specific place between UI elements, rather then adding additional margins to the specific existing elements I prefer to add <div class"space"></div> to the HTML code to specify the "space" or "gap".
- **Data Management and Storage:**
  - The app stores user profile information locally in the browser's `localStorage`. This includes user statistics, XP points, achievements, and settings.
  - Quiz data is fetched from the `quizzes-data.js` file and loaded dynamically when the app is initialized.
- Folder and file structure: TBD
  


## Future Enhancements (Optional)
- **Question Pool Expansion**: Add more questions to make the quiz longer or enable random question selection.
- **Timer Feature**: Introduce a timer for each question to make the quiz more challenging.
- **Score Saving**: Allow users to save and review their scores over time.
- **Difficulty Levels**: Add varying difficulty levels to the questions (easy, medium, hard).
- new data structure:
