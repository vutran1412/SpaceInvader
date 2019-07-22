const Star = require('./star')

function Space() {
    this.fps = 30
    this.canvas = null
    this.width = 1000
    this.height = 0
    this.minVelocity = 35
    this.maxVelocity = 200
    this.stars = 400
    this.intervalId = 0
    
}

Space.prototype.createStars = function() {

    let stars = []
    for (let i = 0; i < this.stars; i++) {
        stars[i] = new Star(
            Math.random() * this.width, 
            Math.random() * this.height, 
            Math.random() * 3 + 1, 
            (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity
        )
    }
    debugger
    this.stars = stars
}

Space.prototype.update = function() {
    let deltaT = 1 / this.fps
    for (let i = 0; i < this.stars.length; i++) {
        let star = this.stars[i]
        star.x -= deltaT * star.velocity
        if (star.x < 0) {
            this.stars[i] = new Star(
               1700,
                Math.random() * this.height,
                Math.random() * 3 + 1,
                (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity
            )
        }
    }
}


Space.prototype.init = function(div) {
    let self = this

    this.intervalId = setInterval(function() {
        self.update()
        self.draw()
    }, 1000 / this.fps)

    this.containerDiv = div
    self.width = window.innerWidth
    self.height = window.innerHeight

    window.addEventListener('resize', function resize(event) {
        self.width = window.innerWidth
        self.height = window.innerHeight
        self.canvas.width = self.width
        self.canvas.height = self.height
        self.draw()
    })

    let canvas = document.createElement('canvas')
    div.appendChild(canvas)
    this.canvas = canvas
    this.canvas.width = this.width
    this.canvas.height = this.height
}

Space.prototype.draw = function() {
    let context = this.canvas.getContext("2d")
    context.fillStyle = '#000000'
    context.fillRect(0, 0, this.width, this.height)

    context.fillStyle = '#add6ff'
    for (let i = 0; i < this.stars.length; i++) {
        let star = this.stars[i]
        context.fillRect(star.x, star.y, star.size, star.size)
    }

}

module.exports = Space