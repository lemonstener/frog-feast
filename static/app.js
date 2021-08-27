const container = document.querySelector('.container')
const frog = document.querySelector('.lfrog1')
const timer = document.querySelector('.timercount')
const scoreCount = document.querySelector('.scorecount')
const hearts = document.querySelector('.heartfield')
const timerField = document.querySelector('.timerfield')
const scoreField = document.querySelector('.scorefield')
const heartField = document.querySelector('.heartfield')
frog.style.zIndex = 1

const lHitBox = document.querySelector('.lhitbox')
const rHitBox = document.querySelector('.rhitbox')

const lBox = {
    caught: ''
}

const rBox = {
    caught: ''
}

const bugDirection = ['l', 'r']
const bugTypes = ['bee', 'puffer', 'puffer', 'fly', 'fly', 'fly', 'fly', 'fly', 'fly', 'fly']
const bugInfo = {
    fly: {
        string: '+100',
        color: 'black'
    },
    bee: {
        string: '-500',
        color: 'red'
    },
    puffer: {
        string: '+1000',
        color: 'blue'
    }
}
let frogDirection = 'l'
let stickingOutLeft = false
let stickingOutRight = false
let hurt = 1
let canPlay = true
let score = 0
let timeLeft = 60
let health = 3

scoreCount.innerHTML = `<span>${score}</span>`

function updateScore(bug) {
    score += parseInt(bugInfo[bug].string)
    if (score < 0) {
        score = 0
    }
    scoreCount.innerHTML = `<span>${score}</span>`
}

const timerInterval = setInterval(function() {
    timer.innerHTML = `<span>${timeLeft}</span>`
    timeLeft--
    if (timeLeft < 0) {
        clearInterval(timerInterval)
        console.log('GAME OVER')
    }
}, 1000)

const difficultyInterval = setInterval(increaseDifficulty, 20000)

function increaseDifficulty() {
    const count = bugTypes.filter(item => item === 'fly').length
    if (count === 2) {
        clearInterval(difficultyInterval)
    }
    bugTypes.pop()
    bugTypes.unshift('bee')
}

function gameOver() {
    timerField.hidden = true
    scoreField.hidden = true

    const div = document.createElement('div')
    div.className = 'game-over'

    const text = document.createElement('div')
    text.innerHTML = `Final score: ${score} <br> (but you could do better).`
    div.append(text)

    const btn = document.createElement('span')
    btn.innerHTML = ' <i class="fa fa-refresh fa-spin"></i>'
    btn.className = 'reset-btn'
    btn.addEventListener('click', reset)
    div.append(btn)

    container.append(div)
}

function reset() {
    const gameOverPanel = document.querySelector('.game-over')
    gameOverPanel.remove()
    frogDirection = 'l'
    stickingOutLeft = false
    stickingOutRight = false
    hurt = 1
    canPlay = true
    score = 0
    timeLeft = 60
    health = 3

    timeLeft.innerText = '0'

    for (let i = 0; i < 3; i++) {
        const heart = document.createElement('div')
        heart.className = 'heart'
        heartField.append(heart)
    }

    timerField.hidden = false
    scoreField.hidden = false
    frog.className = 'lfrog1'
}