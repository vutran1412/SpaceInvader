let Space = require('./space')

document.addEventListener('DOMContentLoaded', () => {
    let container = document.getElementById('container')
    let space = new Space()
    space.init(container)
    space.createStars()    

})