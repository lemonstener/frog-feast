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
    landingPage.innerHTML = ''
    html.classList.remove('background')
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
    landingPage.style.right = '-9999px'
    container.hidden = false
    document.addEventListener('keydown', control)
    startTimer()
    createBug()
    leftHalf.addEventListener('click', turnLeft)
    rightHalf.addEventListener('click', turnRight)
}

function endGame() {
    const highScore = localStorage.getItem('highScore') || 0
    let newRecord = false
    if (score > highScore) {
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
        text.innerHTML = `Final score: ${score} <br> (you once did ${highScore} though)`
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
        showLandingPage()
    })

    setTimeout(function() {
        gameOverPanel.style.marginTop = '20vh'
    }, 300)

}

function showLandingPage() {
    landingPage.innerHTML = `
    <div>
            <h1>FROG FEAST</h1>
            <h3><i>A.K.A the "What if the ATARI 2600 had 16bit graphics" game</i></h2>
            <p>Welcome to Frog Feast ! Eat some bugs, get a high score and then do it all over again!<br> Watch out for bees though! Eat 3 bees and it's game over! <br> Oh yeah, you have a time limit too. <br> Press
                <span style="color:blue">left</span> or
                <span style="color:blue">right</span> on the keyboard to stick your tongue out in that direction (or tap the screen on mobile).<br> Press the <span style="color:blue">spacebar</span> to toggle the music on / off (or click on the
                <span
                    style="color:orange">speaker</span>).
                    <br>
                    <span style="color:red">Flies</span> will get you 100 points, <span style="color:purple">Fluffly bugs</span> are worth 1000 and extend your timer but the <span style="color:gold">Bees</span> will hurt you.</p>
                    <a href="https://www.bensound.com/royalty-free-music/2">Music by Bensound</a>
        </div>

        <div class="controls">
            <div class="ldemo-frog"></div>
            <div class="demo-speaker"></div>
            <div class="rdemo-frog"></div>
        </div>
        <div class="enemies">
            <div style="margin-top:20px"><span style="color:red;">Fly</span></div>
            <div class="demo-fly"></div>
            <div style="margin-top:20px"><span style="color:gold">Bee</span></div>
            <div class="demo-bee"></div>
            <div style="margin-top:20px"><span style="color:purple">Fluffy Bug</span></div>
            <div class="demo-puffer"></div>
        </div>

        <div class="start"></div>
        <div class="about">
            <div class="profile"></div>
            <div class="info">
                <div>
                    <p>Hi there, my name is Deyan. This little game here is my entry for the August Mintbean Hiring Hackaton. No frameworks involved, just plain CSS and Javascript. I hope you enjoy playing it as much as I enjoyed making it.<br>
                    <a href="https://github.com/lemonstener/frog-feast">Check it out on GitHub</a></p>
                    

                    <div class="links">
                        <a href="https://www.linkedin.com/in/deyan-vasilev/">
                            <div class="linkedin"></div>
                        </a>
                        <a href="https://github.com/lemonstener">
                            <div class="github"></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `
    html.className = 'background'
    const start = document.querySelector('.start')
    start.addEventListener('click', startGame)
    landingPage.hidden = false
}

showLandingPage()