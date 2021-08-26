const bugInterval = setInterval(createBug, 4000)

function createBug() {
    const bug = document.createElement('div')
    bug.className = 'bug'
    bug.setAttribute('type', bugTypes[Math.floor(Math.random() * bugTypes.length)])
    bug.classList.add(bug.getAttribute('type'))

    container.append(bug)
    const trajectory = bugDirection[Math.floor(Math.random() * bugDirection.length)]
    let position = 100
    const interval = setInterval(move, 50)

    function move() {
        if (position === 1) {
            bug.remove()
            clearInterval(interval)
        } else {
            position--
            bug.style.left = position + 'vw'
            if (position >= 30 && position <= 35) {
                if (stickingOutLeft) {
                    lBox.caught = bug.getAttribute('type')
                    bug.remove()
                }
            }
            if (position <= 70 && position >= 65) {
                if (stickingOutRight) {
                    rBox.caught = bug.getAttribute('type')
                    bug.remove()
                }
            }
        }
    }
}