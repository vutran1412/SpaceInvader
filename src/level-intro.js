function LevelIntroState(level) {
    this.level = level
    this.countdownMessage = "3"
}

LevelIntroState.prototype.draw = function(game, deltaT, context) {
    context.clearRect(0, 0, game.width, game.height)

    context.font = "36px Helvetica"
    context.fillStyle = "#add6ff"
    context.textBaseLine = "middle"
    context.textAlign = "center"
    context.fillText("Level " + this.level, game.width / 2, game.height / 2)
    context.font = "24px Helvetica"
    context.fillText("Ready in " + this.countdownMessage, game.width / 2, game.height / 2 + 36)
}

LevelIntroState.prototype.update = function(game, deltaT) {
    if (this.countdown === undefined) {
        this.countdown = 3
    }
    this.countdown -= deltaT

    if (this.countdown < 2) {
        this.countdownMessage = "2"
    }

    if (this.countdown < 1) {
        this.countdownMessage = "1"
    }

    if (this.countdown <= 0) {
        game.movetoState(new PlayState(game.config, this.level))
    }
}

module.exports = LevelIntroState