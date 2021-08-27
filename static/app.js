const container = document.querySelector('.container')
const frog = document.querySelector('.lfrog1')
const timer = document.querySelector('.timercount')
const scoreCount = document.querySelector('.scorecount')
const hearts = document.querySelector('.heartfield')
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
const scoreSheet = {
    fly: 100,
    bee: -500,
    puffer: 1000
}
const bugTypes = ['bee', 'puffer', 'puffer', 'fly', 'fly', 'fly', 'fly', 'fly', 'fly', 'fly']
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
    score += scoreSheet[bug]
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