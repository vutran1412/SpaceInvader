const Entity = require('./entity')

function Player(position, speed, direction) {
    Entity.call(this, position, speed, direction)

    this.width = 20
    this.height = 10
}
Player.prototype = Object.create(Entity.prototype)

Player.prototype.update = function (deltaT, game) {
    Entity.prototype.update.call(this, deltaT)

    if (this.collisionRect().top() <= 0 || 
        this.collisionRect().bottom() >= game.gameFieldRect().bottom()) {
            this.direction *= -1
        }

}

function Enemy(position, speed, direction, rank) {
    Entity.call(this, position, speed, direction)

    this.width = 13
    this.height = 10
    this.rank = rank
}
Enemy.prototype = Object.create(Entity.prototype)

Enemy.prototype.update = function (deltaT, game) {
    Entity.prototype.update.call(this, deltaT)

    if (this.collisionRect().top() <= 0 || 
        this.collisionRect().bottom() >= game.gameFieldRect().bottom()) {
        this.direction.y *= -1
    }
}

module.exports = {
    Player,
    Enemy
}