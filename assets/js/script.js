let timerCountEl = document.querySelector('.timer-count');
let startButton = document.querySelector('#start-button');
let win = false;

function resetGame() {
    timerCountEl.innerHTML = '120';
    alert('Times Up!');
}

function startGame() {
    let secondsLeft = timerCountEl.textContent;

    let timerInterval = setInterval(function () {
        secondsLeft--;
        timerCountEl.innerHTML = secondsLeft;

        if (secondsLeft >= 0) {
            if (win === true && secondsLeft > 0) {
                clearInterval(timerInterval);
                winner();
            }
        }

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            resetGame();
        }
    }, 1000);
}

startButton.addEventListener('click', startGame);