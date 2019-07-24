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

    if (this.collisionRect().left() <= 0 || this.collisionRect().right() >= game.gameFieldRect().right()) {
      this.direction.x *= -1;
    }
  };

  function Enemy(position, speed, direction, rank) {
    Entity.call(this, position, speed, direction);
    this.width = 13;
    this.height = 10;
    this.rank = rank;
  }

  Enemy.prototype = Object.create(Entity.prototype);

  Enemy.prototype.update = function (deltaT) {
    Entity.prototype.update.call(this, deltaT);

    if (this.collisionRect().top() <= 0 || this.collisionRect().bottom() >= game.gameFieldRect().bottom()) {
      this.direction.y *= -1;
    }
  };

  var renderer = function () {
    var _canvas = document.getElementById("gameCanvas"),
        _context = _canvas.getContext("2d"),
        _enemyColors = ["rgb(150, 7, 7)", "rgb(150, 89, 7)", "rgb(56, 150, 7)", "rgb(7, 150, 122)", "rgb(46, 7, 150)"];

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
      _entities = [];
      _enemies = [];
      _gameFieldRect = new Rectange(0, 0, 300, 200);
      this.addEntity(new Player(new Vector2d(100, 175), 90, new Vector2d(0, 0)));
      this.addEntity(new Enemy(new Vector2d(20, 25), 20, new Vector2d(0, 1), 0));
      this.addEntity(new Enemy(new Vector2d(50, 25), 10, new Vector2d(0, 1), 1));
      this.addEntity(new Enemy(new Vector2d(80, 25), 15, new Vector2d(0, 1), 2));
      this.addEntity(new Enemy(new Vector2d(120, 25), 25, new Vector2d(0, 1), 3));
      this.addEntity(new Enemy(new Vector2d(140, 25), 30, new Vector2d(0, 1), 4));

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

    function _update() {
      var deltaT = 1 / 60;
      physics.update(deltaT);
      var i;

      for (i = _entities.length - 1; i >= 0; i--) {
        _entities[i].update(deltaT);
      }

      renderer.render(deltaT);
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
      }
    };
  }();

  var playerActions = function () {
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
      function getOffsetLeft(elem) {
        var offsetLeft = 0;

        do {
          if (!isNaN(elem.offsetLeft)) {
            offsetLeft += elem.offsetLeft;
          }
        } while (elem = elem.offsetParent);

        return offsetLeft;
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
  return new Rectangle(x, y, width, height);
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlY3RhbmdsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3BhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZlY3Rvci1tYXRoLmpzIl0sIm5hbWVzIjpbIlJlY3RhbmdsZSIsInJlcXVpcmUiLCJFbnRpdHkiLCJwb3NpdGlvbiIsInNwZWVkIiwiZGlyZWN0aW9uIiwidGltZSIsIndpZHRoIiwiaGVpZ2h0IiwiaHAiLCJwcm90b3R5cGUiLCJ1cGRhdGUiLCJkZWx0YVQiLCJjb2xsaXNpb25SZWN0IiwieCIsInkiLCJtb2R1bGUiLCJleHBvcnRzIiwiU3BhY2UiLCJSZWN0YW5nZSIsIlZlY3RvcjJkIiwidmVjdG9yQWRkIiwidmVjdG9yU3VidHJhY3QiLCJ2ZWN0b3JTY2FsYXJNdWx0aXBseSIsInZlY3Rvck5vcm1hbGl6ZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIlBsYXllciIsImNhbGwiLCJtb3ZpbmdMZWZ0IiwibW92aW5nUmlnaHQiLCJPYmplY3QiLCJjcmVhdGUiLCJ1cGRhdGVEaXJlY3Rpb24iLCJtb3ZlUmlnaHQiLCJlbmFibGUiLCJtb3ZlTGVmdCIsImZpcmUiLCJjb25zb2xlIiwibG9nIiwibGVmdCIsInJpZ2h0IiwiZ2FtZSIsImdhbWVGaWVsZFJlY3QiLCJFbmVteSIsInJhbmsiLCJ0b3AiLCJib3R0b20iLCJyZW5kZXJlciIsIl9jYW52YXMiLCJnZXRFbGVtZW50QnlJZCIsIl9jb250ZXh0IiwiZ2V0Q29udGV4dCIsIl9lbmVteUNvbG9ycyIsIl9kcmF3UmVjdGFuZ2xlIiwiY29sb3IiLCJlbnRpdHkiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsIl9yZW5kZXIiLCJjb250YWluZXIiLCJzcGFjZSIsImluaXQiLCJjcmVhdGVTdGFycyIsImkiLCJlbnRpdGllcyIsImxlbmd0aCIsInJlbmRlciIsInBoeXNpY3MiLCJfdXBkYXRlIiwiZSIsInZlbG9jaXR5IiwiX2VudGl0aWVzIiwiX2VuZW1pZXMiLCJfcGxheWVyIiwiX2dhbWVGaWVsZFJlY3QiLCJfc3RhcnRlZCIsIl9zdGFydCIsImFkZEVudGl0eSIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImJpbmQiLCJfYWRkRW50aXR5IiwicHVzaCIsIl9yZW1vdmVFbnRpdGllcyIsImlzTm90SW5FbnRpdGllcyIsIml0ZW0iLCJpbmNsdWRlcyIsImZpbHRlciIsInVuZGVmaW5lZCIsInN0YXJ0IiwiZW5lbWllcyIsInBsYXllciIsInBsYXllckFjdGlvbnMiLCJfb25nb2luZ0FjdGlvbnMiLCJrZXliaW5kcyIsImJvZHkiLCJrZXlEb3duIiwia2V5VXAiLCJ3aGljaCIsInByZXZlbnREZWZhdWx0Iiwic3RhcnRBY3Rpb24iLCJrZXlDb2RlIiwiZW5kQWN0aW9uIiwiZ2V0UmVsYXRpdmVUb3VjaENvb3JkcyIsInRvdWNoIiwiZ2V0T2Zmc2V0TGVmdCIsImVsZW0iLCJvZmZzZXRMZWZ0IiwiaXNOYU4iLCJvZmZzZXRQYXJlbnQiLCJfc3RhcnRBY3Rpb24iLCJpZCIsInBsYXllckFjdGlvbiIsImYiLCJhY3RzIiwiaWRlbnRpZmllciIsIl9lbmRBY3Rpb24iLCJpZHgiLCJmaW5kSW5kZXgiLCJhIiwic3BsaWNlIiwiaW50ZXJzZWN0cyIsInIyIiwicmVjdFVuaW9uIiwicjEiLCJNYXRoIiwibWluIiwibWF4IiwiU3RhciIsImZwcyIsImNhbnZhcyIsIm1pblZlbG9jaXR5IiwibWF4VmVsb2NpdHkiLCJzdGFycyIsImludGVydmFsSWQiLCJyYW5kb20iLCJzdGFyIiwiZGl2Iiwic2VsZiIsInNldEludGVydmFsIiwiZHJhdyIsImNvbnRhaW5lckRpdiIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInJlc2l6ZSIsImV2ZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY29udGV4dCIsInNpemUiLCJ2MSIsInYyIiwicyIsInZlY3Rvckxlbmd0aCIsInYiLCJzcXJ0IiwicmVjaXByb2NhbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLElBQU1BLFNBQVMsR0FBR0MsbUJBQU8sQ0FBQyx1Q0FBRCxDQUF6Qjs7QUFFQSxTQUFTQyxNQUFULENBQWdCQyxRQUFoQixFQUEwQkMsS0FBMUIsRUFBaUNDLFNBQWpDLEVBQTRDO0FBQ3hDLE9BQUtGLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsT0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsT0FBS0MsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxPQUFLQyxJQUFMLEdBQVksQ0FBWjtBQUNBLE9BQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsT0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxPQUFLQyxFQUFMLEdBQVUsQ0FBVjtBQUNI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QjtBQUNaRyxVQUFRLEVBQVJBLFFBRFk7QUFFWkMsV0FBUyxFQUFUQSxTQUZZO0FBR1pDLGdCQUFjLEVBQWRBLGNBSFk7QUFJWkMsc0JBQW9CLEVBQXBCQSxvQkFKWTtBQUtaQyxpQkFBZSxFQUFmQTtBQUxZLENBQWhCLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiY29uc3QgUmVjdGFuZ2xlID0gcmVxdWlyZSgnLi9yZWN0YW5nbGUnKVxuXG5mdW5jdGlvbiBFbnRpdHkocG9zaXRpb24sIHNwZWVkLCBkaXJlY3Rpb24pIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb25cbiAgICB0aGlzLnNwZWVkID0gc3BlZWRcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvblxuICAgIHRoaXMudGltZSA9IDBcbiAgICB0aGlzLndpZHRoID0gNVxuICAgIHRoaXMuaGVpZ2h0ID0gNVxuICAgIHRoaXMuaHAgPSAxXG59XG5cbkVudGl0eS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oZGVsdGFUKSB7XG4gICAgdGhpcy50aW1lICs9IGRlbHRhVFxufVxuXG5FbnRpdHkucHJvdG90eXBlLmNvbGxpc2lvblJlY3QgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlY3RhbmdsZSh0aGlzLnBvc2l0aW9uLnggLSB0aGlzLndpZHRoIC8gMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSAtIHRoaXMuaGVpZ2h0IC8gMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlaWdodClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbnRpdHkiLCJjb25zdCBTcGFjZSA9IHJlcXVpcmUoJy4vc3BhY2UnKVxuY29uc3QgRW50aXR5ID0gcmVxdWlyZSgnLi9lbnRpdHknKVxubGV0IFJlY3RhbmdlID0gcmVxdWlyZSgnLi9yZWN0YW5nbGUnKVxuY29uc3QgeyBWZWN0b3IyZCxcbiAgICB2ZWN0b3JBZGQsXG4gICAgdmVjdG9yU3VidHJhY3QsXG4gICAgdmVjdG9yU2NhbGFyTXVsdGlwbHksXG4gICAgdmVjdG9yTm9ybWFsaXplIH0gPSByZXF1aXJlKCcuL3ZlY3Rvci1tYXRoJylcblxuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxuICAgIGZ1bmN0aW9uIFBsYXllcihwb3NpdGlvbiwgc3BlZWQsIGRpcmVjdGlvbikge1xuICAgICAgICBFbnRpdHkuY2FsbCh0aGlzLCBwb3NpdGlvbiwgc3BlZWQsIGRpcmVjdGlvbilcblxuICAgICAgICB0aGlzLndpZHRoID0gMjBcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAxMFxuXG4gICAgICAgIHRoaXMubW92aW5nTGVmdCA9IGZhbHNlXG4gICAgICAgIHRoaXMubW92aW5nUmlnaHQgPSBmYWxzZVxuICAgIH1cbiAgICBQbGF5ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFbnRpdHkucHJvdG90eXBlKVxuXG4gICAgUGxheWVyLnByb3RvdHlwZS51cGRhdGVEaXJlY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IG5ldyBWZWN0b3IyZCgwLCAwKVxuICAgICAgICBpZiAodGhpcy5tb3ZpbmdMZWZ0KSB7XG4gICAgICAgICAgICBkaXJlY3Rpb24gPSB2ZWN0b3JBZGQoZGlyZWN0aW9uLCBuZXcgVmVjdG9yMmQoLTEsIDApKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm1vdmluZ1JpZ2h0KSB7XG4gICAgICAgICAgICBkaXJlY3Rpb24gPSB2ZWN0b3JBZGQoZGlyZWN0aW9uLCBuZXcgVmVjdG9yMmQoMSwgMCkpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb25cbiAgICB9XG5cbiAgICBQbGF5ZXIucHJvdG90eXBlLm1vdmVSaWdodCA9IGZ1bmN0aW9uKGVuYWJsZSkge1xuICAgICAgICB0aGlzLm1vdmluZ1JpZ2h0ID0gZW5hYmxlXG4gICAgICAgIHRoaXMudXBkYXRlRGlyZWN0aW9uKClcbiAgICB9XG5cbiAgICBQbGF5ZXIucHJvdG90eXBlLm1vdmVMZWZ0ID0gZnVuY3Rpb24oZW5hYmxlKSB7XG4gICAgICAgIHRoaXMubW92aW5nTGVmdCA9IGVuYWJsZVxuICAgICAgICB0aGlzLnVwZGF0ZURpcmVjdGlvbigpXG4gICAgfVxuXG4gICAgUGxheWVyLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQm9vbVwiKVxuICAgIH1cblxuXG4gICAgUGxheWVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZGVsdGFUKSB7XG4gICAgICAgIEVudGl0eS5wcm90b3R5cGUudXBkYXRlLmNhbGwodGhpcywgZGVsdGFUKVxuXG4gICAgICAgIGlmICh0aGlzLmNvbGxpc2lvblJlY3QoKS5sZWZ0KCkgPD0gMCB8fCBcbiAgICAgICAgICAgIHRoaXMuY29sbGlzaW9uUmVjdCgpLnJpZ2h0KCkgPj0gZ2FtZS5nYW1lRmllbGRSZWN0KCkucmlnaHQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uLnggKj0gLTFcbiAgICAgICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBFbmVteShwb3NpdGlvbiwgc3BlZWQsIGRpcmVjdGlvbiwgcmFuaykge1xuICAgICAgICBFbnRpdHkuY2FsbCh0aGlzLCBwb3NpdGlvbiwgc3BlZWQsIGRpcmVjdGlvbilcblxuICAgICAgICB0aGlzLndpZHRoID0gMTNcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAxMFxuICAgICAgICB0aGlzLnJhbmsgPSByYW5rXG4gICAgfVxuICAgIEVuZW15LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRW50aXR5LnByb3RvdHlwZSlcblxuICAgIEVuZW15LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZGVsdGFUKSB7XG4gICAgICAgIEVudGl0eS5wcm90b3R5cGUudXBkYXRlLmNhbGwodGhpcywgZGVsdGFUKTtcbiAgICAgICAgaWYgKHRoaXMuY29sbGlzaW9uUmVjdCgpLnRvcCgpIDw9IDAgfHxcbiAgICAgICAgICAgIHRoaXMuY29sbGlzaW9uUmVjdCgpLmJvdHRvbSgpID49IGdhbWUuZ2FtZUZpZWxkUmVjdCgpLmJvdHRvbSgpKSB7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbi55ICo9IC0xO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgXG4gICAgdmFyIHJlbmRlcmVyID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciAgX2NhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZUNhbnZhc1wiKSxcbiAgICAgICAgICAgIF9jb250ZXh0ID0gX2NhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksXG4gICAgICAgICAgICBfZW5lbXlDb2xvcnMgPSBbXCJyZ2IoMTUwLCA3LCA3KVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDE1MCwgODksIDcpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoNTYsIDE1MCwgNylcIixcbiAgICAgICAgICAgICAgICBcInJnYig3LCAxNTAsIDEyMilcIixcbiAgICAgICAgICAgICAgICBcInJnYig0NiwgNywgMTUwKVwiXVxuXG4gICAgICAgIGZ1bmN0aW9uIF9kcmF3UmVjdGFuZ2xlKGNvbG9yLCBlbnRpdHkpIHtcbiAgICAgICAgICAgIF9jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yXG4gICAgICAgICAgICBfY29udGV4dC5maWxsUmVjdChlbnRpdHkucG9zaXRpb24ueCAtIGVudGl0eS53aWR0aCAvIDIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eS5wb3NpdGlvbi55IC0gZW50aXR5LmhlaWdodCAvIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5LndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eS5oZWlnaHQpXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgZnVuY3Rpb24gX3JlbmRlcigpIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKVxuICAgICAgICAgICAgbGV0IHNwYWNlID0gbmV3IFNwYWNlKClcbiAgICAgICAgICAgIHNwYWNlLmluaXQoY29udGFpbmVyKVxuICAgICAgICAgICAgc3BhY2UuY3JlYXRlU3RhcnMoKVxuXG4gICAgICAgICAgICBfY29udGV4dC5maWxsU3R5bGUgPSBcImJsYWNrXCJcbiAgICAgICAgICAgIF9jb250ZXh0LmZpbGxSZWN0KDAsIDAsIF9jYW52YXMud2lkdGgsIF9jYW52YXMuaGVpZ2h0KVxuXG5cbiAgICAgICAgICAgIHZhciBpLCBlbnRpdHksIGVudGl0aWVzID0gZ2FtZS5lbnRpdGllcygpXG5cbiAgICAgICAgICAgIGZvciAoaSA9IGVudGl0aWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgZW50aXR5ID0gZW50aXRpZXNbaV1cblxuICAgICAgICAgICAgICAgIGlmIChlbnRpdHkgaW5zdGFuY2VvZiBFbmVteSkge1xuICAgICAgICAgICAgICAgICAgICBfZHJhd1JlY3RhbmdsZShfZW5lbXlDb2xvcnNbZW50aXR5LnJhbmtdLCBlbnRpdHkpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbnRpdHkgaW5zdGFuY2VvZiBQbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgX2RyYXdSZWN0YW5nbGUoXCJyZ2IoMjU1LCAyNTUsIDApXCIsIGVudGl0eSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlbmRlcjogX3JlbmRlclxuICAgICAgICB9XG4gICAgfSkoKVxuXG4gICAgdmFyIHBoeXNpY3MgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gX3VwZGF0ZShkZWx0YVQpIHtcbiAgICAgICAgICAgIHZhciBpLCBcbiAgICAgICAgICAgICAgICBlLFxuICAgICAgICAgICAgICAgIHZlbG9jaXR5LFxuICAgICAgICAgICAgICAgIGVudGl0aWVzID0gZ2FtZS5lbnRpdGllcygpXG5cbiAgICAgICAgICAgIGZvciAoIGkgPSBlbnRpdGllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGUgPSBlbnRpdGllc1tpXVxuICAgICAgICAgICAgICAgIHZlbG9jaXR5ID0gdmVjdG9yU2NhbGFyTXVsdGlwbHkoZS5kaXJlY3Rpb24sIGUuc3BlZWQpXG5cbiAgICAgICAgICAgICAgICBlLnBvc2l0aW9uID0gdmVjdG9yQWRkKGUucG9zaXRpb24sIHZlY3RvclNjYWxhck11bHRpcGx5KHZlbG9jaXR5LCBkZWx0YVQpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVwZGF0ZTogX3VwZGF0ZVxuICAgICAgICB9XG4gICAgfSkoKVxuXG4gICAgdmFyIGdhbWUgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2VudGl0aWVzLFxuICAgICAgICAgICAgX2VuZW1pZXMsXG4gICAgICAgICAgICBfcGxheWVyLFxuICAgICAgICAgICAgX2dhbWVGaWVsZFJlY3QsXG4gICAgICAgICAgICBfc3RhcnRlZCA9IGZhbHNlXG5cbiAgICAgICAgZnVuY3Rpb24gX3N0YXJ0KCkge1xuICAgICAgICAgICAgX2VudGl0aWVzID0gW11cbiAgICAgICAgICAgIF9lbmVtaWVzID0gW11cbiAgICAgICAgICAgIF9nYW1lRmllbGRSZWN0ID0gbmV3IFJlY3RhbmdlKDAsIDAsIDMwMCwgMjAwKVxuXG4gICAgICAgICAgICB0aGlzLmFkZEVudGl0eShuZXcgUGxheWVyKG5ldyBWZWN0b3IyZCgxMDAsIDE3NSksIDkwLCBuZXcgVmVjdG9yMmQoMCwgMCkpKTtcbiAgICAgICAgICAgIHRoaXMuYWRkRW50aXR5KG5ldyBFbmVteShuZXcgVmVjdG9yMmQoMjAsIDI1KSwgMjAsIG5ldyBWZWN0b3IyZCgwLCAxKSwgMCkpO1xuICAgICAgICAgICAgdGhpcy5hZGRFbnRpdHkobmV3IEVuZW15KG5ldyBWZWN0b3IyZCg1MCwgMjUpLCAxMCwgbmV3IFZlY3RvcjJkKDAsIDEpLCAxKSk7XG4gICAgICAgICAgICB0aGlzLmFkZEVudGl0eShuZXcgRW5lbXkobmV3IFZlY3RvcjJkKDgwLCAyNSksIDE1LCBuZXcgVmVjdG9yMmQoMCwgMSksIDIpKTtcbiAgICAgICAgICAgIHRoaXMuYWRkRW50aXR5KG5ldyBFbmVteShuZXcgVmVjdG9yMmQoMTIwLCAyNSksIDI1LCBuZXcgVmVjdG9yMmQoMCwgMSksIDMpKTtcbiAgICAgICAgICAgIHRoaXMuYWRkRW50aXR5KG5ldyBFbmVteShuZXcgVmVjdG9yMmQoMTQwLCAyNSksIDMwLCBuZXcgVmVjdG9yMmQoMCwgMSksIDQpKTtcblxuICAgICAgICAgICAgaWYgKCFfc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSlcbiAgICAgICAgICAgICAgICBfc3RhcnRlZCA9IHRydWVcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX2FkZEVudGl0eShlbnRpdHkpIHtcbiAgICAgICAgICAgIF9lbnRpdGllcy5wdXNoKGVudGl0eSlcblxuICAgICAgICAgICAgaWYgKGVudGl0eSBpbnN0YW5jZW9mIFBsYXllcikge1xuICAgICAgICAgICAgICAgIF9wbGF5ZXIgPSBlbnRpdHlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVudGl0eSBpbnN0YW5jZW9mIEVuZW15KSB7XG4gICAgICAgICAgICAgICAgX2VuZW1pZXMucHVzaChlbnRpdHkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfcmVtb3ZlRW50aXRpZXMoZW50aXRpZXMpIHtcbiAgICAgICAgICAgIGlmICghZW50aXRpZXMpIHJldHVyblxuXG4gICAgICAgICAgICBmdW5jdGlvbiBpc05vdEluRW50aXRpZXMoaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhZW50aXRpZXMuaW5jbHVkZXMoaXRlbSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2VudGl0aWVzID0gX2VudGl0aWVzLmZpbHRlcihpc05vdEluRW50aXRpZXMpXG4gICAgICAgICAgICBfZW5lbWllcyA9IF9lbmVtaWVzLmZpbHRlcihpc05vdEluRW50aXRpZXMpXG5cbiAgICAgICAgICAgIGlmIChlbnRpdGllcy5pbmNsdWRlcyhfcGxheWVyKSkge1xuICAgICAgICAgICAgICAgIF9wbGF5ZXIgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgICAgICAgICB2YXIgZGVsdGFUID0gMSAvIDYwXG4gICAgICAgICAgICBwaHlzaWNzLnVwZGF0ZShkZWx0YVQpXG5cbiAgICAgICAgICAgIHZhciBpXG4gICAgICAgICAgICBmb3IgKGkgPSBfZW50aXRpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBfZW50aXRpZXNbaV0udXBkYXRlKGRlbHRhVClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVuZGVyZXIucmVuZGVyKGRlbHRhVClcblxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiBfc3RhcnQsXG4gICAgICAgICAgICB1cGRhdGU6IF91cGRhdGUsXG4gICAgICAgICAgICBhZGRFbnRpdHk6IF9hZGRFbnRpdHksXG4gICAgICAgICAgICBlbnRpdGllczogZnVuY3Rpb24gKCkgeyByZXR1cm4gX2VudGl0aWVzIH0sXG4gICAgICAgICAgICBlbmVtaWVzOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfZW5lbWllcyB9LFxuICAgICAgICAgICAgcGxheWVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfcGxheWVyIH0sXG4gICAgICAgICAgICBnYW1lRmllbGRSZWN0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfZ2FtZUZpZWxkUmVjdCB9XG4gICAgICAgIH1cblxuICAgIH0pKClcblxuICAgIHZhciBwbGF5ZXJBY3Rpb25zID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfb25nb2luZ0FjdGlvbnMgPSBbXVxuICAgICAgICBcbiAgICAgICAgdmFyIGtleWJpbmRzID0ge1xuICAgICAgICAgICAgMzI6IFwiZmlyZVwiLFxuICAgICAgICAgICAgMzc6IFwibW92ZUxlZnRcIixcbiAgICAgICAgICAgIDM5OiBcIm1vdmVSaWdodFwiXG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlEb3duKVxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywga2V5VXApXG5cblxuICAgICAgICBmdW5jdGlvbiBrZXlEb3duKGUpIHtcbiAgICAgICAgICAgIHZhciB4ID0gZS53aGljaCB8fCBlLmtleURvd25cblxuICAgICAgICAgICAgaWYgKGtleWJpbmRzW3hdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICBwbGF5ZXJBY3Rpb25zLnN0YXJ0QWN0aW9uKHgsIGtleWJpbmRzW3hdKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24ga2V5VXAoZSkge1xuICAgICAgICAgICAgdmFyIHggPSBlLndoaWNoIHx8IGUua2V5Q29kZVxuXG4gICAgICAgICAgICBpZiAoa2V5YmluZHNbeF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgIHBsYXllckFjdGlvbnMuZW5kQWN0aW9uKHgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRSZWxhdGl2ZVRvdWNoQ29vcmRzKHRvdWNoKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRPZmZzZXRMZWZ0KGVsZW0pIHtcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0TGVmdCA9IDBcbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNOYU4oZWxlbS5vZmZzZXRMZWZ0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCArPSBlbGVtLm9mZnNldExlZnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aGlsZSAoZWxlbSA9IGVsZW0ub2Zmc2V0UGFyZW50KVxuICAgICAgICAgICAgICAgIHJldHVybiBvZmZzZXRMZWZ0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfc3RhcnRBY3Rpb24oaWQsIHBsYXllckFjdGlvbikge1xuICAgICAgICAgICAgaWYgKHBsYXllckFjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZixcbiAgICAgICAgICAgICAgICBhY3RzID0ge1xuICAgICAgICAgICAgICAgICAgICBcIm1vdmVMZWZ0XCI6IGZ1bmN0aW9uICgpIHsgaWYgKGdhbWUucGxheWVyKCkpIGdhbWUucGxheWVyKCkubW92ZUxlZnQodHJ1ZSk7IH0sXG4gICAgICAgICAgICAgICAgICAgIFwibW92ZVJpZ2h0XCI6IGZ1bmN0aW9uICgpIHsgaWYgKGdhbWUucGxheWVyKCkpIGdhbWUucGxheWVyKCkubW92ZVJpZ2h0KHRydWUpOyB9LFxuICAgICAgICAgICAgICAgICAgICBcImZpcmVcIjogZnVuY3Rpb24gKCkgeyBpZiAoZ2FtZS5wbGF5ZXIoKSkgZ2FtZS5wbGF5ZXIoKS5maXJlKCk7IH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoZiA9IGFjdHNbcGxheWVyQWN0aW9uXSkgZigpO1xuXG4gICAgICAgICAgICBfb25nb2luZ0FjdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcjogaWQsIFxuICAgICAgICAgICAgICAgIHBsYXllckFjdGlvbjogcGxheWVyQWN0aW9uXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX2VuZEFjdGlvbihpZCkge1xuICAgICAgICAgICAgdmFyIGYsIFxuICAgICAgICAgICAgICAgIGFjdHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwibW92ZUxlZnRcIjogZnVuY3Rpb24gKCkgeyBpZiAoZ2FtZS5wbGF5ZXIoKSkgZ2FtZS5wbGF5ZXIoKS5tb3ZlTGVmdChmYWxzZSk7IH0sXG4gICAgICAgICAgICAgICAgICAgIFwibW92ZVJpZ2h0XCI6IGZ1bmN0aW9uICgpIHsgaWYgKGdhbWUucGxheWVyKCkpIGdhbWUucGxheWVyKCkubW92ZVJpZ2h0KGZhbHNlKTsgfVxuICAgICAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgICAgIHZhciBpZHggPSBfb25nb2luZ0FjdGlvbnMuZmluZEluZGV4KGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEuaWRlbnRpZmllciA9PT0gaWRcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmID0gYWN0c1tfb25nb2luZ0FjdGlvbnNbaWR4XS5wbGF5ZXJBY3Rpb25dKSBmKClcbiAgICAgICAgICAgICAgICAgICAgX29uZ29pbmdBY3Rpb25zLnNwbGljZShpZHgsIDEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0QWN0aW9uOiBfc3RhcnRBY3Rpb24sXG4gICAgICAgICAgICBlbmRBY3Rpb246IF9lbmRBY3Rpb25cbiAgICAgICAgfVxuICAgIH0pKClcblxuXG4gICAgZ2FtZS5zdGFydCgpXG4gICAgXG59KSIsImZ1bmN0aW9uIFJlY3RhbmdsZSh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgICB0aGlzLndpZHRoID0gd2lkdGhcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxufVxuXG5SZWN0YW5nbGUucHJvdG90eXBlLmxlZnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy54XG59XG5cblJlY3RhbmdsZS5wcm90b3R5cGUucmlnaHQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy54ICsgdGhpcy53aWR0aFxufVxuXG5SZWN0YW5nbGUucHJvdG90eXBlLnRvcCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnlcbn1cblxuUmVjdGFuZ2xlLnByb3RvdHlwZS5ib3R0b20gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy55ICsgdGhpcy5oZWlnaHRcbn1cblxuUmVjdGFuZ2xlLnByb3RvdHlwZS5pbnRlcnNlY3RzID0gZnVuY3Rpb24ocjIpIHtcbiAgICByZXR1cm4gKHRoaXMucmlnaHQoKSA+PSByMi5sZWZ0KCkgJiYgdGhpcy5sZWZ0KCkgPD0gcjIucmlnaHQoKSkgJiYgXG4gICAgdGhpcy50b3AoKSA8PSByMi5ib3R0b20oKSAmJiB0aGlzLmJvdHRvbSA+PSByMi50b3AoKVxufSBcblxuZnVuY3Rpb24gcmVjdFVuaW9uKHIxLCByMikge1xuICAgIHZhciB4LCB5LCB3aWR0aCwgaGVpZ2h0XG5cbiAgICBpZiAocjEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gcjJcbiAgICB9XG5cbiAgICBpZiAocjIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gcjFcbiAgICB9XG5cbiAgICB4ID0gTWF0aC5taW4ocjEueCwgcjIueClcbiAgICB5ID0gTWF0aC5taW4ocjEueSwgcjIueSlcbiAgICB3aWR0aCA9IE1hdGgubWF4KHIxLnJpZ2h0KCksIHIyLnJpZ2h0KCkpIC0gTWF0aC5taW4ocjEubGVmdCgpLCByMi5sZWZ0KCkpXG4gICAgaGVpZ2h0ID0gTWF0aC5tYXgocjEuYm90dG9tKCksIHIyLmJvdHRvbSgpKSAtIE1hdGgubWluKHIxLnRvcCgpLCByMi50b3AoKSlcblxuICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHgsIHksIHdpZHRoLCBoZWlnaHQpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVjdGFuZ2xlIiwiY29uc3QgU3RhciA9IHJlcXVpcmUoJy4vc3RhcicpXG5cbmZ1bmN0aW9uIFNwYWNlKCkge1xuICAgIHRoaXMuZnBzID0gMzBcbiAgICB0aGlzLmNhbnZhcyA9IG51bGxcbiAgICB0aGlzLndpZHRoID0gMTAwMFxuICAgIHRoaXMuaGVpZ2h0ID0gMFxuICAgIHRoaXMubWluVmVsb2NpdHkgPSAzNVxuICAgIHRoaXMubWF4VmVsb2NpdHkgPSA1MFxuICAgIHRoaXMuc3RhcnMgPSAyMDBcbiAgICB0aGlzLmludGVydmFsSWQgPSAwXG4gICAgXG59XG5cblNwYWNlLnByb3RvdHlwZS5jcmVhdGVTdGFycyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IHN0YXJzID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RhcnM7IGkrKykge1xuICAgICAgICBzdGFyc1tpXSA9IG5ldyBTdGFyKFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIHRoaXMud2lkdGgsIFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIHRoaXMuaGVpZ2h0LCBcbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiAzICsgMSwgXG4gICAgICAgICAgICAoTWF0aC5yYW5kb20oKSAqICh0aGlzLm1heFZlbG9jaXR5IC0gdGhpcy5taW5WZWxvY2l0eSkpICsgdGhpcy5taW5WZWxvY2l0eVxuICAgICAgICApXG4gICAgfVxuICAgIHRoaXMuc3RhcnMgPSBzdGFyc1xufVxuXG5TcGFjZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGRlbHRhVCA9IDEgLyB0aGlzLmZwc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgc3RhciA9IHRoaXMuc3RhcnNbaV1cbiAgICAgICAgc3Rhci55ICs9IGRlbHRhVCAqIHN0YXIudmVsb2NpdHlcbiAgICAgICAgaWYgKHN0YXIueSA+IHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJzW2ldID0gbmV3IFN0YXIoXG4gICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy53aWR0aCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiAzICsgMSxcbiAgICAgICAgICAgICAgICAoTWF0aC5yYW5kb20oKSAqICh0aGlzLm1heFZlbG9jaXR5IC0gdGhpcy5taW5WZWxvY2l0eSkpICsgdGhpcy5taW5WZWxvY2l0eVxuICAgICAgICAgICAgKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cblNwYWNlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oZGl2KSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzXG5cbiAgICB0aGlzLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi51cGRhdGUoKVxuICAgICAgICBzZWxmLmRyYXcoKVxuICAgIH0sIDEwMDAgLyB0aGlzLmZwcylcblxuICAgIHRoaXMuY29udGFpbmVyRGl2ID0gZGl2XG4gICAgc2VsZi53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgc2VsZi5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiByZXNpemUoZXZlbnQpIHtcbiAgICAgICAgc2VsZi53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgIHNlbGYuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgIHNlbGYuY2FudmFzLndpZHRoID0gc2VsZi53aWR0aFxuICAgICAgICBzZWxmLmNhbnZhcy5oZWlnaHQgPSBzZWxmLmhlaWdodFxuICAgICAgICBzZWxmLmRyYXcoKVxuICAgIH0pXG5cbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgICBkaXYuYXBwZW5kQ2hpbGQoY2FudmFzKVxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLndpZHRoXG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHRcbn1cblxuU3BhY2UucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbigpIHtcbiAgICBsZXQgY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKVxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyMwMDAwMDAnXG4gICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcblxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyNhZGQ2ZmYnXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0YXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBzdGFyID0gdGhpcy5zdGFyc1tpXVxuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KHN0YXIueCwgc3Rhci55LCBzdGFyLnNpemUsIHN0YXIuc2l6ZSlcbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTcGFjZSIsImZ1bmN0aW9uIFN0YXIoeCwgeSwgc2l6ZSwgdmVsb2NpdHkpIHtcbiAgICB0aGlzLnggPSB4XG4gICAgdGhpcy55ID0geVxuICAgIHRoaXMuc2l6ZSA9IHNpemVcbiAgICB0aGlzLnZlbG9jaXR5ID0gdmVsb2NpdHlcbn0gXG5cbm1vZHVsZS5leHBvcnRzID0gU3RhciIsInZhciBWZWN0b3IyZCA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbn1cblxuZnVuY3Rpb24gdmVjdG9yQWRkKHYxLCB2Mikge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMmQodjEueCArIHYyLngsIHYxLnkgKyB2Mi55KVxufVxuXG5mdW5jdGlvbiB2ZWN0b3JTdWJ0cmFjdCh2MSwgdjIpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJkKHYxLnggLSB2Mi54LCB2MS55IC0gdjEueSlcbn1cblxuZnVuY3Rpb24gdmVjdG9yU2NhbGFyTXVsdGlwbHkodjEsIHMpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJkKHYxLnggKiBzLCB2MS55ICogcylcbn1cblxuZnVuY3Rpb24gdmVjdG9yTGVuZ3RoKHYpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHYueCAqIHYueCwgdi55ICogdi55KVxufVxuXG5mdW5jdGlvbiB2ZWN0b3JOb3JtYWxpemUodikge1xuICAgIHZhciByZWNpcHJvY2FsID0gMS4wIC8gKHZlY3Rvckxlbmd0aCh2KSArIDEuMGUtMDM3KVxuICAgIHJldHVybiB2ZWN0b3JTY2FsYXJNdWx0aXBseSh2LCByZWNpcHJvY2FsKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9e1xuICAgIFZlY3RvcjJkLFxuICAgIHZlY3RvckFkZCxcbiAgICB2ZWN0b3JTdWJ0cmFjdCxcbiAgICB2ZWN0b3JTY2FsYXJNdWx0aXBseSxcbiAgICB2ZWN0b3JOb3JtYWxpemVcbn0iXSwic291cmNlUm9vdCI6IiJ9