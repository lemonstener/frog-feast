function stickTongue() {
    canPlay = false
    frogDirection === 'l' ? hitbox = lBox : hitbox = rBox
    frogDirection === 'l' ? stickingOutLeft = true : stickingOutRight = true
    const pushInterval = setInterval(function() {
        frog.className = `${frogDirection}frog${parseInt(frog.className[5])+1}`
        if (parseInt(frog.className[5]) > 6) {
            clearInterval(pushInterval)
            const pullInterval = setInterval(function() {
                frog.className = `${frogDirection}frog${parseInt(frog.className[5])-1}`
                if (parseInt(frog.className[5]) === 1) {
                    clearInterval(pullInterval)
                    checkCaught(hitbox)
                }
            }, 18)
        }
    }, 18)

    setTimeout(function() {
        canPlay = true
        stickingOutRight = false
        stickingOutLeft = false
        frog.className = `${frogDirection}frog1`
    }, 400)
}

function getHurt() {
    const hurtInterval = setInterval(function() {
        frog.className = `${frogDirection}h${hurt}`
        hurt++
        if (hurt > 3) {
            clearInterval(hurtInterval)
            hurt = 1
        }
    }, 50)
    health--
    hearts.lastElementChild.remove()
    if (health === 0) {
        console.log('GAME OVER')
    }
}

function turnLeft() {
    frogDirection = 'l'
    frog.className = 'lfrog1'
}

function checkCaught(hitbox) {
    if (hitbox.caught === '') { return }
    if (hitbox.caught === 'bee') {
        getHurt()
    }
    if (hitbox.caught === 'puffer') {
        timeLeft += 10
    }
    updateScore(hitbox.caught)
    lBox.caught = ''
    rBox.caught = ''
}

function turnRight() {
    frogDirection = 'r'
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