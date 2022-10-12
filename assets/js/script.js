let timerCountEl = document.querySelector('.timer-count');
let startButton = document.querySelector('#start-button');
let $homeEl = $('#home');
let $leaderboardEl = $('#leaderboard');
let $questionEl = $('#question');
let $buttonEl = $('.list-unstyled');
let $viewLeaderboardEl = $('#view-leaderboard');
let questionNo = 0;

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
}

function showQuestion(obj) {
    let choices = shuffleArray(obj.possibleAnswers);

    for (var i = 0; i < choices.length; i++) {
        $buttonEl.children(i).text(choices[i]);
    }

    $leaderboardEl.addClass('d-none');
    $homeEl.addClass('d-none');
    $questionEl.removeClass('d-none');
    //add highscore component
    questionNo++;
}

function toggleLeaderboard() {
    if ($leaderboardEl.hasClass('d-none')) {
        showLeaderboard();
    } else {
        showHome();
    }
}

function showLeaderboard() {
    $leaderboardEl.removeClass('d-none');
    $homeEl.addClass('d-none');
    $questionEl.addClass('d-none');
    $viewLeaderboardEl.text('Back to Quiz');
    //add highscore component
}

function showHome() {
    $leaderboardEl.addClass('d-none');
    $homeEl.removeClass('d-none');
    $questionEl.addClass('d-none');
    //add highscore component
    $viewLeaderboardEl.text('View Leaderboard');
}

function showHighscoreInput() {
    $leaderboardEl.addClass('d-none');
    $homeEl.addClass('d-none');
    $questionEl.addClass('d-none');
    //add highscore component
}

function resetGame() {
    timerCountEl.innerHTML = '120';
    alert('Times Up!');
}

function winner() {

}

function startGame() {
    let randomized = shuffleArray(questionBank);

    showQuestion(randomized[questionNo]);

    let secondsLeft = timerCountEl.textContent;

    let timerInterval = setInterval(function () {
        secondsLeft--;
        timerCountEl.innerHTML = secondsLeft;

        if (secondsLeft >= 0) {
            if (win && secondsLeft > 0) {
                clearInterval(timerInterval);
                winner();
                resetGame();
            }
        }

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            resetGame();
        }
    }, 1000);
}

startButton.addEventListener('click', startGame);

$buttonEl.on('click', '.btn', showQuestion);

$viewLeaderboardEl.hover(function() {
    $(this).css('cursor','pointer');
});

$viewLeaderboardEl.on('click', toggleLeaderboard);