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
  }

  Player.prototype = Object.create(Entity.prototype);

  Player.prototype.update = function (deltaT) {
    Entity.prototype.update.call(this, deltaT);

    if (this.collisionRect().top() <= 0 || this.collisionRect().bottom() >= game.gameFieldRect().bottom()) {
      this.direction.y *= -1;
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
      this.addEntity(new Player(new Vector2d(100, 175), 25, new Vector2d(0, -1)));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlY3RhbmdsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3BhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZlY3Rvci1tYXRoLmpzIl0sIm5hbWVzIjpbIlJlY3RhbmdsZSIsInJlcXVpcmUiLCJFbnRpdHkiLCJwb3NpdGlvbiIsInNwZWVkIiwiZGlyZWN0aW9uIiwidGltZSIsIndpZHRoIiwiaGVpZ2h0IiwiaHAiLCJwcm90b3R5cGUiLCJ1cGRhdGUiLCJkZWx0YVQiLCJjb2xsaXNpb25SZWN0IiwieCIsInkiLCJtb2R1bGUiLCJleHBvcnRzIiwiU3BhY2UiLCJSZWN0YW5nZSIsIlZlY3RvcjJkIiwidmVjdG9yQWRkIiwidmVjdG9yU3VidHJhY3QiLCJ2ZWN0b3JTY2FsYXJNdWx0aXBseSIsInZlY3Rvck5vcm1hbGl6ZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIlBsYXllciIsImNhbGwiLCJPYmplY3QiLCJjcmVhdGUiLCJ0b3AiLCJib3R0b20iLCJnYW1lIiwiZ2FtZUZpZWxkUmVjdCIsIkVuZW15IiwicmFuayIsInJlbmRlcmVyIiwiX2NhbnZhcyIsImdldEVsZW1lbnRCeUlkIiwiX2NvbnRleHQiLCJnZXRDb250ZXh0IiwiX2VuZW15Q29sb3JzIiwiX2RyYXdSZWN0YW5nbGUiLCJjb2xvciIsImVudGl0eSIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiX3JlbmRlciIsImNvbnRhaW5lciIsInNwYWNlIiwiaW5pdCIsImNyZWF0ZVN0YXJzIiwiaSIsImVudGl0aWVzIiwibGVuZ3RoIiwicmVuZGVyIiwicGh5c2ljcyIsIl91cGRhdGUiLCJlIiwidmVsb2NpdHkiLCJfZW50aXRpZXMiLCJfZW5lbWllcyIsIl9wbGF5ZXIiLCJfZ2FtZUZpZWxkUmVjdCIsIl9zdGFydGVkIiwiX3N0YXJ0IiwiYWRkRW50aXR5Iiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYmluZCIsIl9hZGRFbnRpdHkiLCJwdXNoIiwiX3JlbW92ZUVudGl0aWVzIiwiaXNOb3RJbkVudGl0aWVzIiwiaXRlbSIsImluY2x1ZGVzIiwiZmlsdGVyIiwidW5kZWZpbmVkIiwic3RhcnQiLCJlbmVtaWVzIiwicGxheWVyIiwibGVmdCIsInJpZ2h0IiwiaW50ZXJzZWN0cyIsInIyIiwicmVjdFVuaW9uIiwicjEiLCJNYXRoIiwibWluIiwibWF4IiwiU3RhciIsImZwcyIsImNhbnZhcyIsIm1pblZlbG9jaXR5IiwibWF4VmVsb2NpdHkiLCJzdGFycyIsImludGVydmFsSWQiLCJyYW5kb20iLCJzdGFyIiwiZGl2Iiwic2VsZiIsInNldEludGVydmFsIiwiZHJhdyIsImNvbnRhaW5lckRpdiIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInJlc2l6ZSIsImV2ZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY29udGV4dCIsInNpemUiLCJ2MSIsInYyIiwicyIsInZlY3Rvckxlbmd0aCIsInYiLCJzcXJ0IiwicmVjaXByb2NhbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFp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Q0FBQzhGLENBQUQsRUFBSUUsVUFBSixDQUEzQjtBQUNIOztBQUVEdkcsTUFBTSxDQUFDQyxPQUFQLEdBQWdCO0FBQ1pHLFVBQVEsRUFBUkEsUUFEWTtBQUVaQyxXQUFTLEVBQVRBLFNBRlk7QUFHWkMsZ0JBQWMsRUFBZEEsY0FIWTtBQUlaQyxzQkFBb0IsRUFBcEJBLG9CQUpZO0FBS1pDLGlCQUFlLEVBQWZBO0FBTFksQ0FBaEIsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJjb25zdCBSZWN0YW5nbGUgPSByZXF1aXJlKCcuL3JlY3RhbmdsZScpXG5cbmZ1bmN0aW9uIEVudGl0eShwb3NpdGlvbiwgc3BlZWQsIGRpcmVjdGlvbikge1xuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvblxuICAgIHRoaXMuc3BlZWQgPSBzcGVlZFxuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uXG4gICAgdGhpcy50aW1lID0gMFxuICAgIHRoaXMud2lkdGggPSA1XG4gICAgdGhpcy5oZWlnaHQgPSA1XG4gICAgdGhpcy5ocCA9IDFcbn1cblxuRW50aXR5LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihkZWx0YVQpIHtcbiAgICB0aGlzLnRpbWUgKz0gZGVsdGFUXG59XG5cbkVudGl0eS5wcm90b3R5cGUuY29sbGlzaW9uUmVjdCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHRoaXMucG9zaXRpb24ueCAtIHRoaXMud2lkdGggLyAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55IC0gdGhpcy5oZWlnaHQgLyAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVudGl0eSIsImNvbnN0IFNwYWNlID0gcmVxdWlyZSgnLi9zcGFjZScpXG5jb25zdCBFbnRpdHkgPSByZXF1aXJlKCcuL2VudGl0eScpXG5sZXQgUmVjdGFuZ2UgPSByZXF1aXJlKCcuL3JlY3RhbmdsZScpXG5jb25zdCB7IFZlY3RvcjJkLFxuICAgIHZlY3RvckFkZCxcbiAgICB2ZWN0b3JTdWJ0cmFjdCxcbiAgICB2ZWN0b3JTY2FsYXJNdWx0aXBseSxcbiAgICB2ZWN0b3JOb3JtYWxpemUgfSA9IHJlcXVpcmUoJy4vdmVjdG9yLW1hdGgnKVxuXG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gICAgZnVuY3Rpb24gUGxheWVyKHBvc2l0aW9uLCBzcGVlZCwgZGlyZWN0aW9uKSB7XG4gICAgICAgIEVudGl0eS5jYWxsKHRoaXMsIHBvc2l0aW9uLCBzcGVlZCwgZGlyZWN0aW9uKVxuXG4gICAgICAgIHRoaXMud2lkdGggPSAyMFxuICAgICAgICB0aGlzLmhlaWdodCA9IDEwXG4gICAgfVxuICAgIFBsYXllci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVudGl0eS5wcm90b3R5cGUpXG5cbiAgICBQbGF5ZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkZWx0YVQpIHtcbiAgICAgICAgRW50aXR5LnByb3RvdHlwZS51cGRhdGUuY2FsbCh0aGlzLCBkZWx0YVQpXG5cbiAgICAgICAgaWYgKHRoaXMuY29sbGlzaW9uUmVjdCgpLnRvcCgpIDw9IDAgfHxcbiAgICAgICAgICAgIHRoaXMuY29sbGlzaW9uUmVjdCgpLmJvdHRvbSgpID49IGdhbWUuZ2FtZUZpZWxkUmVjdCgpLmJvdHRvbSgpICl7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbi55ICo9IC0xXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIEVuZW15KHBvc2l0aW9uLCBzcGVlZCwgZGlyZWN0aW9uLCByYW5rKSB7XG4gICAgICAgIEVudGl0eS5jYWxsKHRoaXMsIHBvc2l0aW9uLCBzcGVlZCwgZGlyZWN0aW9uKVxuXG4gICAgICAgIHRoaXMud2lkdGggPSAxM1xuICAgICAgICB0aGlzLmhlaWdodCA9IDEwXG4gICAgICAgIHRoaXMucmFuayA9IHJhbmtcbiAgICB9XG4gICAgRW5lbXkucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFbnRpdHkucHJvdG90eXBlKVxuXG4gICAgRW5lbXkucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkZWx0YVQpIHtcbiAgICAgICAgRW50aXR5LnByb3RvdHlwZS51cGRhdGUuY2FsbCh0aGlzLCBkZWx0YVQpO1xuICAgICAgICBpZiAodGhpcy5jb2xsaXNpb25SZWN0KCkudG9wKCkgPD0gMCB8fFxuICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25SZWN0KCkuYm90dG9tKCkgPj0gZ2FtZS5nYW1lRmllbGRSZWN0KCkuYm90dG9tKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uLnkgKj0gLTE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBcbiAgICB2YXIgcmVuZGVyZXIgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyICBfY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lQ2FudmFzXCIpLFxuICAgICAgICAgICAgX2NvbnRleHQgPSBfY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSxcbiAgICAgICAgICAgIF9lbmVteUNvbG9ycyA9IFtcInJnYigxNTAsIDcsIDcpXCIsXG4gICAgICAgICAgICAgICAgXCJyZ2IoMTUwLCA4OSwgNylcIixcbiAgICAgICAgICAgICAgICBcInJnYig1NiwgMTUwLCA3KVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDcsIDE1MCwgMTIyKVwiLFxuICAgICAgICAgICAgICAgIFwicmdiKDQ2LCA3LCAxNTApXCJdXG5cbiAgICAgICAgZnVuY3Rpb24gX2RyYXdSZWN0YW5nbGUoY29sb3IsIGVudGl0eSkge1xuICAgICAgICAgICAgX2NvbnRleHQuZmlsbFN0eWxlID0gY29sb3JcbiAgICAgICAgICAgIF9jb250ZXh0LmZpbGxSZWN0KGVudGl0eS5wb3NpdGlvbi54IC0gZW50aXR5LndpZHRoIC8gMiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5LnBvc2l0aW9uLnkgLSBlbnRpdHkuaGVpZ2h0IC8gMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHkud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5LmhlaWdodClcbiAgICAgICAgfVxuXG5cblxuICAgICAgICBmdW5jdGlvbiBfcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpXG4gICAgICAgICAgICBsZXQgc3BhY2UgPSBuZXcgU3BhY2UoKVxuICAgICAgICAgICAgc3BhY2UuaW5pdChjb250YWluZXIpXG4gICAgICAgICAgICBzcGFjZS5jcmVhdGVTdGFycygpXG5cbiAgICAgICAgICAgIF9jb250ZXh0LmZpbGxTdHlsZSA9IFwiYmxhY2tcIlxuICAgICAgICAgICAgX2NvbnRleHQuZmlsbFJlY3QoMCwgMCwgX2NhbnZhcy53aWR0aCwgX2NhbnZhcy5oZWlnaHQpXG5cblxuICAgICAgICAgICAgdmFyIGksIGVudGl0eSwgZW50aXRpZXMgPSBnYW1lLmVudGl0aWVzKClcblxuICAgICAgICAgICAgZm9yIChpID0gZW50aXRpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBlbnRpdHkgPSBlbnRpdGllc1tpXVxuXG4gICAgICAgICAgICAgICAgaWYgKGVudGl0eSBpbnN0YW5jZW9mIEVuZW15KSB7XG4gICAgICAgICAgICAgICAgICAgIF9kcmF3UmVjdGFuZ2xlKF9lbmVteUNvbG9yc1tlbnRpdHkucmFua10sIGVudGl0eSlcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVudGl0eSBpbnN0YW5jZW9mIFBsYXllcikge1xuICAgICAgICAgICAgICAgICAgICBfZHJhd1JlY3RhbmdsZShcInJnYigyNTUsIDI1NSwgMClcIiwgZW50aXR5KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVuZGVyOiBfcmVuZGVyXG4gICAgICAgIH1cbiAgICB9KSgpXG5cbiAgICB2YXIgcGh5c2ljcyA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICBmdW5jdGlvbiBfdXBkYXRlKGRlbHRhVCkge1xuICAgICAgICAgICAgdmFyIGksIFxuICAgICAgICAgICAgICAgIGUsXG4gICAgICAgICAgICAgICAgdmVsb2NpdHksXG4gICAgICAgICAgICAgICAgZW50aXRpZXMgPSBnYW1lLmVudGl0aWVzKClcblxuICAgICAgICAgICAgZm9yICggaSA9IGVudGl0aWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgZSA9IGVudGl0aWVzW2ldXG4gICAgICAgICAgICAgICAgdmVsb2NpdHkgPSB2ZWN0b3JTY2FsYXJNdWx0aXBseShlLmRpcmVjdGlvbiwgZS5zcGVlZClcblxuICAgICAgICAgICAgICAgIGUucG9zaXRpb24gPSB2ZWN0b3JBZGQoZS5wb3NpdGlvbiwgdmVjdG9yU2NhbGFyTXVsdGlwbHkodmVsb2NpdHksIGRlbHRhVCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdXBkYXRlOiBfdXBkYXRlXG4gICAgICAgIH1cbiAgICB9KSgpXG5cbiAgICB2YXIgZ2FtZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfZW50aXRpZXMsXG4gICAgICAgICAgICBfZW5lbWllcyxcbiAgICAgICAgICAgIF9wbGF5ZXIsXG4gICAgICAgICAgICBfZ2FtZUZpZWxkUmVjdCxcbiAgICAgICAgICAgIF9zdGFydGVkID0gZmFsc2VcblxuICAgICAgICBmdW5jdGlvbiBfc3RhcnQoKSB7XG4gICAgICAgICAgICBfZW50aXRpZXMgPSBbXVxuICAgICAgICAgICAgX2VuZW1pZXMgPSBbXVxuICAgICAgICAgICAgX2dhbWVGaWVsZFJlY3QgPSBuZXcgUmVjdGFuZ2UoMCwgMCwgMzAwLCAyMDApXG5cbiAgICAgICAgICAgIHRoaXMuYWRkRW50aXR5KG5ldyBQbGF5ZXIobmV3IFZlY3RvcjJkKDEwMCwgMTc1KSwgMjUsIG5ldyBWZWN0b3IyZCgwLCAtMSkpKTtcbiAgICAgICAgICAgIHRoaXMuYWRkRW50aXR5KG5ldyBFbmVteShuZXcgVmVjdG9yMmQoMjAsIDI1KSwgMjAsIG5ldyBWZWN0b3IyZCgwLCAxKSwgMCkpO1xuICAgICAgICAgICAgdGhpcy5hZGRFbnRpdHkobmV3IEVuZW15KG5ldyBWZWN0b3IyZCg1MCwgMjUpLCAxMCwgbmV3IFZlY3RvcjJkKDAsIDEpLCAxKSk7XG4gICAgICAgICAgICB0aGlzLmFkZEVudGl0eShuZXcgRW5lbXkobmV3IFZlY3RvcjJkKDgwLCAyNSksIDE1LCBuZXcgVmVjdG9yMmQoMCwgMSksIDIpKTtcbiAgICAgICAgICAgIHRoaXMuYWRkRW50aXR5KG5ldyBFbmVteShuZXcgVmVjdG9yMmQoMTIwLCAyNSksIDI1LCBuZXcgVmVjdG9yMmQoMCwgMSksIDMpKTtcbiAgICAgICAgICAgIHRoaXMuYWRkRW50aXR5KG5ldyBFbmVteShuZXcgVmVjdG9yMmQoMTQwLCAyNSksIDMwLCBuZXcgVmVjdG9yMmQoMCwgMSksIDQpKTtcblxuICAgICAgICAgICAgaWYgKCFfc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSlcbiAgICAgICAgICAgICAgICBfc3RhcnRlZCA9IHRydWVcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX2FkZEVudGl0eShlbnRpdHkpIHtcbiAgICAgICAgICAgIF9lbnRpdGllcy5wdXNoKGVudGl0eSlcblxuICAgICAgICAgICAgaWYgKGVudGl0eSBpbnN0YW5jZW9mIFBsYXllcikge1xuICAgICAgICAgICAgICAgIF9wbGF5ZXIgPSBlbnRpdHlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVudGl0eSBpbnN0YW5jZW9mIEVuZW15KSB7XG4gICAgICAgICAgICAgICAgX2VuZW1pZXMucHVzaChlbnRpdHkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfcmVtb3ZlRW50aXRpZXMoZW50aXRpZXMpIHtcbiAgICAgICAgICAgIGlmICghZW50aXRpZXMpIHJldHVyblxuXG4gICAgICAgICAgICBmdW5jdGlvbiBpc05vdEluRW50aXRpZXMoaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhZW50aXRpZXMuaW5jbHVkZXMoaXRlbSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2VudGl0aWVzID0gX2VudGl0aWVzLmZpbHRlcihpc05vdEluRW50aXRpZXMpXG4gICAgICAgICAgICBfZW5lbWllcyA9IF9lbmVtaWVzLmZpbHRlcihpc05vdEluRW50aXRpZXMpXG5cbiAgICAgICAgICAgIGlmIChlbnRpdGllcy5pbmNsdWRlcyhfcGxheWVyKSkge1xuICAgICAgICAgICAgICAgIF9wbGF5ZXIgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgICAgICAgICB2YXIgZGVsdGFUID0gMSAvIDYwXG4gICAgICAgICAgICBwaHlzaWNzLnVwZGF0ZShkZWx0YVQpXG5cbiAgICAgICAgICAgIHZhciBpXG4gICAgICAgICAgICBmb3IgKGkgPSBfZW50aXRpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBfZW50aXRpZXNbaV0udXBkYXRlKGRlbHRhVClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVuZGVyZXIucmVuZGVyKGRlbHRhVClcblxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiBfc3RhcnQsXG4gICAgICAgICAgICB1cGRhdGU6IF91cGRhdGUsXG4gICAgICAgICAgICBhZGRFbnRpdHk6IF9hZGRFbnRpdHksXG4gICAgICAgICAgICBlbnRpdGllczogZnVuY3Rpb24gKCkgeyByZXR1cm4gX2VudGl0aWVzIH0sXG4gICAgICAgICAgICBlbmVtaWVzOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfZW5lbWllcyB9LFxuICAgICAgICAgICAgcGxheWVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfcGxheWVyIH0sXG4gICAgICAgICAgICBnYW1lRmllbGRSZWN0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfZ2FtZUZpZWxkUmVjdCB9XG4gICAgICAgIH1cblxuICAgIH0pKClcblxuXG4gICAgZ2FtZS5zdGFydCgpXG4gICAgXG59KSIsImZ1bmN0aW9uIFJlY3RhbmdsZSh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgICB0aGlzLndpZHRoID0gd2lkdGhcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxufVxuXG5SZWN0YW5nbGUucHJvdG90eXBlLmxlZnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy54XG59XG5cblJlY3RhbmdsZS5wcm90b3R5cGUucmlnaHQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy54ICsgdGhpcy53aWR0aFxufVxuXG5SZWN0YW5nbGUucHJvdG90eXBlLnRvcCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnlcbn1cblxuUmVjdGFuZ2xlLnByb3RvdHlwZS5ib3R0b20gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy55ICsgdGhpcy5oZWlnaHRcbn1cblxuUmVjdGFuZ2xlLnByb3RvdHlwZS5pbnRlcnNlY3RzID0gZnVuY3Rpb24ocjIpIHtcbiAgICByZXR1cm4gKHRoaXMucmlnaHQoKSA+PSByMi5sZWZ0KCkgJiYgdGhpcy5sZWZ0KCkgPD0gcjIucmlnaHQoKSkgJiYgXG4gICAgdGhpcy50b3AoKSA8PSByMi5ib3R0b20oKSAmJiB0aGlzLmJvdHRvbSA+PSByMi50b3AoKVxufSBcblxuZnVuY3Rpb24gcmVjdFVuaW9uKHIxLCByMikge1xuICAgIHZhciB4LCB5LCB3aWR0aCwgaGVpZ2h0XG5cbiAgICBpZiAocjEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gcjJcbiAgICB9XG5cbiAgICBpZiAocjIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gcjFcbiAgICB9XG5cbiAgICB4ID0gTWF0aC5taW4ocjEueCwgcjIueClcbiAgICB5ID0gTWF0aC5taW4ocjEueSwgcjIueSlcbiAgICB3aWR0aCA9IE1hdGgubWF4KHIxLnJpZ2h0KCksIHIyLnJpZ2h0KCkpIC0gTWF0aC5taW4ocjEubGVmdCgpLCByMi5sZWZ0KCkpXG4gICAgaGVpZ2h0ID0gTWF0aC5tYXgocjEuYm90dG9tKCksIHIyLmJvdHRvbSgpKSAtIE1hdGgubWluKHIxLnRvcCgpLCByMi50b3AoKSlcblxuICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHgsIHksIHdpZHRoLCBoZWlnaHQpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVjdGFuZ2xlIiwiY29uc3QgU3RhciA9IHJlcXVpcmUoJy4vc3RhcicpXG5cbmZ1bmN0aW9uIFNwYWNlKCkge1xuICAgIHRoaXMuZnBzID0gMzBcbiAgICB0aGlzLmNhbnZhcyA9IG51bGxcbiAgICB0aGlzLndpZHRoID0gMTAwMFxuICAgIHRoaXMuaGVpZ2h0ID0gMFxuICAgIHRoaXMubWluVmVsb2NpdHkgPSAzNVxuICAgIHRoaXMubWF4VmVsb2NpdHkgPSA1MFxuICAgIHRoaXMuc3RhcnMgPSAyMDBcbiAgICB0aGlzLmludGVydmFsSWQgPSAwXG4gICAgXG59XG5cblNwYWNlLnByb3RvdHlwZS5jcmVhdGVTdGFycyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IHN0YXJzID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RhcnM7IGkrKykge1xuICAgICAgICBzdGFyc1tpXSA9IG5ldyBTdGFyKFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIHRoaXMud2lkdGgsIFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIHRoaXMuaGVpZ2h0LCBcbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiAzICsgMSwgXG4gICAgICAgICAgICAoTWF0aC5yYW5kb20oKSAqICh0aGlzLm1heFZlbG9jaXR5IC0gdGhpcy5taW5WZWxvY2l0eSkpICsgdGhpcy5taW5WZWxvY2l0eVxuICAgICAgICApXG4gICAgfVxuICAgIHRoaXMuc3RhcnMgPSBzdGFyc1xufVxuXG5TcGFjZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGRlbHRhVCA9IDEgLyB0aGlzLmZwc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgc3RhciA9IHRoaXMuc3RhcnNbaV1cbiAgICAgICAgc3Rhci55ICs9IGRlbHRhVCAqIHN0YXIudmVsb2NpdHlcbiAgICAgICAgaWYgKHN0YXIueSA+IHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJzW2ldID0gbmV3IFN0YXIoXG4gICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy53aWR0aCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiAzICsgMSxcbiAgICAgICAgICAgICAgICAoTWF0aC5yYW5kb20oKSAqICh0aGlzLm1heFZlbG9jaXR5IC0gdGhpcy5taW5WZWxvY2l0eSkpICsgdGhpcy5taW5WZWxvY2l0eVxuICAgICAgICAgICAgKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cblNwYWNlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oZGl2KSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzXG5cbiAgICB0aGlzLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi51cGRhdGUoKVxuICAgICAgICBzZWxmLmRyYXcoKVxuICAgIH0sIDEwMDAgLyB0aGlzLmZwcylcblxuICAgIHRoaXMuY29udGFpbmVyRGl2ID0gZGl2XG4gICAgc2VsZi53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgc2VsZi5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiByZXNpemUoZXZlbnQpIHtcbiAgICAgICAgc2VsZi53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgIHNlbGYuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgIHNlbGYuY2FudmFzLndpZHRoID0gc2VsZi53aWR0aFxuICAgICAgICBzZWxmLmNhbnZhcy5oZWlnaHQgPSBzZWxmLmhlaWdodFxuICAgICAgICBzZWxmLmRyYXcoKVxuICAgIH0pXG5cbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgICBkaXYuYXBwZW5kQ2hpbGQoY2FudmFzKVxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLndpZHRoXG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHRcbn1cblxuU3BhY2UucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbigpIHtcbiAgICBsZXQgY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKVxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyMwMDAwMDAnXG4gICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcblxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyNhZGQ2ZmYnXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0YXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBzdGFyID0gdGhpcy5zdGFyc1tpXVxuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KHN0YXIueCwgc3Rhci55LCBzdGFyLnNpemUsIHN0YXIuc2l6ZSlcbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTcGFjZSIsImZ1bmN0aW9uIFN0YXIoeCwgeSwgc2l6ZSwgdmVsb2NpdHkpIHtcbiAgICB0aGlzLnggPSB4XG4gICAgdGhpcy55ID0geVxuICAgIHRoaXMuc2l6ZSA9IHNpemVcbiAgICB0aGlzLnZlbG9jaXR5ID0gdmVsb2NpdHlcbn0gXG5cbm1vZHVsZS5leHBvcnRzID0gU3RhciIsInZhciBWZWN0b3IyZCA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbn1cblxuZnVuY3Rpb24gdmVjdG9yQWRkKHYxLCB2Mikge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMmQodjEueCArIHYyLngsIHYxLnkgKyB2Mi55KVxufVxuXG5mdW5jdGlvbiB2ZWN0b3JTdWJ0cmFjdCh2MSwgdjIpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJkKHYxLnggLSB2Mi54LCB2MS55IC0gdjEueSlcbn1cblxuZnVuY3Rpb24gdmVjdG9yU2NhbGFyTXVsdGlwbHkodjEsIHMpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJkKHYxLnggKiBzLCB2MS55ICogcylcbn1cblxuZnVuY3Rpb24gdmVjdG9yTGVuZ3RoKHYpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHYueCAqIHYueCwgdi55ICogdi55KVxufVxuXG5mdW5jdGlvbiB2ZWN0b3JOb3JtYWxpemUodikge1xuICAgIHZhciByZWNpcHJvY2FsID0gMS4wIC8gKHZlY3Rvckxlbmd0aCh2KSArIDEuMGUtMDM3KVxuICAgIHJldHVybiB2ZWN0b3JTY2FsYXJNdWx0aXBseSh2LCByZWNpcHJvY2FsKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9e1xuICAgIFZlY3RvcjJkLFxuICAgIHZlY3RvckFkZCxcbiAgICB2ZWN0b3JTdWJ0cmFjdCxcbiAgICB2ZWN0b3JTY2FsYXJNdWx0aXBseSxcbiAgICB2ZWN0b3JOb3JtYWxpemVcbn0iXSwic291cmNlUm9vdCI6IiJ9