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
    document.addEventListener('keydown', control)
    startTimer()
    createBug()
    leftHalf.addEventListener('click', turnLeft)
    rightHalf.addEventListener('click', turnRight)
}

function endGame() {
    p.gameOver = true
    heartField.innerHTML = ''
    scoreField.hidden = true
    timerField.hidden = true
    frog.hidden = true

    leftHalf.removeEventListener('click', turnLeft)
    rightHalf.removeEventListener('click', turnRight)

    const gameOverPanel = document.createElement('div')
    gameOverPanel.className = 'game-over'

    const text = document.createElement('div')
    text.innerHTML = `Final score: ${score} <br> (but you could do better)`

    const button = document.createElement('span')
    button.innerHTML = '<i class="fa fa-refresh fa-spin"></i>'
    button.className = 'reset-btn'

    gameOverPanel.append(text, button)
    container.append(gameOverPanel)

    button.addEventListener('click', function() {
        gameOverPanel.style.marginTop = '200vh'
        gameOverPanel.remove()
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
        timer.innerText = `60`
        timeLeft = 29
        frog.hidden = false
        p.gameOver = false
        p.health = 3
        p.stickingOutLeft = false
        p.stickingOutRight = false
        p.canPlay = true
        p.health = 3
        gameOver = false
        startGame()
    })

    setTimeout(function() {
        gameOverPanel.style.marginTop = '20vh'
    }, 300)

}

// startGame()