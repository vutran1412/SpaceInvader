const WelcomeState = require('./welcome')

function Game() {
    this.config = {
        bombRate: 0.05,
        bombMinVelocity: 50,
        bombMaxVelocity: 50,
        invaderInitialVelocity: 25,
        invaderAcceleration: 0,
        invaderDropDistance: 20,
        rocketVelocity: 120,
        rocketMaxFireRate: 2,
        gameWidth: 600,
        gameHeight: 500,
        fps: 50,
        debugMode: false,
        invaderRanks: 5,
        invaderfiles: 10,
        shipSpeed: 120,
        levelDifficultyMultiplier: 0.2,
        pointsPerInvader: 5
    }

    this.lives = 3
    this.width = 0
    this.height = 0
    this.gameBounds = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    }

    this.stateStack = []
    this.pressedKeys = {}
    this.gameCanvas = null
}

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

Game.prototype.start = function() {
    this.moveToState(new WelcomeState())

    this.lives = 3
    this.config.debugMode = /debug=true/.test(window.location.href)

    let game = this
    this.intervalId = setInterval(function() {
        gameLoop(game)
    }, 1000 / this.config.fps)
}

Game.prototype.init = function(gameCanvas) {
    this.gameCanvas = gameCanvas

    this.width = gameCanvas.width
    this.height = gameCanvas.height

    this.gameBounds = {
        left: gameCanvas.width / 2 - this.config.gameWidth / 2,
        right: gameCanvas.width / 2 - this.config.gameWidth / 2,
        top: gameCanvas.height / 2 - this.config.gameHeight / 2,
        bottom: gameCanvas.height / 2 - this.config.gameHeight / 2
    }
}

Game.prototype.currentState = function() {
    return this.stateStack.length > 0 ? this.stateStack[this.stateStack.length - 1] : null
}

Game.prototype.moveToState = function(state) {
    if (this.currentState()) {
        if (this.currentState().leave) {
            this.currentState.leave(game)
        }
        this.stateStack.pop()
    }

    if (state.enter) {
        state.enter(game)
    }

    this.stateStack.push(state)
}

Game.prototype.pushState = function(state) {
    if (state.enter) {
        state.enter(game)
    }
    this.stateStack.push(state)
}

Game.prototype.popState = function() {
    if (this.currentState()) {
        if (this.currentState().leave) {
            this.currentState().leave(game)
        }
        this.stateStack.pop()
    }
}

Game.prototype.keyDown = function(keyCode) {
    this.pressedKeys[keyCode] = true

    if (this.currentState() && this.currentState().keyDown) {
        this.currentState().keyDown(this, keyCode)
    }
}

Game.prototype.keyUp = function(keyCode) {
    delete this.pressedKeys[keyCode]

    if (this.currentState() && this.currentState().keyUp) {
        this.currentState().keyUp(this, keyCode)
    }
}

module.exports = Game