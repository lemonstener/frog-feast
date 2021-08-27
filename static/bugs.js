function createBug() {
    if (health === 0) { return }
    const bug = document.createElement('div')
    bug.id = 'bug'
    bug.setAttribute('type', bugTypes[Math.floor(Math.random() * bugTypes.length)])

    container.append(bug)
    let position
    const trajectory = bugDirection[Math.floor(Math.random() * bugDirection.length)]
    bug.className = `${trajectory}${bug.getAttribute('type')}1`
    trajectory === 'l' ? position = 0 : position = 100;
    if (trajectory === 'r') {
        bug.style.left = '100vw'
    }
    const random = Math.floor((Math.random() * 10) + 10)
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
        if (position > 100 || position < 0) {
            bug.remove()
            clearInterval(flight)
            createBug()
        } else {
            trajectory === 'l' ? position++ : position--;
            bug.style.left = position + 'vw'
            if (position >= 30 && position <= 33) {
                if (stickingOutLeft) {
                    lBox.caught = bug.getAttribute('type')
                    bug.remove()
                    clearInterval(flight)
                    flashResult(bug)
                    createBug()
                }
            }
            if (position <= 63 && position >= 60) {
                if (stickingOutRight) {
                    rBox.caught = bug.getAttribute('type')
                    bug.remove()
                    clearInterval(flight)
                    flashResult(bug)
                    createBug()
                }
            }
            if (position === 34 || position === 59) {
                clearInterval(flight)
                let up = 30
                const escape = setInterval(function() {
                    if (up === 0) {
                        bug.remove()
                        clearInterval(escape)
                        createBug()
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
    result.innerText = bugInfo[bug.getAttribute('type')].string
    result.style.color = bugInfo[bug.getAttribute('type')].color
    let count = 52
    const flashResultInterval = setInterval(() => {
        result.style.bottom = `${count}vh`
        count++
        if (count === 78) {
            result.remove()
        }
    }, 25);
}