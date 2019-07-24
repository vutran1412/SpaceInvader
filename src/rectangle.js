function Rectangle(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
}

Rectangle.prototype.left = function() {
    return this.x
}

Rectangle.prototype.right = function() {
    return this.x + this.width
}

Rectangle.prototype.top = function() {
    return this.y
}

Rectangle.prototype.bottom = function() {
    return this.y + this.height
}

Rectangle.prototype.intersects = function(r2) {
    return (this.right() >= r2.left() && this.left() <= r2.right()) && 
    this.top() <= r2.bottom() && this.bottom >= r2.top()
} 



module.exports = Rectangle