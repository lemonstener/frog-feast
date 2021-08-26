const container = document.querySelector('.container')
const frog = document.querySelector('.lfrog1')
const timer = document.querySelector('.timercount')
const scoreCount = document.querySelector('.scorecount')
const hearts = document.querySelector('.heartfield')
frog.style.zIndex = 1

const lHitBox = document.querySelector('.lhitbox')
const rHitBox = document.querySelector('.rhitbox')

const lBox = {
    caught: 'nothing'
}

const rBox = {
    caught: 'nothing'
}

const bugDirection = ['left', 'right']
const bugTypes = ['bee', 'fly', 'ladybug']
let frogDirection = 'l'
let stickingOutLeft = false
let stickingOutRight = false
let hurt = 1
let canPlay = true
let score = 0
let timeLeft = 120
let health = 3

scoreCount.innerHTML = `<span>${score}</span>`

function updateScore() {
    score += 100
    scoreCount.innerHTML = `<span>${score}</span>`
}

const timerInterval = setInterval(function() {
    timer.innerHTML = `<span>${timeLeft}</span>`
    timeLeft--
}, 1000)