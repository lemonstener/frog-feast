function music() {
    if (song.paused) {
        speaker.style.filter = 'none'
        speaker.classList.add('heartbeat')
        song.play()
    } else {
        speaker.style.filter = 'grayscale(1)'
        speaker.classList.remove('heartbeat')
        song.pause()
    }
}