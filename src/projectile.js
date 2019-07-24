const Entity = require('./entity')

function Projectile(position, speed, direction, type) {
    Entity.call(this, position, speed, direction)

    this.width = 1
    this.height = 5
    this.type = type
}

Projectile.prototype = Object.create(Entity.prototype)

module.exports = Projectile