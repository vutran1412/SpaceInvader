function Player(x, y) {
    this.x = x
    this.y = y
    this.width = 20
    this.height = 20
    this.direction = -1
}

Player.prototype.update = function (game) {
    if (this.y <= 0 || this.y + this.height >= game.gameFieldHeight()) {
        this.direction *= -1
    }
}

function Enemy(x, y) {
    this.x = x
    this.y = y
    this.width = 10
    this.height = 10
    this.direction = 1
}

Enemy.prototype.update = function (game) {
    if (this.y <= 0 || this.y + this.height >= game.gameFieldHeight()) {
        this.direction *= -1
    }
}

module.exports = {
    Player,
    Enemy
}