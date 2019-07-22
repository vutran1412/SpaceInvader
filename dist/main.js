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

/***/ "./src/game-entities.js":
/*!******************************!*\
  !*** ./src/game-entities.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function Player(x, y) {
  this.x = x;
  this.y = y;
  this.width = 20;
  this.height = 20;
  this.direction = -1;
}

Player.prototype.update = function (game) {
  if (this.y <= 0 || this.y + this.height >= game.gameFieldHeight()) {
    this.direction *= -1;
  }
};

function Enemy(x, y) {
  this.x = x;
  this.y = y;
  this.width = 10;
  this.height = 10;
  this.direction = 1;
}

Enemy.prototype.update = function (game) {
  if (this.y <= 0 || this.y + this.height >= game.gameFieldHeight()) {
    this.direction *= -1;
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
    function _drawEnemy(context, enemy) {
      context.fillStyle = "red";
      context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }

    function _drawPlayer(context, player) {
      context.fillStyle = "blue";
      context.fillRect(player.x, player.y, player.width, player.height);
    }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUtZW50aXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zcGFjZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3Rhci5qcyJdLCJuYW1lcyI6WyJQbGF5ZXIiLCJ4IiwieSIsIndpZHRoIiwiaGVpZ2h0IiwiZGlyZWN0aW9uIiwicHJvdG90eXBlIiwidXBkYXRlIiwiZ2FtZSIsImdhbWVGaWVsZEhlaWdodCIsIkVuZW15IiwibW9kdWxlIiwiZXhwb3J0cyIsIlNwYWNlIiwicmVxdWlyZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbmRlcmVyIiwiX2RyYXdFbmVteSIsImNvbnRleHQiLCJlbmVteSIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiX2RyYXdQbGF5ZXIiLCJwbGF5ZXIiLCJfcmVuZGVyIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJzcGFjZSIsImluaXQiLCJjcmVhdGVTdGFycyIsImdhbWVDb250YWluZXIiLCJnZXRDb250ZXh0IiwiaSIsImVudGl0eSIsImVudGl0aWVzIiwibGVuZ3RoIiwicmVuZGVyIiwicGh5c2ljcyIsIl91cGRhdGUiLCJfZ2FtZUZpZWxkSGVpZ2h0IiwiX2VudGl0aWVzIiwiX3N0YXJ0IiwicHVzaCIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImJpbmQiLCJzdGFydCIsIlN0YXIiLCJmcHMiLCJjYW52YXMiLCJtaW5WZWxvY2l0eSIsIm1heFZlbG9jaXR5Iiwic3RhcnMiLCJpbnRlcnZhbElkIiwiTWF0aCIsInJhbmRvbSIsImRlbHRhVCIsInN0YXIiLCJ2ZWxvY2l0eSIsImRpdiIsInNlbGYiLCJzZXRJbnRlcnZhbCIsImRyYXciLCJjb250YWluZXJEaXYiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJyZXNpemUiLCJldmVudCIs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QUtxRSxJQUFMLEdBQVlBLElBQVo7QUFDQSxPQUFLWixRQUFMLEdBQWdCQSxRQUFoQjtBQUNIOztBQUVEaEQsTUFBTSxDQUFDQyxPQUFQLEdBQWlCb0MsSUFBakIsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJmdW5jdGlvbiBQbGF5ZXIoeCwgeSkge1xuICAgIHRoaXMueCA9IHhcbiAgICB0aGlzLnkgPSB5XG4gICAgdGhpcy53aWR0aCA9IDIwXG4gICAgdGhpcy5oZWlnaHQgPSAyMFxuICAgIHRoaXMuZGlyZWN0aW9uID0gLTFcbn1cblxuUGxheWVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZ2FtZSkge1xuICAgIGlmICh0aGlzLnkgPD0gMCB8fCB0aGlzLnkgKyB0aGlzLmhlaWdodCA+PSBnYW1lLmdhbWVGaWVsZEhlaWdodCgpKSB7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uICo9IC0xXG4gICAgfVxufVxuXG5mdW5jdGlvbiBFbmVteSh4LCB5KSB7XG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgICB0aGlzLndpZHRoID0gMTBcbiAgICB0aGlzLmhlaWdodCA9IDEwXG4gICAgdGhpcy5kaXJlY3Rpb24gPSAxXG59XG5cbkVuZW15LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZ2FtZSkge1xuICAgIGlmICh0aGlzLnkgPD0gMCB8fCB0aGlzLnkgKyB0aGlzLmhlaWdodCA+PSBnYW1lLmdhbWVGaWVsZEhlaWdodCgpKSB7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uICo9IC0xXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBQbGF5ZXIsXG4gICAgRW5lbXlcbn0iLCJjb25zdCBTcGFjZSA9IHJlcXVpcmUoJy4vc3BhY2UnKVxuY29uc3QgeyBQbGF5ZXIsIEVuZW15IH0gPSByZXF1aXJlKCcuL2dhbWUtZW50aXRpZXMnKVxuXG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gICAgdmFyIHJlbmRlcmVyID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBmdW5jdGlvbiBfZHJhd0VuZW15KGNvbnRleHQsIGVuZW15KSB7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwicmVkXCJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoZW5lbXkueCwgZW5lbXkueSwgZW5lbXkud2lkdGgsIGVuZW15LmhlaWdodClcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9kcmF3UGxheWVyKGNvbnRleHQsIHBsYXllcikge1xuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcImJsdWVcIlxuICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdChwbGF5ZXIueCwgcGxheWVyLnksIHBsYXllci53aWR0aCwgcGxheWVyLmhlaWdodClcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9yZW5kZXIoKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJcIilcbiAgICAgICAgICAgIGxldCBzcGFjZSA9IG5ldyBTcGFjZSgpXG4gICAgICAgICAgICBzcGFjZS5pbml0KGNvbnRhaW5lcilcbiAgICAgICAgICAgIHNwYWNlLmNyZWF0ZVN0YXJzKClcblxuICAgICAgICAgICAgdmFyIGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVDYW52YXNcIilcbiAgICAgICAgICAgIGxldCBjb250ZXh0ID0gZ2FtZUNvbnRhaW5lci5nZXRDb250ZXh0KFwiMmRcIilcblxuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcImJsYWNrXCJcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCBnYW1lQ29udGFpbmVyLndpZHRoLCBnYW1lQ29udGFpbmVyLmhlaWdodClcblxuXG4gICAgICAgICAgICB2YXIgaSwgZW50aXR5LCBlbnRpdGllcyA9IGdhbWUuZW50aXRpZXMoKVxuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZW50aXRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBlbnRpdHkgPSBlbnRpdGllc1tpXVxuXG4gICAgICAgICAgICAgICAgaWYgKGVudGl0eSBpbnN0YW5jZW9mIEVuZW15KSB7XG4gICAgICAgICAgICAgICAgICAgIF9kcmF3RW5lbXkoY29udGV4dCwgZW50aXR5KVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZW50aXR5IGluc3RhbmNlb2YgUGxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIF9kcmF3UGxheWVyKGNvbnRleHQsIGVudGl0eSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlbmRlcjogX3JlbmRlclxuICAgICAgICB9XG4gICAgfSkoKVxuXG4gICAgdmFyIHBoeXNpY3MgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgICAgICAgICB2YXIgaSwgZW50aXRpZXMgPSBnYW1lLmVudGl0aWVzKClcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGVudGl0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZW50aXRpZXNbaV0ueSArPSBlbnRpdGllc1tpXS5kaXJlY3Rpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1cGRhdGU6IF91cGRhdGVcbiAgICAgICAgfVxuICAgIH0pKClcblxuICAgIHZhciBnYW1lID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX2dhbWVGaWVsZEhlaWdodCA9IDIwMFxuICAgICAgICB2YXIgX2VudGl0aWVzID0gW11cblxuICAgICAgICBmdW5jdGlvbiBfc3RhcnQoKSB7XG4gICAgICAgICAgICBfZW50aXRpZXMucHVzaChuZXcgUGxheWVyKDEwMCwgMTc1KSlcbiAgICAgICAgICAgIF9lbnRpdGllcy5wdXNoKG5ldyBFbmVteSgyMCwgMjUpKVxuICAgICAgICAgICAgX2VudGl0aWVzLnB1c2gobmV3IEVuZW15KDgwLCAyNSkpXG4gICAgICAgICAgICBfZW50aXRpZXMucHVzaChuZXcgRW5lbXkoMTYwLCAyNSkpXG5cbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgICAgICAgICBwaHlzaWNzLnVwZGF0ZSgpXG5cbiAgICAgICAgICAgIHZhciBpXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgX2VudGl0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgX2VudGl0aWVzW2ldLnVwZGF0ZSh0aGlzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVuZGVyZXIucmVuZGVyKClcblxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiBfc3RhcnQsXG4gICAgICAgICAgICB1cGRhdGU6IF91cGRhdGUsXG4gICAgICAgICAgICBlbnRpdGllczogZnVuY3Rpb24oKSB7IHJldHVybiBfZW50aXRpZXMgfSxcbiAgICAgICAgICAgIGdhbWVGaWVsZEhlaWdodDogZnVuY3Rpb24oKSB7IHJldHVybiBfZ2FtZUZpZWxkSGVpZ2h0IH0sXG4gICAgICAgIH1cblxuICAgIH0pKClcblxuICAgIGdhbWUuc3RhcnQoKVxuICAgIFxufSkiLCJjb25zdCBTdGFyID0gcmVxdWlyZSgnLi9zdGFyJylcblxuZnVuY3Rpb24gU3BhY2UoKSB7XG4gICAgdGhpcy5mcHMgPSAzMFxuICAgIHRoaXMuY2FudmFzID0gbnVsbFxuICAgIHRoaXMud2lkdGggPSAxMDAwXG4gICAgdGhpcy5oZWlnaHQgPSAwXG4gICAgdGhpcy5taW5WZWxvY2l0eSA9IDM1XG4gICAgdGhpcy5tYXhWZWxvY2l0eSA9IDUwXG4gICAgdGhpcy5zdGFycyA9IDIwMFxuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IDBcbiAgICBcbn1cblxuU3BhY2UucHJvdG90eXBlLmNyZWF0ZVN0YXJzID0gZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgc3RhcnMgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFyczsgaSsrKSB7XG4gICAgICAgIHN0YXJzW2ldID0gbmV3IFN0YXIoXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy53aWR0aCwgXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy5oZWlnaHQsIFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIDMgKyAxLCBcbiAgICAgICAgICAgIChNYXRoLnJhbmRvbSgpICogKHRoaXMubWF4VmVsb2NpdHkgLSB0aGlzLm1pblZlbG9jaXR5KSkgKyB0aGlzLm1pblZlbG9jaXR5XG4gICAgICAgIClcbiAgICB9XG4gICAgdGhpcy5zdGFycyA9IHN0YXJzXG59XG5cblNwYWNlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgICBsZXQgZGVsdGFUID0gMSAvIHRoaXMuZnBzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0YXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBzdGFyID0gdGhpcy5zdGFyc1tpXVxuICAgICAgICBzdGFyLnkgKz0gZGVsdGFUICogc3Rhci52ZWxvY2l0eVxuICAgICAgICBpZiAoc3Rhci55ID4gdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnNbaV0gPSBuZXcgU3RhcihcbiAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiB0aGlzLndpZHRoLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIDMgKyAxLFxuICAgICAgICAgICAgICAgIChNYXRoLnJhbmRvbSgpICogKHRoaXMubWF4VmVsb2NpdHkgLSB0aGlzLm1pblZlbG9jaXR5KSkgKyB0aGlzLm1pblZlbG9jaXR5XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuU3BhY2UucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbihkaXYpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXNcblxuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLnVwZGF0ZSgpXG4gICAgICAgIHNlbGYuZHJhdygpXG4gICAgfSwgMTAwMCAvIHRoaXMuZnBzKVxuXG4gICAgdGhpcy5jb250YWluZXJEaXYgPSBkaXZcbiAgICBzZWxmLndpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICBzZWxmLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uIHJlc2l6ZShldmVudCkge1xuICAgICAgICBzZWxmLndpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgc2VsZi5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgc2VsZi5jYW52YXMud2lkdGggPSBzZWxmLndpZHRoXG4gICAgICAgIHNlbGYuY2FudmFzLmhlaWdodCA9IHNlbGYuaGVpZ2h0XG4gICAgICAgIHNlbGYuZHJhdygpXG4gICAgfSlcblxuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIGRpdi5hcHBlbmRDaGlsZChjYW52YXMpXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXNcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMud2lkdGhcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodFxufVxuXG5TcGFjZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBjb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnIzAwMDAwMCdcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnI2FkZDZmZidcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHN0YXIgPSB0aGlzLnN0YXJzW2ldXG4gICAgICAgIGNvbnRleHQuZmlsbFJlY3Qoc3Rhci54LCBzdGFyLnksIHN0YXIuc2l6ZSwgc3Rhci5zaXplKVxuICAgIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNwYWNlIiwiZnVuY3Rpb24gU3Rhcih4LCB5LCBzaXplLCB2ZWxvY2l0eSkge1xuICAgIHRoaXMueCA9IHhcbiAgICB0aGlzLnkgPSB5XG4gICAgdGhpcy5zaXplID0gc2l6ZVxuICAgIHRoaXMudmVsb2NpdHkgPSB2ZWxvY2l0eVxufSBcblxubW9kdWxlLmV4cG9ydHMgPSBTdGFyIl0sInNvdXJjZVJvb3QiOiIifQ==