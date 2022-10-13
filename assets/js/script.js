let timerCountEl = document.querySelector('.timer-count');
let startButton = document.querySelector('#start-button');
let $homeEl = $('#home');
let $leaderboardEl = $('#leaderboard');
let $questionEl = $('#question');
let $buttonEl = $('.list-unstyled');
let $viewLeaderboardEl = $('#view-leaderboard');
let questionNo = 0;
let randomized = []
let score = 0;
let secondsLeft = timerCountEl.textContent;
let currentQuestion = [];

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

    choices.forEach((x, i) => {
        let y = "<li class=\"m-2\"><button class=\"col-12 btn btn-secondary\">" + x + "</button></li>";
        $el = $(y);
        $buttonEl.append($el);
    });

    questionNo++;
}

function displayQuestions() {
    $leaderboardEl.addClass('d-none');
    $homeEl.addClass('d-none');
    $questionEl.removeClass('d-none');
    //add highscore component
}

function toggleLeaderboard() {
    if ( $questionEl.hasClass('d-none')){
        if ($leaderboardEl.hasClass('d-none')) {
            showLeaderboard();
        } else {
            showHome();
        }
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

function timeOut() {
    alert('Times Up!');
    resetGame();
}

function resetGame() {
    timerCountEl.innerHTML = '120';
    questionNo = 0;
    score = 0;
    win = false;
    showHome();
}

function winner() {
    console.log('Winner');
    console.log('Score: ' + score);
    win = true;
    showHome();
}

function checkAnswer(event) {
    if ((questionNo) >= randomized.length) {
        score++;
        winner();
    }
    else if(event.target.innerHTML === randomized[questionNo].answer) {
        score++;
        nextQuestion();

    }
    else {
        secondsLeft -= 3;
    }
}

function startGame() {
    displayQuestions();
    nextQuestion();


    let timerInterval = setInterval(function () {
        secondsLeft--;
        timerCountEl.innerHTML = secondsLeft;

        if (secondsLeft >= 0) {
            if (win && secondsLeft > 0) {
                clearInterval(timerInterval);
                resetGame();
            }
        }

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            timeOut();
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
});