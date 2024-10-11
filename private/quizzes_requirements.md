
## achievements

-----

## attractive animations

when question is completed correctly some "happy" whimsical animation is shown
when quiz is compoleted also some animation is shown

-----

## events
- dispatching and reading events

-----

## more quizzes views
- add some more quizzes to source-data.js
- home screen - update lists of quizzes
  - add section "new quizzes" or "not completed yet"
  - add section "picked for today"

-----

## shuffle order of questions
questions are shown in random order

-----

## profile settings
- change name

-----



-----

## profile buttons
- reset
- export
- import

-----

## questions
- ask how to:
  - name ui element "simple text header 1,2,3", I use them to replace section-title etc.
  - name ui element h-space
  - is it possible to create simple ui components, see code example. Is it possible 

-----

## home screen - XPs, level
- update style of scorecord XPs
- add nice scorecard for current level

-----

## showing results
- separate ui component for correct and incorrect 
  - separate tags for title, message
- continue testing style for "correct" with this:

 {
    background: #68b368;
    padding: 20px;
    max-width: 80%;
    margin: auto;
    border-radius: 10px;
    border: 2px solid green;
}

-----

# user profile
store user profile in local storage
user can add and edit name nickname
each completed quiz is counted
each completed question is counted
each correctly completed question is counted
score is calculated as a ratio (in percents): correctly completed question / completed question
for each completed question one xp point is counted
for ach correctly completed question where hint was not used two xp points are counted

user_profile = {
  name: <user name or nickname>,
  email: <user email>,
  avatar: <link or id of selected avatar - user can choose one from a pre-defined set of avatarts>,
  quizes_completed: <>,
  questions_completed: <>,
  questions_compoleted_correctly: <>,
  score: <>,
  xp_points: <>,
  ?? achievements: [],
  ?? level: [] 
}

-----

#### home screen
- new overall score overview section
  - bellow app title and above quiz list
  - is shows
    - completed quizzes count
    - completed questions count
    - overall questions score - calculated as a ratio (in percents): correctly completed questions / completed questions
    - overall xp points count

-----

user profil

tlacitka
export profile
import profile
delete profile

-----

# user profile stats updating

Aktualizoval jsem base code soubory

Potrebuji navrhnout logiku pro dynamickou upravu statistik v uzivatelove profilu.
Moje predstava je, ze se vytvori univerzalni funkce, ktera jako argument obdrzi nazev polozky profilu a cislo o kolik se dana polozka ma upravit (pricist nebo odecist). Nasledne provede operaci v uzivatelove profilu, profil ulozi, a nasledne spusti funkci loadUserProfileIntoUI.


- totalXPPoints 
  - zvysi se o 1 pokud uzivatel odpovedel spravne na otazku
  - zvysi se o 2 pokud uzivatel dokoncil kviz se score vetsim nebo rovna 70 %
- quizzesCompleted
  - zvysi se o 1 pokud uzivate dokoncil kviz  
- questionsCompleted
  - zvysi se o 1 pokud uzivatel dokoncil otazku
- questionsCompletedCorrectly
  - zvysi se o 1 pokud uzivatel dokoncil otazku spravne
- totalScore
  - vypocita se vzorcem (questionsCompletedCorrectly / questionsCompleted) * 100, zaokrohleno na cela cisla
- currentLevel
  - vypocita se vzorcem totalXPPoints / 20, zaokrohleno na cela cisla. V pripade ze vysledek je 0, tak prepsat na 1
  
  
Navrni to nejlepsi reseni, ktere odpovida beznym zvyklostem u podobnych reseni.

-----

Aktualizoval jsem base code soubory

Ted potrebuji doplnit
Do profile screen do sekce statistics pridat polozky viz seznam. Kazda polozka bude obsahovat <nazev polozky:> a hodnotu nactenou z profilu. 
Polozky budou reprezentovany ui elementem .text
  totalXPPoints
  currentLevel
  totalScore
  quizzesCompleted
  questionsCompleted
  questionsCompletedCorrectly
  lastActiveDate

dale potrebuji pridat sekci "Achievments"
ta bude mit section title "Achievments"
a do ni pridat polozku obsahujici hodnotu nactenou z profilu z achievements

-----

# user profile logic updates:
Potrebuji ukladat user profile v local storage tak, aby uzivatel mel stale k dispozici svuj aktualizovany profil pri kazdem spusteni aplikace.
Toto je muj navrh datove struktury profilu. Zkontroluj datovou strukturu, jestli odpovida beznym zvyklostem u podobnych reseni a pripadne navrhni nejake upravy.

quizzes_user_profile = {
  name: <user name or nickname>,
  email: <user email>,
  avatar: <link or id of selected avatar - user can choose one from a pre-defined set of avatarts>,
  quizes_completed: <>,
  questions_completed: <>,
  questions_compoleted_correctly: <>,
  total_score: <>,
  total_xp_points: <>,
  achievements: [],
  current_level: <number> 
}

-----

## home screen
- profile or settings icon
  - top right corner, on the same row level as the main app title
  - when clicked, it navigates to new screen "Profile Screen", see bellow
  
## new screen "Profile screen"
- in index.html 
  - html: add a new section for the Profile screen. Keep its contant blank, use only the back button (navigating to the home screen), in the same way as it is used within the quiz detail screen


-----

## design adjustment

### quiz detail screen
- quiz questions number
  - add text Quiz questions: <number of quiz questions> above the score
- progess
  - Add text Progress: " still visible, so even when no progress is achived yet, still there will be visibile this text
- devider
  - replace horizontal line <hr> by the <div id="devider"...> which has some top and bottom margin, small height and border 1px dotted gray
- wrapper "quiz-info" wrapping: quiz questions number, score, progress, hints used, devider ... and use the wrapper to apply some less prominent text color to all its childs
- result
  - bigger top and bottom margin
  - if result is Correct, then the color should be green (pastel shade of green). If the result is Incorrect, then the color should be red (pastel shade of red)

-----

## design adjustment

### home screen
- quiz list item
  - background color: #1e1e1e 
  - border 1px solid #333  
  - hover color #333
  - under name of quiz there is a badge showing number of questions of the quiz, example: "6 questions"

### quiz detail screen
- question
  - bigger bottom margin
  - text bold
- options
  - bigger bottom margin
- answer button
  - text align left
- hint button 
  - different style then asnwer button, less prominent button appearance

-----

# SPA and widen data structure
Current version has only one quiz hardcoded and it shows it on the home screen. 
Newly an user will see list of quizes on home screen and when clicks on some quiz it opens screen "single quiz detail". This detail will have the same look and logic as it has now on the home screen. When user wants to leave a single quiz, he clicks the back arrow icon top left and he will get to the home screen.
Use the new quizes data structure (bellow) and use SPA using Fragmentation using HTML sections (bellow).

## Single Page Application (SPA)
SPA is the most common approach to achieving multiple screens within a single application. The principle lies in the fact that the entire application is loaded with the first request, and then the displayed screens change dynamically on the client side without reloading the page from the server.

**Fragmentation using HTML sections:** In an HTML file, you can create individual sections or divs that will represent different screens. 
Each screen (view) is in a separate <section>. 
When you want to display a specific screen, you hide the others and make the desired one visible.

## new quizes data structure
quizes = [
  {
    name: "quiz 1",
    created: 1725959880633,
    tags: ["tag1"],
    questions: [
      {
        question: "Question 1",
        options: ["option 1", "option 2", "option 3", "option 4"],
        answer: 1,
        hint: "Hint 1"
      },
      {
        question: "Question 2",
        options: ["option 1", "option 2", "option 3", "option 4"],
        answer: 1,
        hint: "Hint 2"
      }
    ]    
  },
  {
    name: "quiz 2",
    created: 1725961545025,
    tags: ["tag1", "tag2"],
    questions: [
      {
        question: "Question 1",
        options: ["option 1", "option 2", "option 3", "option 4"],
        answer: 1,
        hint: "Hint 1"
      },
      {
        question: "Question 2",
        options: ["option 1", "option 2", "option 3", "option 4"],
        answer: 1,
        hint: "Hint 2"
      }
    ]    
  },
];


