const p = {
    direction: 'l',
    stickingOutLeft: false,
    stickingOutRight: false,
    canPlay: true,
    health: 3,
    gameOver: false,
    gameInProgress: false
}

function stickTongue() {
    if (p.canPlay === false) { return }
    p.canPlay = false
    p.direction === 'l' ? hitbox = lBox : hitbox = rBox
    p.direction === 'l' ? p.stickingOutLeft = true : p.stickingOutRight = true
    frog.className = `${p.direction}frog1}`
    const pushInterval = setInterval(function() {
        frog.className = `${p.direction}frog${parseInt(frog.className[5])+1}`
        if (parseInt(frog.className[5]) > 6) {
            clearInterval(pushInterval)
            const pullInterval = setInterval(function() {
                frog.className = `${p.direction}frog${parseInt(frog.className[5])-1}`
                if (parseInt(frog.className[5]) === 1) {
                    clearInterval(pullInterval)
                    checkCaught(hitbox)
                }
            }, 15)
        }
    }, 15)

    setTimeout(function() {
        p.canPlay = true
        p.stickingOutRight = false
        p.stickingOutLeft = false
        frog.className = `${p.direction}frog1`
    }, 300)
}

function getHurt() {
    p.canPlay = false
    p.health -= 1
    let hurt = 0
    hearts.lastElementChild.remove()
    const hurtInterval = setInterval(function() {
        hurt++
        frog.className = `${p.direction}h${hurt}`
        if (hurt > 3) {
            if (p.health === 0) {
                if (hurt === 4) {
                    document.removeEventListener('keydown', control)
                }
                frog.className = `${p.direction}h${hurt}`
                if (hurt === 7) {
                    clearInterval(hurtInterval)
                    p.gameOver = true
                    hurt = 1
                    endGame()
                }
            } else {
                clearInterval(hurtInterval)
                frog.className = `${p.direction}frog1`
            }
        }
    }, 30)
}

function turnLeft() {
    p.direction = 'l'
    frog.className = 'lfrog1'
    stickTongue()
}

function turnRight() {
    p.direction = 'r'
    frog.className = 'rfrog1'
    stickTongue()
}

function checkCaught(hitbox) {
    if (hitbox.caught === '') { return }
    if (hitbox.caught === 'bee') {
        getHurt()
    }
    if (hitbox.caught === 'puffer') {
        timeLeft += 5
    }
    updateScore(hitbox.caught)
    lBox.caught = ''
    rBox.caught = ''
}



function control(e) {
    if (!p.canPlay) { return }
    if (e.keyCode === 32) {
        music()
    } else if (e.keyCode === 37) {
        turnLeft()
    } else if (e.keyCode === 39) {
        turnRight()
    }
}

document.addEventListener('keydown', control)