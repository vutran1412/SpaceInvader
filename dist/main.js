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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var WelcomeState = __webpack_require__(/*! ./welcome */ "./src/welcome.js");

function Game() {
  this.config = {
    bombRate: 0.05,
    bombMinVelocity: 50,
    bombMaxVelocity: 50,
    invaderInitialVelocity: 25,
    invaderAcceleration: 0,
    invaderDropDistance: 20,
    rocketVelocity: 120,
    rocketMaxFireRate: 2,
    gameWidth: 600,
    gameHeight: 500,
    fps: 50,
    debugMode: false,
    invaderRanks: 5,
    invaderfiles: 10,
    shipSpeed: 120,
    levelDifficultyMultiplier: 0.2,
    pointsPerInvader: 5
  };
  this.lives = 3;
  this.width = 0;
  this.height = 0;
  this.gameBounds = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  };
  this.stateStack = [];
  this.pressedKeys = {};
  this.gameCanvas = null;
}

function gameLoop(game) {
  var currentState = game.currentState();

  if (currentState) {
    var deltaT = 1 / game.config.fps;
    var gameContext = game.gameCanvas.getContext("2d");

    if (currentState.update) {
      currentState.update(game, deltaT);
    }

    if (currentState.draw) {
      currentState.draw(game, deltaT, gameContext);
    }
  }
}

Game.prototype.start = function () {
  this.moveToState(new WelcomeState());
  this.lives = 3;
  this.config.debugMode = /debug=true/.test(window.location.href);
  var game = this;
  this.intervalId = setInterval(function () {
    gameLoop(game);
  }, 1000 / this.config.fps);
};

Game.prototype.init = function (gameCanvas) {
  this.gameCanvas = gameCanvas;
  this.width = gameCanvas.width;
  this.height = gameCanvas.height;
  this.gameBounds = {
    left: gameCanvas.width / 2 - this.config.gameWidth / 2,
    right: gameCanvas.width / 2 - this.config.gameWidth / 2,
    top: gameCanvas.height / 2 - this.config.gameHeight / 2,
    bottom: gameCanvas.height / 2 - this.config.gameHeight / 2
  };
};

Game.prototype.currentState = function () {
  return this.stateStack.length > 0 ? this.stateStack[this.stateStack.length - 1] : null;
};

Game.prototype.moveToState = function (state) {
  if (this.currentState()) {
    if (this.currentState().leave) {
      this.currentState.leave(game);
    }

    this.stateStack.pop();
  }

  if (state.enter) {
    state.enter(game);
  }

  this.stateStack.push(state);
};

Game.prototype.pushState = function (state) {
  if (state.enter) {
    state.enter(game);
  }

  this.stateStack.push(state);
};

Game.prototype.popState = function () {
  if (this.currentState()) {
    if (this.currentState().leave) {
      this.currentState().leave(game);
    }

    this.stateStack.pop();
  }
};

Game.prototype.keyDown = function (keyCode) {
  this.pressedKeys[keyCode] = true;

  if (this.currentState() && this.currentState().keyDown) {
    this.currentState().keyDown(this, keyCode);
  }
};

Game.prototype.keyUp = function (keyCode) {
  delete this.pressedKeys[keyCode];

  if (this.currentState() && this.currentState().keyUp) {
    this.currentState().keyUp(this, keyCode);
  }
};

module.exports = Game;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Space = __webpack_require__(/*! ./space */ "./src/space.js");

var Game = __webpack_require__(/*! ./game */ "./src/game.js");

document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('container');
  var space = new Space();
  space.init(container);
  space.createStars();
  var canvas = document.getElementById("gameCanvas");
  canvas.width = 800;
  canvas.height = 600;
  var game = new Game();
  game.init(canvas);
  game.start();
  window.addEventListener("keydown", function keydown(e) {
    var keycode = e.which || window.event.keycode;

    if (keycode === 37 || keycode === 39 || keycode === 32) {
      e.preventDefault();
    }

    game.keyDown(keycode);
  });
  window.addEventListener("keyup", function keydown(e) {
    var keycode = e.which || window.event.keycode;
    game.keyUp(keycode);
  });
});

/***/ }),

/***/ "./src/level-intro.js":
/*!****************************!*\
  !*** ./src/level-intro.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function LevelIntroState(level) {
  this.level = level;
  this.countdownMessage = "3";
}

LevelIntroState.prototype.draw = function (game, deltaT, context) {
  context.clearRect(0, 0, game.width, game.height);
  context.font = "36px Helvetica";
  context.fillStyle = "#add6ff";
  context.textBaseLine = "middle";
  context.textAlign = "center";
  context.fillText("Level " + this.level, game.width / 2, game.height / 2);
  context.font = "24px Helvetica";
  context.fillText("Ready in " + this.countdownMessage, game.width / 2, game.height / 2 + 36);
};

LevelIntroState.prototype.update = function (game, deltaT) {
  if (this.countdown === undefined) {
    this.countdown = 3;
  }

  this.countdown -= deltaT;

  if (this.countdown < 2) {
    this.countdownMessage = "2";
  }

  if (this.countdown < 1) {
    this.countdownMessage = "1";
  }

  if (this.countdown <= 0) {
    game.movetoState(new PlayState(game.config, this.level));
  }
};

module.exports = LevelIntroState;

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
  this.maxVelocity = 200;
  this.stars = 400;
  this.intervalId = 0;
}

Space.prototype.createStars = function () {
  var stars = [];

  for (var i = 0; i < this.stars; i++) {
    stars[i] = new Star(Math.random() * this.width, Math.random() * this.height, Math.random() * 3 + 1, Math.random() * (this.maxVelocity - this.minVelocity) + this.minVelocity);
  }

  debugger;
  this.stars = stars;
};

Space.prototype.update = function () {
  var deltaT = 1 / this.fps;

  for (var i = 0; i < this.stars.length; i++) {
    var star = this.stars[i];
    star.x -= deltaT * star.velocity;

    if (star.x < 0) {
      this.stars[i] = new Star(1700, Math.random() * this.height, Math.random() * 3 + 1, Math.random() * (this.maxVelocity - this.minVelocity) + this.minVelocity);
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

/***/ "./src/welcome.js":
/*!************************!*\
  !*** ./src/welcome.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var LevelIntroState = __webpack_require__(/*! ./level-intro */ "./src/level-intro.js");

function WelcomeState() {}

WelcomeState.prototype.draw = function (game, deltaT, context) {
  context.clearRect(0, 0, game.width, game.height);
  context.font = "25px Helvetica";
  context.fillStyle = "#add6ff";
  context.textBaseline = "center";
  context.textAlign = "center";
  context.fillText("Space Invaders", game.width / 2, game.height / 2 - 40);
  context.font = "18px Helvetica";
  context.fillText("Press 'Space' to start", game.width / 2, game.height / 2);
};

WelcomeState.prototype.keyDown = function (game, keyCode) {
  if (keyCode === 32) {
    game.moveToState(new LevelIntroState(game.level));
  }
};

module.exports = WelcomeState;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9sZXZlbC1pbnRyby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3BhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlbGNvbWUuanMiXSwibmFtZXMiOlsiV2VsY29tZVN0YXRlIiwicmVxdWlyZSIsIkdhbWUiLCJjb25maWciLCJib21iUmF0ZSIsImJvbWJNaW5WZWxvY2l0eSIsImJvbWJNYXhWZWxvY2l0eSIsImludmFkZXJJbml0aWFsVmVsb2NpdHkiLCJpbnZhZGVyQWNjZWxlcmF0aW9uIiwiaW52YWRlckRyb3BEaXN0YW5jZSIsInJvY2tldFZlbG9jaXR5Iiwicm9ja2V0TWF4RmlyZVJhdGUiLCJnYW1lV2lkdGgiLCJnYW1lSGVpZ2h0IiwiZnBzIiwiZGVidWdNb2RlIiwiaW52YWRlclJhbmtzIiwiaW52YWRlcmZpbGVzIiwic2hpcFNwZWVkIiwibGV2ZWxEaWZmaWN1bHR5TXVsdGlwbGllciIsInBvaW50c1BlckludmFkZXIiLCJsaXZlcyIsIndpZHRoIiwiaGVpZ2h0IiwiZ2FtZUJvdW5kcyIsImxlZnQiLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsInN0YXRlU3RhY2siLCJwcmVzc2VkS2V5cyIsImdhbWVDYW52YXMiLCJnYW1lTG9vcCIsImdhbWUiLCJjdXJyZW50U3RhdGUiLCJkZWx0YVQiLCJnYW1lQ29udGV4dCIsImdldENvbnRleHQiLCJ1cGRhdGUiLCJkcmF3IiwicHJvdG90eXBlIiwic3RhcnQiLCJtb3ZlVG9TdGF0ZSIsInRlc3QiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJpbnRlcnZhbElkIiwic2V0SW50ZXJ2YWwiLCJpbml0IiwibGVuZ3RoIiwic3RhdGUiLCJsZWF2ZSIsInBvcCIsImVudGVyIiwicHVzaCIsInB1c2hTdGF0ZSIsInBvcFN0YXRlIiwia2V5RG93biIsImtleUNvZGUiLCJrZXlVcCIsIm1vZHVsZSIsImV4cG9ydHMiLCJTcGFjZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwic3BhY2UiLCJjcmVhdGVTdGFycyIsImNhbnZhcyIsImtleWRvd24iLCJlIiwia2V5Y29kZSIsIndoaWNoIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIkxldmVsSW50cm9TdGF0ZSIsImxldmVsIiwiY291bnRkb3duTWVzc2FnZSIsImNvbnRleHQiLCJjbGVhclJlY3QiLCJmb250IiwiZmlsbFN0eWxlIiwidGV4dEJhc2VMaW5lIiwidGV4dEFsaWduIiwiZmlsbFRleHQiLCJjb3VudGRvd24iLCJ1bmRlZmluZWQiLCJtb3ZldG9TdGF0ZSIsIlBsYXlTdGF0ZSIsIlN0YXIiLCJtaW5WZWxvY2l0eSIsIm1heFZlbG9jaXR5Iiwic3RhcnMiLCJpIiwiTWF0aCIsInJhbmRvbSIsInN0YXIiLCJ4IiwidmVsb2NpdHkiLCJkaXYiLCJzZWxmIiwiY29udGFpbmVyRGl2IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwicmVzaXplIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiZmlsbFJlY3QiLCJ5Iiwic2l6ZSIsInRleHRCYXNlbGluZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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V0FBTCxDQUFpQixJQUFJbUMsZUFBSixDQUFvQjVDLElBQUksQ0FBQzZDLEtBQXpCLENBQWpCO0FBQ0g7QUFDSixDQUpEOztBQU1BakIsTUFBTSxDQUFDQyxPQUFQLEdBQWlCOUQsWUFBakIsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJjb25zdCBXZWxjb21lU3RhdGUgPSByZXF1aXJlKCcuL3dlbGNvbWUnKVxuXG5mdW5jdGlvbiBHYW1lKCkge1xuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgICBib21iUmF0ZTogMC4wNSxcbiAgICAgICAgYm9tYk1pblZlbG9jaXR5OiA1MCxcbiAgICAgICAgYm9tYk1heFZlbG9jaXR5OiA1MCxcbiAgICAgICAgaW52YWRlckluaXRpYWxWZWxvY2l0eTogMjUsXG4gICAgICAgIGludmFkZXJBY2NlbGVyYXRpb246IDAsXG4gICAgICAgIGludmFkZXJEcm9wRGlzdGFuY2U6IDIwLFxuICAgICAgICByb2NrZXRWZWxvY2l0eTogMTIwLFxuICAgICAgICByb2NrZXRNYXhGaXJlUmF0ZTogMixcbiAgICAgICAgZ2FtZVdpZHRoOiA2MDAsXG4gICAgICAgIGdhbWVIZWlnaHQ6IDUwMCxcbiAgICAgICAgZnBzOiA1MCxcbiAgICAgICAgZGVidWdNb2RlOiBmYWxzZSxcbiAgICAgICAgaW52YWRlclJhbmtzOiA1LFxuICAgICAgICBpbnZhZGVyZmlsZXM6IDEwLFxuICAgICAgICBzaGlwU3BlZWQ6IDEyMCxcbiAgICAgICAgbGV2ZWxEaWZmaWN1bHR5TXVsdGlwbGllcjogMC4yLFxuICAgICAgICBwb2ludHNQZXJJbnZhZGVyOiA1XG4gICAgfVxuXG4gICAgdGhpcy5saXZlcyA9IDNcbiAgICB0aGlzLndpZHRoID0gMFxuICAgIHRoaXMuaGVpZ2h0ID0gMFxuICAgIHRoaXMuZ2FtZUJvdW5kcyA9IHtcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgYm90dG9tOiAwXG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZVN0YWNrID0gW11cbiAgICB0aGlzLnByZXNzZWRLZXlzID0ge31cbiAgICB0aGlzLmdhbWVDYW52YXMgPSBudWxsXG59XG5cbmZ1bmN0aW9uIGdhbWVMb29wKGdhbWUpIHtcbiAgICBsZXQgY3VycmVudFN0YXRlID0gZ2FtZS5jdXJyZW50U3RhdGUoKVxuICAgIGlmIChjdXJyZW50U3RhdGUpIHtcbiAgICAgICAgbGV0IGRlbHRhVCA9IDEgLyBnYW1lLmNvbmZpZy5mcHNcblxuICAgICAgICBsZXQgZ2FtZUNvbnRleHQgPSBnYW1lLmdhbWVDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpXG5cbiAgICAgICAgaWYgKGN1cnJlbnRTdGF0ZS51cGRhdGUpIHtcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZS51cGRhdGUoZ2FtZSwgZGVsdGFUKVxuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyZW50U3RhdGUuZHJhdykge1xuICAgICAgICAgICAgY3VycmVudFN0YXRlLmRyYXcoZ2FtZSwgZGVsdGFULCBnYW1lQ29udGV4dClcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5HYW1lLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubW92ZVRvU3RhdGUobmV3IFdlbGNvbWVTdGF0ZSgpKVxuXG4gICAgdGhpcy5saXZlcyA9IDNcbiAgICB0aGlzLmNvbmZpZy5kZWJ1Z01vZGUgPSAvZGVidWc9dHJ1ZS8udGVzdCh3aW5kb3cubG9jYXRpb24uaHJlZilcblxuICAgIGxldCBnYW1lID0gdGhpc1xuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBnYW1lTG9vcChnYW1lKVxuICAgIH0sIDEwMDAgLyB0aGlzLmNvbmZpZy5mcHMpXG59XG5cbkdhbWUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbihnYW1lQ2FudmFzKSB7XG4gICAgdGhpcy5nYW1lQ2FudmFzID0gZ2FtZUNhbnZhc1xuXG4gICAgdGhpcy53aWR0aCA9IGdhbWVDYW52YXMud2lkdGhcbiAgICB0aGlzLmhlaWdodCA9IGdhbWVDYW52YXMuaGVpZ2h0XG5cbiAgICB0aGlzLmdhbWVCb3VuZHMgPSB7XG4gICAgICAgIGxlZnQ6IGdhbWVDYW52YXMud2lkdGggLyAyIC0gdGhpcy5jb25maWcuZ2FtZVdpZHRoIC8gMixcbiAgICAgICAgcmlnaHQ6IGdhbWVDYW52YXMud2lkdGggLyAyIC0gdGhpcy5jb25maWcuZ2FtZVdpZHRoIC8gMixcbiAgICAgICAgdG9wOiBnYW1lQ2FudmFzLmhlaWdodCAvIDIgLSB0aGlzLmNvbmZpZy5nYW1lSGVpZ2h0IC8gMixcbiAgICAgICAgYm90dG9tOiBnYW1lQ2FudmFzLmhlaWdodCAvIDIgLSB0aGlzLmNvbmZpZy5nYW1lSGVpZ2h0IC8gMlxuICAgIH1cbn1cblxuR2FtZS5wcm90b3R5cGUuY3VycmVudFN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVTdGFjay5sZW5ndGggPiAwID8gdGhpcy5zdGF0ZVN0YWNrW3RoaXMuc3RhdGVTdGFjay5sZW5ndGggLSAxXSA6IG51bGxcbn1cblxuR2FtZS5wcm90b3R5cGUubW92ZVRvU3RhdGUgPSBmdW5jdGlvbihzdGF0ZSkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSgpKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSgpLmxlYXZlKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZS5sZWF2ZShnYW1lKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGVTdGFjay5wb3AoKVxuICAgIH1cblxuICAgIGlmIChzdGF0ZS5lbnRlcikge1xuICAgICAgICBzdGF0ZS5lbnRlcihnYW1lKVxuICAgIH1cblxuICAgIHRoaXMuc3RhdGVTdGFjay5wdXNoKHN0YXRlKVxufVxuXG5HYW1lLnByb3RvdHlwZS5wdXNoU3RhdGUgPSBmdW5jdGlvbihzdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5lbnRlcikge1xuICAgICAgICBzdGF0ZS5lbnRlcihnYW1lKVxuICAgIH1cbiAgICB0aGlzLnN0YXRlU3RhY2sucHVzaChzdGF0ZSlcbn1cblxuR2FtZS5wcm90b3R5cGUucG9wU3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUoKSkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUoKS5sZWF2ZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUoKS5sZWF2ZShnYW1lKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGVTdGFjay5wb3AoKVxuICAgIH1cbn1cblxuR2FtZS5wcm90b3R5cGUua2V5RG93biA9IGZ1bmN0aW9uKGtleUNvZGUpIHtcbiAgICB0aGlzLnByZXNzZWRLZXlzW2tleUNvZGVdID0gdHJ1ZVxuXG4gICAgaWYgKHRoaXMuY3VycmVudFN0YXRlKCkgJiYgdGhpcy5jdXJyZW50U3RhdGUoKS5rZXlEb3duKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlKCkua2V5RG93bih0aGlzLCBrZXlDb2RlKVxuICAgIH1cbn1cblxuR2FtZS5wcm90b3R5cGUua2V5VXAgPSBmdW5jdGlvbihrZXlDb2RlKSB7XG4gICAgZGVsZXRlIHRoaXMucHJlc3NlZEtleXNba2V5Q29kZV1cblxuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSgpICYmIHRoaXMuY3VycmVudFN0YXRlKCkua2V5VXApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUoKS5rZXlVcCh0aGlzLCBrZXlDb2RlKVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lIiwibGV0IFNwYWNlID0gcmVxdWlyZSgnLi9zcGFjZScpXG5sZXQgR2FtZSA9IHJlcXVpcmUoJy4vZ2FtZScpXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKVxuICAgIGxldCBzcGFjZSA9IG5ldyBTcGFjZSgpXG4gICAgc3BhY2UuaW5pdChjb250YWluZXIpXG4gICAgc3BhY2UuY3JlYXRlU3RhcnMoKVxuXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZUNhbnZhc1wiKVxuICAgIGNhbnZhcy53aWR0aCA9IDgwMFxuICAgIGNhbnZhcy5oZWlnaHQgPSA2MDBcbiAgICBsZXQgZ2FtZSA9IG5ldyBHYW1lKClcblxuICAgIGdhbWUuaW5pdChjYW52YXMpXG4gICAgZ2FtZS5zdGFydCgpXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZnVuY3Rpb24ga2V5ZG93bihlKSB7XG4gICAgICAgIGxldCBrZXljb2RlID0gZS53aGljaCB8fCB3aW5kb3cuZXZlbnQua2V5Y29kZVxuICAgICAgICBpZiAoa2V5Y29kZSA9PT0gMzcgfHwga2V5Y29kZSA9PT0gMzkgfHwga2V5Y29kZSA9PT0gMzIpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICB9XG4gICAgICAgIGdhbWUua2V5RG93bihrZXljb2RlKVxuICAgIH0pXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGZ1bmN0aW9uIGtleWRvd24oZSkge1xuICAgICAgICBsZXQga2V5Y29kZSA9IGUud2hpY2ggfHwgd2luZG93LmV2ZW50LmtleWNvZGVcbiAgICAgICAgZ2FtZS5rZXlVcChrZXljb2RlKVxuICAgIH0pXG5cbn0pIiwiZnVuY3Rpb24gTGV2ZWxJbnRyb1N0YXRlKGxldmVsKSB7XG4gICAgdGhpcy5sZXZlbCA9IGxldmVsXG4gICAgdGhpcy5jb3VudGRvd25NZXNzYWdlID0gXCIzXCJcbn1cblxuTGV2ZWxJbnRyb1N0YXRlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oZ2FtZSwgZGVsdGFULCBjb250ZXh0KSB7XG4gICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgZ2FtZS53aWR0aCwgZ2FtZS5oZWlnaHQpXG5cbiAgICBjb250ZXh0LmZvbnQgPSBcIjM2cHggSGVsdmV0aWNhXCJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiI2FkZDZmZlwiXG4gICAgY29udGV4dC50ZXh0QmFzZUxpbmUgPSBcIm1pZGRsZVwiXG4gICAgY29udGV4dC50ZXh0QWxpZ24gPSBcImNlbnRlclwiXG4gICAgY29udGV4dC5maWxsVGV4dChcIkxldmVsIFwiICsgdGhpcy5sZXZlbCwgZ2FtZS53aWR0aCAvIDIsIGdhbWUuaGVpZ2h0IC8gMilcbiAgICBjb250ZXh0LmZvbnQgPSBcIjI0cHggSGVsdmV0aWNhXCJcbiAgICBjb250ZXh0LmZpbGxUZXh0KFwiUmVhZHkgaW4gXCIgKyB0aGlzLmNvdW50ZG93bk1lc3NhZ2UsIGdhbWUud2lkdGggLyAyLCBnYW1lLmhlaWdodCAvIDIgKyAzNilcbn1cblxuTGV2ZWxJbnRyb1N0YXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihnYW1lLCBkZWx0YVQpIHtcbiAgICBpZiAodGhpcy5jb3VudGRvd24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNvdW50ZG93biA9IDNcbiAgICB9XG4gICAgdGhpcy5jb3VudGRvd24gLT0gZGVsdGFUXG5cbiAgICBpZiAodGhpcy5jb3VudGRvd24gPCAyKSB7XG4gICAgICAgIHRoaXMuY291bnRkb3duTWVzc2FnZSA9IFwiMlwiXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY291bnRkb3duIDwgMSkge1xuICAgICAgICB0aGlzLmNvdW50ZG93bk1lc3NhZ2UgPSBcIjFcIlxuICAgIH1cblxuICAgIGlmICh0aGlzLmNvdW50ZG93biA8PSAwKSB7XG4gICAgICAgIGdhbWUubW92ZXRvU3RhdGUobmV3IFBsYXlTdGF0ZShnYW1lLmNvbmZpZywgdGhpcy5sZXZlbCkpXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExldmVsSW50cm9TdGF0ZSIsImNvbnN0IFN0YXIgPSByZXF1aXJlKCcuL3N0YXInKVxuXG5mdW5jdGlvbiBTcGFjZSgpIHtcbiAgICB0aGlzLmZwcyA9IDMwXG4gICAgdGhpcy5jYW52YXMgPSBudWxsXG4gICAgdGhpcy53aWR0aCA9IDEwMDBcbiAgICB0aGlzLmhlaWdodCA9IDBcbiAgICB0aGlzLm1pblZlbG9jaXR5ID0gMzVcbiAgICB0aGlzLm1heFZlbG9jaXR5ID0gMjAwXG4gICAgdGhpcy5zdGFycyA9IDQwMFxuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IDBcbiAgICBcbn1cblxuU3BhY2UucHJvdG90eXBlLmNyZWF0ZVN0YXJzID0gZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgc3RhcnMgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFyczsgaSsrKSB7XG4gICAgICAgIHN0YXJzW2ldID0gbmV3IFN0YXIoXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy53aWR0aCwgXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy5oZWlnaHQsIFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIDMgKyAxLCBcbiAgICAgICAgICAgIChNYXRoLnJhbmRvbSgpICogKHRoaXMubWF4VmVsb2NpdHkgLSB0aGlzLm1pblZlbG9jaXR5KSkgKyB0aGlzLm1pblZlbG9jaXR5XG4gICAgICAgIClcbiAgICB9XG4gICAgZGVidWdnZXJcbiAgICB0aGlzLnN0YXJzID0gc3RhcnNcbn1cblxuU3BhY2UucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBkZWx0YVQgPSAxIC8gdGhpcy5mcHNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHN0YXIgPSB0aGlzLnN0YXJzW2ldXG4gICAgICAgIHN0YXIueCAtPSBkZWx0YVQgKiBzdGFyLnZlbG9jaXR5XG4gICAgICAgIGlmIChzdGFyLnggPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJzW2ldID0gbmV3IFN0YXIoXG4gICAgICAgICAgICAgICAxNzAwLFxuICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiB0aGlzLmhlaWdodCxcbiAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogMyArIDEsXG4gICAgICAgICAgICAgICAgKE1hdGgucmFuZG9tKCkgKiAodGhpcy5tYXhWZWxvY2l0eSAtIHRoaXMubWluVmVsb2NpdHkpKSArIHRoaXMubWluVmVsb2NpdHlcbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5TcGFjZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKGRpdikge1xuICAgIGxldCBzZWxmID0gdGhpc1xuXG4gICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYudXBkYXRlKClcbiAgICAgICAgc2VsZi5kcmF3KClcbiAgICB9LCAxMDAwIC8gdGhpcy5mcHMpXG5cbiAgICB0aGlzLmNvbnRhaW5lckRpdiA9IGRpdlxuICAgIHNlbGYud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIHNlbGYuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gcmVzaXplKGV2ZW50KSB7XG4gICAgICAgIHNlbGYud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICBzZWxmLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICBzZWxmLmNhbnZhcy53aWR0aCA9IHNlbGYud2lkdGhcbiAgICAgICAgc2VsZi5jYW52YXMuaGVpZ2h0ID0gc2VsZi5oZWlnaHRcbiAgICAgICAgc2VsZi5kcmF3KClcbiAgICB9KVxuXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgZGl2LmFwcGVuZENoaWxkKGNhbnZhcylcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhc1xuICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy53aWR0aFxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0XG59XG5cblNwYWNlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIilcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjMDAwMDAwJ1xuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG5cbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjYWRkNmZmJ1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgc3RhciA9IHRoaXMuc3RhcnNbaV1cbiAgICAgICAgY29udGV4dC5maWxsUmVjdChzdGFyLngsIHN0YXIueSwgc3Rhci5zaXplLCBzdGFyLnNpemUpXG4gICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3BhY2UiLCJmdW5jdGlvbiBTdGFyKHgsIHksIHNpemUsIHZlbG9jaXR5KSB7XG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgICB0aGlzLnNpemUgPSBzaXplXG4gICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5XG59IFxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXIiLCJjb25zdCBMZXZlbEludHJvU3RhdGUgPSByZXF1aXJlKCcuL2xldmVsLWludHJvJylcblxuZnVuY3Rpb24gV2VsY29tZVN0YXRlKCkge31cblxuV2VsY29tZVN0YXRlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oZ2FtZSwgZGVsdGFULCBjb250ZXh0KSB7XG4gICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgZ2FtZS53aWR0aCwgZ2FtZS5oZWlnaHQpXG5cbiAgICBjb250ZXh0LmZvbnQgPSBcIjI1cHggSGVsdmV0aWNhXCJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiI2FkZDZmZlwiXG4gICAgY29udGV4dC50ZXh0QmFzZWxpbmUgPSBcImNlbnRlclwiXG4gICAgY29udGV4dC50ZXh0QWxpZ24gPSBcImNlbnRlclwiXG4gICAgY29udGV4dC5maWxsVGV4dChcIlNwYWNlIEludmFkZXJzXCIsIGdhbWUud2lkdGggLyAyLCBnYW1lLmhlaWdodCAvIDIgLSA0MClcbiAgICBjb250ZXh0LmZvbnQgPSBcIjE4cHggSGVsdmV0aWNhXCJcblxuICAgIGNvbnRleHQuZmlsbFRleHQoXCJQcmVzcyAnU3BhY2UnIHRvIHN0YXJ0XCIsIGdhbWUud2lkdGggLyAyLCBnYW1lLmhlaWdodCAvIDIpXG59XG5cbldlbGNvbWVTdGF0ZS5wcm90b3R5cGUua2V5RG93biA9IGZ1bmN0aW9uKGdhbWUsIGtleUNvZGUpIHtcbiAgICBpZiAoa2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgICAgZ2FtZS5tb3ZlVG9TdGF0ZShuZXcgTGV2ZWxJbnRyb1N0YXRlKGdhbWUubGV2ZWwpKVxuICAgIH1cbn0gXG5cbm1vZHVsZS5leHBvcnRzID0gV2VsY29tZVN0YXRlIl0sInNvdXJjZVJvb3QiOiIifQ==