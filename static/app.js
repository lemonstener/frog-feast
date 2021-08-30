const lBox = {
    caught: ''
}

const rBox = {
    caught: ''
}

let score = 0
let timeLeft = 29


scoreCount.innerHTML = `${score}`

function updateScore(bug) {
    score += parseInt(e.bugInfo[bug].string)
    if (score < 0) {
        score = 0
    }
    scoreCount.innerHTML = `${score}`
}

speaker.addEventListener('click', music)

function startTimer() {
    const timerInterval = setInterval(function() {
        if (timeLeft < 11) {
            timer.classList.add('heartbeat')
        } else {
            timer.classList.remove('heartbeat')
        }
        if (p.gameOver) {
            timer.classList.remove('pulsate')
            clearInterval(timerInterval)
        }
        timer.innerText = `${timeLeft}`
        timeLeft--

        if (timeLeft < -1) {
            timer.classList.remove('pulsate')
            timer.innerText = 60
            p.gameOver = true
            clearInterval(timerInterval)
            endGame()
        }
    }, 1000)
}

function startGame() {
    frog.className = `${p.direction}frog1`
    heartField.innerHTML = `
        <div class="heart"></div>
            <div class="heart"></div>
            <div class="heart"></div>
        `
    scoreField.hidden = false
    timerField.hidden = false
    score = 0
    scoreCount.innerHTML = `${score}`
    timer.innerText = `30`
    timeLeft = 29
    frog.hidden = false
    p.gameOver = false
    p.health = 3
    p.stickingOutLeft = false
    p.stickingOutRight = false
    p.canPlay = true
    p.health = 3
    gameOver = false
    speaker.hidden = false
    landingPage.hidden = true
    container.hidden = false
    document.addEventListener('keydown', control)
    startTimer()
    createBug()
    leftHalf.addEventListener('click', turnLeft)
    rightHalf.addEventListener('click', turnRight)
}

function endGame() {
    let newRecord = false
    if (score > localStorage.getItem('highScore')) {
        localStorage.setItem('highScore', score)
        newRecord = true
    }
    p.gameOver = true
    heartField.innerHTML = ''
    scoreField.hidden = true
    timerField.hidden = true
    frog.hidden = true
    speaker.hidden = true

    leftHalf.removeEventListener('click', turnLeft)
    rightHalf.removeEventListener('click', turnRight)

    const gameOverPanel = document.createElement('div')
    gameOverPanel.className = 'game-over'

    const backBTN = document.createElement('div')
    backBTN.className = 'back-btn'

    const text = document.createElement('div')
    if (newRecord) {
        text.innerHTML = `New high score!!! <br> ${score}`
    } else {
        text.innerHTML = `Final score: ${score} <br> (but you could do better)`
    }


    const restartBTN = document.createElement('span')
    restartBTN.innerHTML = '<i class="fa fa-refresh fa-spin"></i>'
    restartBTN.className = 'reset-btn'

    gameOverPanel.append(backBTN, text, restartBTN)
    container.append(gameOverPanel)

    restartBTN.addEventListener('click', function() {
        gameOverPanel.remove()
        startGame()
    })

    backBTN.addEventListener('click', function() {
        gameOverPanel.remove()
        container.hidden = true
        if (!song.paused) { music() }
        landingPage.hidden = false
    })

    setTimeout(function() {
        gameOverPanel.style.marginTop = '20vh'
    }, 300)

}

start.addEventListener('click', startGame)