const singleBtn = document.getElementById('button1');
const twoBtn = document.getElementById('button2');
const homeScreen = document.getElementById('home-screen');
const singlePlayer = document.getElementById('single-player');
const twoPlayers = document.getElementById('two-players');
const singleGame = document.getElementById('single-main-game');
const twoGame = document.getElementById('two-main-game');

singleBtn.addEventListener('click', function () {
    homeScreen.style.display = 'none';
    singlePlayer.style.display = 'flex';
});
twoBtn.addEventListener('click', function () {
    homeScreen.style.display = 'none';
    twoPlayers.style.display = 'flex';
});



const singleStart = document.querySelector('#start button');
const playerStart = document.querySelector('#players-start button');
const inputName = document.getElementById('name');
const player = document.getElementById('you');
const xicon = document.querySelector('.xicon');
const oicon = document.querySelector('.oicon');

inputName.addEventListener('input', function () {
    player.textContent = inputName.value;
});
xicon.addEventListener('click', function () {
    xicon.classList.add('selected');
    oicon.classList.remove('selected');
});
oicon.addEventListener('click', function () {
    oicon.classList.add('selected');
    xicon.classList.remove('selected');
});


let singleBoard = ["", "", "", "", "", "", "", "", ""];
let playerSymbol = 'O';
let computerSymbol = 'X';
let singleCurrentPlayer = 'O';
let singleGameOver = false;
let singlePlayerScore = 0;
let computerScore = 0;
let singleRound = 1;
const singleBoxes = document.querySelectorAll('.game-box');
const singleTurns = document.getElementById('turns');
const singleRounds = document.getElementById('rounds');
const yourScoreNumber = document.querySelector('#your-score .scor p');
const computerScoreNumber = document.querySelector('#comp-score .scor p');

playerStart.addEventListener('click', function () {
    twoGame.style.display = 'flex';
    twoPlayers.style.display = 'none';
})
singleStart.addEventListener('click', function () {
    if (xicon.classList.contains('selected')) {
        playerSymbol = 'X';
        computerSymbol = 'O';
    } else {
        playerSymbol = 'O';
        computerSymbol = 'X';
    }
    singleBoard = ["", "", "", "", "", "", "", "", ""];
    singleGameOver = false;
    singlePlayerScore = 0;
    computerScore = 0;
    singleRound = 1;
    yourScoreNumber.textContent = singlePlayerScore;
    computerScoreNumber.textContent = computerScore;
    singlePlayer.style.display = 'none';
    singleGame.style.display = 'flex';
    updateSingleRound();
    clearSingleBoard();
    if (playerSymbol === 'O') {
        singleCurrentPlayer = computerSymbol;
        updateSingleTurn('Computer turn', 'player2-wins');
        setTimeout(function () {
            makeComputerMove();
        }, 500);
    } else {
        singleCurrentPlayer = playerSymbol;
        updateSingleTurn('Your turn', 'player1-wins');
    }
});



singleBoxes.forEach(function (box, index) {
    box.addEventListener('click', function () {
        playerMove(index);
    });
});


function playerMove(index) {
    if (singleGameOver) {
        return;
    }
    if (singleBoard[index] !== '') {
        return;
    }
    if (singleCurrentPlayer !== playerSymbol) {
        return;
    }
    placeMark(index, playerSymbol);
    if (checkSingleWinner(singleBoard, playerSymbol)) {
        singleGameOver = true;
        singlePlayerScore++;
        yourScoreNumber.textContent = singlePlayerScore;
        updateSingleTurn('You Win', 'you-win');
        setTimeout(function () {
            finishSingleRound();
        }, 1000);
        return;
    }
    if (checkSingleDraw()) {
        return;
    }
    singleCurrentPlayer = computerSymbol;
    updateSingleTurn('Computer turn', 'player2-wins');
    setTimeout(function () {
        makeComputerMove();
    }, 1000);
}


function placeMark(index, symbol) {
    singleBoard[index] = symbol;
    singleBoxes[index].textContent = symbol;
    if (symbol === 'X') {
        singleBoxes[index].classList.add('current-player-x');
    } else {
        singleBoxes[index].classList.add('current-player-o');
    }
}


function getBoardState() {
    return [...singleBoard];

}


function checkSingleWinner(boardState, symbol) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            boardState[a] === symbol &&
            boardState[b] === symbol &&
            boardState[c] === symbol
        ) {
            return true;
        }
    }
    return false;
}


function findWinningMove(boardState, symbol) {
    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i] === '') {
            boardState[i] = symbol;
            if (checkSingleWinner(boardState, symbol)) {
                boardState[i] = '';
                return i;
            }
            boardState[i] = '';
        }
    }
    return null;
}


function findBlockingMove(boardState, symbol) {
    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i] === '') {
            boardState[i] = symbol;
            if (checkSingleWinner(boardState, symbol)) {
                boardState[i] = '';
                return i;
            }
            boardState[i] = '';
        }
    }
    return null;
}


function getBestMove(boardState) {
    const winningMove =
        findWinningMove(boardState, computerSymbol);
    if (winningMove !== null) {
        return winningMove;
    }
    const blockingMove =
        findBlockingMove(boardState, playerSymbol);
    if (blockingMove !== null) {
        return blockingMove;
    }
    const priority = [
        4,  // center
        0,  // top-left
        2,  // top-right
        6,  // bottom-left
        8,  // bottom-right
        1,  // top
        3,  // left
        5,  // right
        7   // bottom
    ];
    for (let index of priority) {
        if (boardState[index] === '') {
            return index;
        }
    }
    return null;
}


function makeComputerMove() {
    if (singleGameOver) {
        return;
    }
    const boardState = getBoardState();
    const move = getBestMove(boardState);
    if (move === null) {
        return;
    }
    placeMark(move, computerSymbol);
    if (checkSingleWinner(singleBoard, computerSymbol)) {
        singleGameOver = true;
        computerScore++;
        computerScoreNumber.textContent = computerScore;
        updateSingleTurn('Computer Wins', 'computer-win');
        setTimeout(function () {
            finishSingleRound();
        }, 1000);
        return;
    }
    if (checkSingleDraw()) {
        return;
    }
    // Player's turn
    singleCurrentPlayer = playerSymbol;
    updateSingleTurn('Your turn', 'player1-wins');
}


function checkSingleDraw() {
    if (singleBoard.every(function (value) {
        return value !== '';
    })) {
        singleGameOver = true;
        updateSingleTurn('Draw', 'draw');
        setTimeout(function () {
            finishSingleRound();
        }, 1000);
        return true;
    }
    return false;
}


function clearSingleBoard() {
    singleBoard = ["", "", "", "", "", "", "", "", ""];
    singleBoxes.forEach(function (box) {
        box.textContent = '';
        box.classList.remove(
            'current-player-x',
            'current-player-o'
        );
    });
    singleGameOver = false;
}


function updateSingleRound() {
    singleRounds.textContent = `Round ${singleRound}`;
    
}


function finishSingleRound() {
    if (singleRound === 3) {
        return;
    }
    singleRound++;
    clearSingleBoard();
    updateSingleRound();
    if (playerSymbol === 'O') {
        singleCurrentPlayer = computerSymbol;
        updateSingleTurn('Computer turn', 'player2-wins');
        setTimeout(function () {
            makeComputerMove();
        }, 500);
    } else {
        singleCurrentPlayer = playerSymbol;
        updateSingleTurn('Your turn', 'player1-wins');
    }
}


function updateSingleTurn(text, className) {
    singleTurns.innerHTML = `<p>${text}</p>`;
    singleTurns.classList.remove(
        'you-win',
        'computer-win',
        'player1-wins',
        'player2-wins',
        'draw'
    );
    singleTurns.classList.add(className);
}

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 'X';
let gameOver = false;
const boxes = document.querySelectorAll('.two-game-box');
boxes.forEach(function (box, index) {
    box.addEventListener('click', function () {
        makeMove(index);
    });
});


function makeMove(index) {
    if (board[index] !== '' || gameOver) {
        return;
    }
    board[index] = currentPlayer;
    boxes[index].textContent = currentPlayer;
    if (currentPlayer === 'X') {
        boxes[index].classList.add('current-player-x');
    } else {
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
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
}


const winnerCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];

let player1Symbol = 'X';
let player2Symbol = 'O';
const twoTurns = document.getElementById('two-turns');
const play1Score = document.getElementById('player1-score');
const play2Score = document.getElementById('player2-score');
let player1Score = 0;
let player2Score = 0;
let round = 1;


function roundWinner() {
    for (let combination of winnerCombinations) {
        const [a, b, c] = combination;
        if (
            board[a] !== '' &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            gameOver = true;
            if (board[a] === player1Symbol) {
                twoTurns.innerHTML = '<p>Player 1 wins</p>';
                twoTurns.classList.add('player1-wins');
                player1Score++;
                play1Score.textContent = player1Score;
            } else {
                twoTurns.innerHTML = '<p>Player 2 wins</p>';
                twoTurns.classList.add('player2-wins');
                player2Score++;
                play2Score.textContent = player2Score;
            }
            setTimeout(function () {
                clearBoard();
            }, 1000);
            return;
        }
    }
}


function clearBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach(function (box) {
        box.textContent = '';
        box.classList.remove(
            'current-player-x',
            'current-player-o'
        );
    });
    gameOver = false;
    currentPlayer = 'X';
    if (round === 3) {
        checkFinalResult();
        return;
    }
    twoTurns.innerHTML = '';
    twoTurns.classList.remove(
        'draw',
        'player1-wins',
        'player2-wins'
    );
    round++;
    updateRound();
}


function checkDraw() {
    if (board.every(function (value) {
        return value !== '';
    })) {
        gameOver = true;
        twoTurns.innerHTML = '<p>Draw</p>';
        twoTurns.classList.add('draw');
        setTimeout(function () {
            clearBoard();
        }, 1000);
    }
}


const twoRounds = document.getElementById('two-rounds');
function updateRound() {
    twoRounds.textContent = `Round ${round}`;
}


const playerCongra = document.getElementById('player-congra');
const draw = document.getElementById('draw-sec');
const lose = document.getElementById('lose-sec');
function checkFinalResult() {
    if (player1Score > player2Score) {
        playerCongra.style.display = 'flex';
        draw.style.display = 'none';
        lose.style.display = 'none';
    } else if (player2Score > player1Score) {
        playerCongra.style.display = 'none';
        draw.style.display = 'none';
        lose.style.display = 'flex';
    } else {
        playerCongra.style.display = 'none';
        draw.style.display = 'flex';
        lose.style.display = 'none';
    }
}

const playAgain = document.getElementById('play-again');
const mainMenu = document.getElementById('main-menu');
const losePlayAgain = document.getElementById('lose-play-again');
const loseMainMenu = document.getElementById('lose-main-menu');
const drawPlayAgain = document.getElementById('draw-play-again');
const drawMainMenu = document.getElementById('draw-main-menu');


function playAgainTwoPlayer() {
    player1Score = 0;
    player2Score = 0;
    play1Score.textContent = 0;
    play2Score.textContent = 0;
    round = 0;
    updateRound();
    clearBoard();
    playerCongra.style.display = 'none';
    draw.style.display = 'none';
    lose.style.display = 'none';
}
playAgain.addEventListener('click', playAgainTwoPlayer);
drawPlayAgain.addEventListener('click', playAgainTwoPlayer);
losePlayAgain.addEventListener('click', playAgainTwoPlayer);


function goToMainMenu() {
    playerCongra.style.display = 'none';
    draw.style.display = 'none';
    lose.style.display = 'none';
    twoGame.style.display = 'none';
    homeScreen.style.display = 'flex';
}
mainMenu.addEventListener('click', goToMainMenu);
drawMainMenu.addEventListener('click', goToMainMenu);
loseMainMenu.addEventListener('click', goToMainMenu);


const singleRestart = document.getElementById('restart-bottom');
const twoRestart = document.getElementById('restart-two-bottom');
const restartSec = document.getElementById('restart-sec');
singleRestart.addEventListener('click', function () {
    restartSec.style.display = 'flex';
});
twoRestart.addEventListener('click', function () {
    restartSec.style.display = 'flex';
});
const singleReset = document.getElementById('menu-bottom');
const twoReset = document.getElementById('menu-two-bottom');
const resetSec = document.getElementById('reset-sec');
singleReset.addEventListener('click', function () {
    resetSec.style.display = 'flex';
});
twoReset.addEventListener('click', function () {
    resetSec.style.display = 'flex';
});


const restartCancel = document.getElementById('cancel');
const resetCancel = document.getElementById('cancel-reset');
const restartTouch = document.getElementById('restart-touch');
const resetTouch = document.getElementById('reset-touch');
restartCancel.addEventListener('click', function () {
    restartSec.style.display = 'none';
});
resetCancel.addEventListener('click', function () {
    resetSec.style.display = 'none';
});

restartTouch.addEventListener('click', function () {
    restartSec.style.display = 'none';
    clearBoard();
    twoTurns.innerHTML = '';
});

resetTouch.addEventListener('click', function () {
    homeScreen.style.display = 'flex';
    singlePlayer.style.display = 'none';
    twoPlayers.style.display = 'none';
    singleGame.style.display = 'none';
    twoGame.style.display = 'none';
    resetSec.style.display = 'none';
});