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