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
  this.width = 0;
  this.height = 0;
  this.minVelocity = 35;
  this.maxVelocity = 2000;
  this.stars = 200;
  this.intervalId = 0;
}

Space.prototype.createStars = function () {
  var stars = [];

  for (var i = 0; i < this.stars; i++) {
    stars[i] = new Star(Math.random() * this.width, Math.random() * this.width, Math.random() * 3 + 1, Math.random() * (this.maxVelocity - this.minVelocity) + this.minVelocity);
  }

  debugger;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9sZXZlbC1pbnRyby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3BhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlbGNvbWUuanMiXSwibmFtZXMiOlsiV2VsY29tZVN0YXRlIiwicmVxdWlyZSIsIkdhbWUiLCJjb25maWciLCJib21iUmF0ZSIsImJvbWJNaW5WZWxvY2l0eSIsImJvbWJNYXhWZWxvY2l0eSIsImludmFkZXJJbml0aWFsVmVsb2NpdHkiLCJpbnZhZGVyQWNjZWxlcmF0aW9uIiwiaW52YWRlckRyb3BEaXN0YW5jZSIsInJvY2tldFZlbG9jaXR5Iiwicm9ja2V0TWF4RmlyZVJhdGUiLCJnYW1lV2lkdGgiLCJnYW1lSGVpZ2h0IiwiZnBzIiwiZGVidWdNb2RlIiwiaW52YWRlclJhbmtzIiwiaW52YWRlcmZpbGVzIiwic2hpcFNwZWVkIiwibGV2ZWxEaWZmaWN1bHR5TXVsdGlwbGllciIsInBvaW50c1BlckludmFkZXIiLCJsaXZlcyIsIndpZHRoIiwiaGVpZ2h0IiwiZ2FtZUJvdW5kcyIsImxlZnQiLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsInN0YXRlU3RhY2siLCJwcmVzc2VkS2V5cyIsImdhbWVDYW52YXMiLCJnYW1lTG9vcCIsImdhbWUiLCJjdXJyZW50U3RhdGUiLCJkZWx0YVQiLCJnYW1lQ29udGV4dCIsImdldENvbnRleHQiLCJ1cGRhdGUiLCJkcmF3IiwicHJvdG90eXBlIiwic3RhcnQiLCJtb3ZlVG9TdGF0ZSIsInRlc3QiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJpbnRlcnZhbElkIiwic2V0SW50ZXJ2YWwiLCJpbml0IiwibGVuZ3RoIiwic3RhdGUiLCJsZWF2ZSIsInBvcCIsImVudGVyIiwicHVzaCIsInB1c2hTdGF0ZSIsInBvcFN0YXRlIiwia2V5RG93biIsImtleUNvZGUiLCJrZXlVcCIsIm1vZHVsZSIsImV4cG9ydHMiLCJTcGFjZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwic3BhY2UiLCJjcmVhdGVTdGFycyIsImNhbnZhcyIsImtleWRvd24iLCJlIiwia2V5Y29kZSIsIndoaWNoIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIkxldmVsSW50cm9TdGF0ZSIsImxldmVsIiwiY291bnRkb3duTWVzc2FnZSIsImNvbnRleHQiLCJjbGVhclJlY3QiLCJmb250IiwiZmlsbFN0eWxlIiwidGV4dEJhc2VMaW5lIiwidGV4dEFsaWduIiwiZmlsbFRleHQiLCJjb3VudGRvd24iLCJ1bmRlZmluZWQiLCJtb3ZldG9TdGF0ZSIsIlBsYXlTdGF0ZSIsIlN0YXIiLCJtaW5WZWxvY2l0eSIsIm1heFZlbG9jaXR5Iiwic3RhcnMiLCJpIiwiTWF0aCIsInJhbmRvbSIsInN0YXIiLCJ5IiwidmVsb2NpdHkiLCJkaXYiLCJzZWxmIiwiY29udGFpbmVyRGl2IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwicmVzaXplIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiZmlsbFJlY3QiLCJ4Iiwic2l6ZSIsInRleHRCYXNlbGluZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLElBQU1BLFlBQVksR0FBR0MsbUJBQU8sQ0FBQyxtQ0FBRCxDQUE1Qjs7QUFFQSxTQUFTQyxJQUFULEdBQWdCO0FBQ1osT0FBS0MsTUFBTCxHQUFjO0FBQ1ZDLFlBQVEsRUFBRSxJQURBO0FBRVZDLG1CQUFlLEVBQUUsRUFGUDtBQUdWQyxtQkFBZSxFQUFFLEVBSFA7QUFJVkMsMEJBQXNCLEVBQUUsRUFKZDtBQUtWQyx1QkFBbUIsRUFBRSxDQUxYO0FBTVZDLHVCQUFtQixFQUFFLEVBTlg7QUFPVkMsa0JBQWMsRUFBRSxHQVBOO0FBUVZDLHFCQUFpQixFQUFFLENBUlQ7QUFTVkMsYUFBUyxFQUFFLEdBVEQ7QUFVVkMsY0FBVSxFQUFFLEdBVkY7QUFXVkMsT0FBRyxFQUFFLEVBWEs7QUFZVkMsYUFBUyxFQUFFLEtBWkQ7QUFhVkMsZ0JBQVksRUFBRSxDQWJKO0FBY1ZDLGdCQUFZLEVBQUUsRUFkSjtBQWVWQyxhQUFTLEVBQUUsR0FmRDtBQWdCVkMsNkJBQXlCLEVBQUUsR0FoQmpCO0FBaUJWQyxvQkFBZ0IsRUFBRTtBQWpCUixHQUFkO0FBb0JBLE9BQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsT0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDQSxPQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLE9BQUtDLFVBQUwsR0FBa0I7QUFDZEMsUUFBSSxFQUFFLENBRFE7QUFFZEMsT0FBRyxFQUFFLENBRlM7QUFHZEMsU0FBSyxFQUFFLENBSE87QUFJZEMsVUFBTSxFQUFFO0FBSk0sR0FBbEI7QUFPQSxPQUFLQyxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsT0FBS0MsV0FBTCxHQUFtQixFQUFuQjtBQUNBLE9BQUtDLFVBQUwsR0FBa0IsSUFBbEI7QUFDSDs7QUFFRCxTQUFTQyxRQUFULENBQWtCQyxJQUFsQixFQUF3QjtBQUNwQixNQUFJQyxZQUFZLEdBQUdELElBQUksQ0FBQ0MsWUFBTCxFQUFuQjs7QUFDQSxNQUFJQSxZQUFKLEVBQWtCO0FBQ2QsUUFBSUMsTUFBTSxHQUFHLElBQUlGLElBQUksQ0FBQzlCLE1BQUwsQ0FBWVcsR0FBN0I7QUFFQSxRQUFJc0IsV0FBVyxHQUFHSCxJQUFJLENBQUNGLFVBQUwsQ0FBZ0JNLFVBQWhCLENBQTJCLElBQTNCLENBQWxCOztBQUVBLFFBQUlILFlBQVksQ0FBQ0ksTUFBakIsRUFBeUI7QUFDckJKLGtCQUFZLENBQUNJLE1BQWIsQ0FBb0JMLElBQXBCLEVBQTBCRSxNQUExQjtBQUNIOztBQUNELFFBQUlELFlBQVksQ0FBQ0ssSUFBakIsRUFBdUI7QUFDbkJMLGtCQUFZLENBQUNLLElBQWIsQ0FBa0JOLElBQWxCLEVBQXdCRSxNQUF4QixFQUFnQ0MsV0FBaEM7QUFDSDtBQUVKO0FBQ0o7O0FBRURsQyxJQUFJLENBQUNzQyxTQUFMLENBQWVDLEtBQWYsR0FBdUIsWUFBVztBQUM5QixPQUFLQyxXQUFMLENBQWlCLElBQUkxQyxZQUFKLEVBQWpCO0FBRUEsT0FBS3FCLEtBQUwsR0FBYSxDQUFiO0FBQ0EsT0FBS2xCLE1BQUwsQ0FBWVksU0FBWixHQUF3QixhQUFhNEIsSUFBYixDQUFrQkMsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUFsQyxDQUF4QjtBQUVBLE1BQUliLElBQUksR0FBRyxJQUFYO0FBQ0EsT0FBS2MsVUFBTCxHQUFrQkMsV0FBVyxDQUFDLFlBQVc7QUFDckNoQixZQUFRLENBQUNDLElBQUQsQ0FBUjtBQUNILEdBRjRCLEVBRTFCLE9BQU8sS0FBSzlCLE1BQUwsQ0FBWVcsR0FGTyxDQUE3QjtBQUdILENBVkQ7O0FBWUFaLElBQUksQ0FBQ3NDLFNBQUwsQ0FBZVMsSUFBZixHQUFzQixVQUFTbEIsVUFBVCxFQUFxQjtBQUN2QyxPQUFLQSxVQUFMLEdBQWtCQSxVQUFsQjtBQUVBLE9BQUtULEtBQUwsR0FBYVMsVUFBVSxDQUFDVCxLQUF4QjtBQUNBLE9BQUtDLE1BQUwsR0FBY1EsVUFBVSxDQUFDUixNQUF6QjtBQUVBLE9BQUtDLFVBQUwsR0FBa0I7QUFDZEMsUUFBSSxFQUFFTSxVQUFVLENBQUNULEtBQVgsR0FBbUIsQ0FBbkIsR0FBdUIsS0FBS25CLE1BQUwsQ0FBWVMsU0FBWixHQUF3QixDQUR2QztBQUVkZSxTQUFLLEVBQUVJLFVBQVUsQ0FBQ1QsS0FBWCxHQUFtQixDQUFuQixHQUF1QixLQUFLbkIsTUFBTCxDQUFZUyxTQUFaLEdBQXdCLENBRnhDO0FBR2RjLE9BQUcsRUFBRUssVUFBVSxDQUFDUixNQUFYLEdBQW9CLENBQXBCLEdBQXdCLEtBQUtwQixNQUFMLENBQVlVLFVBQVosR0FBeUIsQ0FIeEM7QUFJZGUsVUFBTSxFQUFFRyxVQUFVLENBQUNSLE1BQVgsR0FBb0IsQ0FBcEIsR0FBd0IsS0FBS3BCLE1BQUwsQ0FBWVUsVUFBWixHQUF5QjtBQUozQyxHQUFsQjtBQU1ILENBWkQ7O0FBY0FYLElBQUksQ0FBQ3NDLFNBQUwsQ0FBZU4sWUFBZixHQUE4QixZQUFXO0FBQ3JDLFNBQU8sS0FBS0wsVUFBTCxDQUFnQnFCLE1BQWhCLEdBQXlCLENBQXpCLEdBQTZCLEtBQUtyQixVQUFMLENBQWdCLEtBQUtBLFVBQUwsQ0FBZ0JxQixNQUFoQixHQUF5QixDQUF6QyxDQUE3QixHQUEyRSxJQUFsRjtBQUNILENBRkQ7O0FBSUFoRCxJQUFJLENBQUNzQyxTQUFMLENBQWVFLFdBQWYsR0FBNkIsVUFBU1MsS0FBVCxFQUFnQjtBQUN6QyxNQUFJLEtBQUtqQixZQUFMLEVBQUosRUFBeUI7QUFDckIsUUFBSSxLQUFLQSxZQUFMLEdBQW9Ca0IsS0FBeEIsRUFBK0I7QUFDM0IsV0FBS2xCLFlBQUwsQ0FBa0JrQixLQUFsQixDQUF3Qm5CLElBQXhCO0FBQ0g7O0FBQ0QsU0FBS0osVUFBTCxDQUFnQndCLEdBQWhCO0FBQ0g7O0FBRUQsTUFBSUYsS0FBSyxDQUFDRyxLQUFWLEVBQWlCO0FBQ2JILFNBQUssQ0FBQ0csS0FBTixDQUFZckIsSUFBWjtBQUNIOztBQUVELE9BQUtKLFVBQUwsQ0FBZ0IwQixJQUFoQixDQUFxQkosS0FBckI7QUFDSCxDQWJEOztBQWVBakQsSUFBSSxDQUFDc0MsU0FBTCxDQUFlZ0IsU0FBZixHQUEyQixVQUFTTCxLQUFULEVBQWdCO0FBQ3ZDLE1BQUlBLEtBQUssQ0FBQ0csS0FBVixFQUFpQjtBQUNiSCxTQUFLLENBQUNHLEtBQU4sQ0FBWXJCLElBQVo7QUFDSDs7QUFDRCxPQUFLSixVQUFMLENBQWdCMEIsSUFBaEIsQ0FBcUJKLEtBQXJCO0FBQ0gsQ0FMRDs7QUFPQWpELElBQUksQ0FBQ3NDLFNBQUwsQ0FBZWlCLFFBQWYsR0FBMEIsWUFBVztBQUNqQyxNQUFJLEtBQUt2QixZQUFMLEVBQUosRUFBeUI7QUFDckIsUUFBSSxLQUFLQSxZQUFMLEdBQW9Ca0IsS0FBeEIsRUFBK0I7QUFDM0IsV0FBS2xCLFlBQUwsR0FBb0JrQixLQUFwQixDQUEwQm5CLElBQTFCO0FBQ0g7O0FBQ0QsU0FBS0osVUFBTCxDQUFnQndCLEdBQWhCO0FBQ0g7QUFDSixDQVBEOztBQVNBbkQsSUFBSSxDQUFDc0MsU0FBTCxDQUFla0IsT0FBZixHQUF5QixVQUFTQyxPQUFULEVBQWtCO0FBQ3ZDLE9BQUs3QixXQUFMLENBQWlCNkIsT0FBakIsSUFBNEIsSUFBNUI7O0FBRUEsTUFBSSxLQUFLekIsWUFBTCxNQUF1QixLQUFLQSxZQUFMLEdBQW9Cd0IsT0FBL0MsRUFBd0Q7QUFDcEQsU0FBS3hCLFlBQUwsR0FBb0J3QixPQUFwQixDQUE0QixJQUE1QixFQUFrQ0MsT0FBbEM7QUFDSDtBQUNKLENBTkQ7O0FBUUF6RCxJQUFJLENBQUNzQyxTQUFMLENBQWVvQixLQUFmLEdBQXVCLFVBQVNELE9BQVQsRUFBa0I7QUFDckMsU0FBTyxLQUFLN0IsV0FBTCxDQUFpQjZCLE9BQWpCLENBQVA7O0FBRUEsTUFBSSxLQUFLekIsWUFBTCxNQUF1QixLQUFLQSxZQUFMLEdBQW9CMEIsS0FBL0MsRUFBc0Q7QUFDbEQsU0FBSzFCLFlBQUwsR0FBb0IwQixLQUFwQixDQUEwQixJQUExQixFQUFnQ0QsT0FBaEM7QUFDSDtBQUNKLENBTkQ7O0FBUUFFLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjVELElBQWpCLEM7Ozs7Ozs7Ozs7O0FDcElBLElBQUk2RCxLQUFLLEdBQUc5RCxtQkFBTyxDQUFDLCtCQUFELENBQW5COztBQUNBLElBQUlDLElBQUksR0FBR0QsbUJBQU8sQ0FBQyw2QkFBRCxDQUFsQjs7QUFFQStELFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDaEQsTUFBSUMsU0FBUyxHQUFHRixRQUFRLENBQUNHLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBaEI7QUFDQSxNQUFJQyxLQUFLLEdBQUcsSUFBSUwsS0FBSixFQUFaO0FBQ0FLLE9BQUssQ0FBQ25CLElBQU4sQ0FBV2lCLFNBQVg7QUFDQUUsT0FBSyxDQUFDQyxXQUFOO0FBRUEsTUFBSUMsTUFBTSxHQUFHTixRQUFRLENBQUNHLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBYjtBQUNBRyxRQUFNLENBQUNoRCxLQUFQLEdBQWUsR0FBZjtBQUNBZ0QsUUFBTSxDQUFDL0MsTUFBUCxHQUFnQixHQUFoQjtBQUNBLE1BQUlVLElBQUksR0FBRyxJQUFJL0IsSUFBSixFQUFYO0FBRUErQixNQUFJLENBQUNnQixJQUFMLENBQVVxQixNQUFWO0FBQ0FyQyxNQUFJLENBQUNRLEtBQUw7QUFFQUcsUUFBTSxDQUFDcUIsZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsU0FBU00sT0FBVCxDQUFpQkMsQ0FBakIsRUFBb0I7QUFDbkQsUUFBSUMsT0FBTyxHQUFHRCxDQUFDLENBQUNFLEtBQUYsSUFBVzlCLE1BQU0sQ0FBQytCLEtBQVAsQ0FBYUYsT0FBdEM7O0FBQ0EsUUFBSUEsT0FBTyxLQUFLLEVBQVosSUFBa0JBLE9BQU8sS0FBSyxFQUE5QixJQUFvQ0EsT0FBTyxLQUFLLEVBQXBELEVBQXdEO0FBQ3BERCxPQUFDLENBQUNJLGNBQUY7QUFDSDs7QUFDRDNDLFFBQUksQ0FBQ3lCLE9BQUwsQ0FBYWUsT0FBYjtBQUNILEdBTkQ7QUFRQTdCLFFBQU0sQ0FBQ3FCLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFNBQVNNLE9BQVQsQ0FBaUJDLENBQWpCLEVBQW9CO0FBQ2pELFFBQUlDLE9BQU8sR0FBR0QsQ0FBQyxDQUFDRSxLQUFGLElBQVc5QixNQUFNLENBQUMrQixLQUFQLENBQWFGLE9BQXRDO0FBQ0F4QyxRQUFJLENBQUMyQixLQUFMLENBQVdhLE9BQVg7QUFDSCxHQUhEO0FBS0gsQ0EzQkQsRTs7Ozs7Ozs7Ozs7QUNIQSxTQUFTSSxlQUFULENBQXlCQyxLQUF6QixFQUFnQztBQUM1QixPQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxPQUFLQyxnQkFBTCxHQUF3QixHQUF4QjtBQUNIOztBQUVERixlQUFlLENBQUNyQyxTQUFoQixDQUEwQkQsSUFBMUIsR0FBaUMsVUFBU04sSUFBVCxFQUFlRSxNQUFmLEVBQXVCNkMsT0FBdkIsRUFBZ0M7QUFDN0RBLFNBQU8sQ0FBQ0MsU0FBUixDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QmhELElBQUksQ0FBQ1gsS0FBN0IsRUFBb0NXLElBQUksQ0FBQ1YsTUFBekM7QUFFQXlELFNBQU8sQ0FBQ0UsSUFBUixHQUFlLGdCQUFmO0FBQ0FGLFNBQU8sQ0FBQ0csU0FBUixHQUFvQixTQUFwQjtBQUNBSCxTQUFPLENBQUNJLFlBQVIsR0FBdUIsUUFBdkI7QUFDQUosU0FBTyxDQUFDSyxTQUFSLEdBQW9CLFFBQXBCO0FBQ0FMLFNBQU8sQ0FBQ00sUUFBUixDQUFpQixXQUFXLEtBQUtSLEtBQWpDLEVBQXdDN0MsSUFBSSxDQUFDWCxLQUFMLEdBQWEsQ0FBckQsRUFBd0RXLElBQUksQ0FBQ1YsTUFBTCxHQUFjLENBQXRFO0FBQ0F5RCxTQUFPLENBQUNFLElBQVIsR0FBZSxnQkFBZjtBQUNBRixTQUFPLENBQUNNLFFBQVIsQ0FBaUIsY0FBYyxLQUFLUCxnQkFBcEMsRUFBc0Q5QyxJQUFJLENBQUNYLEtBQUwsR0FBYSxDQUFuRSxFQUFzRVcsSUFBSSxDQUFDVixNQUFMLEdBQWMsQ0FBZCxHQUFrQixFQUF4RjtBQUNILENBVkQ7O0FBWUFzRCxlQUFlLENBQUNyQyxTQUFoQixDQUEwQkYsTUFBMUIsR0FBbUMsVUFBU0wsSUFBVCxFQUFlRSxNQUFmLEVBQXVCO0FBQ3RELE1BQUksS0FBS29ELFNBQUwsS0FBbUJDLFNBQXZCLEVBQWtDO0FBQzlCLFNBQUtELFNBQUwsR0FBaUIsQ0FBakI7QUFDSDs7QUFDRCxPQUFLQSxTQUFMLElBQWtCcEQsTUFBbEI7O0FBRUEsTUFBSSxLQUFLb0QsU0FBTCxHQUFpQixDQUFyQixFQUF3QjtBQUNwQixTQUFLUixnQkFBTCxHQUF3QixHQUF4QjtBQUNIOztBQUVELE1BQUksS0FBS1EsU0FBTCxHQUFpQixDQUFyQixFQUF3QjtBQUNwQixTQUFLUixnQkFBTCxHQUF3QixHQUF4QjtBQUNIOztBQUVELE1BQUksS0FBS1EsU0FBTCxJQUFrQixDQUF0QixFQUF5QjtBQUNyQnRELFFBQUksQ0FBQ3dELFdBQUwsQ0FBaUIsSUFBSUMsU0FBSixDQUFjekQsSUFBSSxDQUFDOUIsTUFBbkIsRUFBMkIsS0FBSzJFLEtBQWhDLENBQWpCO0FBQ0g7QUFDSixDQWpCRDs7QUFtQkFqQixNQUFNLENBQUNDLE9BQVAsR0FBaUJlLGVBQWpCLEM7Ozs7Ozs7Ozs7O0FDcENBLElBQU1jLElBQUksR0FBRzFGLG1CQUFPLENBQUMsNkJBQUQsQ0FBcEI7O0FBRUEsU0FBUzhELEtBQVQsR0FBaUI7QUFDYixPQUFLakQsR0FBTCxHQUFXLEVBQVg7QUFDQSxPQUFLd0QsTUFBTCxHQUFjLElBQWQ7QUFDQSxPQUFLaEQsS0FBTCxHQUFhLENBQWI7QUFDQSxPQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLE9BQUtxRSxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsT0FBS0MsV0FBTCxHQUFtQixJQUFuQjtBQUNBLE9BQUtDLEtBQUwsR0FBYSxHQUFiO0FBQ0EsT0FBSy9DLFVBQUwsR0FBa0IsQ0FBbEI7QUFFSDs7QUFFRGdCLEtBQUssQ0FBQ3ZCLFNBQU4sQ0FBZ0I2QixXQUFoQixHQUE4QixZQUFXO0FBRXJDLE1BQUl5QixLQUFLLEdBQUcsRUFBWjs7QUFDQSxPQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS0QsS0FBekIsRUFBZ0NDLENBQUMsRUFBakMsRUFBcUM7QUFDakNELFNBQUssQ0FBQ0MsQ0FBRCxDQUFMLEdBQVcsSUFBSUosSUFBSixDQUNQSyxJQUFJLENBQUNDLE1BQUwsS0FBZ0IsS0FBSzNFLEtBRGQsRUFFUDBFLElBQUksQ0FBQ0MsTUFBTCxLQUFnQixLQUFLM0UsS0FGZCxFQUdQMEUsSUFBSSxDQUFDQyxNQUFMLEtBQWdCLENBQWhCLEdBQW9CLENBSGIsRUFJTkQsSUFBSSxDQUFDQyxNQUFMLE1BQWlCLEtBQUtKLFdBQUwsR0FBbUIsS0FBS0QsV0FBekMsQ0FBRCxHQUEwRCxLQUFLQSxXQUp4RCxDQUFYO0FBTUg7O0FBQ0Q7QUFDQSxPQUFLRSxLQUFMLEdBQWFBLEtBQWI7QUFDSCxDQWJEOztBQWVBL0IsS0FBSyxDQUFDdkIsU0FBTixDQUFnQkYsTUFBaEIsR0FBeUIsWUFBVztBQUNoQyxNQUFJSCxNQUFNLEdBQUcsSUFBSSxLQUFLckIsR0FBdEI7O0FBQ0EsT0FBSyxJQUFJaUYsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLRCxLQUFMLENBQVc1QyxNQUEvQixFQUF1QzZDLENBQUMsRUFBeEMsRUFBNEM7QUFDeEMsUUFBSUcsSUFBSSxHQUFHLEtBQUtKLEtBQUwsQ0FBV0MsQ0FBWCxDQUFYO0FBQ0FHLFFBQUksQ0FBQ0MsQ0FBTCxJQUFVaEUsTUFBTSxHQUFHK0QsSUFBSSxDQUFDRSxRQUF4Qjs7QUFDQSxRQUFJRixJQUFJLENBQUNDLENBQUwsR0FBUyxLQUFLNUUsTUFBbEIsRUFBMEI7QUFDdEIsV0FBS3VFLEtBQUwsQ0FBV0MsQ0FBWCxJQUFnQixJQUFJSixJQUFKLENBQ1pLLElBQUksQ0FBQ0MsTUFBTCxLQUFnQixLQUFLM0UsS0FEVCxFQUVaLENBRlksRUFHWjBFLElBQUksQ0FBQ0MsTUFBTCxLQUFnQixDQUFoQixHQUFvQixDQUhSLEVBSVhELElBQUksQ0FBQ0MsTUFBTCxNQUFpQixLQUFLSixXQUFMLEdBQW1CLEtBQUtELFdBQXpDLENBQUQsR0FBMEQsS0FBS0EsV0FKbkQsQ0FBaEI7QUFNSDtBQUNKO0FBQ0osQ0FkRDs7QUFpQkE3QixLQUFLLENBQUN2QixTQUFOLENBQWdCUyxJQUFoQixHQUF1QixVQUFTb0QsR0FBVCxFQUFjO0FBQ2pDLE1BQUlDLElBQUksR0FBRyxJQUFYO0FBRUEsT0FBS3ZELFVBQUwsR0FBa0JDLFdBQVcsQ0FBQyxZQUFXO0FBQ3JDc0QsUUFBSSxDQUFDaEUsTUFBTDtBQUNBZ0UsUUFBSSxDQUFDL0QsSUFBTDtBQUNILEdBSDRCLEVBRzFCLE9BQU8sS0FBS3pCLEdBSGMsQ0FBN0I7QUFLQSxPQUFLeUYsWUFBTCxHQUFvQkYsR0FBcEI7QUFDQUMsTUFBSSxDQUFDaEYsS0FBTCxHQUFhc0IsTUFBTSxDQUFDNEQsVUFBcEI7QUFDQUYsTUFBSSxDQUFDL0UsTUFBTCxHQUFjcUIsTUFBTSxDQUFDNkQsV0FBckI7QUFFQTdELFFBQU0sQ0FBQ3FCLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFNBQVN5QyxNQUFULENBQWdCL0IsS0FBaEIsRUFBdUI7QUFDckQyQixRQUFJLENBQUNoRixLQUFMLEdBQWFzQixNQUFNLENBQUM0RCxVQUFwQjtBQUNBRixRQUFJLENBQUMvRSxNQUFMLEdBQWNxQixNQUFNLENBQUM2RCxXQUFyQjtBQUNBSCxRQUFJLENBQUNoQyxNQUFMLENBQVloRCxLQUFaLEdBQW9CZ0YsSUFBSSxDQUFDaEYsS0FBekI7QUFDQWdGLFFBQUksQ0FBQ2hDLE1BQUwsQ0FBWS9DLE1BQVosR0FBcUIrRSxJQUFJLENBQUMvRSxNQUExQjtBQUNBK0UsUUFBSSxDQUFDL0QsSUFBTDtBQUNILEdBTkQ7QUFRQSxNQUFJK0IsTUFBTSxHQUFHTixRQUFRLENBQUMyQyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQU4sS0FBRyxDQUFDTyxXQUFKLENBQWdCdEMsTUFBaEI7QUFDQSxPQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxPQUFLQSxNQUFMLENBQVloRCxLQUFaLEdBQW9CLEtBQUtBLEtBQXpCO0FBQ0EsT0FBS2dELE1BQUwsQ0FBWS9DLE1BQVosR0FBcUIsS0FBS0EsTUFBMUI7QUFDSCxDQXpCRDs7QUEyQkF3QyxLQUFLLENBQUN2QixTQUFOLENBQWdCRCxJQUFoQixHQUF1QixZQUFXO0FBQzlCLE1BQUl5QyxPQUFPLEdBQUcsS0FBS1YsTUFBTCxDQUFZakMsVUFBWixDQUF1QixJQUF2QixDQUFkO0FBQ0EyQyxTQUFPLENBQUNHLFNBQVIsR0FBb0IsU0FBcEI7QUFDQUgsU0FBTyxDQUFDNkIsUUFBUixDQUFpQixDQUFqQixFQUFvQixDQUFwQixFQUF1QixLQUFLdkYsS0FBNUIsRUFBbUMsS0FBS0MsTUFBeEM7QUFFQXlELFNBQU8sQ0FBQ0csU0FBUixHQUFvQixTQUFwQjs7QUFDQSxPQUFLLElBQUlZLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS0QsS0FBTCxDQUFXNUMsTUFBL0IsRUFBdUM2QyxDQUFDLEVBQXhDLEVBQTRDO0FBQ3hDLFFBQUlHLElBQUksR0FBRyxLQUFLSixLQUFMLENBQVdDLENBQVgsQ0FBWDtBQUNBZixXQUFPLENBQUM2QixRQUFSLENBQWlCWCxJQUFJLENBQUNZLENBQXRCLEVBQXlCWixJQUFJLENBQUNDLENBQTlCLEVBQWlDRCxJQUFJLENBQUNhLElBQXRDLEVBQTRDYixJQUFJLENBQUNhLElBQWpEO0FBQ0g7QUFFSixDQVhEOztBQWFBbEQsTUFBTSxDQUFDQyxPQUFQLEdBQWlCQyxLQUFqQixDOzs7Ozs7Ozs7OztBQ3RGQSxTQUFTNEIsSUFBVCxDQUFjbUIsQ0FBZCxFQUFpQlgsQ0FBakIsRUFBb0JZLElBQXBCLEVBQTBCWCxRQUExQixFQUFvQztBQUNoQyxPQUFLVSxDQUFMLEdBQVNBLENBQVQ7QUFDQSxPQUFLWCxDQUFMLEdBQVNBLENBQVQ7QUFDQSxPQUFLWSxJQUFMLEdBQVlBLElBQVo7QUFDQSxPQUFLWCxRQUFMLEdBQWdCQSxRQUFoQjtBQUNIOztBQUVEdkMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCNkIsSUFBakIsQzs7Ozs7Ozs7Ozs7QUNQQSxJQUFNZCxlQUFlLEdBQUc1RSxtQkFBTyxDQUFDLDJDQUFELENBQS9COztBQUVBLFNBQVNELFlBQVQsR0FBd0IsQ0FBRTs7QUFFMUJBLFlBQVksQ0FBQ3dDLFNBQWIsQ0FBdUJELElBQXZCLEdBQThCLFVBQVNOLElBQVQsRUFBZUUsTUFBZixFQUF1QjZDLE9BQXZCLEVBQWdDO0FBQzFEQSxTQUFPLENBQUNDLFNBQVIsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0JoRCxJQUFJLENBQUNYLEtBQTdCLEVBQW9DVyxJQUFJLENBQUNWLE1BQXpDO0FBRUF5RCxTQUFPLENBQUNFLElBQVIsR0FBZSxnQkFBZjtBQUNBRixTQUFPLENBQUNHLFNBQVIsR0FBb0IsU0FBcEI7QUFDQUgsU0FBTyxDQUFDZ0MsWUFBUixHQUF1QixRQUF2QjtBQUNBaEMsU0FBTyxDQUFDSyxTQUFSLEdBQW9CLFFBQXBCO0FBQ0FMLFNBQU8sQ0FBQ00sUUFBUixDQUFpQixnQkFBakIsRUFBbUNyRCxJQUFJLENBQUNYLEtBQUwsR0FBYSxDQUFoRCxFQUFtRFcsSUFBSSxDQUFDVixNQUFMLEdBQWMsQ0FBZCxHQUFrQixFQUFyRTtBQUNBeUQsU0FBTyxDQUFDRSxJQUFSLEdBQWUsZ0JBQWY7QUFFQUYsU0FBTyxDQUFDTSxRQUFSLENBQWlCLHdCQUFqQixFQUEyQ3JELElBQUksQ0FBQ1gsS0FBTCxHQUFhLENBQXhELEVBQTJEVyxJQUFJLENBQUNWLE1BQUwsR0FBYyxDQUF6RTtBQUNILENBWEQ7O0FBYUF2QixZQUFZLENBQUN3QyxTQUFiLENBQXVCa0IsT0FBdkIsR0FBaUMsVUFBU3pCLElBQVQsRUFBZTBCLE9BQWYsRUFBd0I7QUFDckQsTUFBSUEsT0FBTyxLQUFLLEVBQWhCLEVBQW9CO0FBQ2hCMUIsUUFBSSxDQUFDUyxXQUFMLENBQWlCLElBQUltQyxlQUFKLENBQW9CNUMsSUFBSSxDQUFDNkMsS0FBekIsQ0FBakI7QUFDSDtBQUNKLENBSkQ7O0FBTUFqQixNQUFNLENBQUNDLE9BQVAsR0FBaUI5RCxZQUFqQixDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImNvbnN0IFdlbGNvbWVTdGF0ZSA9IHJlcXVpcmUoJy4vd2VsY29tZScpXG5cbmZ1bmN0aW9uIEdhbWUoKSB7XG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICAgIGJvbWJSYXRlOiAwLjA1LFxuICAgICAgICBib21iTWluVmVsb2NpdHk6IDUwLFxuICAgICAgICBib21iTWF4VmVsb2NpdHk6IDUwLFxuICAgICAgICBpbnZhZGVySW5pdGlhbFZlbG9jaXR5OiAyNSxcbiAgICAgICAgaW52YWRlckFjY2VsZXJhdGlvbjogMCxcbiAgICAgICAgaW52YWRlckRyb3BEaXN0YW5jZTogMjAsXG4gICAgICAgIHJvY2tldFZlbG9jaXR5OiAxMjAsXG4gICAgICAgIHJvY2tldE1heEZpcmVSYXRlOiAyLFxuICAgICAgICBnYW1lV2lkdGg6IDYwMCxcbiAgICAgICAgZ2FtZUhlaWdodDogNTAwLFxuICAgICAgICBmcHM6IDUwLFxuICAgICAgICBkZWJ1Z01vZGU6IGZhbHNlLFxuICAgICAgICBpbnZhZGVyUmFua3M6IDUsXG4gICAgICAgIGludmFkZXJmaWxlczogMTAsXG4gICAgICAgIHNoaXBTcGVlZDogMTIwLFxuICAgICAgICBsZXZlbERpZmZpY3VsdHlNdWx0aXBsaWVyOiAwLjIsXG4gICAgICAgIHBvaW50c1BlckludmFkZXI6IDVcbiAgICB9XG5cbiAgICB0aGlzLmxpdmVzID0gM1xuICAgIHRoaXMud2lkdGggPSAwXG4gICAgdGhpcy5oZWlnaHQgPSAwXG4gICAgdGhpcy5nYW1lQm91bmRzID0ge1xuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICBib3R0b206IDBcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlU3RhY2sgPSBbXVxuICAgIHRoaXMucHJlc3NlZEtleXMgPSB7fVxuICAgIHRoaXMuZ2FtZUNhbnZhcyA9IG51bGxcbn1cblxuZnVuY3Rpb24gZ2FtZUxvb3AoZ2FtZSkge1xuICAgIGxldCBjdXJyZW50U3RhdGUgPSBnYW1lLmN1cnJlbnRTdGF0ZSgpXG4gICAgaWYgKGN1cnJlbnRTdGF0ZSkge1xuICAgICAgICBsZXQgZGVsdGFUID0gMSAvIGdhbWUuY29uZmlnLmZwc1xuXG4gICAgICAgIGxldCBnYW1lQ29udGV4dCA9IGdhbWUuZ2FtZUNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIilcblxuICAgICAgICBpZiAoY3VycmVudFN0YXRlLnVwZGF0ZSkge1xuICAgICAgICAgICAgY3VycmVudFN0YXRlLnVwZGF0ZShnYW1lLCBkZWx0YVQpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnRTdGF0ZS5kcmF3KSB7XG4gICAgICAgICAgICBjdXJyZW50U3RhdGUuZHJhdyhnYW1lLCBkZWx0YVQsIGdhbWVDb250ZXh0KVxuICAgICAgICB9XG5cbiAgICB9XG59XG5cbkdhbWUucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5tb3ZlVG9TdGF0ZShuZXcgV2VsY29tZVN0YXRlKCkpXG5cbiAgICB0aGlzLmxpdmVzID0gM1xuICAgIHRoaXMuY29uZmlnLmRlYnVnTW9kZSA9IC9kZWJ1Zz10cnVlLy50ZXN0KHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuXG4gICAgbGV0IGdhbWUgPSB0aGlzXG4gICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIGdhbWVMb29wKGdhbWUpXG4gICAgfSwgMTAwMCAvIHRoaXMuY29uZmlnLmZwcylcbn1cblxuR2FtZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKGdhbWVDYW52YXMpIHtcbiAgICB0aGlzLmdhbWVDYW52YXMgPSBnYW1lQ2FudmFzXG5cbiAgICB0aGlzLndpZHRoID0gZ2FtZUNhbnZhcy53aWR0aFxuICAgIHRoaXMuaGVpZ2h0ID0gZ2FtZUNhbnZhcy5oZWlnaHRcblxuICAgIHRoaXMuZ2FtZUJvdW5kcyA9IHtcbiAgICAgICAgbGVmdDogZ2FtZUNhbnZhcy53aWR0aCAvIDIgLSB0aGlzLmNvbmZpZy5nYW1lV2lkdGggLyAyLFxuICAgICAgICByaWdodDogZ2FtZUNhbnZhcy53aWR0aCAvIDIgLSB0aGlzLmNvbmZpZy5nYW1lV2lkdGggLyAyLFxuICAgICAgICB0b3A6IGdhbWVDYW52YXMuaGVpZ2h0IC8gMiAtIHRoaXMuY29uZmlnLmdhbWVIZWlnaHQgLyAyLFxuICAgICAgICBib3R0b206IGdhbWVDYW52YXMuaGVpZ2h0IC8gMiAtIHRoaXMuY29uZmlnLmdhbWVIZWlnaHQgLyAyXG4gICAgfVxufVxuXG5HYW1lLnByb3RvdHlwZS5jdXJyZW50U3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZVN0YWNrLmxlbmd0aCA+IDAgPyB0aGlzLnN0YXRlU3RhY2tbdGhpcy5zdGF0ZVN0YWNrLmxlbmd0aCAtIDFdIDogbnVsbFxufVxuXG5HYW1lLnByb3RvdHlwZS5tb3ZlVG9TdGF0ZSA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFN0YXRlKCkpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlKCkubGVhdmUpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlLmxlYXZlKGdhbWUpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZVN0YWNrLnBvcCgpXG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLmVudGVyKSB7XG4gICAgICAgIHN0YXRlLmVudGVyKGdhbWUpXG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZVN0YWNrLnB1c2goc3RhdGUpXG59XG5cbkdhbWUucHJvdG90eXBlLnB1c2hTdGF0ZSA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLmVudGVyKSB7XG4gICAgICAgIHN0YXRlLmVudGVyKGdhbWUpXG4gICAgfVxuICAgIHRoaXMuc3RhdGVTdGFjay5wdXNoKHN0YXRlKVxufVxuXG5HYW1lLnByb3RvdHlwZS5wb3BTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSgpKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSgpLmxlYXZlKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSgpLmxlYXZlKGdhbWUpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZVN0YWNrLnBvcCgpXG4gICAgfVxufVxuXG5HYW1lLnByb3RvdHlwZS5rZXlEb3duID0gZnVuY3Rpb24oa2V5Q29kZSkge1xuICAgIHRoaXMucHJlc3NlZEtleXNba2V5Q29kZV0gPSB0cnVlXG5cbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUoKSAmJiB0aGlzLmN1cnJlbnRTdGF0ZSgpLmtleURvd24pIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUoKS5rZXlEb3duKHRoaXMsIGtleUNvZGUpXG4gICAgfVxufVxuXG5HYW1lLnByb3RvdHlwZS5rZXlVcCA9IGZ1bmN0aW9uKGtleUNvZGUpIHtcbiAgICBkZWxldGUgdGhpcy5wcmVzc2VkS2V5c1trZXlDb2RlXVxuXG4gICAgaWYgKHRoaXMuY3VycmVudFN0YXRlKCkgJiYgdGhpcy5jdXJyZW50U3RhdGUoKS5rZXlVcCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSgpLmtleVVwKHRoaXMsIGtleUNvZGUpXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWUiLCJsZXQgU3BhY2UgPSByZXF1aXJlKCcuL3NwYWNlJylcbmxldCBHYW1lID0gcmVxdWlyZSgnLi9nYW1lJylcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpXG4gICAgbGV0IHNwYWNlID0gbmV3IFNwYWNlKClcbiAgICBzcGFjZS5pbml0KGNvbnRhaW5lcilcbiAgICBzcGFjZS5jcmVhdGVTdGFycygpXG5cbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lQ2FudmFzXCIpXG4gICAgY2FudmFzLndpZHRoID0gODAwXG4gICAgY2FudmFzLmhlaWdodCA9IDYwMFxuICAgIGxldCBnYW1lID0gbmV3IEdhbWUoKVxuXG4gICAgZ2FtZS5pbml0KGNhbnZhcylcbiAgICBnYW1lLnN0YXJ0KClcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiBrZXlkb3duKGUpIHtcbiAgICAgICAgbGV0IGtleWNvZGUgPSBlLndoaWNoIHx8IHdpbmRvdy5ldmVudC5rZXljb2RlXG4gICAgICAgIGlmIChrZXljb2RlID09PSAzNyB8fCBrZXljb2RlID09PSAzOSB8fCBrZXljb2RlID09PSAzMikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIH1cbiAgICAgICAgZ2FtZS5rZXlEb3duKGtleWNvZGUpXG4gICAgfSlcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24ga2V5ZG93bihlKSB7XG4gICAgICAgIGxldCBrZXljb2RlID0gZS53aGljaCB8fCB3aW5kb3cuZXZlbnQua2V5Y29kZVxuICAgICAgICBnYW1lLmtleVVwKGtleWNvZGUpXG4gICAgfSlcblxufSkiLCJmdW5jdGlvbiBMZXZlbEludHJvU3RhdGUobGV2ZWwpIHtcbiAgICB0aGlzLmxldmVsID0gbGV2ZWxcbiAgICB0aGlzLmNvdW50ZG93bk1lc3NhZ2UgPSBcIjNcIlxufVxuXG5MZXZlbEludHJvU3RhdGUucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbihnYW1lLCBkZWx0YVQsIGNvbnRleHQpIHtcbiAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBnYW1lLndpZHRoLCBnYW1lLmhlaWdodClcblxuICAgIGNvbnRleHQuZm9udCA9IFwiMzZweCBIZWx2ZXRpY2FcIlxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCIjYWRkNmZmXCJcbiAgICBjb250ZXh0LnRleHRCYXNlTGluZSA9IFwibWlkZGxlXCJcbiAgICBjb250ZXh0LnRleHRBbGlnbiA9IFwiY2VudGVyXCJcbiAgICBjb250ZXh0LmZpbGxUZXh0KFwiTGV2ZWwgXCIgKyB0aGlzLmxldmVsLCBnYW1lLndpZHRoIC8gMiwgZ2FtZS5oZWlnaHQgLyAyKVxuICAgIGNvbnRleHQuZm9udCA9IFwiMjRweCBIZWx2ZXRpY2FcIlxuICAgIGNvbnRleHQuZmlsbFRleHQoXCJSZWFkeSBpbiBcIiArIHRoaXMuY291bnRkb3duTWVzc2FnZSwgZ2FtZS53aWR0aCAvIDIsIGdhbWUuaGVpZ2h0IC8gMiArIDM2KVxufVxuXG5MZXZlbEludHJvU3RhdGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKGdhbWUsIGRlbHRhVCkge1xuICAgIGlmICh0aGlzLmNvdW50ZG93biA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuY291bnRkb3duID0gM1xuICAgIH1cbiAgICB0aGlzLmNvdW50ZG93biAtPSBkZWx0YVRcblxuICAgIGlmICh0aGlzLmNvdW50ZG93biA8IDIpIHtcbiAgICAgICAgdGhpcy5jb3VudGRvd25NZXNzYWdlID0gXCIyXCJcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb3VudGRvd24gPCAxKSB7XG4gICAgICAgIHRoaXMuY291bnRkb3duTWVzc2FnZSA9IFwiMVwiXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY291bnRkb3duIDw9IDApIHtcbiAgICAgICAgZ2FtZS5tb3ZldG9TdGF0ZShuZXcgUGxheVN0YXRlKGdhbWUuY29uZmlnLCB0aGlzLmxldmVsKSlcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTGV2ZWxJbnRyb1N0YXRlIiwiY29uc3QgU3RhciA9IHJlcXVpcmUoJy4vc3RhcicpXG5cbmZ1bmN0aW9uIFNwYWNlKCkge1xuICAgIHRoaXMuZnBzID0gMzBcbiAgICB0aGlzLmNhbnZhcyA9IG51bGxcbiAgICB0aGlzLndpZHRoID0gMFxuICAgIHRoaXMuaGVpZ2h0ID0gMFxuICAgIHRoaXMubWluVmVsb2NpdHkgPSAzNVxuICAgIHRoaXMubWF4VmVsb2NpdHkgPSAyMDAwXG4gICAgdGhpcy5zdGFycyA9IDIwMFxuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IDBcbiAgICBcbn1cblxuU3BhY2UucHJvdG90eXBlLmNyZWF0ZVN0YXJzID0gZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgc3RhcnMgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFyczsgaSsrKSB7XG4gICAgICAgIHN0YXJzW2ldID0gbmV3IFN0YXIoXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy53aWR0aCwgXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy53aWR0aCwgXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogMyArIDEsIFxuICAgICAgICAgICAgKE1hdGgucmFuZG9tKCkgKiAodGhpcy5tYXhWZWxvY2l0eSAtIHRoaXMubWluVmVsb2NpdHkpKSArIHRoaXMubWluVmVsb2NpdHlcbiAgICAgICAgKVxuICAgIH1cbiAgICBkZWJ1Z2dlclxuICAgIHRoaXMuc3RhcnMgPSBzdGFyc1xufVxuXG5TcGFjZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGRlbHRhVCA9IDEgLyB0aGlzLmZwc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgc3RhciA9IHRoaXMuc3RhcnNbaV1cbiAgICAgICAgc3Rhci55ICs9IGRlbHRhVCAqIHN0YXIudmVsb2NpdHlcbiAgICAgICAgaWYgKHN0YXIueSA+IHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJzW2ldID0gbmV3IFN0YXIoXG4gICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIHRoaXMud2lkdGgsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogMyArIDEsXG4gICAgICAgICAgICAgICAgKE1hdGgucmFuZG9tKCkgKiAodGhpcy5tYXhWZWxvY2l0eSAtIHRoaXMubWluVmVsb2NpdHkpKSArIHRoaXMubWluVmVsb2NpdHlcbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5TcGFjZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKGRpdikge1xuICAgIGxldCBzZWxmID0gdGhpc1xuXG4gICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYudXBkYXRlKClcbiAgICAgICAgc2VsZi5kcmF3KClcbiAgICB9LCAxMDAwIC8gdGhpcy5mcHMpXG5cbiAgICB0aGlzLmNvbnRhaW5lckRpdiA9IGRpdlxuICAgIHNlbGYud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIHNlbGYuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gcmVzaXplKGV2ZW50KSB7XG4gICAgICAgIHNlbGYud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICBzZWxmLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICBzZWxmLmNhbnZhcy53aWR0aCA9IHNlbGYud2lkdGhcbiAgICAgICAgc2VsZi5jYW52YXMuaGVpZ2h0ID0gc2VsZi5oZWlnaHRcbiAgICAgICAgc2VsZi5kcmF3KClcbiAgICB9KVxuXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgZGl2LmFwcGVuZENoaWxkKGNhbnZhcylcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhc1xuICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy53aWR0aFxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0XG59XG5cblNwYWNlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIilcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjMDAwMDAwJ1xuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG5cbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjYWRkNmZmJ1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgc3RhciA9IHRoaXMuc3RhcnNbaV1cbiAgICAgICAgY29udGV4dC5maWxsUmVjdChzdGFyLngsIHN0YXIueSwgc3Rhci5zaXplLCBzdGFyLnNpemUpXG4gICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3BhY2UiLCJmdW5jdGlvbiBTdGFyKHgsIHksIHNpemUsIHZlbG9jaXR5KSB7XG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgICB0aGlzLnNpemUgPSBzaXplXG4gICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5XG59IFxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXIiLCJjb25zdCBMZXZlbEludHJvU3RhdGUgPSByZXF1aXJlKCcuL2xldmVsLWludHJvJylcblxuZnVuY3Rpb24gV2VsY29tZVN0YXRlKCkge31cblxuV2VsY29tZVN0YXRlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oZ2FtZSwgZGVsdGFULCBjb250ZXh0KSB7XG4gICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgZ2FtZS53aWR0aCwgZ2FtZS5oZWlnaHQpXG5cbiAgICBjb250ZXh0LmZvbnQgPSBcIjI1cHggSGVsdmV0aWNhXCJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiI2FkZDZmZlwiXG4gICAgY29udGV4dC50ZXh0QmFzZWxpbmUgPSBcImNlbnRlclwiXG4gICAgY29udGV4dC50ZXh0QWxpZ24gPSBcImNlbnRlclwiXG4gICAgY29udGV4dC5maWxsVGV4dChcIlNwYWNlIEludmFkZXJzXCIsIGdhbWUud2lkdGggLyAyLCBnYW1lLmhlaWdodCAvIDIgLSA0MClcbiAgICBjb250ZXh0LmZvbnQgPSBcIjE4cHggSGVsdmV0aWNhXCJcblxuICAgIGNvbnRleHQuZmlsbFRleHQoXCJQcmVzcyAnU3BhY2UnIHRvIHN0YXJ0XCIsIGdhbWUud2lkdGggLyAyLCBnYW1lLmhlaWdodCAvIDIpXG59XG5cbldlbGNvbWVTdGF0ZS5wcm90b3R5cGUua2V5RG93biA9IGZ1bmN0aW9uKGdhbWUsIGtleUNvZGUpIHtcbiAgICBpZiAoa2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgICAgZ2FtZS5tb3ZlVG9TdGF0ZShuZXcgTGV2ZWxJbnRyb1N0YXRlKGdhbWUubGV2ZWwpKVxuICAgIH1cbn0gXG5cbm1vZHVsZS5leHBvcnRzID0gV2VsY29tZVN0YXRlIl0sInNvdXJjZVJvb3QiOiIifQ==