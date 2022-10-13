//TODO: show current score, add proper q&a, pretty it up

let timerCountEl = document.querySelector('.timer-count');
let startButton = document.querySelector('#start-button');
let $homeEl = $('#home');
let $leaderboardEl = $('#leaderboard');
let $leaderboardBodyEl = $('#leaderboard-body');
let $questionEl = $('#question');
let $buttonEl = $('.list-unstyled');
let $viewLeaderboardEl = $('#view-leaderboard');
let $highscoreForm = $('#highscore-form');
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
        question: 'This is a test question?',
        answer: 'This is a test answer',
        possibleAnswers: ['This is a test decoy', 'This is a test decoy', 'This is a test decoy', 'This is a test answer']
    },
    //Q2
    {
        question: 'This is a test question 2?',
        answer: 'This is a test answer',
        possibleAnswers: ['This is a test decoy', 'This is a test decoy', 'This is a test decoy', 'This is a test answer']
    },
    //Q3
    {
        question: 'This is a test question 3?',
        answer: 'This is a test answer',
        possibleAnswers: ['This is a test decoy', 'This is a test decoy', 'This is a test decoy', 'This is a test answer']
    },
    //Q4
    {
        question: 'This is a test question 4?',
        answer: 'This is a test answer',
        possibleAnswers: ['This is a test decoy', 'This is a test decoy', 'This is a test decoy', 'This is a test answer']
    },
    //Q5
    {
        question: 'This is a test question 5?',
        answer: 'This is a test answer',
        possibleAnswers: ['This is a test decoy', 'This is a test decoy', 'This is a test decoy', 'This is a test answer']
    },
    //Q6
    {
        question: 'This is a test question 6?',
        answer: 'This is a test answer',
        possibleAnswers: ['This is a test decoy', 'This is a test decoy', 'This is a test decoy', 'This is a test answer']
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
    $highscoreForm.addClass('d-none');
}

function showLeaderboard() {
    $leaderboardEl.removeClass('d-none');
    $homeEl.addClass('d-none');
    $questionEl.addClass('d-none');
    $viewLeaderboardEl.text('Back to Quiz');
    $highscoreForm.addClass('d-none');
}

function showHome() {
    $leaderboardEl.addClass('d-none');
    $homeEl.removeClass('d-none');
    $questionEl.addClass('d-none');
    $highscoreForm.addClass('d-none');
    $viewLeaderboardEl.text('View Leaderboard');
}

function showHighscoreInput() {
    $leaderboardEl.addClass('d-none');
    $homeEl.addClass('d-none');
    $questionEl.addClass('d-none');
    $highscoreForm.removeClass('d-none');
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
    else if(event.target.innerHTML === randomized[questionNo].answer) {
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

$highscoreForm.on('submit', submitHighscore);