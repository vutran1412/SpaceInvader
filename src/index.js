const Space = require('./space')
const { Player, Enemy } = require('./game-entities')



document.addEventListener("DOMContentLoaded", () => {

    var renderer = (function() {
        function _drawEnemy(context, enemy) {
            context.fillStyle = "red"
            context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
        }

        function _drawPlayer(context, player) {
            context.fillStyle = "blue"
            context.fillRect(player.x, player.y, player.width, player.height)
        }

        function _render() {
            var container = document.getElementById("container")
            let space = new Space()
            space.init(container)
            space.createStars()

            var gameContainer = document.getElementById("gameCanvas")
            let context = gameContainer.getContext("2d")

            context.fillStyle = "black"
            
            context.fillRect(0, 0, gameContainer.width, gameContainer.height)


            var i, entity, entities = game.entities()

            for (i = 0; i < entities.length; i++) {
                entity = entities[i]

                if (entity instanceof Enemy) {
                    _drawEnemy(context, entity)
                } else if (entity instanceof Player) {
                    _drawPlayer(context, entity)
                }
            }
        }
        return {
            render: _render
        }
    })()

    var physics = (function() {
        function _update() {
            var i, entities = game.entities()

            for (i = 0; i < entities.length; i++) {
                entities[i].y += entities[i].direction
            }
        }

        return {
            update: _update
        }
    })()

    var game = (function() {
        var _gameFieldHeight = 200
        var _entities = []

        function _start() {
            _entities.push(new Player(100, 175))
            _entities.push(new Enemy(20, 25))
            _entities.push(new Enemy(80, 25))
            _entities.push(new Enemy(160, 25))

            window.requestAnimationFrame(this.update.bind(this))
        }

        function _update() {
            physics.update()

            var i
            for (i = 0; i < _entities.length; i++) {
                _entities[i].update(this)
            }
            renderer.render()

            window.requestAnimationFrame(this.update.bind(this))
        }

        return {
            start: _start,
            update: _update,
            entities: function() { return _entities },
            gameFieldHeight: function() { return _gameFieldHeight },
        }

    })()

    game.start()
    
})