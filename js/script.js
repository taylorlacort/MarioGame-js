const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const jumpSound = new Audio('./sounds/smb_jump-small.mp3'); // Caminho para o arquivo de som do pulo
const gameOverSound = new Audio('./sounds/musica-de-sigma-estourado.mp3'); // Caminho para o arquivo de som de game over
const musicGameLoop = new Audio("./sounds/Super-Mario.mp3");



function initMusic() {
    musicGameLoop.volume = 0.5; // Ajuste o volume desejado (entre 0 e 1)
    musicGameLoop.loop = true; // Habilita o loop contínuo do áudio
    musicGameLoop.play(); // Inicia o áudio
}


const jump = () => {
    mario.classList.add('jump');
    jumpSound.currentTime = 0; // Reinicia o som para que possa ser reproduzido em sequência
    jumpSound.play();

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const loop = setInterval(() => {
    const pipe = document.querySelector('.pipe');
    const mario = document.querySelector('.mario');
    const gameBoard = document.querySelector('.game-board');

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);

        // Adicionando a classe "game-over" ao elemento mario
        mario.classList.add('game-over');

        // Adicionando o título "Game Over" após o elemento .game-board
        const gameOverTitle = document.createElement('h1');
        gameOverTitle.textContent = 'Game Over';
        gameOverTitle.classList.add('game-over-title');
        gameBoard.appendChild(gameOverTitle);

        gameOverSound.play(); // Reproduzindo o som de game over
        musicGameLoop.pause()
    }
}, 10);

function alterarBackground() {
    var gameBoard = document.querySelector('.game-board');
    gameBoard.style.background = 'linear-gradient(#053447, #02161f)';
}

function alterarBackground2() {
    var gameBoard = document.querySelector('.game-board');
    gameBoard.style.background = 'linear-gradient(#87ceeb, #e0f6ff)';
}

setTimeout(alterarBackground, 10000)
setTimeout(alterarBackground2, 20000)

setTimeout(initMusic, 500)
document.addEventListener('keydown', jump);
