const lBox = {
    caught: ''
}

const rBox = {
    caught: ''
}

let score = 0
let timeLeft = 59


scoreCount.innerHTML = `${score}`

function updateScore(bug) {
    score += parseInt(e.bugInfo[bug].string)
    if (score < 0) {
        score = 0
    }
    scoreCount.innerHTML = `${score}`
}

function startTimer() {
    const timerInterval = setInterval(function() {
        if (p.gameOver) {
            clearInterval(timerInterval)
        }
        timer.innerText = `${timeLeft}`
        timeLeft--

        if (timeLeft < -1) {
            timer.innerText = 60
            p.gameOver = true
            clearInterval(timerInterval)
            endGame()
        }
    }, 1000)
}

function increaseDifficulty() {
    const difficultyInterval = setInterval(function() {
        if (p.gameOver) {
            clearInterval(difficultyInterval)
        }
        const count = e.bugTypes.filter(item => item === 'fly').length
        if (count === 2) {
            clearInterval(difficultyInterval)
        }
        e.bugTypes.pop()
        e.bugTypes.unshift('bee')
    }, 10000)
}

function startGame() {
    document.addEventListener('keydown', control)
    startTimer()
    createBug()
    increaseDifficulty()
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
        timeLeft = 59
        frog.hidden = false
        p.gameOver = false
        p.health = 3
        p.stickingOutLeft = false
        p.stickingOutRight = false
        p.canPlay = true
        p.health = 3
        gameOver = false
        e.bugTypes = ['bee', 'puffer', 'puffer', 'fly', 'fly', 'fly', 'fly', 'fly', 'fly', 'fly']
        startGame()
    })

    setTimeout(function() {
        gameOverPanel.style.marginTop = '20vh'
    }, 300)

}

startGame()