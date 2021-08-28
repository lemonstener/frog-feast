const e = {
    bugDirection: ['l', 'r'],
    bugTypes: ['bee', 'puffer', 'puffer', 'fly', 'fly', 'fly', 'fly', 'fly', 'fly', 'fly'],
    bugInfo: {
        fly: {
            string: '+100',
            color: 'gold'
        },
        bee: {
            string: '-500',
            color: 'red'
        },
        puffer: {
            string: '+1000',
            color: 'gold'
        },
        bugActive: false
    }
}

function createBug() {
    if (p.gameOver) {
        document.querySelector('#bug').remove()
        return
    }

    const direction = e.bugDirection
    const bug = document.createElement('div')
    bug.id = 'bug'
    bug.setAttribute('type', e.bugTypes[Math.floor(Math.random() * e.bugTypes.length)])

    container.append(bug)
    let position
    const trajectory = direction[Math.floor(Math.random() * direction.length)]
    bug.className = `${trajectory}${bug.getAttribute('type')}1`
    trajectory === 'l' ? position = 0 : position = 100;
    if (trajectory === 'r') {
        bug.style.left = '100vw'
    }
    const random = Math.floor((Math.random() * 30) + 10)
    const animateInterval = setInterval(function() {
        let current = parseInt(bug.className[bug.className.length - 1])
        if (current > 3) {
            bug.className = `${trajectory}${bug.getAttribute('type')}1`
        } else {
            bug.className = `${trajectory}${bug.getAttribute('type')}${current + 1}`
        }
    }, 50)
    const flight = setInterval(move, random)

    function move() {
        if (p.gameOver) {
            clearInterval(flight)
            bug.remove()
        }
        if (position > 100 || position < 0) {
            clearInterval(flight)
            bug.remove()
            if (!p.gameOver) { createBug() }
        } else {
            trajectory === 'l' ? position++ : position--;
            bug.style.left = position + 'vw'
            if (position >= 30 && position <= 33) {
                if (p.stickingOutLeft) {
                    lBox.caught = bug.getAttribute('type')
                    clearInterval(flight)
                    bug.remove()
                    flashResult(bug)
                    if (!p.gameOver) { createBug() }
                }
            }
            if (position <= 63 && position >= 60) {
                if (p.stickingOutRight) {
                    rBox.caught = bug.getAttribute('type')
                    bug.remove()
                    clearInterval(flight)
                    flashResult(bug)
                    if (!p.gameOver) { createBug() }
                }
            }
            if (position === 34 || position === 59) {
                clearInterval(flight)
                let up = 30
                const escape = setInterval(function() {
                    if (p.gameOver) {
                        clearInterval(escape)
                        bug.remove()
                    }
                    if (up === 0) {
                        clearInterval(escape)
                        bug.remove()
                        if (!p.gameOver) { createBug() }
                    }
                    up--
                    bug.style.top = `${up}vh`
                    bug.style.left = `${position}vw`
                    trajectory === 'l' ? position++ : position--
                }, random)
            }
        }
    }
}

function flashResult(bug) {
    const result = document.createElement('div')
    container.append(result)
    result.className = 'result'
    result.innerText = e.bugInfo[bug.getAttribute('type')].string
    result.style.color = e.bugInfo[bug.getAttribute('type')].color
    let count = 52
    const flashResultInterval = setInterval(() => {
        result.style.bottom = `${count}vh`
        count++
        if (count === 78) {
            result.remove()
        }
    }, 25);
}