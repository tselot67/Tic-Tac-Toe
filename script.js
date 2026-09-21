const singleBtn = document.getElementById('button1');
const twoBtn = document.getElementById('button2');
const homeScreen = document.getElementById('home-screen');
const singlePlayer = document.getElementById('single-player');
const twoPlayers = document.getElementById('two-players');
singleBtn.addEventListener('click', function () {
    homeScreen.style.display = "none";
    singlePlayer.style.display = "flex";
})
twoBtn.addEventListener('click', function () {
    homeScreen.style.display = 'none';
    twoPlayers.style.display = 'flex';
})

const singleStart = document.getElementById('start');
const twoStart = document.getElementById('players-start');
const singleGame = document.getElementById('single-main-game');
const twoGame = document.getElementById('two-main-game');
singleStart.addEventListener('click', function () {
    singlePlayer.style.display = 'none';
    singleGame.style.display = 'flex';
})
twoStart.addEventListener('click', function () {
    twoPlayers.style.display = 'none';
    twoGame.style.display = 'flex';
})


const inputName = document.getElementById('name');
const player = document.getElementById('you');
inputName.addEventListener('input', function () {
    player.textContent = inputName.value;
})

const player1Name = document.getElementById('player1-name');
const player1 = document.getElementById('player1');
const player2Name = document.getElementById('player2-name');
const player2 = document.getElementById('player2');
player1Name.addEventListener('input', function () {
    player1.textContent = player1Name.value;
})
player2Name.addEventListener('input', function () {
    player2.textContent = player2Name.value;
})


const xicon = document.querySelector('.xicon');
const oicon = document.querySelector('.oicon');
xicon.addEventListener('click', function () {
    xicon.classList.add('selected');
    oicon.classList.remove('selected');
})
oicon.addEventListener('click', function () {
    oicon.classList.add('selected');
    xicon.classList.remove('selected');
})


const singleRestart = document.getElementById('restart-bottom');
const twoRestart = document.getElementById('restart-two-bottom');
const restartSec = document.getElementById('restart-sec');
singleRestart.addEventListener('click', function () {
    restartSec.style.display = 'flex';
})
twoRestart.addEventListener('click', function () {
    restartSec.style.display = 'flex';
})


const singleReset = document.getElementById('menu-bottom');
const twoReset = document.getElementById('menu-two-bottom');
const resetSec = document.getElementById('reset-sec');
singleReset.addEventListener('click', function () {
    resetSec.style.display = 'flex';
})
twoReset.addEventListener('click', function () {
    resetSec.style.display = 'flex';
})


const restartCancel = document.getElementById('cancel');
const resetCancel = document.getElementById('cancel-reset');
const restartTouch = document.getElementById('restart-touch');
const resetTouch = document.getElementById('reset-touch');
restartCancel.addEventListener('click', function () {
    restartSec.style.display = 'none';
})
resetCancel.addEventListener('click', function () {
    resetSec.style.display = 'none';
})
resetTouch.addEventListener('click', function () {
    homeScreen.style.display = 'flex';
    singleGame.style.display = 'none';
    twoGame.style.display = 'none';
    resetSec.style.display = 'none';
})


let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 'X';
let gameOver = false;
const boxes = document.querySelectorAll('.two-game-box');
boxes.forEach(function (box, index) {
    box.addEventListener('click', function () {
        makeMove(index);
    })
})


function makeMove(index) {
    if (board[index] !== "" || gameOver) {
        return;
    }
    board[index] = currentPlayer;
    boxes[index].textContent = currentPlayer;
    if (currentPlayer === 'X') {
        boxes[index].classList.add('current-player-x');
    }else {
        boxes[index].classList.add('current-player-o');
    }
    roundWinner();
    if (!gameOver) {
        checkDraw();
    }
    if (!gameOver) {
        switchTurn();
    }
}

function switchTurn() {
    if(currentPlayer == 'X') {
        currentPlayer = 'O';
    }else {
        currentPlayer = 'X';
    }
}


const winnerCombinations = [
    [0, 1, 2],
    [3, 4 ,5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [2, 5, 8],
    [1, 4, 7]
];


let player1Symbol = 'X';
let player2Symbol = 'O';
const twoTurns = document.getElementById('two-turns');
const play1Score = document.getElementById('player1-score');
const play2Score = document.getElementById('player2-score');
let player1Score = 0;
let player2Score = 0;
let round = 1;
function roundWinner () {
    for (let combination of winnerCombinations) {
        const [a, b, c] = combination;
        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            gameOver = true;
            if (board[a] === player1Symbol) {
                twoTurns.innerHTML = '<p> Player 1 wins</p>';
                twoTurns.classList.add('player1-wins');
                player1Score ++;
                play1Score.textContent = player1Score;

            }else {
                twoTurns.innerHTML = '<p> Player 2 wins</p>';
                twoTurns.classList.add('player2-wins');
                player2Score ++;
                play2Score.textContent = player2Score;
            }
            setTimeout(function () {
                clearBoard ();
            }, 1000);
        }
    }
}

function clearBoard () {
    board = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach(function(box) {
        box.textContent = "";
        box.classList.remove('current-player-x', 'current-player-o');
    });
    gameOver = false;
    twoTurns.innerHTML = '';
    round ++;
    updateRound();

}

function checkDraw () {
        if (board.every(function (value) {
            return value !== "";
        })) {
            gameOver = true;
            twoTurns.innerHTML = '<p> Draw </p>';
            twoTurns.classList.add('draw');
            setTimeout(function () {
                clearBoard ();
            }, 1000);
        }
}


const twoRounds = document.getElementById('two-rounds');
function updateRound () {
    twoRounds.innerHTML = `Round ${round}`;
}

/*checkFinalResult () {
    if (round > 3) {
        if (play1Score > play2Score) {

        }elif (play1Score < play2Score) {

        }else {

        }
    }
}*/