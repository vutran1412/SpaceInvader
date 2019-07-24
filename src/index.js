const Space = require('./space')
const Entity = require('./entity')
let Rectange = require('./rectangle')
const { Vector2d,
    vectorAdd,
    vectorSubtract,
    vectorScalarMultiply,
    vectorNormalize } = require('./vector-math')



document.addEventListener("DOMContentLoaded", () => {

    function Player(position, speed, direction) {
        Entity.call(this, position, speed, direction)

        this.width = 20
        this.height = 10
    }
    Player.prototype = Object.create(Entity.prototype)

    Player.prototype.update = function (deltaT) {
        Entity.prototype.update.call(this, deltaT)

        if (this.collisionRect().top() <= 0 ||
            this.collisionRect().bottom() >= game.gameFieldRect().bottom() ){
            this.direction.y *= -1
        }

    }

    function Enemy(position, speed, direction, rank) {
        Entity.call(this, position, speed, direction)

        this.width = 13
        this.height = 10
        this.rank = rank
    }
    Enemy.prototype = Object.create(Entity.prototype)

    Enemy.prototype.update = function (deltaT) {
        Entity.prototype.update.call(this, deltaT);
        if (this.collisionRect().top() <= 0 ||
            this.collisionRect().bottom() >= game.gameFieldRect().bottom()) {
            this.direction.y *= -1;
        }
    }

    
    var renderer = (function() {

        var  _canvas = document.getElementById("gameCanvas"),
            _context = _canvas.getContext("2d"),
            _enemyColors = ["rgb(150, 7, 7)",
                "rgb(150, 89, 7)",
                "rgb(56, 150, 7)",
                "rgb(7, 150, 122)",
                "rgb(46, 7, 150)"]

        function _drawRectangle(color, entity) {
            _context.fillStyle = color
            _context.fillRect(entity.position.x - entity.width / 2, 
                            entity.position.y - entity.height / 2,
                            entity.width,
                            entity.height)
        }



        function _render() {
            var container = document.getElementById("container")
            let space = new Space()
            space.init(container)
            space.createStars()

            _context.fillStyle = "black"
            _context.fillRect(0, 0, _canvas.width, _canvas.height)


            var i, entity, entities = game.entities()

            for (i = entities.length - 1; i >= 0; i--) {
                entity = entities[i]

                if (entity instanceof Enemy) {
                    _drawRectangle(_enemyColors[entity.rank], entity)
                } else if (entity instanceof Player) {
                    _drawRectangle("rgb(255, 255, 0)", entity)
                }
            }
        }
        return {
            render: _render
        }
    })()

    var physics = (function() {

        function _update(deltaT) {
            var i, 
                e,
                velocity,
                entities = game.entities()

            for ( i = entities.length - 1; i >= 0; i--) {
                e = entities[i]
                velocity = vectorScalarMultiply(e.direction, e.speed)

                e.position = vectorAdd(e.position, vectorScalarMultiply(velocity, deltaT))
            }
        }

        return {
            update: _update
        }
    })()

    var game = (function () {
        var _entities,
            _enemies,
            _player,
            _gameFieldRect,
            _started = false

        function _start() {
            _entities = []
            _enemies = []
            _gameFieldRect = new Rectange(0, 0, 300, 200)

            this.addEntity(new Player(new Vector2d(100, 175), 25, new Vector2d(0, -1)));
            this.addEntity(new Enemy(new Vector2d(20, 25), 20, new Vector2d(0, 1), 0));
            this.addEntity(new Enemy(new Vector2d(50, 25), 10, new Vector2d(0, 1), 1));
            this.addEntity(new Enemy(new Vector2d(80, 25), 15, new Vector2d(0, 1), 2));
            this.addEntity(new Enemy(new Vector2d(120, 25), 25, new Vector2d(0, 1), 3));
            this.addEntity(new Enemy(new Vector2d(140, 25), 30, new Vector2d(0, 1), 4));

            if (!_started) {
                window.requestAnimationFrame(this.update.bind(this))
                _started = true
            }

        }

        function _addEntity(entity) {
            _entities.push(entity)

            if (entity instanceof Player) {
                _player = entity
            }

            if (entity instanceof Enemy) {
                _enemies.push(entity)
            }
        }

        function _removeEntities(entities) {
            if (!entities) return

            function isNotInEntities(item) {
                return !entities.includes(item)
            }

            _entities = _entities.filter(isNotInEntities)
            _enemies = _enemies.filter(isNotInEntities)

            if (entities.includes(_player)) {
                _player = undefined
            }
        }

        function _update() {
            var deltaT = 1 / 60
            physics.update(deltaT)

            var i
            for (i = _entities.length - 1; i >= 0; i--) {
                _entities[i].update(deltaT)
            }

            renderer.render(deltaT)

            window.requestAnimationFrame(this.update.bind(this))
        }

        return {
            start: _start,
            update: _update,
            addEntity: _addEntity,
            entities: function () { return _entities },
            enemies: function () { return _enemies },
            player: function () { return _player },
            gameFieldRect: function () { return _gameFieldRect }
        }

    })()


    game.start()
    
})