function createBug() {
    const bug = document.createElement('div')
    bug.id = 'bug'
    bug.setAttribute('type', bugTypes[Math.floor(Math.random() * bugTypes.length)])

    container.append(bug)
    let position
    const trajectory = bugDirection[Math.floor(Math.random() * bugDirection.length)]
    bug.className = `${trajectory}${bug.getAttribute('type')}1`
    trajectory === 'l' ? position = 0 : position = 100;
    const random = Math.floor((Math.random() * 20) + 10)
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

            if (position >= 30 && position <= 35) {
                if (stickingOutLeft) {
                    lBox.caught = bug.getAttribute('type')
                    bug.remove()
                    clearInterval(flight)
                    createBug()
                }
            }
            if (position <= 70 && position >= 65) {
                if (stickingOutRight) {
                    rBox.caught = bug.getAttribute('type')
                    bug.remove()
                    clearInterval(flight)
                    createBug()
                }
            }
        }
    }
}



const test = document.querySelector('#bug')