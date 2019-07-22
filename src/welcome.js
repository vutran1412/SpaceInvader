const LevelIntroState = require('./level-intro')

function WelcomeState() {}

WelcomeState.prototype.draw = function(game, deltaT, context) {
    context.clearRect(0, 0, game.width, game.height)

    context.font = "25px Helvetica"
    context.fillStyle = "#add6ff"
    context.textBaseline = "center"
    context.textAlign = "center"
    context.fillText("Space Invaders", game.width / 2, game.height / 2 - 40)
    context.font = "18px Helvetica"

    context.fillText("Press 'Space' to start", game.width / 2, game.height / 2)
}

WelcomeState.prototype.keyDown = function(game, keyCode) {
    if (keyCode === 32) {
        game.moveToState(new LevelIntroState(game.level))
    }
} 

module.exports = WelcomeState