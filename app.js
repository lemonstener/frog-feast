const frog = document.querySelector('.lfrog1')
let direction = 'l'
let hurt = 1
let canPlay = true
let score = 0
let caught = 'bee'

function stickTongue() {
    canPlay = false
    const pushInterval = setInterval(function() {
        frog.className = `${direction}frog${parseInt(frog.className[5])+1}`
        if (parseInt(frog.className[5]) > 6) {
            clearInterval(pushInterval)
            const pullInterval = setInterval(function() {
                frog.className = `${direction}frog${parseInt(frog.className[5])-1}`
                if (parseInt(frog.className[5]) === 1) {
                    clearInterval(pullInterval)
                    checkCaught()
                }
            }, 18)
        }
    }, 18)

    setTimeout(function() {
        canPlay = true
        frog.className = `${direction}frog1`
    }, 400)
}

function getHurt() {
    const hurtInterval = setInterval(function() {
        frog.className = `${direction}h${hurt}`
        hurt++
        if (hurt > 3) {
            clearInterval(hurtInterval)
            hurt = 1
        }
    }, 50)
}

function addToScore() {
    score += 5
}

function turnLeft() {
    direction = 'l'
    frog.className = 'lfrog1'
}

function checkCaught() {
    if (caught) { caught === 'fly' ? addToScore() : getHurt() }
    caught = undefined
}

function turnRight() {
    direction = 'r'
    frog.className = 'rfrog1'
}

function control(e) {
    if (!canPlay) { return }
    if (e.keyCode === 32) {
        stickTongue()
    } else if (e.keyCode === 37) {
        turnLeft()
    } else if (e.keyCode === 39) {
        turnRight()
    }
}

document.addEventListener('keydown', control)