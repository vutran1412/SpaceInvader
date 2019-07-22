let Space = require('./space')
let Game = require('./game')

document.addEventListener('DOMContentLoaded', () => {
    let container = document.getElementById('container')
    let space = new Space()
    space.init(container)
    space.createStars()

    let canvas = document.getElementById("gameCanvas")
    canvas.width = 800
    canvas.height = 600
    let game = new Game()

    game.init(canvas)
    game.start()

    window.addEventListener("keydown", function keydown(e) {
        let keycode = e.which || window.event.keycode
        if (keycode === 37 || keycode === 39 || keycode === 32) {
            e.preventDefault()
        }
        game.keyDown(keycode)
    })

    window.addEventListener("keyup", function keydown(e) {
        let keycode = e.which || window.event.keycode
        game.keyUp(keycode)
    })

})