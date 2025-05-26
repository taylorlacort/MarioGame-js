const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const jumpSound = new Audio('./sounds/smb_jump-small.mp3'); // Caminho para o arquivo de som do pulo
const gameOverSound = new Audio('./sounds/musica-de-sigma-estourado.mp3'); // Caminho para o arquivo de som de game over
const musicGameLoop = new Audio("./sounds/Super-Mario.mp3");

let distance = 0;
let isGameOver = false;

// Criação do placar
const scoreBoard = document.createElement('div');
scoreBoard.classList.add('score-board');
scoreBoard.textContent = 'Distância: 0m';
document.querySelector('.game-board').appendChild(scoreBoard);

function updateScore() {
    if (!isGameOver) {
        distance += 1;
        scoreBoard.textContent = `Distância: ${distance}m`;
    }
}

// Troca de cenários por distância
function updateBackgroundByDistance() {
    const gameBoard = document.querySelector('.game-board');
    if (distance >= 0 && distance < 200) {
        // Primeiro cenário (padrão)
        gameBoard.style.background = 'linear-gradient(#87ceeb, #e0f6ff)';
    } else if (distance >= 200 && distance < 400) {
        // Segundo cenário (noite)
        gameBoard.style.background = 'linear-gradient(#053447, #02161f)';
    } else if (distance >= 400 && distance < 600) {
        // Terceiro cenário (espaço)
        gameBoard.style.background = 'linear-gradient(#1a0033, #0a0a23)';
    } else if (distance >= 600) {
        // Quarto cenário (pós-apocalíptico)
        gameBoard.style.background = 'linear-gradient(#3e3e3e, #1a1a1a)';
    }
}

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

const scoreInterval = setInterval(() => {
    updateScore();
    updateBackgroundByDistance();
}, 50);

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
        clearInterval(scoreInterval);
        isGameOver = true;

        // Adicionando a classe "game-over" ao elemento mario
        mario.classList.add('game-over');

        // Cria um container para alinhar Game Over e a pontuação
        const gameOverContainer = document.createElement('div');
        gameOverContainer.classList.add('game-over-container');

        // Título Game Over
        const gameOverTitle = document.createElement('h1');
        gameOverTitle.textContent = 'Game Over';
        gameOverTitle.classList.add('game-over-title');

        // Pontuação final
        const finalScore = document.createElement('h2');
        finalScore.textContent = `Distância final: ${distance}m`;
        finalScore.classList.add('final-score');

        // Adiciona ambos ao container
        gameOverContainer.appendChild(gameOverTitle);
        gameOverContainer.appendChild(finalScore);

        // Adiciona o container ao gameBoard
        gameBoard.appendChild(gameOverContainer);

        gameOverSound.play(); // Reproduzindo o som de game over
        musicGameLoop.pause()
    }
}, 10);

setTimeout(initMusic, 500)
document.addEventListener('keydown', jump);
document.addEventListener('touchstart', function (e) {
    // Evita múltiplos toques simultâneos
    if (!isGameOver) jump();
}, { passive: true });
