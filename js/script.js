const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')

const jump = () => {
    mario.classList.add('jump')

    setTimeout(() => {
        mario.classList.remove('jump')

    }, 500)
}

const loop = setInterval(() => {

    pipePosition = pipe.offsetLeft
    marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')



    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = 'none'
        pipe.style.left = `${pipePosition}px`

        mario.style.animation = 'none'
        mario.style.bottom = `${marioPosition}px`

        mario.src = './images/game-over.png'
        mario.style.width = '75px'
        mario.style.marginLeft = '50px'


        const gameOverTitle = document.createElement('h1');
        gameOverTitle.textContent = 'Game Over';
        gameBoard.insertAdjacentElement('afterend', gameOverTitle)
        
        clearInterval(loop)

    }
}, 10)


function alterarBackground() {
    var gameBoard = document.querySelector('.game-board');
    gameBoard.style.background = 'linear-gradient(#022938, #000000)';
  }
  
  setTimeout(alterarBackground, 5000);
  

document.addEventListener('keydown', jump)