function Game() {
    this.config = {
        gameWidth: 400,
        gameHeight: 300,
        fps: 50
    }

    this.lives = 3
    this.width = 0
    this.height = 0
    this.gameBound = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    }

    this.statStack = []
    this.pressedKeys = {}
    this.gameCanvas = null
}