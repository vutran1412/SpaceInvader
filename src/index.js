let Space = require('./space')
let Game = require('./game')

document.addEventListener('DOMContentLoaded', () => {
    let container = document.getElementById('container')
    let space = new Space()
    space.init(container)
    space.createStars()
    let game = new Game()
    
    function gameLoop(game) {
        let currentState = game.currentState()
        if (currentState) {
            let deltaT = 1 / game.config.fps

            let gameContext = game.gameCanvas.getContext("2d")

            if (currentState.update) {
                currentState.update(game, deltaT)
            }
            if (currentState.draw) {
                currentState.draw(game, deltaT, gameContext)
            }

        }
    }

})