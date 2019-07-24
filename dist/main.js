/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/entity.js":
/*!***********************!*\
  !*** ./src/entity.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Rectangle = __webpack_require__(/*! ./rectangle */ "./src/rectangle.js");

function Entity(position, speed, direction) {
  this.position = position;
  this.speed = speed;
  this.direction = direction;
  this.time = 0;
  this.width = 5;
  this.height = 5;
  this.hp = 1;
}

Entity.prototype.update = function (deltaT) {
  this.time += deltaT;
};

Entity.prototype.collisionRect = function () {
  return new Rectangle(this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
};

module.exports = Entity;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Space = __webpack_require__(/*! ./space */ "./src/space.js");

var Entity = __webpack_require__(/*! ./entity */ "./src/entity.js");

var Rectange = __webpack_require__(/*! ./rectangle */ "./src/rectangle.js");

var Projectile = __webpack_require__(/*! ./projectile */ "./src/projectile.js");

var _require = __webpack_require__(/*! ./vector-math */ "./src/vector-math.js"),
    Vector2d = _require.Vector2d,
    vectorAdd = _require.vectorAdd,
    vectorSubtract = _require.vectorSubtract,
    vectorScalarMultiply = _require.vectorScalarMultiply,
    vectorNormalize = _require.vectorNormalize;

document.addEventListener("DOMContentLoaded", function () {
  function Player(position, speed, direction) {
    Entity.call(this, position, speed, direction);
    this.width = 20;
    this.height = 10;
    this.movingLeft = false;
    this.movingRight = false;
  }

  Player.prototype = Object.create(Entity.prototype);

  Player.prototype.updateDirection = function () {
    var direction = new Vector2d(0, 0);

    if (this.movingLeft) {
      direction = vectorAdd(direction, new Vector2d(-1, 0));
    }

    if (this.movingRight) {
      direction = vectorAdd(direction, new Vector2d(1, 0));
    }

    this.direction = direction;
  };

  Player.prototype.moveRight = function (enable) {
    this.movingRight = enable;
    this.updateDirection();
  };

  Player.prototype.moveLeft = function (enable) {
    this.movingLeft = enable;
    this.updateDirection();
  };

  Player.prototype.fire = function () {
    console.log("Boom");
  };

  Player.prototype.update = function (deltaT) {
    Entity.prototype.update.call(this, deltaT);
  };

  function Enemy(position, speed, direction, rank) {
    Entity.call(this, position, speed, direction);
    this.width = 15;
    this.height = 10;
    this.rank = rank;
    this.dropTarget = 0;
    this.dropAmount = 1;
    this.timer = 0;
    this.firePercent = 10;
    this.fireWait = Math.random() * 5;
  }

  Enemy.prototype = Object.create(Entity.prototype);

  Enemy.prototype.update = function (deltaT) {
    // Edge Collision
    var enemiesLeft = game.enemiesRect().left(),
        enemiesRight = game.enemiesRect().right(),
        edgeMargin = 5,
        gameLeftEdge = game.gameFieldRect().left() + edgeMargin;
    gameRightEdge = game.gameFieldRect().right() - edgeMargin;
    Entity.prototype.update.call(this, deltaT); // Drop if the enemiesrect hits an edge margin

    if (this.direction.x < 0 && enemiesLeft < gameLeftEdge || this.direction.x > 0 && enemiesRight > gameRightEdge) {
      this.dropTarget += this.dropAmount;
    } // Determine Direction


    if (this.position.y < this.dropTarget) {
      this.direction = new Vector2d(0, 1);
    } else if (this.direction.y > 0) {
      this.direction = enemiesRight > gameRightEdge ? new Vector2d(-1, 0) : new Vector2d(1, 0);
    } // Determine Firing Weapon


    var p = vectorAdd(this.position, new Vector2d(0, 5));

    function existsUnderneath(e) {
      var rect = e.collisionRect();
      return p.y <= rect.top() && rect.left() <= p.x && p.x <= rect.right();
    }

    this.timer += deltaT;

    if (this.timer > this.fireWait) {
      this.timer = 0;
      this.fireWait = 1 + Math.random() * 4;

      if (randomInt(100) < this.firePercent && !game.enemies().find(existsUnderneath)) {
        this.fire(p);
      }
    }
  };

  Enemy.prototype.fire = function (position) {
    console.log("enemies boom");
  };

  function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function rectUnion(r1, r2) {
    var x, y, width, height;

    if (r1 === undefined) {
      return r2;
    }

    if (r2 === undefined) {
      return r1;
    }

    x = Math.min(r1.x, r2.x);
    y = Math.min(r1.y, r2.y);
    width = Math.max(r1.right(), r2.right()) - Math.min(r1.left(), r2.left());
    height = Math.max(r1.bottom(), r2.bottom()) - Math.min(r1.top(), r2.top());
    var rectange = new Rectange(x, y, width, height);
    return rectange;
  }

  var renderer = function () {
    var _canvas = document.getElementById("gameCanvas"),
        _context = _canvas.getContext("2d"),
        _enemyColors = ["rgb(150, 7, 7)", "rgb(150, 89, 7)", "rgb(56, 150, 7)", "rgb(7, 150, 122)", "rgb(46, 7, 150)"],
        _projectileColors = {
      "player": "rgb(196, 208, 106)"
    };

    function _drawRectangle(color, entity) {
      _context.fillStyle = color;

      _context.fillRect(entity.position.x - entity.width / 2, entity.position.y - entity.height / 2, entity.width, entity.height);
    }

    function _render() {
      var container = document.getElementById("container");
      var space = new Space();
      space.init(container);
      space.createStars();
      _context.fillStyle = "black";

      _context.fillRect(0, 0, _canvas.width, _canvas.height);

      var i,
          entity,
          entities = game.entities();

      for (i = entities.length - 1; i >= 0; i--) {
        entity = entities[i];

        if (entity instanceof Enemy) {
          _drawRectangle(_enemyColors[entity.rank], entity);
        } else if (entity instanceof Player) {
          _drawRectangle("rgb(255, 255, 0)", entity);
        }
      }
    }

    return {
      render: _render
    };
  }();

  var physics = function () {
    function _update(deltaT) {
      var i,
          e,
          velocity,
          entities = game.entities();

      for (i = entities.length - 1; i >= 0; i--) {
        e = entities[i];
        velocity = vectorScalarMultiply(e.direction, e.speed);
        e.position = vectorAdd(e.position, vectorScalarMultiply(velocity, deltaT));
      }
    }

    return {
      update: _update
    };
  }();

  var game = function () {
    var _entities,
        _enemies,
        _player,
        _gameFieldRect,
        _started = false;

    function _start() {
      _lastFrameTime = 0;
      _entities = [];
      _enemies = [];
      _gameFieldRect = new Rectange(0, 0, 300, 180);
      _enemiesRect = new Rectange(0, 0, 0, 0);
      _enemySpeed = 10;
      _enemyFirePercent = 10;
      _enemyDropAmount = 1;
      this.addEntity(new Player(new Vector2d(100, 175), 90, new Vector2d(0, 0)));

      if (!_started) {
        window.requestAnimationFrame(this.update.bind(this));
        _started = true;
      }
    }

    function _addEntity(entity) {
      _entities.push(entity);

      if (entity instanceof Player) {
        _player = entity;
      }

      if (entity instanceof Enemy) {
        _enemies.push(entity);
      }
    }

    function _removeEntities(entities) {
      if (!entities) return;

      function isNotInEntities(item) {
        return !entities.includes(item);
      }

      _entities = _entities.filter(isNotInEntities);
      _enemies = _enemies.filter(isNotInEntities);

      if (entities.includes(_player)) {
        _player = undefined;
      }
    }

    function _update(time) {
      var i,
          j,
          dt = Math.min((time - _lastFrameTime) / 1000, 3 / 60);
      _lastFrameTime = time; // Update Physics

      physics.update(dt); // Calculate the bounding rectangle around the enemies

      _enemiesRect = _enemies.reduce(function (rect, e) {
        return rectUnion(rect, e.collisionRect());
      }, undefined); // Update Entities

      for (i = _entities.length - 1; i >= 0; i--) {
        _entities[i].update(dt);
      } // Update Enemy Speed


      var speed = _enemySpeed + _enemySpeed * (1 - _enemies.length / 50);

      for (i = _enemies.length - 1; i >= 0; i--) {
        _enemies[i].speed = speed;
      } // Create the grid of Enemies if there are 0


      if (_enemies.length === 0) {
        for (i = 0; i < 10; i++) {
          for (j = 0; j < 5; j++) {
            var dropTarget = 10 + j * 20,
                position = new Vector2d(50 + i * 20, dropTarget - 100),
                direction = new Vector2d(1, 0),
                rank = 4 - j,
                enemy = new Enemy(position, _enemySpeed, direction, rank);
            enemy.dropTarget = dropTarget;
            enemy.firePercent = _enemyFirePercent;
            enemy.dropAmount = _enemyDropAmount;
            this.addEntity(enemy);
          }
        }

        _enemySpeed += 5;
        _enemyFirePercent += 5;
        _enemyDropAmount += 1;
      } // Render the frame


      renderer.render(dt);
      window.requestAnimationFrame(this.update.bind(this));
    }

    return {
      start: _start,
      update: _update,
      addEntity: _addEntity,
      entities: function entities() {
        return _entities;
      },
      enemies: function enemies() {
        return _enemies;
      },
      player: function player() {
        return _player;
      },
      gameFieldRect: function gameFieldRect() {
        return _gameFieldRect;
      },
      enemiesRect: function enemiesRect() {
        return _enemiesRect;
      }
    };
  }();

  var playerActions = function () {
    var canvas = document.getElementById("gameCanvas");
    canvas.addEventListener("touchstart", touchStart);
    canvas.addEventListener("touchend", touchEnd);
    canvas.addEventListener("touchcancel", touchEnd);
    var _ongoingActions = [];
    var keybinds = {
      32: "fire",
      37: "moveLeft",
      39: "moveRight"
    };
    document.body.addEventListener('keydown', keyDown);
    document.body.addEventListener('keyup', keyUp);

    function keyDown(e) {
      var x = e.which || e.keyDown;

      if (keybinds[x] !== undefined) {
        e.preventDefault();
        playerActions.startAction(x, keybinds[x]);
      }
    }

    function keyUp(e) {
      var x = e.which || e.keyCode;

      if (keybinds[x] !== undefined) {
        e.preventDefault();
        playerActions.endAction(x);
      }
    }

    function getRelativeTouchCoords(touch) {
      function getOffSetLeft(elem) {
        var offsetLeft = 0;

        do {
          if (!isNaN(elem.offsetLeft)) {
            offsetLeft += elem.offsetLeft;
          }
        } while (elem = elem.offsetParent);

        return offsetLeft;
      }

      function getOffSetTop(elem) {
        var offSetTop = 0;

        do {
          if (!isNaN(ele.offSetTop)) {
            offSetTop += elem.offSetTop;
          }
        } while (elem = elem.offsetParent);

        return offSetTop;
      }

      var scale = game.gameFieldRect().width / canvas.clientWidth;
      var x = touch.pageX - getOffSetLeft(canvas);
      var y = touch.pageY - getOffSetTop(canvas);
      return {
        x: y * scale,
        y: y * scale
      };
    }

    function touchStart(e) {
      var touches = e.chagedTouches,
          touchLocation,
          playerAction;
      e.preventDefault();

      for (var i = touches.length - 1; i >= 0; i--) {
        touchLocation = getRelativeTouchCoords(touches[i]);

        if (touchLocation.x < game.gameFieldRect().width * (1 / 5)) {
          playerAction = "moveLeft";
        } else if (touchLocation.x < game.gameFieldRect().width * (4 / 5)) {
          playerAction = "fire";
        } else {
          playerAction = "moveRight";
        }

        playerAction.startAction(touches[i], identifier, playerAction);
      }
    }

    function touchEnd(e) {
      var touches = e.changedTouches;
      e.preventDefault();

      for (var i = touches.length - 1; i >= 0; i--) {
        playerActions.endAction(touches[i], identifier);
      }
    }

    function _startAction(id, playerAction) {
      if (playerAction === undefined) {
        return;
      }

      var f,
          acts = {
        "moveLeft": function moveLeft() {
          if (game.player()) game.player().moveLeft(true);
        },
        "moveRight": function moveRight() {
          if (game.player()) game.player().moveRight(true);
        },
        "fire": function fire() {
          if (game.player()) game.player().fire();
        }
      };
      if (f = acts[playerAction]) f();

      _ongoingActions.push({
        identifier: id,
        playerAction: playerAction
      });
    }

    function _endAction(id) {
      var f,
          acts = {
        "moveLeft": function moveLeft() {
          if (game.player()) game.player().moveLeft(false);
        },
        "moveRight": function moveRight() {
          if (game.player()) game.player().moveRight(false);
        }
      };

      var idx = _ongoingActions.findIndex(function (a) {
        return a.identifier === id;
      });

      if (idx >= 0) {
        if (f = acts[_ongoingActions[idx].playerAction]) f();

        _ongoingActions.splice(idx, 1);
      }
    }

    return {
      startAction: _startAction,
      endAction: _endAction
    };
  }();

  game.start();
});

/***/ }),

/***/ "./src/projectile.js":
/*!***************************!*\
  !*** ./src/projectile.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Entity = __webpack_require__(/*! ./entity */ "./src/entity.js");

function Projectile(position, speed, direction, type) {
  Entity.call(this, position, speed, direction);
  this.width = 1;
  this.height = 5;
  this.type = type;
}

Projectile.prototype = Object.create(Entity.prototype);
module.exports = Projectile;

/***/ }),

/***/ "./src/rectangle.js":
/*!**************************!*\
  !*** ./src/rectangle.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

function Rectangle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Rectangle.prototype.left = function () {
  return this.x;
};

Rectangle.prototype.right = function () {
  return this.x + this.width;
};

Rectangle.prototype.top = function () {
  return this.y;
};

Rectangle.prototype.bottom = function () {
  return this.y + this.height;
};

Rectangle.prototype.intersects = function (r2) {
  return this.right() >= r2.left() && this.left() <= r2.right() && this.top() <= r2.bottom() && this.bottom >= r2.top();
};

module.exports = Rectangle;

/***/ }),

/***/ "./src/space.js":
/*!**********************!*\
  !*** ./src/space.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Star = __webpack_require__(/*! ./star */ "./src/star.js");

function Space() {
  this.fps = 30;
  this.canvas = null;
  this.width = 1000;
  this.height = 0;
  this.minVelocity = 35;
  this.maxVelocity = 50;
  this.stars = 200;
  this.intervalId = 0;
}

Space.prototype.createStars = function () {
  var stars = [];

  for (var i = 0; i < this.stars; i++) {
    stars[i] = new Star(Math.random() * this.width, Math.random() * this.height, Math.random() * 3 + 1, Math.random() * (this.maxVelocity - this.minVelocity) + this.minVelocity);
  }

  this.stars = stars;
};

Space.prototype.update = function () {
  var deltaT = 1 / this.fps;

  for (var i = 0; i < this.stars.length; i++) {
    var star = this.stars[i];
    star.y += deltaT * star.velocity;

    if (star.y > this.height) {
      this.stars[i] = new Star(Math.random() * this.width, 0, Math.random() * 3 + 1, Math.random() * (this.maxVelocity - this.minVelocity) + this.minVelocity);
    }
  }
};

Space.prototype.init = function (div) {
  var self = this;
  this.intervalId = setInterval(function () {
    self.update();
    self.draw();
  }, 1000 / this.fps);
  this.containerDiv = div;
  self.width = window.innerWidth;
  self.height = window.innerHeight;
  window.addEventListener('resize', function resize(event) {
    self.width = window.innerWidth;
    self.height = window.innerHeight;
    self.canvas.width = self.width;
    self.canvas.height = self.height;
    self.draw();
  });
  var canvas = document.createElement('canvas');
  div.appendChild(canvas);
  this.canvas = canvas;
  this.canvas.width = this.width;
  this.canvas.height = this.height;
};

Space.prototype.draw = function () {
  var context = this.canvas.getContext("2d");
  context.fillStyle = '#000000';
  context.fillRect(0, 0, this.width, this.height);
  context.fillStyle = '#add6ff';

  for (var i = 0; i < this.stars.length; i++) {
    var star = this.stars[i];
    context.fillRect(star.x, star.y, star.size, star.size);
  }
};

module.exports = Space;

/***/ }),

/***/ "./src/star.js":
/*!*********************!*\
  !*** ./src/star.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

function Star(x, y, size, velocity) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.velocity = velocity;
}

module.exports = Star;

/***/ }),

/***/ "./src/vector-math.js":
/*!****************************!*\
  !*** ./src/vector-math.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var Vector2d = function Vector2d(x, y) {
  this.x = x;
  this.y = y;
};

function vectorAdd(v1, v2) {
  return new Vector2d(v1.x + v2.x, v1.y + v2.y);
}

function vectorSubtract(v1, v2) {
  return new Vector2d(v1.x - v2.x, v1.y - v1.y);
}

function vectorScalarMultiply(v1, s) {
  return new Vector2d(v1.x * s, v1.y * s);
}

function vectorLength(v) {
  return Math.sqrt(v.x * v.x, v.y * v.y);
}

function vectorNormalize(v) {
  var reciprocal = 1.0 / (vectorLength(v) + 1.0e-037);
  return vectorScalarMultiply(v, reciprocal);
}

module.exports = {
  Vector2d: Vector2d,
  vectorAdd: vectorAdd,
  vectorSubtract: vectorSubtract,
  vectorScalarMultiply: vectorScalarMultiply,
  vectorNormalize: vectorNormalize
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2plY3RpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlY3RhbmdsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3BhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZlY3Rvci1tYXRoLmpzIl0sIm5hbWVzIjpbIlJlY3RhbmdsZSIsInJlcXVpcmUiLCJFbnRpdHkiLCJwb3NpdGlvbiIsInNwZWVkIiwiZGlyZWN0aW9uIiwidGltZSIsIndpZHRoIiwiaGVpZ2h0IiwiaHAiLCJwcm90b3R5cGUiLCJ1cGRhdGUiLCJkZWx0YVQiLCJjb2xsaXNpb25SZWN0IiwieCIsInkiLCJtb2R1bGUiLCJleHBvcnRzIiwiU3BhY2UiLCJSZWN0YW5nZSIsIlByb2plY3RpbGUiLCJWZWN0b3IyZCIsInZlY3RvckFkZCIsInZlY3RvclN1YnRyYWN0IiwidmVjdG9yU2NhbGFyTXVsdGlwbHkiLCJ2ZWN0b3JOb3JtYWxpemUiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJQbGF5ZXIiLCJjYWxsIiwibW92aW5nTGVmdCIsIm1vdmluZ1JpZ2h0IiwiT2JqZWN0IiwiY3JlYXRlIiwidXBkYXRlRGlyZWN0aW9uIiwibW92ZVJpZ2h0IiwiZW5hYmxlIiwibW92ZUxlZnQiLCJmaXJlIiwiY29uc29sZSIsImxvZyIsIkVuZW15IiwicmFuayIsImRyb3BUYXJnZXQiLCJkcm9wQW1vdW50IiwidGltZXIiLCJmaXJlUGVyY2VudCIsImZpcmVXYWl0IiwiTWF0aCIsInJhbmRvbSIsImVuZW1pZXNMZWZ0IiwiZ2FtZSIsImVuZW1pZXNSZWN0IiwibGVmdCIsImVuZW1pZXNSaWdodCIsInJpZ2h0IiwiZWRnZU1hcmdpbiIsImdhbWVMZWZ0RWRnZSIsImdhbWVGaWVsZFJlY3QiLCJnYW1lUmlnaHRFZGdlIiwicCIsImV4aXN0c1VuZGVybmVhdGgiLCJlIiwicmVjdCIsInRvcCIsInJhbmRvbUludCIsImVuZW1pZXMiLCJmaW5kIiwibWF4IiwiZmxvb3IiLCJyZWN0VW5pb24iLCJyMSIsInIyIiwidW5kZWZpbmVkIiwibWluIiwiYm90dG9tIiwicmVjdGFuZ2UiLCJyZW5kZXJlciIsIl9jYW52YXMiLCJnZXRFbGVtZW50QnlJZCIsIl9jb250ZXh0IiwiZ2V0Q29udGV4dCIsIl9lbmVteUNvbG9ycyIsIl9wcm9qZWN0aWxlQ29sb3JzIiwiX2RyYXdSZWN0YW5nbGUiLCJjb2xvciIsImVudGl0eSIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiX3JlbmRlciIsImNvbnRhaW5lciIsInNwYWNlIiwiaW5pdCIsImNyZWF0ZVN0YXJzIiwiaSIsImVudGl0aWVzIiwibGVuZ3RoIiwicmVuZGVyIiwicGh5c2ljcyIsIl91cGRhdGUiLCJ2ZWxvY2l0eSIsIl9lbnRpdGllcyIsIl9lbmVtaWVzIiwiX3BsYXllciIsIl9nYW1lRmllbGRSZWN0IiwiX3N0YXJ0ZWQiLCJfc3RhcnQiLCJfbGFzdEZyYW1lVGltZSIsIl9lbmVtaWVzUmVjdCIsIl9lbmVteVNwZWVkIiwiX2VuZW15RmlyZVBlcmNlbnQiLCJfZW5lbXlEcm9wQW1vdW50IiwiYWRkRW50aXR5Iiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYmluZCIsIl9hZGRFbnRpdHkiLCJwdXNoIiwiX3JlbW92ZUVudGl0aWVzIiwiaXNOb3RJbkVudGl0aWVzIiwiaXRlbSIsImluY2x1ZGVzIiwiZmlsdGVyIiwiaiIsImR0IiwicmVkdWNlIiwiZW5lbXkiLCJzdGFydCIsInBsYXllciIsInBsYXllckFjdGlvbnMiLCJjYW52YXMiLCJ0b3VjaFN0YXJ0IiwidG91Y2hFbmQiLCJfb25nb2luZ0FjdGlvbnMiLCJrZXliaW5kcyIsImJvZHkiLCJrZXlEb3duIiwia2V5VXAiLCJ3aGljaCIsInByZXZlbnREZWZhdWx0Iiwic3RhcnRBY3Rpb24iLCJrZXlDb2RlIiwiZW5kQWN0aW9uIiwiZ2V0UmVsYXRpdmVUb3VjaENvb3JkcyIsInRvdWNoIiwiZ2V0T2ZmU2V0TGVmdCIsImVsZW0iLCJvZmZzZXRMZWZ0IiwiaXNOYU4iLCJvZmZzZXRQYXJlbnQiLCJnZXRPZmZTZXRUb3AiLCJvZmZTZXRUb3AiLCJlbGUiLCJzY2FsZSIsImNsaWVudFdpZHRoIiwicGFnZVgiLCJwYWdlWSIsInRvdWNoZXMiLCJjaGFnZWRUb3VjaGVzIiwidG91Y2hMb2NhdGlvbiIsInBsYXllckFjdGlvbiIsImlkZW50aWZpZXIiLCJjaGFuZ2VkVG91Y2hlcyIsIl9zdGFydEFjdGlvbiIsImlkIiwiZiIsImFjdHMiLCJfZW5kQWN0aW9uIiwiaWR4IiwiZmluZEluZGV4IiwiYSIsInNwbGljZSIsInR5cGUiLCJpbnRlcnNlY3RzIiwiU3RhciIsImZwcyIsIm1pblZlbG9jaXR5IiwibWF4VmVsb2NpdHkiLCJzdGFycyIsImludGVydmFsSWQiLCJzdGFyIiwiZGl2Iiwic2VsZiIsInNldEludGVydmFsIiwiZHJhdyIsImNvbnRhaW5lckRpdiIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInJlc2l6ZSIsImV2ZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY29udGV4dCIsInNpemUiLCJ2MSIsInYyIiwicyIsInZlY3Rvckxlbmd0aCIsInYiLCJzcXJ0IiwicmVjaXByb2NhbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztB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QUFFRCxTQUFTUSxjQUFULENBQXdCMkssRUFBeEIsRUFBNEJDLEVBQTVCLEVBQWdDO0FBQzVCLFNBQU8sSUFBSTlLLFFBQUosQ0FBYTZLLEVBQUUsQ0FBQ3BMLENBQUgsR0FBT3FMLEVBQUUsQ0FBQ3JMLENBQXZCLEVBQTBCb0wsRUFBRSxDQUFDbkwsQ0FBSCxHQUFPbUwsRUFBRSxDQUFDbkwsQ0FBcEMsQ0FBUDtBQUNIOztBQUVELFNBQVNTLG9CQUFULENBQThCMEssRUFBOUIsRUFBa0NFLENBQWxDLEVBQXFDO0FBQ2pDLFNBQU8sSUFBSS9LLFFBQUosQ0FBYTZLLEVBQUUsQ0FBQ3BMLENBQUgsR0FBT3NMLENBQXBCLEVBQXVCRixFQUFFLENBQUNuTCxDQUFILEdBQU9xTCxDQUE5QixDQUFQO0FBQ0g7O0FBRUQsU0FBU0MsWUFBVCxDQUFzQkMsQ0FBdEIsRUFBeUI7QUFDckIsU0FBT3RKLElBQUksQ0FBQ3VKLElBQUwsQ0FBVUQsQ0FBQyxDQUFDeEwsQ0FBRixHQUFNd0wsQ0FBQyxDQUFDeEwsQ0FBbEIsRUFBcUJ3TCxDQUFDLENBQUN2TCxDQUFGLEdBQU11TCxDQUFDLENBQUN2TCxDQUE3QixDQUFQO0FBQ0g7O0FBRUQsU0FBU1UsZUFBVCxDQUF5QjZLLENBQXpCLEVBQTRCO0FBQ3hCLE1BQUlFLFVBQVUsR0FBRyxPQUFPSCxZQUFZLENBQUNDLENBQUQsQ0FBWixHQUFrQixRQUF6QixDQUFqQjtBQUNBLFNBQU85SyxvQkFBb0IsQ0FBQzhLLENBQUQsRUFBSUUsVUFBSixDQUEzQjtBQUNIOztBQUVEeEwsTUFBTSxDQUFDQyxPQUFQLEdBQWdCO0FBQ1pJLFVBQVEsRUFBUkEsUUFEWTtBQUVaQyxXQUFTLEVBQVRBLFNBRlk7QUFHWkMsZ0JBQWMsRUFBZEEsY0FIWTtBQUlaQyxzQkFBb0IsRUFBcEJBLG9CQUpZO0FBS1pDLGlCQUFlLEVBQWZBO0FBTFksQ0FBaEIsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJjb25zdCBSZWN0YW5nbGUgPSByZXF1aXJlKCcuL3JlY3RhbmdsZScpXG5cbmZ1bmN0aW9uIEVudGl0eShwb3NpdGlvbiwgc3BlZWQsIGRpcmVjdGlvbikge1xuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvblxuICAgIHRoaXMuc3BlZWQgPSBzcGVlZFxuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uXG4gICAgdGhpcy50aW1lID0gMFxuICAgIHRoaXMud2lkdGggPSA1XG4gICAgdGhpcy5oZWlnaHQgPSA1XG4gICAgdGhpcy5ocCA9IDFcbn1cblxuRW50aXR5LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihkZWx0YVQpIHtcbiAgICB0aGlzLnRpbWUgKz0gZGVsdGFUXG59XG5cbkVudGl0eS5wcm90b3R5cGUuY29sbGlzaW9uUmVjdCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHRoaXMucG9zaXRpb24ueCAtIHRoaXMud2lkdGggLyAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55IC0gdGhpcy5oZWlnaHQgLyAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVudGl0eSIsImNvbnN0IFNwYWNlID0gcmVxdWlyZSgnLi9zcGFjZScpXG5jb25zdCBFbnRpdHkgPSByZXF1aXJlKCcuL2VudGl0eScpXG5jb25zdCBSZWN0YW5nZSA9IHJlcXVpcmUoJy4vcmVjdGFuZ2xlJylcbmNvbnN0IFByb2plY3RpbGUgPSByZXF1aXJlKCcuL3Byb2plY3RpbGUnKVxuY29uc3QgeyBWZWN0b3IyZCxcbiAgICB2ZWN0b3JBZGQsXG4gICAgdmVjdG9yU3VidHJhY3QsXG4gICAgdmVjdG9yU2NhbGFyTXVsdGlwbHksXG4gICAgdmVjdG9yTm9ybWFsaXplIH0gPSByZXF1aXJlKCcuL3ZlY3Rvci1tYXRoJylcblxuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxuICAgIGZ1bmN0aW9uIFBsYXllcihwb3NpdGlvbiwgc3BlZWQsIGRpcmVjdGlvbikge1xuICAgICAgICBFbnRpdHkuY2FsbCh0aGlzLCBwb3NpdGlvbiwgc3BlZWQsIGRpcmVjdGlvbilcblxuICAgICAgICB0aGlzLndpZHRoID0gMjBcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAxMFxuXG4gICAgICAgIHRoaXMubW92aW5nTGVmdCA9IGZhbHNlXG4gICAgICAgIHRoaXMubW92aW5nUmlnaHQgPSBmYWxzZVxuICAgIH1cbiAgICBQbGF5ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFbnRpdHkucHJvdG90eXBlKVxuXG4gICAgUGxheWVyLnByb3RvdHlwZS51cGRhdGVEaXJlY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IG5ldyBWZWN0b3IyZCgwLCAwKVxuICAgICAgICBpZiAodGhpcy5tb3ZpbmdMZWZ0KSB7XG4gICAgICAgICAgICBkaXJlY3Rpb24gPSB2ZWN0b3JBZGQoZGlyZWN0aW9uLCBuZXcgVmVjdG9yMmQoLTEsIDApKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm1vdmluZ1JpZ2h0KSB7XG4gICAgICAgICAgICBkaXJlY3Rpb24gPSB2ZWN0b3JBZGQoZGlyZWN0aW9uLCBuZXcgVmVjdG9yMmQoMSwgMCkpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb25cbiAgICB9XG5cbiAgICBQbGF5ZXIucHJvdG90eXBlLm1vdmVSaWdodCA9IGZ1bmN0aW9uKGVuYWJsZSkge1xuICAgICAgICB0aGlzLm1vdmluZ1JpZ2h0ID0gZW5hYmxlXG4gICAgICAgIHRoaXMudXBkYXRlRGlyZWN0aW9uKClcbiAgICB9XG5cbiAgICBQbGF5ZXIucHJvdG90eXBlLm1vdmVMZWZ0ID0gZnVuY3Rpb24oZW5hYmxlKSB7XG4gICAgICAgIHRoaXMubW92aW5nTGVmdCA9IGVuYWJsZVxuICAgICAgICB0aGlzLnVwZGF0ZURpcmVjdGlvbigpXG4gICAgfVxuXG4gICAgUGxheWVyLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQm9vbVwiKVxuICAgIH1cblxuXG4gICAgUGxheWVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZGVsdGFUKSB7XG4gICAgICAgIEVudGl0eS5wcm90b3R5cGUudXBkYXRlLmNhbGwodGhpcywgZGVsdGFUKVxuXG4gICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIEVuZW15KHBvc2l0aW9uLCBzcGVlZCwgZGlyZWN0aW9uLCByYW5rKSB7XG4gICAgICAgIEVudGl0eS5jYWxsKHRoaXMsIHBvc2l0aW9uLCBzcGVlZCwgZGlyZWN0aW9uKVxuXG4gICAgICAgIHRoaXMud2lkdGggPSAxNVxuICAgICAgICB0aGlzLmhlaWdodCA9IDEwXG4gICAgICAgIHRoaXMucmFuayA9IHJhbmtcblxuICAgICAgICB0aGlzLmRyb3BUYXJnZXQgPSAwXG4gICAgICAgIHRoaXMuZHJvcEFtb3VudCA9IDFcbiAgICAgICAgdGhpcy50aW1lciA9IDBcbiAgICAgICAgdGhpcy5maXJlUGVyY2VudCA9IDEwXG4gICAgICAgIHRoaXMuZmlyZVdhaXQgPSBNYXRoLnJhbmRvbSgpICogNVxuICAgIH1cbiAgICBFbmVteS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVudGl0eS5wcm90b3R5cGUpXG5cbiAgICBFbmVteS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRlbHRhVCkge1xuXG4gICAgICAgIC8vIEVkZ2UgQ29sbGlzaW9uXG4gICAgICAgIHZhciBlbmVtaWVzTGVmdCA9IGdhbWUuZW5lbWllc1JlY3QoKS5sZWZ0KCksXG4gICAgICAgICAgICBlbmVtaWVzUmlnaHQgPSBnYW1lLmVuZW1pZXNSZWN0KCkucmlnaHQoKSxcbiAgICAgICAgICAgIGVkZ2VNYXJnaW4gPSA1LFxuICAgICAgICAgICAgZ2FtZUxlZnRFZGdlID0gZ2FtZS5nYW1lRmllbGRSZWN0KCkubGVmdCgpICsgZWRnZU1hcmdpblxuICAgICAgICAgICAgZ2FtZVJpZ2h0RWRnZSA9IGdhbWUuZ2FtZUZpZWxkUmVjdCgpLnJpZ2h0KCkgLSBlZGdlTWFyZ2luXG5cbiAgICAgICAgRW50aXR5LnByb3RvdHlwZS51cGRhdGUuY2FsbCh0aGlzLCBkZWx0YVQpO1xuXG4gICAgICAgIC8vIERyb3AgaWYgdGhlIGVuZW1pZXNyZWN0IGhpdHMgYW4gZWRnZSBtYXJnaW5cbiAgICAgICAgaWYgKCh0aGlzLmRpcmVjdGlvbi54IDwgMCAmJiBlbmVtaWVzTGVmdCA8IGdhbWVMZWZ0RWRnZSkgfHxcbiAgICAgICAgICAgICh0aGlzLmRpcmVjdGlvbi54ID4gMCAmJiBlbmVtaWVzUmlnaHQgPiBnYW1lUmlnaHRFZGdlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJvcFRhcmdldCArPSB0aGlzLmRyb3BBbW91bnRcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERldGVybWluZSBEaXJlY3Rpb25cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueSA8IHRoaXMuZHJvcFRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBuZXcgVmVjdG9yMmQoMCwgMSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbi55ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAoZW5lbWllc1JpZ2h0ID4gZ2FtZVJpZ2h0RWRnZSkgPyBuZXcgVmVjdG9yMmQoLTEsIDApIDogbmV3IFZlY3RvcjJkKDEsIDApXG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlcm1pbmUgRmlyaW5nIFdlYXBvblxuICAgICAgICB2YXIgcCA9IHZlY3RvckFkZCh0aGlzLnBvc2l0aW9uLCBuZXcgVmVjdG9yMmQoMCwgNSkpXG5cbiAgICAgICAgZnVuY3Rpb24gZXhpc3RzVW5kZXJuZWF0aChlKSB7XG4gICAgICAgICAgICB2YXIgcmVjdCA9IGUuY29sbGlzaW9uUmVjdCgpXG4gICAgICAgICAgICByZXR1cm4gcC55IDw9IHJlY3QudG9wKCkgJiZcbiAgICAgICAgICAgICAgICByZWN0LmxlZnQoKSA8PSBwLnggJiYgcC54IDw9IHJlY3QucmlnaHQoKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50aW1lciArPSBkZWx0YVRcblxuICAgICAgICBpZiAodGhpcy50aW1lciA+IHRoaXMuZmlyZVdhaXQpIHtcbiAgICAgICAgICAgIHRoaXMudGltZXIgPSAwXG4gICAgICAgICAgICB0aGlzLmZpcmVXYWl0ID0gMSArIE1hdGgucmFuZG9tKCkgKiA0XG5cbiAgICAgICAgICAgIGlmIChyYW5kb21JbnQoMTAwKSA8IHRoaXMuZmlyZVBlcmNlbnQgJiYgIWdhbWUuZW5lbWllcygpLmZpbmQoZXhpc3RzVW5kZXJuZWF0aCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUocClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgRW5lbXkucHJvdG90eXBlLmZpcmUgPSBmdW5jdGlvbihwb3NpdGlvbikge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVuZW1pZXMgYm9vbVwiKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJhbmRvbUludChtYXgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IobWF4KSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVjdFVuaW9uKHIxLCByMikge1xuICAgICAgICB2YXIgeCwgeSwgd2lkdGgsIGhlaWdodFxuXG4gICAgICAgIGlmIChyMSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcjJcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyMiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcjFcbiAgICAgICAgfVxuXG4gICAgICAgIHggPSBNYXRoLm1pbihyMS54LCByMi54KVxuICAgICAgICB5ID0gTWF0aC5taW4ocjEueSwgcjIueSlcbiAgICAgICAgd2lkdGggPSBNYXRoLm1heChyMS5yaWdodCgpLCByMi5yaWdodCgpKSAtIE1hdGgubWluKHIxLmxlZnQoKSwgcjIubGVmdCgpKVxuICAgICAgICBoZWlnaHQgPSBNYXRoLm1heChyMS5ib3R0b20oKSwgcjIuYm90dG9tKCkpIC0gTWF0aC5taW4ocjEudG9wKCksIHIyLnRvcCgpKVxuICAgICAgICBsZXQgcmVjdGFuZ2UgPSBuZXcgUmVjdGFuZ2UoeCwgeSwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgcmV0dXJuIHJlY3RhbmdlXG4gICAgfVxuXG4gICAgXG4gICAgdmFyIHJlbmRlcmVyID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciAgX2NhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZUNhbnZhc1wiKSxcbiAgICAgICAgICAgIF9jb250ZXh0ID0gX2NhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksXG4gICAgICAgICAgICBfZW5lbXlDb2xvcnMgPSBbXCJyZ2IoMTUwLCA3LCA3KVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDE1MCwgODksIDcpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoNTYsIDE1MCwgNylcIixcbiAgICAgICAgICAgICAgICBcInJnYig3LCAxNTAsIDEyMilcIixcbiAgICAgICAgICAgICAgICBcInJnYig0NiwgNywgMTUwKVwiXSxcbiAgICAgICAgICAgIF9wcm9qZWN0aWxlQ29sb3JzID0ge1wicGxheWVyXCI6IFwicmdiKDE5NiwgMjA4LCAxMDYpXCJ9XG5cbiAgICAgICAgZnVuY3Rpb24gX2RyYXdSZWN0YW5nbGUoY29sb3IsIGVudGl0eSkge1xuICAgICAgICAgICAgX2NvbnRleHQuZmlsbFN0eWxlID0gY29sb3JcbiAgICAgICAgICAgIF9jb250ZXh0LmZpbGxSZWN0KGVudGl0eS5wb3NpdGlvbi54IC0gZW50aXR5LndpZHRoIC8gMiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5LnBvc2l0aW9uLnkgLSBlbnRpdHkuaGVpZ2h0IC8gMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHkud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5LmhlaWdodClcbiAgICAgICAgfVxuXG5cblxuICAgICAgICBmdW5jdGlvbiBfcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpXG4gICAgICAgICAgICBsZXQgc3BhY2UgPSBuZXcgU3BhY2UoKVxuICAgICAgICAgICAgc3BhY2UuaW5pdChjb250YWluZXIpXG4gICAgICAgICAgICBzcGFjZS5jcmVhdGVTdGFycygpXG5cbiAgICAgICAgICAgIF9jb250ZXh0LmZpbGxTdHlsZSA9IFwiYmxhY2tcIlxuICAgICAgICAgICAgX2NvbnRleHQuZmlsbFJlY3QoMCwgMCwgX2NhbnZhcy53aWR0aCwgX2NhbnZhcy5oZWlnaHQpXG5cblxuICAgICAgICAgICAgdmFyIGksIGVudGl0eSwgZW50aXRpZXMgPSBnYW1lLmVudGl0aWVzKClcblxuICAgICAgICAgICAgZm9yIChpID0gZW50aXRpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBlbnRpdHkgPSBlbnRpdGllc1tpXVxuXG4gICAgICAgICAgICAgICAgaWYgKGVudGl0eSBpbnN0YW5jZW9mIEVuZW15KSB7XG4gICAgICAgICAgICAgICAgICAgIF9kcmF3UmVjdGFuZ2xlKF9lbmVteUNvbG9yc1tlbnRpdHkucmFua10sIGVudGl0eSlcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVudGl0eSBpbnN0YW5jZW9mIFBsYXllcikge1xuICAgICAgICAgICAgICAgICAgICBfZHJhd1JlY3RhbmdsZShcInJnYigyNTUsIDI1NSwgMClcIiwgZW50aXR5KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVuZGVyOiBfcmVuZGVyXG4gICAgICAgIH1cbiAgICB9KSgpXG5cbiAgICB2YXIgcGh5c2ljcyA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICBmdW5jdGlvbiBfdXBkYXRlKGRlbHRhVCkge1xuICAgICAgICAgICAgdmFyIGksIFxuICAgICAgICAgICAgICAgIGUsXG4gICAgICAgICAgICAgICAgdmVsb2NpdHksXG4gICAgICAgICAgICAgICAgZW50aXRpZXMgPSBnYW1lLmVudGl0aWVzKClcblxuICAgICAgICAgICAgZm9yICggaSA9IGVudGl0aWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgZSA9IGVudGl0aWVzW2ldXG4gICAgICAgICAgICAgICAgdmVsb2NpdHkgPSB2ZWN0b3JTY2FsYXJNdWx0aXBseShlLmRpcmVjdGlvbiwgZS5zcGVlZClcblxuICAgICAgICAgICAgICAgIGUucG9zaXRpb24gPSB2ZWN0b3JBZGQoZS5wb3NpdGlvbiwgdmVjdG9yU2NhbGFyTXVsdGlwbHkodmVsb2NpdHksIGRlbHRhVCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdXBkYXRlOiBfdXBkYXRlXG4gICAgICAgIH1cbiAgICB9KSgpXG5cbiAgICB2YXIgZ2FtZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfZW50aXRpZXMsXG4gICAgICAgICAgICBfZW5lbWllcyxcbiAgICAgICAgICAgIF9wbGF5ZXIsXG4gICAgICAgICAgICBfZ2FtZUZpZWxkUmVjdCxcbiAgICAgICAgICAgIF9zdGFydGVkID0gZmFsc2VcblxuICAgICAgICBmdW5jdGlvbiBfc3RhcnQoKSB7XG4gICAgICAgICAgICBfbGFzdEZyYW1lVGltZSA9IDBcbiAgICAgICAgICAgIF9lbnRpdGllcyA9IFtdXG4gICAgICAgICAgICBfZW5lbWllcyA9IFtdXG4gICAgICAgICAgICBfZ2FtZUZpZWxkUmVjdCA9IG5ldyBSZWN0YW5nZSgwLCAwLCAzMDAsIDE4MClcbiAgICAgICAgICAgIF9lbmVtaWVzUmVjdCA9IG5ldyBSZWN0YW5nZSgwLCAwLCAwLCAwKVxuICAgICAgICAgICAgX2VuZW15U3BlZWQgPSAxMFxuICAgICAgICAgICAgX2VuZW15RmlyZVBlcmNlbnQgPSAxMFxuICAgICAgICAgICAgX2VuZW15RHJvcEFtb3VudCA9IDFcblxuICAgICAgICAgICAgdGhpcy5hZGRFbnRpdHkobmV3IFBsYXllcihuZXcgVmVjdG9yMmQoMTAwLCAxNzUpLCA5MCwgbmV3IFZlY3RvcjJkKDAsIDApKSlcblxuICAgICAgICAgICAgaWYgKCFfc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSlcbiAgICAgICAgICAgICAgICBfc3RhcnRlZCA9IHRydWVcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX2FkZEVudGl0eShlbnRpdHkpIHtcbiAgICAgICAgICAgIF9lbnRpdGllcy5wdXNoKGVudGl0eSlcblxuICAgICAgICAgICAgaWYgKGVudGl0eSBpbnN0YW5jZW9mIFBsYXllcikge1xuICAgICAgICAgICAgICAgIF9wbGF5ZXIgPSBlbnRpdHlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVudGl0eSBpbnN0YW5jZW9mIEVuZW15KSB7XG4gICAgICAgICAgICAgICAgX2VuZW1pZXMucHVzaChlbnRpdHkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfcmVtb3ZlRW50aXRpZXMoZW50aXRpZXMpIHtcbiAgICAgICAgICAgIGlmICghZW50aXRpZXMpIHJldHVyblxuXG4gICAgICAgICAgICBmdW5jdGlvbiBpc05vdEluRW50aXRpZXMoaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhZW50aXRpZXMuaW5jbHVkZXMoaXRlbSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2VudGl0aWVzID0gX2VudGl0aWVzLmZpbHRlcihpc05vdEluRW50aXRpZXMpXG4gICAgICAgICAgICBfZW5lbWllcyA9IF9lbmVtaWVzLmZpbHRlcihpc05vdEluRW50aXRpZXMpXG5cbiAgICAgICAgICAgIGlmIChlbnRpdGllcy5pbmNsdWRlcyhfcGxheWVyKSkge1xuICAgICAgICAgICAgICAgIF9wbGF5ZXIgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF91cGRhdGUodGltZSkge1xuXG4gICAgICAgICAgICB2YXIgaSwgaixcbiAgICAgICAgICAgICAgICBkdCA9IE1hdGgubWluKCh0aW1lIC0gX2xhc3RGcmFtZVRpbWUpIC8gMTAwMCwgMyAvIDYwKTtcblxuICAgICAgICAgICAgX2xhc3RGcmFtZVRpbWUgPSB0aW1lO1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgUGh5c2ljc1xuICAgICAgICAgICAgcGh5c2ljcy51cGRhdGUoZHQpO1xuXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGJvdW5kaW5nIHJlY3RhbmdsZSBhcm91bmQgdGhlIGVuZW1pZXNcbiAgICAgICAgICAgIF9lbmVtaWVzUmVjdCA9IF9lbmVtaWVzLnJlZHVjZShcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVjdCwgZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVjdFVuaW9uKHJlY3QsIGUuY29sbGlzaW9uUmVjdCgpKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBFbnRpdGllc1xuICAgICAgICAgICAgZm9yIChpID0gX2VudGl0aWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgX2VudGl0aWVzW2ldLnVwZGF0ZShkdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBFbmVteSBTcGVlZFxuICAgICAgICAgICAgdmFyIHNwZWVkID0gX2VuZW15U3BlZWQgKyAoX2VuZW15U3BlZWQgKiAoMSAtIChfZW5lbWllcy5sZW5ndGggLyA1MCkpKTtcbiAgICAgICAgICAgIGZvciAoaSA9IF9lbmVtaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgX2VuZW1pZXNbaV0uc3BlZWQgPSBzcGVlZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBncmlkIG9mIEVuZW1pZXMgaWYgdGhlcmUgYXJlIDBcbiAgICAgICAgICAgIGlmIChfZW5lbWllcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgNTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHJvcFRhcmdldCA9IDEwICsgaiAqIDIwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gbmV3IFZlY3RvcjJkKDUwICsgaSAqIDIwLCBkcm9wVGFyZ2V0IC0gMTAwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBuZXcgVmVjdG9yMmQoMSwgMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuayA9IDQgLSBqLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZW15ID0gbmV3IEVuZW15KHBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZW5lbXlTcGVlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5rKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZW5lbXkuZHJvcFRhcmdldCA9IGRyb3BUYXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmVteS5maXJlUGVyY2VudCA9IF9lbmVteUZpcmVQZXJjZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5lbXkuZHJvcEFtb3VudCA9IF9lbmVteURyb3BBbW91bnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRW50aXR5KGVuZW15KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF9lbmVteVNwZWVkICs9IDU7XG4gICAgICAgICAgICAgICAgX2VuZW15RmlyZVBlcmNlbnQgKz0gNTtcbiAgICAgICAgICAgICAgICBfZW5lbXlEcm9wQW1vdW50ICs9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciB0aGUgZnJhbWVcbiAgICAgICAgICAgIHJlbmRlcmVyLnJlbmRlcihkdCk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiBfc3RhcnQsXG4gICAgICAgICAgICB1cGRhdGU6IF91cGRhdGUsXG4gICAgICAgICAgICBhZGRFbnRpdHk6IF9hZGRFbnRpdHksXG4gICAgICAgICAgICBlbnRpdGllczogZnVuY3Rpb24gKCkgeyByZXR1cm4gX2VudGl0aWVzIH0sXG4gICAgICAgICAgICBlbmVtaWVzOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfZW5lbWllcyB9LFxuICAgICAgICAgICAgcGxheWVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfcGxheWVyIH0sXG4gICAgICAgICAgICBnYW1lRmllbGRSZWN0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfZ2FtZUZpZWxkUmVjdCB9LFxuICAgICAgICAgICAgZW5lbWllc1JlY3Q6IGZ1bmN0aW9uKCkgeyByZXR1cm4gX2VuZW1pZXNSZWN0IH1cbiAgICAgICAgfVxuXG4gICAgfSkoKVxuXG4gICAgdmFyIHBsYXllckFjdGlvbnMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVDYW52YXNcIilcbiAgICAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRvdWNoU3RhcnQpXG4gICAgICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdG91Y2hFbmQpXG4gICAgICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgdG91Y2hFbmQpXG4gICAgICAgIHZhciBfb25nb2luZ0FjdGlvbnMgPSBbXVxuICAgICAgICBcbiAgICAgICAgdmFyIGtleWJpbmRzID0ge1xuICAgICAgICAgICAgMzI6IFwiZmlyZVwiLFxuICAgICAgICAgICAgMzc6IFwibW92ZUxlZnRcIixcbiAgICAgICAgICAgIDM5OiBcIm1vdmVSaWdodFwiXG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlEb3duKVxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywga2V5VXApXG5cblxuICAgICAgICBmdW5jdGlvbiBrZXlEb3duKGUpIHtcbiAgICAgICAgICAgIHZhciB4ID0gZS53aGljaCB8fCBlLmtleURvd25cblxuICAgICAgICAgICAgaWYgKGtleWJpbmRzW3hdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICBwbGF5ZXJBY3Rpb25zLnN0YXJ0QWN0aW9uKHgsIGtleWJpbmRzW3hdKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24ga2V5VXAoZSkge1xuICAgICAgICAgICAgdmFyIHggPSBlLndoaWNoIHx8IGUua2V5Q29kZVxuXG4gICAgICAgICAgICBpZiAoa2V5YmluZHNbeF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgIHBsYXllckFjdGlvbnMuZW5kQWN0aW9uKHgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRSZWxhdGl2ZVRvdWNoQ29vcmRzKHRvdWNoKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRPZmZTZXRMZWZ0KGVsZW0pIHtcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0TGVmdCA9IDBcbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNOYU4oZWxlbS5vZmZzZXRMZWZ0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCArPSBlbGVtLm9mZnNldExlZnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKGVsZW0gPSBlbGVtLm9mZnNldFBhcmVudClcbiAgICAgICAgICAgICAgICByZXR1cm4gb2Zmc2V0TGVmdFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRPZmZTZXRUb3AoZWxlbSkge1xuICAgICAgICAgICAgICAgIHZhciBvZmZTZXRUb3AgPSAwXG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKGVsZS5vZmZTZXRUb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZTZXRUb3AgKz0gZWxlbS5vZmZTZXRUb3BcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKGVsZW0gPSBlbGVtLm9mZnNldFBhcmVudClcbiAgICAgICAgICAgICAgICByZXR1cm4gb2ZmU2V0VG9wXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc2NhbGUgPSBnYW1lLmdhbWVGaWVsZFJlY3QoKS53aWR0aCAvIGNhbnZhcy5jbGllbnRXaWR0aFxuICAgICAgICAgICAgdmFyIHggPSB0b3VjaC5wYWdlWCAtIGdldE9mZlNldExlZnQoY2FudmFzKVxuICAgICAgICAgICAgdmFyIHkgPSB0b3VjaC5wYWdlWSAtIGdldE9mZlNldFRvcChjYW52YXMpXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHg6IHkgKiBzY2FsZSxcbiAgICAgICAgICAgICAgICB5OiB5ICogc2NhbGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHRvdWNoU3RhcnQoZSkge1xuICAgICAgICAgICAgdmFyIHRvdWNoZXMgPSBlLmNoYWdlZFRvdWNoZXMsXG4gICAgICAgICAgICAgICAgdG91Y2hMb2NhdGlvbixcbiAgICAgICAgICAgICAgICBwbGF5ZXJBY3Rpb25cblxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSB0b3VjaGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgdG91Y2hMb2NhdGlvbiA9IGdldFJlbGF0aXZlVG91Y2hDb29yZHModG91Y2hlc1tpXSlcblxuICAgICAgICAgICAgICAgIGlmICh0b3VjaExvY2F0aW9uLnggPCBnYW1lLmdhbWVGaWVsZFJlY3QoKS53aWR0aCAqICgxLzUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllckFjdGlvbiA9IFwibW92ZUxlZnRcIlxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG91Y2hMb2NhdGlvbi54IDwgZ2FtZS5nYW1lRmllbGRSZWN0KCkud2lkdGggKiAoNC81KSkge1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJBY3Rpb24gPSBcImZpcmVcIlxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllckFjdGlvbiA9IFwibW92ZVJpZ2h0XCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwbGF5ZXJBY3Rpb24uc3RhcnRBY3Rpb24odG91Y2hlc1tpXSwgaWRlbnRpZmllciwgcGxheWVyQWN0aW9uKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdG91Y2hFbmQoZSkge1xuICAgICAgICAgICAgdmFyIHRvdWNoZXMgPSBlLmNoYW5nZWRUb3VjaGVzXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRvdWNoZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXJBY3Rpb25zLmVuZEFjdGlvbih0b3VjaGVzW2ldLCBpZGVudGlmaWVyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX3N0YXJ0QWN0aW9uKGlkLCBwbGF5ZXJBY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChwbGF5ZXJBY3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGYsXG4gICAgICAgICAgICAgICAgYWN0cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJtb3ZlTGVmdFwiOiBmdW5jdGlvbiAoKSB7IGlmIChnYW1lLnBsYXllcigpKSBnYW1lLnBsYXllcigpLm1vdmVMZWZ0KHRydWUpOyB9LFxuICAgICAgICAgICAgICAgICAgICBcIm1vdmVSaWdodFwiOiBmdW5jdGlvbiAoKSB7IGlmIChnYW1lLnBsYXllcigpKSBnYW1lLnBsYXllcigpLm1vdmVSaWdodCh0cnVlKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJmaXJlXCI6IGZ1bmN0aW9uICgpIHsgaWYgKGdhbWUucGxheWVyKCkpIGdhbWUucGxheWVyKCkuZmlyZSgpOyB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGYgPSBhY3RzW3BsYXllckFjdGlvbl0pIGYoKTtcblxuICAgICAgICAgICAgX29uZ29pbmdBY3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkZW50aWZpZXI6IGlkLCBcbiAgICAgICAgICAgICAgICBwbGF5ZXJBY3Rpb246IHBsYXllckFjdGlvblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9lbmRBY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIHZhciBmLCBcbiAgICAgICAgICAgICAgICBhY3RzID0ge1xuICAgICAgICAgICAgICAgICAgICBcIm1vdmVMZWZ0XCI6IGZ1bmN0aW9uICgpIHsgaWYgKGdhbWUucGxheWVyKCkpIGdhbWUucGxheWVyKCkubW92ZUxlZnQoZmFsc2UpOyB9LFxuICAgICAgICAgICAgICAgICAgICBcIm1vdmVSaWdodFwiOiBmdW5jdGlvbiAoKSB7IGlmIChnYW1lLnBsYXllcigpKSBnYW1lLnBsYXllcigpLm1vdmVSaWdodChmYWxzZSk7IH1cbiAgICAgICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgaWR4ID0gX29uZ29pbmdBY3Rpb25zLmZpbmRJbmRleChmdW5jdGlvbihhKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhLmlkZW50aWZpZXIgPT09IGlkXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZiA9IGFjdHNbX29uZ29pbmdBY3Rpb25zW2lkeF0ucGxheWVyQWN0aW9uXSkgZigpXG4gICAgICAgICAgICAgICAgICAgIF9vbmdvaW5nQWN0aW9ucy5zcGxpY2UoaWR4LCAxKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydEFjdGlvbjogX3N0YXJ0QWN0aW9uLFxuICAgICAgICAgICAgZW5kQWN0aW9uOiBfZW5kQWN0aW9uXG4gICAgICAgIH1cbiAgICB9KSgpXG5cblxuICAgIGdhbWUuc3RhcnQoKVxuICAgIFxufSkiLCJjb25zdCBFbnRpdHkgPSByZXF1aXJlKCcuL2VudGl0eScpXG5cbmZ1bmN0aW9uIFByb2plY3RpbGUocG9zaXRpb24sIHNwZWVkLCBkaXJlY3Rpb24sIHR5cGUpIHtcbiAgICBFbnRpdHkuY2FsbCh0aGlzLCBwb3NpdGlvbiwgc3BlZWQsIGRpcmVjdGlvbilcblxuICAgIHRoaXMud2lkdGggPSAxXG4gICAgdGhpcy5oZWlnaHQgPSA1XG4gICAgdGhpcy50eXBlID0gdHlwZVxufVxuXG5Qcm9qZWN0aWxlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRW50aXR5LnByb3RvdHlwZSlcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9qZWN0aWxlIiwiZnVuY3Rpb24gUmVjdGFuZ2xlKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLnggPSB4XG4gICAgdGhpcy55ID0geVxuICAgIHRoaXMud2lkdGggPSB3aWR0aFxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0XG59XG5cblJlY3RhbmdsZS5wcm90b3R5cGUubGVmdCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnhcbn1cblxuUmVjdGFuZ2xlLnByb3RvdHlwZS5yaWdodCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnggKyB0aGlzLndpZHRoXG59XG5cblJlY3RhbmdsZS5wcm90b3R5cGUudG9wID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMueVxufVxuXG5SZWN0YW5nbGUucHJvdG90eXBlLmJvdHRvbSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnkgKyB0aGlzLmhlaWdodFxufVxuXG5SZWN0YW5nbGUucHJvdG90eXBlLmludGVyc2VjdHMgPSBmdW5jdGlvbihyMikge1xuICAgIHJldHVybiAodGhpcy5yaWdodCgpID49IHIyLmxlZnQoKSAmJiB0aGlzLmxlZnQoKSA8PSByMi5yaWdodCgpKSAmJiBcbiAgICB0aGlzLnRvcCgpIDw9IHIyLmJvdHRvbSgpICYmIHRoaXMuYm90dG9tID49IHIyLnRvcCgpXG59IFxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBSZWN0YW5nbGUiLCJjb25zdCBTdGFyID0gcmVxdWlyZSgnLi9zdGFyJylcblxuZnVuY3Rpb24gU3BhY2UoKSB7XG4gICAgdGhpcy5mcHMgPSAzMFxuICAgIHRoaXMuY2FudmFzID0gbnVsbFxuICAgIHRoaXMud2lkdGggPSAxMDAwXG4gICAgdGhpcy5oZWlnaHQgPSAwXG4gICAgdGhpcy5taW5WZWxvY2l0eSA9IDM1XG4gICAgdGhpcy5tYXhWZWxvY2l0eSA9IDUwXG4gICAgdGhpcy5zdGFycyA9IDIwMFxuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IDBcbiAgICBcbn1cblxuU3BhY2UucHJvdG90eXBlLmNyZWF0ZVN0YXJzID0gZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgc3RhcnMgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFyczsgaSsrKSB7XG4gICAgICAgIHN0YXJzW2ldID0gbmV3IFN0YXIoXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy53aWR0aCwgXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy5oZWlnaHQsIFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIDMgKyAxLCBcbiAgICAgICAgICAgIChNYXRoLnJhbmRvbSgpICogKHRoaXMubWF4VmVsb2NpdHkgLSB0aGlzLm1pblZlbG9jaXR5KSkgKyB0aGlzLm1pblZlbG9jaXR5XG4gICAgICAgIClcbiAgICB9XG4gICAgdGhpcy5zdGFycyA9IHN0YXJzXG59XG5cblNwYWNlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgICBsZXQgZGVsdGFUID0gMSAvIHRoaXMuZnBzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0YXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBzdGFyID0gdGhpcy5zdGFyc1tpXVxuICAgICAgICBzdGFyLnkgKz0gZGVsdGFUICogc3Rhci52ZWxvY2l0eVxuICAgICAgICBpZiAoc3Rhci55ID4gdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnNbaV0gPSBuZXcgU3RhcihcbiAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiB0aGlzLndpZHRoLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIDMgKyAxLFxuICAgICAgICAgICAgICAgIChNYXRoLnJhbmRvbSgpICogKHRoaXMubWF4VmVsb2NpdHkgLSB0aGlzLm1pblZlbG9jaXR5KSkgKyB0aGlzLm1pblZlbG9jaXR5XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuU3BhY2UucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbihkaXYpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXNcblxuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLnVwZGF0ZSgpXG4gICAgICAgIHNlbGYuZHJhdygpXG4gICAgfSwgMTAwMCAvIHRoaXMuZnBzKVxuXG4gICAgdGhpcy5jb250YWluZXJEaXYgPSBkaXZcbiAgICBzZWxmLndpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICBzZWxmLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uIHJlc2l6ZShldmVudCkge1xuICAgICAgICBzZWxmLndpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgc2VsZi5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgc2VsZi5jYW52YXMud2lkdGggPSBzZWxmLndpZHRoXG4gICAgICAgIHNlbGYuY2FudmFzLmhlaWdodCA9IHNlbGYuaGVpZ2h0XG4gICAgICAgIHNlbGYuZHJhdygpXG4gICAgfSlcblxuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIGRpdi5hcHBlbmRDaGlsZChjYW52YXMpXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXNcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMud2lkdGhcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodFxufVxuXG5TcGFjZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBjb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnIzAwMDAwMCdcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnI2FkZDZmZidcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHN0YXIgPSB0aGlzLnN0YXJzW2ldXG4gICAgICAgIGNvbnRleHQuZmlsbFJlY3Qoc3Rhci54LCBzdGFyLnksIHN0YXIuc2l6ZSwgc3Rhci5zaXplKVxuICAgIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNwYWNlIiwiZnVuY3Rpb24gU3Rhcih4LCB5LCBzaXplLCB2ZWxvY2l0eSkge1xuICAgIHRoaXMueCA9IHhcbiAgICB0aGlzLnkgPSB5XG4gICAgdGhpcy5zaXplID0gc2l6ZVxuICAgIHRoaXMudmVsb2NpdHkgPSB2ZWxvY2l0eVxufSBcblxubW9kdWxlLmV4cG9ydHMgPSBTdGFyIiwidmFyIFZlY3RvcjJkID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICB0aGlzLnggPSB4XG4gICAgdGhpcy55ID0geVxufVxuXG5mdW5jdGlvbiB2ZWN0b3JBZGQodjEsIHYyKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyZCh2MS54ICsgdjIueCwgdjEueSArIHYyLnkpXG59XG5cbmZ1bmN0aW9uIHZlY3RvclN1YnRyYWN0KHYxLCB2Mikge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMmQodjEueCAtIHYyLngsIHYxLnkgLSB2MS55KVxufVxuXG5mdW5jdGlvbiB2ZWN0b3JTY2FsYXJNdWx0aXBseSh2MSwgcykge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMmQodjEueCAqIHMsIHYxLnkgKiBzKVxufVxuXG5mdW5jdGlvbiB2ZWN0b3JMZW5ndGgodikge1xuICAgIHJldHVybiBNYXRoLnNxcnQodi54ICogdi54LCB2LnkgKiB2LnkpXG59XG5cbmZ1bmN0aW9uIHZlY3Rvck5vcm1hbGl6ZSh2KSB7XG4gICAgdmFyIHJlY2lwcm9jYWwgPSAxLjAgLyAodmVjdG9yTGVuZ3RoKHYpICsgMS4wZS0wMzcpXG4gICAgcmV0dXJuIHZlY3RvclNjYWxhck11bHRpcGx5KHYsIHJlY2lwcm9jYWwpXG59XG5cbm1vZHVsZS5leHBvcnRzID17XG4gICAgVmVjdG9yMmQsXG4gICAgdmVjdG9yQWRkLFxuICAgIHZlY3RvclN1YnRyYWN0LFxuICAgIHZlY3RvclNjYWxhck11bHRpcGx5LFxuICAgIHZlY3Rvck5vcm1hbGl6ZVxufSJdLCJzb3VyY2VSb290IjoiIn0=