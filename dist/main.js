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

/***/ "./src/game-entities.js":
/*!******************************!*\
  !*** ./src/game-entities.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Entity = __webpack_require__(/*! ./entity */ "./src/entity.js");

function Player(position, speed, direction) {
  Entity.call(this, position, speed, direction);
  this.width = 20;
  this.height = 10;
}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function (deltaT, game) {
  Entity.prototype.update.call(this, deltaT);

  if (this.collisionRect().top() <= 0 || this.collisionRect().bottom() >= game.gameFieldRect().bottom()) {
    this.direction *= -1;
  }
};

function Enemy(position, speed, direction, rank) {
  Entity.call(this, position, speed, direction);
  this.width = 13;
  this.height = 10;
  this.rank = rank;
}

Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.update = function (deltaT, game) {
  Entity.prototype.update.call(this, deltaT);

  if (this.collisionRect().top() <= 0 || this.collisionRect().bottom() >= game.gameFieldRect().bottom()) {
    this.direction.y *= -1;
  }
};

module.exports = {
  Player: Player,
  Enemy: Enemy
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Space = __webpack_require__(/*! ./space */ "./src/space.js");

var _require = __webpack_require__(/*! ./game-entities */ "./src/game-entities.js"),
    Player = _require.Player,
    Enemy = _require.Enemy;

document.addEventListener("DOMContentLoaded", function () {
  var renderer = function () {
    // function _drawEnemy(context, enemy) {
    //     context.fillStyle = "red"
    //     context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
    // }
    // function _drawPlayer(context, player) {
    //     context.fillStyle = "blue"
    //     context.fillRect(player.x, player.y, player.width, player.height)
    // }
    function _render() {
      var container = document.getElementById("container");
      var space = new Space();
      space.init(container);
      space.createStars();
      var gameContainer = document.getElementById("gameCanvas");
      var context = gameContainer.getContext("2d");
      context.fillStyle = "black";
      context.fillRect(0, 0, gameContainer.width, gameContainer.height);
      var i,
          entity,
          entities = game.entities();

      for (i = 0; i < entities.length; i++) {
        entity = entities[i];

        if (entity instanceof Enemy) {
          _drawEnemy(context, entity);
        } else if (entity instanceof Player) {
          _drawPlayer(context, entity);
        }
      }
    }

    return {
      render: _render
    };
  }();

  var physics = function () {
    function _update() {
      var i,
          entities = game.entities();

      for (i = 0; i < entities.length; i++) {
        entities[i].y += entities[i].direction;
      }
    }

    return {
      update: _update
    };
  }();

  var game = function () {
    var _gameFieldHeight = 200;
    var _entities = [];

    function _start() {
      _entities.push(new Player(100, 175));

      _entities.push(new Enemy(20, 25));

      _entities.push(new Enemy(80, 25));

      _entities.push(new Enemy(160, 25));

      window.requestAnimationFrame(this.update.bind(this));
    }

    function _update() {
      physics.update();
      var i;

      for (i = 0; i < _entities.length; i++) {
        _entities[i].update(this);
      }

      renderer.render();
      window.requestAnimationFrame(this.update.bind(this));
    }

    return {
      start: _start,
      update: _update,
      entities: function entities() {
        return _entities;
      },
      gameFieldHeight: function gameFieldHeight() {
        return _gameFieldHeight;
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS1lbnRpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlY3RhbmdsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3BhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXIuanMiXSwibmFtZXMiOlsiUmVjdGFuZ2xlIiwicmVxdWlyZSIsIkVudGl0eSIsInBvc2l0aW9uIiwic3BlZWQiLCJkaXJlY3Rpb24iLCJ0aW1lIiwid2lkdGgiLCJoZWlnaHQiLCJocCIsInByb3RvdHlwZSIsInVwZGF0ZSIsImRlbHRhVCIsImNvbGxpc2lvblJlY3QiLCJ4IiwieSIsIm1vZHVsZSIsImV4cG9ydHMiLCJQbGF5ZXIiLCJjYWxsIiwiT2JqZWN0IiwiY3JlYXRlIiwiZ2FtZSIsInRvcCIsImJvdHRvbSIsImdhbWVGaWVsZFJlY3QiLCJFbmVteSIsInJhbmsiLCJTcGFjZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbmRlcmVyIiwiX3JlbmRlciIsImNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwic3BhY2UiLCJpbml0IiwiY3JlYXRlU3RhcnMiLCJnYW1lQ29udGFpbmVyIiwiY29udGV4dCIsImdldENvbnRleHQiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsImkiLCJlbnRpdHkiLCJlbnRpdGllcyIsImxlbmd0aCIsIl9kcmF3RW5lbXkiLCJfZHJhd1BsYXllciIsInJlbmRlciIsInBoeXNpY3MiLCJfdXBkYXRlIiwiX2dhbWVGaWVsZEhlaWdodCIsIl9lbnRpdGllcyIsIl9zdGFydCIsInB1c2giLCJ3aW5kb3ciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJiaW5kIiwic3RhcnQiLCJnYW1lRmllbGRIZWlnaHQiLCJsZWZ0IiwicmlnaHQiLCJpbnRlcnNlY3RzIiwicjIiLCJyZWN0VW5pb24iLCJyMSIsInVuZGVmaW5lZCIsIk1hdGgiLCJtaW4iLCJtYXgiLCJTdGFyIiwiZnBzIiwiY2FudmFzIiwibWluVmVsb2NpdHkiLCJtYXhWZWxvY2l0eSIsInN0YXJzIiwiaW50ZXJ2YWxJZCIsInJhbmRvbSIsInN0YXIiLCJ2ZWxvY2l0eSIsImRpdiIsInNlbGYiLCJzZXRJbnRlcnZhbCIsImRyYXciLCJjb250YWluZXJEaXYiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJyZXNpemUiLCJldmVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsInNpemUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxJQUFNQSxTQUFTLEdBQUdDLG1CQUFPLENBQUMsdUNBQUQsQ0FBekI7O0FBRUEsU0FBU0MsTUFBVCxDQUFnQkMsUUFBaEIsRUFBMEJDLEtBQTFCLEVBQWlDQyxTQUFqQyxFQUE0QztBQUN4QyxPQUFLRixRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLE9BQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLE9BQUtDLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsT0FBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxPQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLE9BQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsT0FBS0MsRUFBTCxHQUFVLENBQVY7QUFDSDs7QUFFRFAsTUFBTSxDQUFDUSxTQUFQLENBQWlCQyxNQUFqQixHQUEwQixVQUFTQyxNQUFULEVBQWlCO0FBQ3ZDLE9BQUtOLElBQUwsSUFBYU0sTUFBYjtBQUNILENBRkQ7O0FBSUFWLE1BQU0sQ0FBQ1EsU0FBUCxDQUFpQkcsYUFBakIsR0FBaUMsWUFBVztBQUN4QyxTQUFPLElBQUliLFNBQUosQ0FBYyxLQUFLRyxRQUFMLENBQWNXLENBQWQsR0FBa0IsS0FBS1AsS0FBTCxHQUFhLENBQTdDLEVBQ2EsS0FBS0osUUFBTCxDQUFjWSxDQUFkLEdBQWtCLEtBQUtQLE1BQUwsR0FBYyxDQUQ3QyxFQUVhLEtBQUtELEtBRmxCLEVBR2EsS0FBS0MsTUFIbEIsQ0FBUDtBQUlILENBTEQ7O0FBT0FRLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmYsTUFBakIsQzs7Ozs7Ozs7Ozs7QUN2QkEsSUFBTUEsTUFBTSxHQUFHRCxtQkFBTyxDQUFDLGlDQUFELENBQXRCOztBQUVBLFNBQVNpQixNQUFULENBQWdCZixRQUFoQixFQUEwQkMsS0FBMUIsRUFBaUNDLFNBQWpDLEVBQTRDO0FBQ3hDSCxRQUFNLENBQUNpQixJQUFQLENBQVksSUFBWixFQUFrQmhCLFFBQWxCLEVBQTRCQyxLQUE1QixFQUFtQ0MsU0FBbkM7QUFFQSxPQUFLRSxLQUFMLEdBQWEsRUFBYjtBQUNBLE9BQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0g7O0FBQ0RVLE1BQU0sQ0FBQ1IsU0FBUCxHQUFtQlUsTUFBTSxDQUFDQyxNQUFQLENBQWNuQixNQUFNLENBQUNRLFNBQXJCLENBQW5COztBQUVBUSxNQUFNLENBQUNSLFNBQVAsQ0FBaUJDLE1BQWpCLEdBQTBCLFVBQVVDLE1BQVYsRUFBa0JVLElBQWxCLEVBQXdCO0FBQzlDcEIsUUFBTSxDQUFDUSxTQUFQLENBQWlCQyxNQUFqQixDQUF3QlEsSUFBeEIsQ0FBNkIsSUFBN0IsRUFBbUNQLE1BQW5DOztBQUVBLE1BQUksS0FBS0MsYUFBTCxHQUFxQlUsR0FBckIsTUFBOEIsQ0FBOUIsSUFDQSxLQUFLVixhQUFMLEdBQXFCVyxNQUFyQixNQUFpQ0YsSUFBSSxDQUFDRyxhQUFMLEdBQXFCRCxNQUFyQixFQURyQyxFQUNvRTtBQUM1RCxTQUFLbkIsU0FBTCxJQUFrQixDQUFDLENBQW5CO0FBQ0g7QUFFUixDQVJEOztBQVVBLFNBQVNxQixLQUFULENBQWV2QixRQUFmLEVBQXlCQyxLQUF6QixFQUFnQ0MsU0FBaEMsRUFBMkNzQixJQUEzQyxFQUFpRDtBQUM3Q3pCLFFBQU0sQ0FBQ2lCLElBQVAsQ0FBWSxJQUFaLEVBQWtCaEIsUUFBbEIsRUFBNEJDLEtBQTVCLEVBQW1DQyxTQUFuQztBQUVBLE9BQUtFLEtBQUwsR0FBYSxFQUFiO0FBQ0EsT0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxPQUFLbUIsSUFBTCxHQUFZQSxJQUFaO0FBQ0g7O0FBQ0RELEtBQUssQ0FBQ2hCLFNBQU4sR0FBa0JVLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjbkIsTUFBTSxDQUFDUSxTQUFyQixDQUFsQjs7QUFFQWdCLEtBQUssQ0FBQ2hCLFNBQU4sQ0FBZ0JDLE1BQWhCLEdBQXlCLFVBQVVDLE1BQVYsRUFBa0JVLElBQWxCLEVBQXdCO0FBQzdDcEIsUUFBTSxDQUFDUSxTQUFQLENBQWlCQyxNQUFqQixDQUF3QlEsSUFBeEIsQ0FBNkIsSUFBN0IsRUFBbUNQLE1BQW5DOztBQUVBLE1BQUksS0FBS0MsYUFBTCxHQUFxQlUsR0FBckIsTUFBOEIsQ0FBOUIsSUFDQSxLQUFLVixhQUFMLEdBQXFCVyxNQUFyQixNQUFpQ0YsSUFBSSxDQUFDRyxhQUFMLEdBQXFCRCxNQUFyQixFQURyQyxFQUNvRTtBQUNoRSxTQUFLbkIsU0FBTCxDQUFlVSxDQUFmLElBQW9CLENBQUMsQ0FBckI7QUFDSDtBQUNKLENBUEQ7O0FBU0FDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNiQyxRQUFNLEVBQU5BLE1BRGE7QUFFYlEsT0FBSyxFQUFMQTtBQUZhLENBQWpCLEM7Ozs7Ozs7Ozs7O0FDdENBLElBQU1FLEtBQUssR0FBRzNCLG1CQUFPLENBQUMsK0JBQUQsQ0FBckI7O2VBQzBCQSxtQkFBTyxDQUFDLCtDQUFELEM7SUFBekJpQixNLFlBQUFBLE07SUFBUVEsSyxZQUFBQSxLOztBQUloQkcsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUVoRCxNQUFJQyxRQUFRLEdBQUksWUFBVztBQUl2QjtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsYUFBU0MsT0FBVCxHQUFtQjtBQUNmLFVBQUlDLFNBQVMsR0FBR0osUUFBUSxDQUFDSyxjQUFULENBQXdCLFdBQXhCLENBQWhCO0FBQ0EsVUFBSUMsS0FBSyxHQUFHLElBQUlQLEtBQUosRUFBWjtBQUNBTyxXQUFLLENBQUNDLElBQU4sQ0FBV0gsU0FBWDtBQUNBRSxXQUFLLENBQUNFLFdBQU47QUFFQSxVQUFJQyxhQUFhLEdBQUdULFFBQVEsQ0FBQ0ssY0FBVCxDQUF3QixZQUF4QixDQUFwQjtBQUNBLFVBQUlLLE9BQU8sR0FBR0QsYUFBYSxDQUFDRSxVQUFkLENBQXlCLElBQXpCLENBQWQ7QUFFQUQsYUFBTyxDQUFDRSxTQUFSLEdBQW9CLE9BQXBCO0FBRUFGLGFBQU8sQ0FBQ0csUUFBUixDQUFpQixDQUFqQixFQUFvQixDQUFwQixFQUF1QkosYUFBYSxDQUFDL0IsS0FBckMsRUFBNEMrQixhQUFhLENBQUM5QixNQUExRDtBQUdBLFVBQUltQyxDQUFKO0FBQUEsVUFBT0MsTUFBUDtBQUFBLFVBQWVDLFFBQVEsR0FBR3ZCLElBQUksQ0FBQ3VCLFFBQUwsRUFBMUI7O0FBRUEsV0FBS0YsQ0FBQyxHQUFHLENBQVQsRUFBWUEsQ0FBQyxHQUFHRSxRQUFRLENBQUNDLE1BQXpCLEVBQWlDSCxDQUFDLEVBQWxDLEVBQXNDO0FBQ2xDQyxjQUFNLEdBQUdDLFFBQVEsQ0FBQ0YsQ0FBRCxDQUFqQjs7QUFFQSxZQUFJQyxNQUFNLFlBQVlsQixLQUF0QixFQUE2QjtBQUN6QnFCLG9CQUFVLENBQUNSLE9BQUQsRUFBVUssTUFBVixDQUFWO0FBQ0gsU0FGRCxNQUVPLElBQUlBLE1BQU0sWUFBWTFCLE1BQXRCLEVBQThCO0FBQ2pDOEIscUJBQVcsQ0FBQ1QsT0FBRCxFQUFVSyxNQUFWLENBQVg7QUFDSDtBQUNKO0FBQ0o7O0FBQ0QsV0FBTztBQUNISyxZQUFNLEVBQUVqQjtBQURMLEtBQVA7QUFHSCxHQTNDYyxFQUFmOztBQTZDQSxNQUFJa0IsT0FBTyxHQUFJLFlBQVc7QUFDdEIsYUFBU0MsT0FBVCxHQUFtQjtBQUNmLFVBQUlSLENBQUo7QUFBQSxVQUFPRSxRQUFRLEdBQUd2QixJQUFJLENBQUN1QixRQUFMLEVBQWxCOztBQUVBLFdBQUtGLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBR0UsUUFBUSxDQUFDQyxNQUF6QixFQUFpQ0gsQ0FBQyxFQUFsQyxFQUFzQztBQUNsQ0UsZ0JBQVEsQ0FBQ0YsQ0FBRCxDQUFSLENBQVk1QixDQUFaLElBQWlCOEIsUUFBUSxDQUFDRixDQUFELENBQVIsQ0FBWXRDLFNBQTdCO0FBQ0g7QUFDSjs7QUFFRCxXQUFPO0FBQ0hNLFlBQU0sRUFBRXdDO0FBREwsS0FBUDtBQUdILEdBWmEsRUFBZDs7QUFjQSxNQUFJN0IsSUFBSSxHQUFJLFlBQVc7QUFDbkIsUUFBSThCLGdCQUFnQixHQUFHLEdBQXZCO0FBQ0EsUUFBSUMsU0FBUyxHQUFHLEVBQWhCOztBQUVBLGFBQVNDLE1BQVQsR0FBa0I7QUFDZEQsZUFBUyxDQUFDRSxJQUFWLENBQWUsSUFBSXJDLE1BQUosQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLENBQWY7O0FBQ0FtQyxlQUFTLENBQUNFLElBQVYsQ0FBZSxJQUFJN0IsS0FBSixDQUFVLEVBQVYsRUFBYyxFQUFkLENBQWY7O0FBQ0EyQixlQUFTLENBQUNFLElBQVYsQ0FBZSxJQUFJN0IsS0FBSixDQUFVLEVBQVYsRUFBYyxFQUFkLENBQWY7O0FBQ0EyQixlQUFTLENBQUNFLElBQVYsQ0FBZSxJQUFJN0IsS0FBSixDQUFVLEdBQVYsRUFBZSxFQUFmLENBQWY7O0FBRUE4QixZQUFNLENBQUNDLHFCQUFQLENBQTZCLEtBQUs5QyxNQUFMLENBQVkrQyxJQUFaLENBQWlCLElBQWpCLENBQTdCO0FBQ0g7O0FBRUQsYUFBU1AsT0FBVCxHQUFtQjtBQUNmRCxhQUFPLENBQUN2QyxNQUFSO0FBRUEsVUFBSWdDLENBQUo7O0FBQ0EsV0FBS0EsQ0FBQyxHQUFHLENBQVQsRUFBWUEsQ0FBQyxHQUFHVSxTQUFTLENBQUNQLE1BQTFCLEVBQWtDSCxDQUFDLEVBQW5DLEVBQXVDO0FBQ25DVSxpQkFBUyxDQUFDVixDQUFELENBQVQsQ0FBYWhDLE1BQWIsQ0FBb0IsSUFBcEI7QUFDSDs7QUFDRG9CLGNBQVEsQ0FBQ2tCLE1BQVQ7QUFFQU8sWUFBTSxDQUFDQyxxQkFBUCxDQUE2QixLQUFLOUMsTUFBTCxDQUFZK0MsSUFBWixDQUFpQixJQUFqQixDQUE3QjtBQUNIOztBQUVELFdBQU87QUFDSEMsV0FBSyxFQUFFTCxNQURKO0FBRUgzQyxZQUFNLEVBQUV3QyxPQUZMO0FBR0hOLGNBQVEsRUFBRSxvQkFBVztBQUFFLGVBQU9RLFNBQVA7QUFBa0IsT0FIdEM7QUFJSE8scUJBQWUsRUFBRSwyQkFBVztBQUFFLGVBQU9SLGdCQUFQO0FBQXlCO0FBSnBELEtBQVA7QUFPSCxHQWhDVSxFQUFYOztBQWtDQTlCLE1BQUksQ0FBQ3FDLEtBQUw7QUFFSCxDQWpHRCxFOzs7Ozs7Ozs7OztBQ0xBLFNBQVMzRCxTQUFULENBQW1CYyxDQUFuQixFQUFzQkMsQ0FBdEIsRUFBeUJSLEtBQXpCLEVBQWdDQyxNQUFoQyxFQUF3QztBQUNwQyxPQUFLTSxDQUFMLEdBQVNBLENBQVQ7QUFDQSxPQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFDQSxPQUFLUixLQUFMLEdBQWFBLEtBQWI7QUFDQSxPQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDSDs7QUFFRFIsU0FBUyxDQUFDVSxTQUFWLENBQW9CbUQsSUFBcEIsR0FBMkIsWUFBVztBQUNsQyxTQUFPLEtBQUsvQyxDQUFaO0FBQ0gsQ0FGRDs7QUFJQWQsU0FBUyxDQUFDVSxTQUFWLENBQW9Cb0QsS0FBcEIsR0FBNEIsWUFBVztBQUNuQyxTQUFPLEtBQUtoRCxDQUFMLEdBQVMsS0FBS1AsS0FBckI7QUFDSCxDQUZEOztBQUlBUCxTQUFTLENBQUNVLFNBQVYsQ0FBb0JhLEdBQXBCLEdBQTBCLFlBQVc7QUFDakMsU0FBTyxLQUFLUixDQUFaO0FBQ0gsQ0FGRDs7QUFJQWYsU0FBUyxDQUFDVSxTQUFWLENBQW9CYyxNQUFwQixHQUE2QixZQUFXO0FBQ3BDLFNBQU8sS0FBS1QsQ0FBTCxHQUFTLEtBQUtQLE1BQXJCO0FBQ0gsQ0FGRDs7QUFJQVIsU0FBUyxDQUFDVSxTQUFWLENBQW9CcUQsVUFBcEIsR0FBaUMsVUFBU0MsRUFBVCxFQUFhO0FBQzFDLFNBQVEsS0FBS0YsS0FBTCxNQUFnQkUsRUFBRSxDQUFDSCxJQUFILEVBQWhCLElBQTZCLEtBQUtBLElBQUwsTUFBZUcsRUFBRSxDQUFDRixLQUFILEVBQTdDLElBQ1AsS0FBS3ZDLEdBQUwsTUFBY3lDLEVBQUUsQ0FBQ3hDLE1BQUgsRUFEUCxJQUNzQixLQUFLQSxNQUFMLElBQWV3QyxFQUFFLENBQUN6QyxHQUFILEVBRDVDO0FBRUgsQ0FIRDs7QUFLQSxTQUFTMEMsU0FBVCxDQUFtQkMsRUFBbkIsRUFBdUJGLEVBQXZCLEVBQTJCO0FBQ3ZCLE1BQUlsRCxDQUFKLEVBQU9DLENBQVAsRUFBVVIsS0FBVixFQUFpQkMsTUFBakI7O0FBRUEsTUFBSTBELEVBQUUsS0FBS0MsU0FBWCxFQUFzQjtBQUNsQixXQUFPSCxFQUFQO0FBQ0g7O0FBRUQsTUFBSUEsRUFBRSxLQUFLRyxTQUFYLEVBQXNCO0FBQ2xCLFdBQU9ELEVBQVA7QUFDSDs7QUFFRHBELEdBQUMsR0FBR3NELElBQUksQ0FBQ0MsR0FBTCxDQUFTSCxFQUFFLENBQUNwRCxDQUFaLEVBQWVrRCxFQUFFLENBQUNsRCxDQUFsQixDQUFKO0FBQ0FDLEdBQUMsR0FBR3FELElBQUksQ0FBQ0MsR0FBTCxDQUFTSCxFQUFFLENBQUNuRCxDQUFaLEVBQWVpRCxFQUFFLENBQUNqRCxDQUFsQixDQUFKO0FBQ0FSLE9BQUssR0FBRzZELElBQUksQ0FBQ0UsR0FBTCxDQUFTSixFQUFFLENBQUNKLEtBQUgsRUFBVCxFQUFxQkUsRUFBRSxDQUFDRixLQUFILEVBQXJCLElBQW1DTSxJQUFJLENBQUNDLEdBQUwsQ0FBU0gsRUFBRSxDQUFDTCxJQUFILEVBQVQsRUFBb0JHLEVBQUUsQ0FBQ0gsSUFBSCxFQUFwQixDQUEzQztBQUNBckQsUUFBTSxHQUFHNEQsSUFBSSxDQUFDRSxHQUFMLENBQVNKLEVBQUUsQ0FBQzFDLE1BQUgsRUFBVCxFQUFzQndDLEVBQUUsQ0FBQ3hDLE1BQUgsRUFBdEIsSUFBcUM0QyxJQUFJLENBQUNDLEdBQUwsQ0FBU0gsRUFBRSxDQUFDM0MsR0FBSCxFQUFULEVBQW1CeUMsRUFBRSxDQUFDekMsR0FBSCxFQUFuQixDQUE5QztBQUVBLFNBQU8sSUFBSXZCLFNBQUosQ0FBY2MsQ0FBZCxFQUFpQkMsQ0FBakIsRUFBb0JSLEtBQXBCLEVBQTJCQyxNQUEzQixDQUFQO0FBQ0g7O0FBRURRLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmpCLFNBQWpCLEM7Ozs7Ozs7Ozs7O0FDL0NBLElBQU11RSxJQUFJLEdBQUd0RSxtQkFBTyxDQUFDLDZCQUFELENBQXBCOztBQUVBLFNBQVMyQixLQUFULEdBQWlCO0FBQ2IsT0FBSzRDLEdBQUwsR0FBVyxFQUFYO0FBQ0EsT0FBS0MsTUFBTCxHQUFjLElBQWQ7QUFDQSxPQUFLbEUsS0FBTCxHQUFhLElBQWI7QUFDQSxPQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLE9BQUtrRSxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsT0FBS0MsV0FBTCxHQUFtQixFQUFuQjtBQUNBLE9BQUtDLEtBQUwsR0FBYSxHQUFiO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQixDQUFsQjtBQUVIOztBQUVEakQsS0FBSyxDQUFDbEIsU0FBTixDQUFnQjJCLFdBQWhCLEdBQThCLFlBQVc7QUFFckMsTUFBSXVDLEtBQUssR0FBRyxFQUFaOztBQUNBLE9BQUssSUFBSWpDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS2lDLEtBQXpCLEVBQWdDakMsQ0FBQyxFQUFqQyxFQUFxQztBQUNqQ2lDLFNBQUssQ0FBQ2pDLENBQUQsQ0FBTCxHQUFXLElBQUk0QixJQUFKLENBQ1BILElBQUksQ0FBQ1UsTUFBTCxLQUFnQixLQUFLdkUsS0FEZCxFQUVQNkQsSUFBSSxDQUFDVSxNQUFMLEtBQWdCLEtBQUt0RSxNQUZkLEVBR1A0RCxJQUFJLENBQUNVLE1BQUwsS0FBZ0IsQ0FBaEIsR0FBb0IsQ0FIYixFQUlOVixJQUFJLENBQUNVLE1BQUwsTUFBaUIsS0FBS0gsV0FBTCxHQUFtQixLQUFLRCxXQUF6QyxDQUFELEdBQTBELEtBQUtBLFdBSnhELENBQVg7QUFNSDs7QUFDRCxPQUFLRSxLQUFMLEdBQWFBLEtBQWI7QUFDSCxDQVpEOztBQWNBaEQsS0FBSyxDQUFDbEIsU0FBTixDQUFnQkMsTUFBaEIsR0FBeUIsWUFBVztBQUNoQyxNQUFJQyxNQUFNLEdBQUcsSUFBSSxLQUFLNEQsR0FBdEI7O0FBQ0EsT0FBSyxJQUFJN0IsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLaUMsS0FBTCxDQUFXOUIsTUFBL0IsRUFBdUNILENBQUMsRUFBeEMsRUFBNEM7QUFDeEMsUUFBSW9DLElBQUksR0FBRyxLQUFLSCxLQUFMLENBQVdqQyxDQUFYLENBQVg7QUFDQW9DLFFBQUksQ0FBQ2hFLENBQUwsSUFBVUgsTUFBTSxHQUFHbUUsSUFBSSxDQUFDQyxRQUF4Qjs7QUFDQSxRQUFJRCxJQUFJLENBQUNoRSxDQUFMLEdBQVMsS0FBS1AsTUFBbEIsRUFBMEI7QUFDdEIsV0FBS29FLEtBQUwsQ0FBV2pDLENBQVgsSUFBZ0IsSUFBSTRCLElBQUosQ0FDYkgsSUFBSSxDQUFDVSxNQUFMLEtBQWdCLEtBQUt2RSxLQURSLEVBRVosQ0FGWSxFQUdaNkQsSUFBSSxDQUFDVSxNQUFMLEtBQWdCLENBQWhCLEdBQW9CLENBSFIsRUFJWFYsSUFBSSxDQUFDVSxNQUFMLE1BQWlCLEtBQUtILFdBQUwsR0FBbUIsS0FBS0QsV0FBekMsQ0FBRCxHQUEwRCxLQUFLQSxXQUpuRCxDQUFoQjtBQU1IO0FBQ0o7QUFDSixDQWREOztBQWlCQTlDLEtBQUssQ0FBQ2xCLFNBQU4sQ0FBZ0IwQixJQUFoQixHQUF1QixVQUFTNkMsR0FBVCxFQUFjO0FBQ2pDLE1BQUlDLElBQUksR0FBRyxJQUFYO0FBRUEsT0FBS0wsVUFBTCxHQUFrQk0sV0FBVyxDQUFDLFlBQVc7QUFDckNELFFBQUksQ0FBQ3ZFLE1BQUw7QUFDQXVFLFFBQUksQ0FBQ0UsSUFBTDtBQUNILEdBSDRCLEVBRzFCLE9BQU8sS0FBS1osR0FIYyxDQUE3QjtBQUtBLE9BQUthLFlBQUwsR0FBb0JKLEdBQXBCO0FBQ0FDLE1BQUksQ0FBQzNFLEtBQUwsR0FBYWlELE1BQU0sQ0FBQzhCLFVBQXBCO0FBQ0FKLE1BQUksQ0FBQzFFLE1BQUwsR0FBY2dELE1BQU0sQ0FBQytCLFdBQXJCO0FBRUEvQixRQUFNLENBQUMxQixnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxTQUFTMEQsTUFBVCxDQUFnQkMsS0FBaEIsRUFBdUI7QUFDckRQLFFBQUksQ0FBQzNFLEtBQUwsR0FBYWlELE1BQU0sQ0FBQzhCLFVBQXBCO0FBQ0FKLFFBQUksQ0FBQzFFLE1BQUwsR0FBY2dELE1BQU0sQ0FBQytCLFdBQXJCO0FBQ0FMLFFBQUksQ0FBQ1QsTUFBTCxDQUFZbEUsS0FBWixHQUFvQjJFLElBQUksQ0FBQzNFLEtBQXpCO0FBQ0EyRSxRQUFJLENBQUNULE1BQUwsQ0FBWWpFLE1BQVosR0FBcUIwRSxJQUFJLENBQUMxRSxNQUExQjtBQUNBMEUsUUFBSSxDQUFDRSxJQUFMO0FBQ0gsR0FORDtBQVFBLE1BQUlYLE1BQU0sR0FBRzVDLFFBQVEsQ0FBQzZELGFBQVQsQ0FBdUIsUUFBdkIsQ0FBYjtBQUNBVCxLQUFHLENBQUNVLFdBQUosQ0FBZ0JsQixNQUFoQjtBQUNBLE9BQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNBLE9BQUtBLE1BQUwsQ0FBWWxFLEtBQVosR0FBb0IsS0FBS0EsS0FBekI7QUFDQSxPQUFLa0UsTUFBTCxDQUFZakUsTUFBWixHQUFxQixLQUFLQSxNQUExQjtBQUNILENBekJEOztBQTJCQW9CLEtBQUssQ0FBQ2xCLFNBQU4sQ0FBZ0IwRSxJQUFoQixHQUF1QixZQUFXO0FBQzlCLE1BQUk3QyxPQUFPLEdBQUcsS0FBS2tDLE1BQUwsQ0FBWWpDLFVBQVosQ0FBdUIsSUFBdkIsQ0FBZDtBQUNBRCxTQUFPLENBQUNFLFNBQVIsR0FBb0IsU0FBcEI7QUFDQUYsU0FBTyxDQUFDRyxRQUFSLENBQWlCLENBQWpCLEVBQW9CLENBQXBCLEVBQXVCLEtBQUtuQyxLQUE1QixFQUFtQyxLQUFLQyxNQUF4QztBQUVBK0IsU0FBTyxDQUFDRSxTQUFSLEdBQW9CLFNBQXBCOztBQUNBLE9BQUssSUFBSUUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLaUMsS0FBTCxDQUFXOUIsTUFBL0IsRUFBdUNILENBQUMsRUFBeEMsRUFBNEM7QUFDeEMsUUFBSW9DLElBQUksR0FBRyxLQUFLSCxLQUFMLENBQVdqQyxDQUFYLENBQVg7QUFDQUosV0FBTyxDQUFDRyxRQUFSLENBQWlCcUMsSUFBSSxDQUFDakUsQ0FBdEIsRUFBeUJpRSxJQUFJLENBQUNoRSxDQUE5QixFQUFpQ2dFLElBQUksQ0FBQ2EsSUFBdEMsRUFBNENiLElBQUksQ0FBQ2EsSUFBakQ7QUFDSDtBQUVKLENBWEQ7O0FBYUE1RSxNQUFNLENBQUNDLE9BQVAsR0FBaUJXLEtBQWpCLEM7Ozs7Ozs7Ozs7O0FDckZBLFNBQVMyQyxJQUFULENBQWN6RCxDQUFkLEVBQWlCQyxDQUFqQixFQUFvQjZFLElBQXBCLEVBQTBCWixRQUExQixFQUFvQztBQUNoQyxPQUFLbEUsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsT0FBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsT0FBSzZFLElBQUwsR0FBWUEsSUFBWjtBQUNBLE9BQUtaLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0g7O0FBRURoRSxNQUFNLENBQUNDLE9BQVAsR0FBaUJzRCxJQUFqQixDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImNvbnN0IFJlY3RhbmdsZSA9IHJlcXVpcmUoJy4vcmVjdGFuZ2xlJylcblxuZnVuY3Rpb24gRW50aXR5KHBvc2l0aW9uLCBzcGVlZCwgZGlyZWN0aW9uKSB7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uXG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkXG4gICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb25cbiAgICB0aGlzLnRpbWUgPSAwXG4gICAgdGhpcy53aWR0aCA9IDVcbiAgICB0aGlzLmhlaWdodCA9IDVcbiAgICB0aGlzLmhwID0gMVxufVxuXG5FbnRpdHkucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKGRlbHRhVCkge1xuICAgIHRoaXMudGltZSArPSBkZWx0YVRcbn1cblxuRW50aXR5LnByb3RvdHlwZS5jb2xsaXNpb25SZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUodGhpcy5wb3NpdGlvbi54IC0gdGhpcy53aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgLSB0aGlzLmhlaWdodCAvIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gRW50aXR5IiwiY29uc3QgRW50aXR5ID0gcmVxdWlyZSgnLi9lbnRpdHknKVxuXG5mdW5jdGlvbiBQbGF5ZXIocG9zaXRpb24sIHNwZWVkLCBkaXJlY3Rpb24pIHtcbiAgICBFbnRpdHkuY2FsbCh0aGlzLCBwb3NpdGlvbiwgc3BlZWQsIGRpcmVjdGlvbilcblxuICAgIHRoaXMud2lkdGggPSAyMFxuICAgIHRoaXMuaGVpZ2h0ID0gMTBcbn1cblBsYXllci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVudGl0eS5wcm90b3R5cGUpXG5cblBsYXllci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRlbHRhVCwgZ2FtZSkge1xuICAgIEVudGl0eS5wcm90b3R5cGUudXBkYXRlLmNhbGwodGhpcywgZGVsdGFUKVxuXG4gICAgaWYgKHRoaXMuY29sbGlzaW9uUmVjdCgpLnRvcCgpIDw9IDAgfHwgXG4gICAgICAgIHRoaXMuY29sbGlzaW9uUmVjdCgpLmJvdHRvbSgpID49IGdhbWUuZ2FtZUZpZWxkUmVjdCgpLmJvdHRvbSgpKSB7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiAqPSAtMVxuICAgICAgICB9XG5cbn1cblxuZnVuY3Rpb24gRW5lbXkocG9zaXRpb24sIHNwZWVkLCBkaXJlY3Rpb24sIHJhbmspIHtcbiAgICBFbnRpdHkuY2FsbCh0aGlzLCBwb3NpdGlvbiwgc3BlZWQsIGRpcmVjdGlvbilcblxuICAgIHRoaXMud2lkdGggPSAxM1xuICAgIHRoaXMuaGVpZ2h0ID0gMTBcbiAgICB0aGlzLnJhbmsgPSByYW5rXG59XG5FbmVteS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVudGl0eS5wcm90b3R5cGUpXG5cbkVuZW15LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZGVsdGFULCBnYW1lKSB7XG4gICAgRW50aXR5LnByb3RvdHlwZS51cGRhdGUuY2FsbCh0aGlzLCBkZWx0YVQpXG5cbiAgICBpZiAodGhpcy5jb2xsaXNpb25SZWN0KCkudG9wKCkgPD0gMCB8fCBcbiAgICAgICAgdGhpcy5jb2xsaXNpb25SZWN0KCkuYm90dG9tKCkgPj0gZ2FtZS5nYW1lRmllbGRSZWN0KCkuYm90dG9tKCkpIHtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24ueSAqPSAtMVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgUGxheWVyLFxuICAgIEVuZW15XG59IiwiY29uc3QgU3BhY2UgPSByZXF1aXJlKCcuL3NwYWNlJylcbmNvbnN0IHsgUGxheWVyLCBFbmVteSB9ID0gcmVxdWlyZSgnLi9nYW1lLWVudGl0aWVzJylcblxuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxuICAgIHZhciByZW5kZXJlciA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICBcblxuICAgICAgICAvLyBmdW5jdGlvbiBfZHJhd0VuZW15KGNvbnRleHQsIGVuZW15KSB7XG4gICAgICAgIC8vICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwicmVkXCJcbiAgICAgICAgLy8gICAgIGNvbnRleHQuZmlsbFJlY3QoZW5lbXkueCwgZW5lbXkueSwgZW5lbXkud2lkdGgsIGVuZW15LmhlaWdodClcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIGZ1bmN0aW9uIF9kcmF3UGxheWVyKGNvbnRleHQsIHBsYXllcikge1xuICAgICAgICAvLyAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcImJsdWVcIlxuICAgICAgICAvLyAgICAgY29udGV4dC5maWxsUmVjdChwbGF5ZXIueCwgcGxheWVyLnksIHBsYXllci53aWR0aCwgcGxheWVyLmhlaWdodClcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9yZW5kZXIoKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJcIilcbiAgICAgICAgICAgIGxldCBzcGFjZSA9IG5ldyBTcGFjZSgpXG4gICAgICAgICAgICBzcGFjZS5pbml0KGNvbnRhaW5lcilcbiAgICAgICAgICAgIHNwYWNlLmNyZWF0ZVN0YXJzKClcblxuICAgICAgICAgICAgdmFyIGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVDYW52YXNcIilcbiAgICAgICAgICAgIGxldCBjb250ZXh0ID0gZ2FtZUNvbnRhaW5lci5nZXRDb250ZXh0KFwiMmRcIilcblxuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcImJsYWNrXCJcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCBnYW1lQ29udGFpbmVyLndpZHRoLCBnYW1lQ29udGFpbmVyLmhlaWdodClcblxuXG4gICAgICAgICAgICB2YXIgaSwgZW50aXR5LCBlbnRpdGllcyA9IGdhbWUuZW50aXRpZXMoKVxuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZW50aXRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBlbnRpdHkgPSBlbnRpdGllc1tpXVxuXG4gICAgICAgICAgICAgICAgaWYgKGVudGl0eSBpbnN0YW5jZW9mIEVuZW15KSB7XG4gICAgICAgICAgICAgICAgICAgIF9kcmF3RW5lbXkoY29udGV4dCwgZW50aXR5KVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZW50aXR5IGluc3RhbmNlb2YgUGxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIF9kcmF3UGxheWVyKGNvbnRleHQsIGVudGl0eSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlbmRlcjogX3JlbmRlclxuICAgICAgICB9XG4gICAgfSkoKVxuXG4gICAgdmFyIHBoeXNpY3MgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgICAgICAgICB2YXIgaSwgZW50aXRpZXMgPSBnYW1lLmVudGl0aWVzKClcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGVudGl0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZW50aXRpZXNbaV0ueSArPSBlbnRpdGllc1tpXS5kaXJlY3Rpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1cGRhdGU6IF91cGRhdGVcbiAgICAgICAgfVxuICAgIH0pKClcblxuICAgIHZhciBnYW1lID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX2dhbWVGaWVsZEhlaWdodCA9IDIwMFxuICAgICAgICB2YXIgX2VudGl0aWVzID0gW11cblxuICAgICAgICBmdW5jdGlvbiBfc3RhcnQoKSB7XG4gICAgICAgICAgICBfZW50aXRpZXMucHVzaChuZXcgUGxheWVyKDEwMCwgMTc1KSlcbiAgICAgICAgICAgIF9lbnRpdGllcy5wdXNoKG5ldyBFbmVteSgyMCwgMjUpKVxuICAgICAgICAgICAgX2VudGl0aWVzLnB1c2gobmV3IEVuZW15KDgwLCAyNSkpXG4gICAgICAgICAgICBfZW50aXRpZXMucHVzaChuZXcgRW5lbXkoMTYwLCAyNSkpXG5cbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgICAgICAgICBwaHlzaWNzLnVwZGF0ZSgpXG5cbiAgICAgICAgICAgIHZhciBpXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgX2VudGl0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgX2VudGl0aWVzW2ldLnVwZGF0ZSh0aGlzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVuZGVyZXIucmVuZGVyKClcblxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiBfc3RhcnQsXG4gICAgICAgICAgICB1cGRhdGU6IF91cGRhdGUsXG4gICAgICAgICAgICBlbnRpdGllczogZnVuY3Rpb24oKSB7IHJldHVybiBfZW50aXRpZXMgfSxcbiAgICAgICAgICAgIGdhbWVGaWVsZEhlaWdodDogZnVuY3Rpb24oKSB7IHJldHVybiBfZ2FtZUZpZWxkSGVpZ2h0IH0sXG4gICAgICAgIH1cblxuICAgIH0pKClcblxuICAgIGdhbWUuc3RhcnQoKVxuICAgIFxufSkiLCJmdW5jdGlvbiBSZWN0YW5nbGUoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMueCA9IHhcbiAgICB0aGlzLnkgPSB5XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHRcbn1cblxuUmVjdGFuZ2xlLnByb3RvdHlwZS5sZWZ0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMueFxufVxuXG5SZWN0YW5nbGUucHJvdG90eXBlLnJpZ2h0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMueCArIHRoaXMud2lkdGhcbn1cblxuUmVjdGFuZ2xlLnByb3RvdHlwZS50b3AgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy55XG59XG5cblJlY3RhbmdsZS5wcm90b3R5cGUuYm90dG9tID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMueSArIHRoaXMuaGVpZ2h0XG59XG5cblJlY3RhbmdsZS5wcm90b3R5cGUuaW50ZXJzZWN0cyA9IGZ1bmN0aW9uKHIyKSB7XG4gICAgcmV0dXJuICh0aGlzLnJpZ2h0KCkgPj0gcjIubGVmdCgpICYmIHRoaXMubGVmdCgpIDw9IHIyLnJpZ2h0KCkpICYmIFxuICAgIHRoaXMudG9wKCkgPD0gcjIuYm90dG9tKCkgJiYgdGhpcy5ib3R0b20gPj0gcjIudG9wKClcbn0gXG5cbmZ1bmN0aW9uIHJlY3RVbmlvbihyMSwgcjIpIHtcbiAgICB2YXIgeCwgeSwgd2lkdGgsIGhlaWdodFxuXG4gICAgaWYgKHIxID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHIyXG4gICAgfVxuXG4gICAgaWYgKHIyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHIxXG4gICAgfVxuXG4gICAgeCA9IE1hdGgubWluKHIxLngsIHIyLngpXG4gICAgeSA9IE1hdGgubWluKHIxLnksIHIyLnkpXG4gICAgd2lkdGggPSBNYXRoLm1heChyMS5yaWdodCgpLCByMi5yaWdodCgpKSAtIE1hdGgubWluKHIxLmxlZnQoKSwgcjIubGVmdCgpKVxuICAgIGhlaWdodCA9IE1hdGgubWF4KHIxLmJvdHRvbSgpLCByMi5ib3R0b20oKSkgLSBNYXRoLm1pbihyMS50b3AoKSwgcjIudG9wKCkpXG5cbiAgICByZXR1cm4gbmV3IFJlY3RhbmdsZSh4LCB5LCB3aWR0aCwgaGVpZ2h0KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlY3RhbmdsZSIsImNvbnN0IFN0YXIgPSByZXF1aXJlKCcuL3N0YXInKVxuXG5mdW5jdGlvbiBTcGFjZSgpIHtcbiAgICB0aGlzLmZwcyA9IDMwXG4gICAgdGhpcy5jYW52YXMgPSBudWxsXG4gICAgdGhpcy53aWR0aCA9IDEwMDBcbiAgICB0aGlzLmhlaWdodCA9IDBcbiAgICB0aGlzLm1pblZlbG9jaXR5ID0gMzVcbiAgICB0aGlzLm1heFZlbG9jaXR5ID0gNTBcbiAgICB0aGlzLnN0YXJzID0gMjAwXG4gICAgdGhpcy5pbnRlcnZhbElkID0gMFxuICAgIFxufVxuXG5TcGFjZS5wcm90b3R5cGUuY3JlYXRlU3RhcnMgPSBmdW5jdGlvbigpIHtcblxuICAgIGxldCBzdGFycyA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0YXJzOyBpKyspIHtcbiAgICAgICAgc3RhcnNbaV0gPSBuZXcgU3RhcihcbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiB0aGlzLndpZHRoLCBcbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiB0aGlzLmhlaWdodCwgXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogMyArIDEsIFxuICAgICAgICAgICAgKE1hdGgucmFuZG9tKCkgKiAodGhpcy5tYXhWZWxvY2l0eSAtIHRoaXMubWluVmVsb2NpdHkpKSArIHRoaXMubWluVmVsb2NpdHlcbiAgICAgICAgKVxuICAgIH1cbiAgICB0aGlzLnN0YXJzID0gc3RhcnNcbn1cblxuU3BhY2UucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBkZWx0YVQgPSAxIC8gdGhpcy5mcHNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHN0YXIgPSB0aGlzLnN0YXJzW2ldXG4gICAgICAgIHN0YXIueSArPSBkZWx0YVQgKiBzdGFyLnZlbG9jaXR5XG4gICAgICAgIGlmIChzdGFyLnkgPiB0aGlzLmhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5zdGFyc1tpXSA9IG5ldyBTdGFyKFxuICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIHRoaXMud2lkdGgsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogMyArIDEsXG4gICAgICAgICAgICAgICAgKE1hdGgucmFuZG9tKCkgKiAodGhpcy5tYXhWZWxvY2l0eSAtIHRoaXMubWluVmVsb2NpdHkpKSArIHRoaXMubWluVmVsb2NpdHlcbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5TcGFjZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKGRpdikge1xuICAgIGxldCBzZWxmID0gdGhpc1xuXG4gICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYudXBkYXRlKClcbiAgICAgICAgc2VsZi5kcmF3KClcbiAgICB9LCAxMDAwIC8gdGhpcy5mcHMpXG5cbiAgICB0aGlzLmNvbnRhaW5lckRpdiA9IGRpdlxuICAgIHNlbGYud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIHNlbGYuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gcmVzaXplKGV2ZW50KSB7XG4gICAgICAgIHNlbGYud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICBzZWxmLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICBzZWxmLmNhbnZhcy53aWR0aCA9IHNlbGYud2lkdGhcbiAgICAgICAgc2VsZi5jYW52YXMuaGVpZ2h0ID0gc2VsZi5oZWlnaHRcbiAgICAgICAgc2VsZi5kcmF3KClcbiAgICB9KVxuXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgZGl2LmFwcGVuZENoaWxkKGNhbnZhcylcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhc1xuICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy53aWR0aFxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0XG59XG5cblNwYWNlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIilcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjMDAwMDAwJ1xuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG5cbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjYWRkNmZmJ1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgc3RhciA9IHRoaXMuc3RhcnNbaV1cbiAgICAgICAgY29udGV4dC5maWxsUmVjdChzdGFyLngsIHN0YXIueSwgc3Rhci5zaXplLCBzdGFyLnNpemUpXG4gICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3BhY2UiLCJmdW5jdGlvbiBTdGFyKHgsIHksIHNpemUsIHZlbG9jaXR5KSB7XG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgICB0aGlzLnNpemUgPSBzaXplXG4gICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5XG59IFxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXIiXSwic291cmNlUm9vdCI6IiJ9