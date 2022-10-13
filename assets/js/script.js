//TODO: add proper q&a, pretty it up

let timerCountEl = document.querySelector('.timer-count');
let startButton = document.querySelector('#start-button');
let $homeEl = $('#home');
let $leaderboardEl = $('#leaderboard');
let $leaderboardBodyEl = $('#leaderboard-body');
let $questionEl = $('#question');
let $buttonEl = $('.list-unstyled');
let $viewLeaderboardEl = $('#view-leaderboard');
let $highscoreFormEl = $('#highscore-form');
let $highscoreEl = $('#highscore');
let questionNo = 0;
let randomized = []
let score = 0;
let secondsLeft;
let currentQuestion = [];
let highscores = [];
let win = false;

let questionBank = [
    //Q1
    {
        question: 'What does isNaN() do?',
        answer: 'Returns true if argument is not a number, false otherwise',
        possibleAnswers: ['Returns true if argument is null, false otherwise',
            'Returns false if argument is null, true otherwise',
            'Returns false if argument is not a number, true otherwise',
            'Returns true if argument is not a number, false otherwise']
    },
    //Q2
    {
        question: 'Which while loop is NOT set up correctly?',
        answer: 'let i = 0; while(i) { console.log(i); i--; }',
        possibleAnswers: ['let i = 0; while(i) { console.log(i); i--; }',
            'let i = 9; while(1) { console.log("hello!" + i); if(i <=0) { break; } i--; }',
            'let i = 10; while(i--) { console.log(i); }',
            'let someVal = 0; while(boolVal) { if(someVal >= 5) { boolVal = true; } someVal++; }']
    },
    //Q3
    {
        question: 'Which of these correctly adds data to local storage?',
        answer: 'localStorage.setItem("highscores", JSON.stringify(highscores));',
        possibleAnswers: ['localStorage.setItem("highscores", JSON.stringify(highscores));',
            'localStorage.addItem("highscores", JSON.stringify(highscores));',
            'localStorage.createItem("highscores", JSON.stringify(highscores));',
            'localStorage.item("highscores", JSON.stringify(highscores));']
    },
    //Q4
    {
        question: 'What can be used to escape a symbol inside a string?',
        answer: '\\',
        possibleAnswers: ['\\', '.\\', '/', './']
    },
    //Q5
    {
        question: 'What is the purpose of the break keyword in a switch statement?',
        answer: 'Without it, code not matching the criteria may incidentally execute',
        possibleAnswers: ['Without it, code not matching the criteria may incidentally execute',
            'It has no real purpose',
            'It is needed to break out of the switch once a given condition is met,',
            'It is used to check if a given code block must be executed']
    },
    //Q6
    {
        question: 'What is the === operator checking for??',
        answer: 'strict equality',
        possibleAnswers: ['strict equality',
            'true equality',
            'type equality',
            'harsh equality']
    }
];

// http://en.wikipedia.org/wiki/Fisher-Yates_shuffle#The_modern_algorithm
// https://stackoverflow.com/a/12646864/2684520

// Pre-ES6
/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function nextQuestion() {

    currentQuestion = randomized[questionNo];

    let choices = shuffleArray(currentQuestion.possibleAnswers);

    $buttonEl.children().remove()

    $questionEl.children('h3').text(currentQuestion.question);

    choices.forEach((x) => {
        let y = "<li class=\"m-2\"><button class=\"col-12 btn btn-secondary\">" + x + "</button></li>";
        $el = $(y);
        $buttonEl.append($el);
    });

    questionNo++;
}

function toggleLeaderboard() {
    if ( $questionEl.hasClass('d-none')){ // prevent toggling leaderboard during quiz
        if ($leaderboardEl.hasClass('d-none')) {
            showLeaderboard();
        } else {
            showHome();
        }
    }
}

function displayQuestions() {
    $leaderboardEl.addClass('d-none');
    $homeEl.addClass('d-none');
    $questionEl.removeClass('d-none');
    $highscoreEl.addClass('d-none');
}

function showLeaderboard() {
    $leaderboardEl.removeClass('d-none');
    $homeEl.addClass('d-none');
    $questionEl.addClass('d-none');
    $highscoreEl.addClass('d-none');
    $viewLeaderboardEl.text('Back to Quiz');
}

function showHome() {
    $leaderboardEl.addClass('d-none');
    $homeEl.removeClass('d-none');
    $questionEl.addClass('d-none');
    $highscoreEl.addClass('d-none');
    $viewLeaderboardEl.text('View Leaderboard');
}

function showHighscoreInput() {
    $leaderboardEl.addClass('d-none');
    $homeEl.addClass('d-none');
    $questionEl.addClass('d-none');
    $highscoreEl.removeClass('d-none');
    $highscoreEl.children('h3').text(score);
}

function storeHighscores() {
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

function resetGame() {
    timerCountEl.innerHTML = '120';
    questionNo = 0;
    score = 0;
    win = false;
    showHighscoreInput();
}

function setupLeaderboard() {
    $leaderboardBodyEl.children().remove();

    highscores.forEach((x, i) => {
        let y = "<tr><th scope=\"row\">" + (i+1) + "</th><td>" + x[0] + "</td><td>" + x[1] + "</td></tr>";
        $el = $(y);
        $leaderboardBodyEl.append($el);
    });
}

function init() {
    let storedHighscores = JSON.parse(localStorage.getItem("highscores"));

    if (storedHighscores !== null) {
        highscores = storedHighscores;
    }

    setupLeaderboard();
}

function submitHighscore(event) {
    event.preventDefault();
    let name = $('input[name="initials-text"]').val();

    if (!name) {
        return;
    }

    highscores.push([name, score]);
    highscores.sort(function(a, b) { return b[1] - a[1] }).splice(10);

    storeHighscores();
    setupLeaderboard();
    resetGame();
    showHome();

    $('input[name="initials-text"]').text('');
}

function checkAnswer(event) {
    if ((questionNo) >= randomized.length) {
        console.log('secs' + secondsLeft);
        if (secondsLeft > 80) {
            score += 80;
        } else {
            score += (80 - (80 - secondsLeft)); //add less points for when more time is used to finish quiz
        }
        win = true;
        showHighscoreInput();
    }
    else if(event.target.innerHTML === currentQuestion.answer) {
        score += 4;
        nextQuestion();

    }
    else {
        secondsLeft -= 3;
    }
}

function startGame() {
    secondsLeft = timerCountEl.textContent;

    displayQuestions();
    nextQuestion();


    let timerInterval = setInterval(function () {
        secondsLeft--;
        timerCountEl.innerHTML = secondsLeft;

        if (secondsLeft >= 0) {
            if (win && secondsLeft > 0) {
                clearInterval(timerInterval);
            }
        }

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            alert('Times Up!');
            showHighscoreInput();
        }
    }, 1000);
}

startButton.addEventListener('click', startGame);

$buttonEl.on('click', '.btn', checkAnswer);

$viewLeaderboardEl.hover(function() {
    $(this).css('cursor','pointer');
});

$viewLeaderboardEl.on('click', toggleLeaderboard);

window.addEventListener('load', function() {
    randomized = shuffleArray(questionBank);
    init();
});

$highscoreFormEl.on('submit', submitHighscore);