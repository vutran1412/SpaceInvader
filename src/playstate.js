function PlayState(config, level) {
    this.config = config
    this.level = level

    this.invaderCurrentVelocity = 10
    this.invaderCurrentDropDistance = 0
    this.invadersAreDropping = false
    this.lastRocketTime = null

    this.ship = null
    this.invaders = []
    this.rockets = []
    this.bombs = []
}

