const Space = require('./space')
const Entity = require('./entity')
const Rectange = require('./rectangle')
const Projectile = require('./projectile')
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

        this.movingLeft = false
        this.movingRight = false
    }
    Player.prototype = Object.create(Entity.prototype)

    Player.prototype.updateDirection = function() {
        var direction = new Vector2d(0, 0)
        if (this.movingLeft) {
            direction = vectorAdd(direction, new Vector2d(-1, 0))
        }
        if (this.movingRight) {
            direction = vectorAdd(direction, new Vector2d(1, 0))
        }
        this.direction = direction
    }

    Player.prototype.moveRight = function(enable) {
        this.movingRight = enable
        this.updateDirection()
    }

    Player.prototype.moveLeft = function(enable) {
        this.movingLeft = enable
        this.updateDirection()
    }

    Player.prototype.fire = function() {
        console.log("Boom")
    }


    Player.prototype.update = function (deltaT) {
        Entity.prototype.update.call(this, deltaT)

        
    }

    function Enemy(position, speed, direction, rank) {
        Entity.call(this, position, speed, direction)

        this.width = 15
        this.height = 10
        this.rank = rank

        this.dropTarget = 0
        this.dropAmount = 1
        this.timer = 0
        this.firePercent = 10
        this.fireWait = Math.random() * 5
    }
    Enemy.prototype = Object.create(Entity.prototype)

    Enemy.prototype.update = function (deltaT) {

        // Edge Collision
        var enemiesLeft = game.enemiesRect().left(),
            enemiesRight = game.enemiesRect().right(),
            edgeMargin = 5,
            gameLeftEdge = game.gameFieldRect().left() + edgeMargin
            gameRightEdge = game.gameFieldRect().right() - edgeMargin

        Entity.prototype.update.call(this, deltaT);

        // Drop if the enemiesrect hits an edge margin
        if ((this.direction.x < 0 && enemiesLeft < gameLeftEdge) ||
            (this.direction.x > 0 && enemiesRight > gameRightEdge)) {
                this.dropTarget += this.dropAmount
        }

        // Determine Direction
        if (this.position.y < this.dropTarget) {
            this.direction = new Vector2d(0, 1)
        } else if (this.direction.y > 0) {
            this.direction = (enemiesRight > gameRightEdge) ? new Vector2d(-1, 0) : new Vector2d(1, 0)
        }

        // Determine Firing Weapon
        var p = vectorAdd(this.position, new Vector2d(0, 5))

        function existsUnderneath(e) {
            var rect = e.collisionRect()
            return p.y <= rect.top() &&
                rect.left() <= p.x && p.x <= rect.right()
        }

        this.timer += deltaT

        if (this.timer > this.fireWait) {
            this.timer = 0
            this.fireWait = 1 + Math.random() * 4

            if (randomInt(100) < this.firePercent && !game.enemies().find(existsUnderneath)) {
                this.fire(p)
            }
        }

    }

    Enemy.prototype.fire = function(position) {
        console.log("enemies boom")
    }

    function randomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function rectUnion(r1, r2) {
        var x, y, width, height

        if (r1 === undefined) {
            return r2
        }

        if (r2 === undefined) {
            return r1
        }

        x = Math.min(r1.x, r2.x)
        y = Math.min(r1.y, r2.y)
        width = Math.max(r1.right(), r2.right()) - Math.min(r1.left(), r2.left())
        height = Math.max(r1.bottom(), r2.bottom()) - Math.min(r1.top(), r2.top())
        let rectange = new Rectange(x, y, width, height)
        return rectange
    }

    
    var renderer = (function() {

        var  _canvas = document.getElementById("gameCanvas"),
            _context = _canvas.getContext("2d"),
            _enemyColors = ["rgb(150, 7, 7)",
                "rgb(150, 89, 7)",
                "rgb(56, 150, 7)",
                "rgb(7, 150, 122)",
                "rgb(46, 7, 150)"],
            _projectileColors = {"player": "rgb(196, 208, 106)"}

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
            _lastFrameTime = 0
            _entities = []
            _enemies = []
            _gameFieldRect = new Rectange(0, 0, 300, 180)
            _enemiesRect = new Rectange(0, 0, 0, 0)
            _enemySpeed = 10
            _enemyFirePercent = 10
            _enemyDropAmount = 1

            this.addEntity(new Player(new Vector2d(100, 175), 90, new Vector2d(0, 0)))

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

        function _update(time) {

            var i, j,
                dt = Math.min((time - _lastFrameTime) / 1000, 3 / 60);

            _lastFrameTime = time;

            // Update Physics
            physics.update(dt);

            // Calculate the bounding rectangle around the enemies
            _enemiesRect = _enemies.reduce(
                function (rect, e) {
                    return rectUnion(rect, e.collisionRect());
                },
                undefined);

            // Update Entities
            for (i = _entities.length - 1; i >= 0; i--) {
                _entities[i].update(dt);
            }

            // Update Enemy Speed
            var speed = _enemySpeed + (_enemySpeed * (1 - (_enemies.length / 50)));
            for (i = _enemies.length - 1; i >= 0; i--) {
                _enemies[i].speed = speed;
            }

            // Create the grid of Enemies if there are 0
            if (_enemies.length === 0) {
                for (i = 0; i < 10; i++) {
                    for (j = 0; j < 5; j++) {
                        var dropTarget = 10 + j * 20,
                            position = new Vector2d(50 + i * 20, dropTarget - 100),
                            direction = new Vector2d(1, 0),
                            rank = 4 - j,
                            enemy = new Enemy(position,
                                _enemySpeed,
                                direction,
                                rank);

                        enemy.dropTarget = dropTarget;
                        enemy.firePercent = _enemyFirePercent;
                        enemy.dropAmount = _enemyDropAmount;

                        this.addEntity(enemy);
                    }
                }

                _enemySpeed += 5;
                _enemyFirePercent += 5;
                _enemyDropAmount += 1;
            }

            // Render the frame
            renderer.render(dt);

            window.requestAnimationFrame(this.update.bind(this));
        }
        return {
            start: _start,
            update: _update,
            addEntity: _addEntity,
            entities: function () { return _entities },
            enemies: function () { return _enemies },
            player: function () { return _player },
            gameFieldRect: function () { return _gameFieldRect },
            enemiesRect: function() { return _enemiesRect }
        }

    })()

    var playerActions = (function() {
        var canvas = document.getElementById("gameCanvas")
        canvas.addEventListener("touchstart", touchStart)
        canvas.addEventListener("touchend", touchEnd)
        canvas.addEventListener("touchcancel", touchEnd)
        var _ongoingActions = []
        
        var keybinds = {
            32: "fire",
            37: "moveLeft",
            39: "moveRight"
        }

        document.body.addEventListener('keydown', keyDown)
        document.body.addEventListener('keyup', keyUp)


        function keyDown(e) {
            var x = e.which || e.keyDown

            if (keybinds[x] !== undefined) {
                e.preventDefault()
                playerActions.startAction(x, keybinds[x])
            }
        }

        function keyUp(e) {
            var x = e.which || e.keyCode

            if (keybinds[x] !== undefined) {
                e.preventDefault()
                playerActions.endAction(x)
            }
        }

        function getRelativeTouchCoords(touch) {
            function getOffSetLeft(elem) {
                var offsetLeft = 0
                do {
                    if (!isNaN(elem.offsetLeft)) {
                        offsetLeft += elem.offsetLeft
                    }
                } while (elem = elem.offsetParent)
                return offsetLeft
            }

            function getOffSetTop(elem) {
                var offSetTop = 0
                do {
                    if (!isNaN(ele.offSetTop)) {
                        offSetTop += elem.offSetTop
                    }
                } while (elem = elem.offsetParent)
                return offSetTop
            }
            var scale = game.gameFieldRect().width / canvas.clientWidth
            var x = touch.pageX - getOffSetLeft(canvas)
            var y = touch.pageY - getOffSetTop(canvas)
            return {
                x: y * scale,
                y: y * scale
            }
        }

        function touchStart(e) {
            var touches = e.chagedTouches,
                touchLocation,
                playerAction

            e.preventDefault()

            for (var i = touches.length - 1; i >= 0; i--) {
                touchLocation = getRelativeTouchCoords(touches[i])

                if (touchLocation.x < game.gameFieldRect().width * (1/5)) {
                    playerAction = "moveLeft"
                } else if (touchLocation.x < game.gameFieldRect().width * (4/5)) {
                    playerAction = "fire"
                } else {
                    playerAction = "moveRight"
                }

                playerAction.startAction(touches[i], identifier, playerAction)
            }
        }

        function touchEnd(e) {
            var touches = e.changedTouches
            e.preventDefault()

            for (var i = touches.length - 1; i >= 0; i--) {
                playerActions.endAction(touches[i], identifier)
            }
        }

        function _startAction(id, playerAction) {
            if (playerAction === undefined) {
                return
            }
            var f,
                acts = {
                    "moveLeft": function () { if (game.player()) game.player().moveLeft(true); },
                    "moveRight": function () { if (game.player()) game.player().moveRight(true); },
                    "fire": function () { if (game.player()) game.player().fire(); }
                };

            if (f = acts[playerAction]) f();

            _ongoingActions.push({
                identifier: id, 
                playerAction: playerAction
            })
        }

        function _endAction(id) {
            var f, 
                acts = {
                    "moveLeft": function () { if (game.player()) game.player().moveLeft(false); },
                    "moveRight": function () { if (game.player()) game.player().moveRight(false); }
                };


                var idx = _ongoingActions.findIndex(function(a) {
                    return a.identifier === id
                })

                if (idx >= 0) {
                    if (f = acts[_ongoingActions[idx].playerAction]) f()
                    _ongoingActions.splice(idx, 1)
                }
        }

        return {
            startAction: _startAction,
            endAction: _endAction
        }
    })()


    game.start()
    
})