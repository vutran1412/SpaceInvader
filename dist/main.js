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
/***/ (function(module, exports) {

function Game() {
  this.config = {
    gameWidth: 600,
    gameHeight: 500,
    fps: 50
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
  var game = new Game();

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
  this.width = 0;
  this.height = 0;
  this.minVelocity = 15;
  this.maxVelocity = 30;
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zcGFjZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3Rhci5qcyJdLCJuYW1lcyI6WyJHYW1lIiwiY29uZmlnIiwiZ2FtZVdpZHRoIiwiZ2FtZUhlaWdodCIsImZwcyIsImxpdmVzIiwid2lkdGgiLCJoZWlnaHQiLCJnYW1lQm91bmRzIiwibGVmdCIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwic3RhdGVTdGFjayIsInByZXNzZWRLZXlzIiwiZ2FtZUNhbnZhcyIsImdhbWVMb29wIiwiZ2FtZSIsImN1cnJlbnRTdGF0ZSIsImRlbHRhVCIsImdhbWVDb250ZXh0IiwiZ2V0Q29udGV4dCIsInVwZGF0ZSIsImRyYXciLCJwcm90b3R5cGUiLCJzdGFydCIsIm1vdmVUb1N0YXRlIiwiV2VsY29tZVN0YXRlIiwiZGVidWdNb2RlIiwidGVzdCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImludGVydmFsSWQiLCJzZXRJbnRlcnZhbCIsImluaXQiLCJsZW5ndGgiLCJzdGF0ZSIsImxlYXZlIiwicG9wIiwiZW50ZXIiLCJwdXNoIiwicHVzaFN0YXRlIiwicG9wU3RhdGUiLCJTcGFjZSIsInJlcXVpcmUiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsInNwYWNlIiwiY3JlYXRlU3RhcnMiLCJTdGFyIiwiY2FudmFzIiwibWluVmVsb2NpdHkiLCJtYXhWZWxvY2l0eSIsInN0YXJzIiwiaSIsIk1hdGgiLCJyYW5kb20iLCJzdGFyIiwieSIsInZlbG9jaXR5IiwiZGl2Iiwic2VsZiIsImNvbnRhaW5lckRpdiIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInJlc2l6ZSIsImV2ZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY29udGV4dCIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwieCIsInNpemUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsU0FBU0EsSUFBVCxHQUFnQjtBQUNaLE9BQUtDLE1BQUwsR0FBYztBQUNWQyxhQUFTLEVBQUUsR0FERDtBQUVWQyxjQUFVLEVBQUUsR0FGRjtBQUdWQyxPQUFHLEVBQUU7QUFISyxHQUFkO0FBTUEsT0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDQSxPQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLE9BQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQjtBQUNkQyxRQUFJLEVBQUUsQ0FEUTtBQUVkQyxPQUFHLEVBQUUsQ0FGUztBQUdkQyxTQUFLLEVBQUUsQ0FITztBQUlkQyxVQUFNLEVBQUU7QUFKTSxHQUFsQjtBQU9BLE9BQUtDLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxPQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNIOztBQUVELFNBQVNDLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdCO0FBQ3BCLE1BQUlDLFlBQVksR0FBR0QsSUFBSSxDQUFDQyxZQUFMLEVBQW5COztBQUNBLE1BQUlBLFlBQUosRUFBa0I7QUFDZCxRQUFJQyxNQUFNLEdBQUcsSUFBSUYsSUFBSSxDQUFDaEIsTUFBTCxDQUFZRyxHQUE3QjtBQUVBLFFBQUlnQixXQUFXLEdBQUdILElBQUksQ0FBQ0YsVUFBTCxDQUFnQk0sVUFBaEIsQ0FBMkIsSUFBM0IsQ0FBbEI7O0FBRUEsUUFBSUgsWUFBWSxDQUFDSSxNQUFqQixFQUF5QjtBQUNyQkosa0JBQVksQ0FBQ0ksTUFBYixDQUFvQkwsSUFBcEIsRUFBMEJFLE1BQTFCO0FBQ0g7O0FBQ0QsUUFBSUQsWUFBWSxDQUFDSyxJQUFqQixFQUF1QjtBQUNuQkwsa0JBQVksQ0FBQ0ssSUFBYixDQUFrQk4sSUFBbEIsRUFBd0JFLE1BQXhCLEVBQWdDQyxXQUFoQztBQUNIO0FBRUo7QUFDSjs7QUFFRHBCLElBQUksQ0FBQ3dCLFNBQUwsQ0FBZUMsS0FBZixHQUF1QixZQUFXO0FBQzlCLE9BQUtDLFdBQUwsQ0FBaUIsSUFBSUMsWUFBSixFQUFqQjtBQUVBLE9BQUt0QixLQUFMLEdBQWEsQ0FBYjtBQUNBLE9BQUtKLE1BQUwsQ0FBWTJCLFNBQVosR0FBd0IsYUFBYUMsSUFBYixDQUFrQkMsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUFsQyxDQUF4QjtBQUVBLE1BQUlmLElBQUksR0FBRyxJQUFYO0FBQ0EsT0FBS2dCLFVBQUwsR0FBa0JDLFdBQVcsQ0FBQyxZQUFXO0FBQ3JDbEIsWUFBUSxDQUFDQyxJQUFELENBQVI7QUFDSCxHQUY0QixFQUUxQixPQUFPLEtBQUtoQixNQUFMLENBQVlHLEdBRk8sQ0FBN0I7QUFHSCxDQVZEOztBQVlBSixJQUFJLENBQUN3QixTQUFMLENBQWVXLElBQWYsR0FBc0IsVUFBU3BCLFVBQVQsRUFBcUI7QUFDdkMsT0FBS0EsVUFBTCxHQUFrQkEsVUFBbEI7QUFFQSxPQUFLVCxLQUFMLEdBQWFTLFVBQVUsQ0FBQ1QsS0FBeEI7QUFDQSxPQUFLQyxNQUFMLEdBQWNRLFVBQVUsQ0FBQ1IsTUFBekI7QUFFQSxPQUFLQyxVQUFMLEdBQWtCO0FBQ2RDLFFBQUksRUFBRU0sVUFBVSxDQUFDVCxLQUFYLEdBQW1CLENBQW5CLEdBQXVCLEtBQUtMLE1BQUwsQ0FBWUMsU0FBWixHQUF3QixDQUR2QztBQUVkUyxTQUFLLEVBQUVJLFVBQVUsQ0FBQ1QsS0FBWCxHQUFtQixDQUFuQixHQUF1QixLQUFLTCxNQUFMLENBQVlDLFNBQVosR0FBd0IsQ0FGeEM7QUFHZFEsT0FBRyxFQUFFSyxVQUFVLENBQUNSLE1BQVgsR0FBb0IsQ0FBcEIsR0FBd0IsS0FBS04sTUFBTCxDQUFZRSxVQUFaLEdBQXlCLENBSHhDO0FBSWRTLFVBQU0sRUFBRUcsVUFBVSxDQUFDUixNQUFYLEdBQW9CLENBQXBCLEdBQXdCLEtBQUtOLE1BQUwsQ0FBWUUsVUFBWixHQUF5QjtBQUozQyxHQUFsQjtBQU1ILENBWkQ7O0FBY0FILElBQUksQ0FBQ3dCLFNBQUwsQ0FBZU4sWUFBZixHQUE4QixZQUFXO0FBQ3JDLFNBQU8sS0FBS0wsVUFBTCxDQUFnQnVCLE1BQWhCLEdBQXlCLENBQXpCLEdBQTZCLEtBQUt2QixVQUFMLENBQWdCLEtBQUtBLFVBQUwsQ0FBZ0J1QixNQUFoQixHQUF5QixDQUF6QyxDQUE3QixHQUEyRSxJQUFsRjtBQUNILENBRkQ7O0FBSUFwQyxJQUFJLENBQUN3QixTQUFMLENBQWVFLFdBQWYsR0FBNkIsVUFBU1csS0FBVCxFQUFnQjtBQUN6QyxNQUFJLEtBQUtuQixZQUFMLEVBQUosRUFBeUI7QUFDckIsUUFBSSxLQUFLQSxZQUFMLEdBQW9Cb0IsS0FBeEIsRUFBK0I7QUFDM0IsV0FBS3BCLFlBQUwsQ0FBa0JvQixLQUFsQixDQUF3QnJCLElBQXhCO0FBQ0g7O0FBQ0QsU0FBS0osVUFBTCxDQUFnQjBCLEdBQWhCO0FBQ0g7O0FBRUQsTUFBSUYsS0FBSyxDQUFDRyxLQUFWLEVBQWlCO0FBQ2JILFNBQUssQ0FBQ0csS0FBTixDQUFZdkIsSUFBWjtBQUNIOztBQUVELE9BQUtKLFVBQUwsQ0FBZ0I0QixJQUFoQixDQUFxQkosS0FBckI7QUFDSCxDQWJEOztBQWVBckMsSUFBSSxDQUFDd0IsU0FBTCxDQUFla0IsU0FBZixHQUEyQixVQUFTTCxLQUFULEVBQWdCO0FBQ3ZDLE1BQUlBLEtBQUssQ0FBQ0csS0FBVixFQUFpQjtBQUNiSCxTQUFLLENBQUNHLEtBQU4sQ0FBWXZCLElBQVo7QUFDSDs7QUFDRCxPQUFLSixVQUFMLENBQWdCNEIsSUFBaEIsQ0FBcUJKLEtBQXJCO0FBQ0gsQ0FMRDs7QUFPQXJDLElBQUksQ0FBQ3dCLFNBQUwsQ0FBZW1CLFFBQWYsR0FBMEIsWUFBVztBQUNqQyxNQUFJLEtBQUt6QixZQUFMLEVBQUosRUFBeUI7QUFDckIsUUFBSSxLQUFLQSxZQUFMLEdBQW9Cb0IsS0FBeEIsRUFBK0I7QUFDM0IsV0FBS3BCLFlBQUwsR0FBb0JvQixLQUFwQixDQUEwQnJCLElBQTFCO0FBQ0g7O0FBQ0QsU0FBS0osVUFBTCxDQUFnQjBCLEdBQWhCO0FBQ0g7QUFDSixDQVBELEM7Ozs7Ozs7Ozs7O0FDM0ZBLElBQUlLLEtBQUssR0FBR0MsbUJBQU8sQ0FBQywrQkFBRCxDQUFuQjs7QUFDQSxJQUFJN0MsSUFBSSxHQUFHNkMsbUJBQU8sQ0FBQyw2QkFBRCxDQUFsQjs7QUFFQUMsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNoRCxNQUFJQyxTQUFTLEdBQUdGLFFBQVEsQ0FBQ0csY0FBVCxDQUF3QixXQUF4QixDQUFoQjtBQUNBLE1BQUlDLEtBQUssR0FBRyxJQUFJTixLQUFKLEVBQVo7QUFDQU0sT0FBSyxDQUFDZixJQUFOLENBQVdhLFNBQVg7QUFDQUUsT0FBSyxDQUFDQyxXQUFOO0FBQ0EsTUFBSWxDLElBQUksR0FBRyxJQUFJakIsSUFBSixFQUFYOztBQUVBLFdBQVNnQixRQUFULENBQWtCQyxJQUFsQixFQUF3QjtBQUNwQixRQUFJQyxZQUFZLEdBQUdELElBQUksQ0FBQ0MsWUFBTCxFQUFuQjs7QUFDQSxRQUFJQSxZQUFKLEVBQWtCO0FBQ2QsVUFBSUMsTUFBTSxHQUFHLElBQUlGLElBQUksQ0FBQ2hCLE1BQUwsQ0FBWUcsR0FBN0I7QUFFQSxVQUFJZ0IsV0FBVyxHQUFHSCxJQUFJLENBQUNGLFVBQUwsQ0FBZ0JNLFVBQWhCLENBQTJCLElBQTNCLENBQWxCOztBQUVBLFVBQUlILFlBQVksQ0FBQ0ksTUFBakIsRUFBeUI7QUFDckJKLG9CQUFZLENBQUNJLE1BQWIsQ0FBb0JMLElBQXBCLEVBQTBCRSxNQUExQjtBQUNIOztBQUNELFVBQUlELFlBQVksQ0FBQ0ssSUFBakIsRUFBdUI7QUFDbkJMLG9CQUFZLENBQUNLLElBQWIsQ0FBa0JOLElBQWxCLEVBQXdCRSxNQUF4QixFQUFnQ0MsV0FBaEM7QUFDSDtBQUVKO0FBQ0o7QUFFSixDQXhCRCxFOzs7Ozs7Ozs7OztBQ0hBLElBQUlnQyxJQUFJLEdBQUdQLG1CQUFPLENBQUMsNkJBQUQsQ0FBbEI7O0FBRUEsU0FBU0QsS0FBVCxHQUFpQjtBQUNiLE9BQUt4QyxHQUFMLEdBQVcsRUFBWDtBQUNBLE9BQUtpRCxNQUFMLEdBQWMsSUFBZDtBQUNBLE9BQUsvQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLE9BQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsT0FBSytDLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxPQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsT0FBS0MsS0FBTCxHQUFhLEdBQWI7QUFDQSxPQUFLdkIsVUFBTCxHQUFrQixDQUFsQjtBQUVIOztBQUVEVyxLQUFLLENBQUNwQixTQUFOLENBQWdCMkIsV0FBaEIsR0FBOEIsWUFBVztBQUVyQyxNQUFJSyxLQUFLLEdBQUcsRUFBWjs7QUFDQSxPQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS0QsS0FBekIsRUFBZ0NDLENBQUMsRUFBakMsRUFBcUM7QUFDakNELFNBQUssQ0FBQ0MsQ0FBRCxDQUFMLEdBQVcsSUFBSUwsSUFBSixDQUNQTSxJQUFJLENBQUNDLE1BQUwsS0FBZ0IsS0FBS3JELEtBRGQsRUFFUG9ELElBQUksQ0FBQ0MsTUFBTCxLQUFnQixLQUFLckQsS0FGZCxFQUdQb0QsSUFBSSxDQUFDQyxNQUFMLEtBQWdCLENBQWhCLEdBQW9CLENBSGIsRUFJTkQsSUFBSSxDQUFDQyxNQUFMLE1BQWlCLEtBQUtKLFdBQUwsR0FBbUIsS0FBS0QsV0FBekMsQ0FBRCxHQUEwRCxLQUFLQSxXQUp4RCxDQUFYO0FBTUg7O0FBQ0Q7QUFDQSxPQUFLRSxLQUFMLEdBQWFBLEtBQWI7QUFDSCxDQWJEOztBQWVBWixLQUFLLENBQUNwQixTQUFOLENBQWdCRixNQUFoQixHQUF5QixZQUFXO0FBQ2hDLE1BQUlILE1BQU0sR0FBRyxJQUFJLEtBQUtmLEdBQXRCOztBQUNBLE9BQUssSUFBSXFELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS0QsS0FBTCxDQUFXcEIsTUFBL0IsRUFBdUNxQixDQUFDLEVBQXhDLEVBQTRDO0FBQ3hDLFFBQUlHLElBQUksR0FBRyxLQUFLSixLQUFMLENBQVdDLENBQVgsQ0FBWDtBQUNBRyxRQUFJLENBQUNDLENBQUwsSUFBVTFDLE1BQU0sR0FBR3lDLElBQUksQ0FBQ0UsUUFBeEI7O0FBQ0EsUUFBSUYsSUFBSSxDQUFDQyxDQUFMLEdBQVMsS0FBS3RELE1BQWxCLEVBQTBCO0FBQ3RCLFdBQUtpRCxLQUFMLENBQVdDLENBQVgsSUFBZ0IsSUFBSUwsSUFBSixDQUNaTSxJQUFJLENBQUNDLE1BQUwsS0FBZ0IsS0FBS3JELEtBRFQsRUFFWixDQUZZLEVBR1pvRCxJQUFJLENBQUNDLE1BQUwsS0FBZ0IsQ0FBaEIsR0FBb0IsQ0FIUixFQUlYRCxJQUFJLENBQUNDLE1BQUwsTUFBaUIsS0FBS0osV0FBTCxHQUFtQixLQUFLRCxXQUF6QyxDQUFELEdBQTBELEtBQUtBLFdBSm5ELENBQWhCO0FBTUg7QUFDSjtBQUNKLENBZEQ7O0FBaUJBVixLQUFLLENBQUNwQixTQUFOLENBQWdCVyxJQUFoQixHQUF1QixVQUFTNEIsR0FBVCxFQUFjO0FBQ2pDLE1BQUlDLElBQUksR0FBRyxJQUFYO0FBRUEsT0FBSy9CLFVBQUwsR0FBa0JDLFdBQVcsQ0FBQyxZQUFXO0FBQ3JDOEIsUUFBSSxDQUFDMUMsTUFBTDtBQUNBMEMsUUFBSSxDQUFDekMsSUFBTDtBQUNILEdBSDRCLEVBRzFCLE9BQU8sS0FBS25CLEdBSGMsQ0FBN0I7QUFLQSxPQUFLNkQsWUFBTCxHQUFvQkYsR0FBcEI7QUFDQUMsTUFBSSxDQUFDMUQsS0FBTCxHQUFhd0IsTUFBTSxDQUFDb0MsVUFBcEI7QUFDQUYsTUFBSSxDQUFDekQsTUFBTCxHQUFjdUIsTUFBTSxDQUFDcUMsV0FBckI7QUFFQXJDLFFBQU0sQ0FBQ2lCLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFNBQVNxQixNQUFULENBQWdCQyxLQUFoQixFQUF1QjtBQUNyREwsUUFBSSxDQUFDMUQsS0FBTCxHQUFhd0IsTUFBTSxDQUFDb0MsVUFBcEI7QUFDQUYsUUFBSSxDQUFDekQsTUFBTCxHQUFjdUIsTUFBTSxDQUFDcUMsV0FBckI7QUFDQUgsUUFBSSxDQUFDWCxNQUFMLENBQVkvQyxLQUFaLEdBQW9CMEQsSUFBSSxDQUFDMUQsS0FBekI7QUFDQTBELFFBQUksQ0FBQ1gsTUFBTCxDQUFZOUMsTUFBWixHQUFxQnlELElBQUksQ0FBQ3pELE1BQTFCO0FBQ0F5RCxRQUFJLENBQUN6QyxJQUFMO0FBQ0gsR0FORDtBQVFBLE1BQUk4QixNQUFNLEdBQUdQLFFBQVEsQ0FBQ3dCLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBYjtBQUNBUCxLQUFHLENBQUNRLFdBQUosQ0FBZ0JsQixNQUFoQjtBQUNBLE9BQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNBLE9BQUtBLE1BQUwsQ0FBWS9DLEtBQVosR0FBb0IsS0FBS0EsS0FBekI7QUFDQSxPQUFLK0MsTUFBTCxDQUFZOUMsTUFBWixHQUFxQixLQUFLQSxNQUExQjtBQUNILENBekJEOztBQTJCQXFDLEtBQUssQ0FBQ3BCLFNBQU4sQ0FBZ0JELElBQWhCLEdBQXVCLFlBQVc7QUFDOUIsTUFBSWlELE9BQU8sR0FBRyxLQUFLbkIsTUFBTCxDQUFZaEMsVUFBWixDQUF1QixJQUF2QixDQUFkO0FBQ0FtRCxTQUFPLENBQUNDLFNBQVIsR0FBb0IsU0FBcEI7QUFDQUQsU0FBTyxDQUFDRSxRQUFSLENBQWlCLENBQWpCLEVBQW9CLENBQXBCLEVBQXVCLEtBQUtwRSxLQUE1QixFQUFtQyxLQUFLQyxNQUF4QztBQUVBaUUsU0FBTyxDQUFDQyxTQUFSLEdBQW9CLFNBQXBCOztBQUNBLE9BQUssSUFBSWhCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS0QsS0FBTCxDQUFXcEIsTUFBL0IsRUFBdUNxQixDQUFDLEVBQXhDLEVBQTRDO0FBQ3hDLFFBQUlHLElBQUksR0FBRyxLQUFLSixLQUFMLENBQVdDLENBQVgsQ0FBWDtBQUNBZSxXQUFPLENBQUNFLFFBQVIsQ0FBaUJkLElBQUksQ0FBQ2UsQ0FBdEIsRUFBeUJmLElBQUksQ0FBQ0MsQ0FBOUIsRUFBaUNELElBQUksQ0FBQ2dCLElBQXRDLEVBQTRDaEIsSUFBSSxDQUFDZ0IsSUFBakQ7QUFDSDtBQUVKLENBWEQ7O0FBYUFDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmxDLEtBQWpCLEM7Ozs7Ozs7Ozs7O0FDdEZBLFNBQVNRLElBQVQsQ0FBY3VCLENBQWQsRUFBaUJkLENBQWpCLEVBQW9CZSxJQUFwQixFQUEwQmQsUUFBMUIsRUFBb0M7QUFDaEMsT0FBS2EsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsT0FBS2QsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsT0FBS2UsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsT0FBS2QsUUFBTCxHQUFnQkEsUUFBaEI7QUFDSDs7QUFFRGUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCMUIsSUFBakIsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJmdW5jdGlvbiBHYW1lKCkge1xuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgICBnYW1lV2lkdGg6IDYwMCxcbiAgICAgICAgZ2FtZUhlaWdodDogNTAwLFxuICAgICAgICBmcHM6IDUwXG4gICAgfVxuXG4gICAgdGhpcy5saXZlcyA9IDNcbiAgICB0aGlzLndpZHRoID0gMFxuICAgIHRoaXMuaGVpZ2h0ID0gMFxuICAgIHRoaXMuZ2FtZUJvdW5kcyA9IHtcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgYm90dG9tOiAwXG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZVN0YWNrID0gW11cbiAgICB0aGlzLnByZXNzZWRLZXlzID0ge31cbiAgICB0aGlzLmdhbWVDYW52YXMgPSBudWxsXG59XG5cbmZ1bmN0aW9uIGdhbWVMb29wKGdhbWUpIHtcbiAgICBsZXQgY3VycmVudFN0YXRlID0gZ2FtZS5jdXJyZW50U3RhdGUoKVxuICAgIGlmIChjdXJyZW50U3RhdGUpIHtcbiAgICAgICAgbGV0IGRlbHRhVCA9IDEgLyBnYW1lLmNvbmZpZy5mcHNcblxuICAgICAgICBsZXQgZ2FtZUNvbnRleHQgPSBnYW1lLmdhbWVDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpXG5cbiAgICAgICAgaWYgKGN1cnJlbnRTdGF0ZS51cGRhdGUpIHtcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZS51cGRhdGUoZ2FtZSwgZGVsdGFUKVxuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyZW50U3RhdGUuZHJhdykge1xuICAgICAgICAgICAgY3VycmVudFN0YXRlLmRyYXcoZ2FtZSwgZGVsdGFULCBnYW1lQ29udGV4dClcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5HYW1lLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubW92ZVRvU3RhdGUobmV3IFdlbGNvbWVTdGF0ZSgpKVxuXG4gICAgdGhpcy5saXZlcyA9IDNcbiAgICB0aGlzLmNvbmZpZy5kZWJ1Z01vZGUgPSAvZGVidWc9dHJ1ZS8udGVzdCh3aW5kb3cubG9jYXRpb24uaHJlZilcblxuICAgIGxldCBnYW1lID0gdGhpc1xuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBnYW1lTG9vcChnYW1lKVxuICAgIH0sIDEwMDAgLyB0aGlzLmNvbmZpZy5mcHMpXG59XG5cbkdhbWUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbihnYW1lQ2FudmFzKSB7XG4gICAgdGhpcy5nYW1lQ2FudmFzID0gZ2FtZUNhbnZhc1xuXG4gICAgdGhpcy53aWR0aCA9IGdhbWVDYW52YXMud2lkdGhcbiAgICB0aGlzLmhlaWdodCA9IGdhbWVDYW52YXMuaGVpZ2h0XG5cbiAgICB0aGlzLmdhbWVCb3VuZHMgPSB7XG4gICAgICAgIGxlZnQ6IGdhbWVDYW52YXMud2lkdGggLyAyIC0gdGhpcy5jb25maWcuZ2FtZVdpZHRoIC8gMixcbiAgICAgICAgcmlnaHQ6IGdhbWVDYW52YXMud2lkdGggLyAyIC0gdGhpcy5jb25maWcuZ2FtZVdpZHRoIC8gMixcbiAgICAgICAgdG9wOiBnYW1lQ2FudmFzLmhlaWdodCAvIDIgLSB0aGlzLmNvbmZpZy5nYW1lSGVpZ2h0IC8gMixcbiAgICAgICAgYm90dG9tOiBnYW1lQ2FudmFzLmhlaWdodCAvIDIgLSB0aGlzLmNvbmZpZy5nYW1lSGVpZ2h0IC8gMlxuICAgIH1cbn1cblxuR2FtZS5wcm90b3R5cGUuY3VycmVudFN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVTdGFjay5sZW5ndGggPiAwID8gdGhpcy5zdGF0ZVN0YWNrW3RoaXMuc3RhdGVTdGFjay5sZW5ndGggLSAxXSA6IG51bGxcbn1cblxuR2FtZS5wcm90b3R5cGUubW92ZVRvU3RhdGUgPSBmdW5jdGlvbihzdGF0ZSkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSgpKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSgpLmxlYXZlKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZS5sZWF2ZShnYW1lKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGVTdGFjay5wb3AoKVxuICAgIH1cblxuICAgIGlmIChzdGF0ZS5lbnRlcikge1xuICAgICAgICBzdGF0ZS5lbnRlcihnYW1lKVxuICAgIH1cblxuICAgIHRoaXMuc3RhdGVTdGFjay5wdXNoKHN0YXRlKVxufVxuXG5HYW1lLnByb3RvdHlwZS5wdXNoU3RhdGUgPSBmdW5jdGlvbihzdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5lbnRlcikge1xuICAgICAgICBzdGF0ZS5lbnRlcihnYW1lKVxuICAgIH1cbiAgICB0aGlzLnN0YXRlU3RhY2sucHVzaChzdGF0ZSlcbn1cblxuR2FtZS5wcm90b3R5cGUucG9wU3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUoKSkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUoKS5sZWF2ZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUoKS5sZWF2ZShnYW1lKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGVTdGFjay5wb3AoKVxuICAgIH1cbn1cblxuIiwibGV0IFNwYWNlID0gcmVxdWlyZSgnLi9zcGFjZScpXG5sZXQgR2FtZSA9IHJlcXVpcmUoJy4vZ2FtZScpXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKVxuICAgIGxldCBzcGFjZSA9IG5ldyBTcGFjZSgpXG4gICAgc3BhY2UuaW5pdChjb250YWluZXIpXG4gICAgc3BhY2UuY3JlYXRlU3RhcnMoKVxuICAgIGxldCBnYW1lID0gbmV3IEdhbWUoKVxuICAgIFxuICAgIGZ1bmN0aW9uIGdhbWVMb29wKGdhbWUpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRTdGF0ZSA9IGdhbWUuY3VycmVudFN0YXRlKClcbiAgICAgICAgaWYgKGN1cnJlbnRTdGF0ZSkge1xuICAgICAgICAgICAgbGV0IGRlbHRhVCA9IDEgLyBnYW1lLmNvbmZpZy5mcHNcblxuICAgICAgICAgICAgbGV0IGdhbWVDb250ZXh0ID0gZ2FtZS5nYW1lQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKVxuXG4gICAgICAgICAgICBpZiAoY3VycmVudFN0YXRlLnVwZGF0ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGF0ZS51cGRhdGUoZ2FtZSwgZGVsdGFUKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGN1cnJlbnRTdGF0ZS5kcmF3KSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFN0YXRlLmRyYXcoZ2FtZSwgZGVsdGFULCBnYW1lQ29udGV4dClcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG59KSIsImxldCBTdGFyID0gcmVxdWlyZSgnLi9zdGFyJylcblxuZnVuY3Rpb24gU3BhY2UoKSB7XG4gICAgdGhpcy5mcHMgPSAzMFxuICAgIHRoaXMuY2FudmFzID0gbnVsbFxuICAgIHRoaXMud2lkdGggPSAwXG4gICAgdGhpcy5oZWlnaHQgPSAwXG4gICAgdGhpcy5taW5WZWxvY2l0eSA9IDE1XG4gICAgdGhpcy5tYXhWZWxvY2l0eSA9IDMwXG4gICAgdGhpcy5zdGFycyA9IDIwMFxuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IDBcbiAgICBcbn1cblxuU3BhY2UucHJvdG90eXBlLmNyZWF0ZVN0YXJzID0gZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgc3RhcnMgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFyczsgaSsrKSB7XG4gICAgICAgIHN0YXJzW2ldID0gbmV3IFN0YXIoXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy53aWR0aCwgXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy53aWR0aCwgXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogMyArIDEsIFxuICAgICAgICAgICAgKE1hdGgucmFuZG9tKCkgKiAodGhpcy5tYXhWZWxvY2l0eSAtIHRoaXMubWluVmVsb2NpdHkpKSArIHRoaXMubWluVmVsb2NpdHlcbiAgICAgICAgKVxuICAgIH1cbiAgICBkZWJ1Z2dlclxuICAgIHRoaXMuc3RhcnMgPSBzdGFyc1xufVxuXG5TcGFjZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGRlbHRhVCA9IDEgLyB0aGlzLmZwc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgc3RhciA9IHRoaXMuc3RhcnNbaV1cbiAgICAgICAgc3Rhci55ICs9IGRlbHRhVCAqIHN0YXIudmVsb2NpdHlcbiAgICAgICAgaWYgKHN0YXIueSA+IHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJzW2ldID0gbmV3IFN0YXIoXG4gICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIHRoaXMud2lkdGgsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogMyArIDEsXG4gICAgICAgICAgICAgICAgKE1hdGgucmFuZG9tKCkgKiAodGhpcy5tYXhWZWxvY2l0eSAtIHRoaXMubWluVmVsb2NpdHkpKSArIHRoaXMubWluVmVsb2NpdHlcbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5TcGFjZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKGRpdikge1xuICAgIGxldCBzZWxmID0gdGhpc1xuXG4gICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYudXBkYXRlKClcbiAgICAgICAgc2VsZi5kcmF3KClcbiAgICB9LCAxMDAwIC8gdGhpcy5mcHMpXG5cbiAgICB0aGlzLmNvbnRhaW5lckRpdiA9IGRpdlxuICAgIHNlbGYud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIHNlbGYuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gcmVzaXplKGV2ZW50KSB7XG4gICAgICAgIHNlbGYud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICBzZWxmLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICBzZWxmLmNhbnZhcy53aWR0aCA9IHNlbGYud2lkdGhcbiAgICAgICAgc2VsZi5jYW52YXMuaGVpZ2h0ID0gc2VsZi5oZWlnaHRcbiAgICAgICAgc2VsZi5kcmF3KClcbiAgICB9KVxuXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgZGl2LmFwcGVuZENoaWxkKGNhbnZhcylcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhc1xuICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy53aWR0aFxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0XG59XG5cblNwYWNlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIilcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjMDAwMDAwJ1xuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG5cbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjYWRkNmZmJ1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgc3RhciA9IHRoaXMuc3RhcnNbaV1cbiAgICAgICAgY29udGV4dC5maWxsUmVjdChzdGFyLngsIHN0YXIueSwgc3Rhci5zaXplLCBzdGFyLnNpemUpXG4gICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3BhY2UiLCJmdW5jdGlvbiBTdGFyKHgsIHksIHNpemUsIHZlbG9jaXR5KSB7XG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgICB0aGlzLnNpemUgPSBzaXplXG4gICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5XG59IFxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXIiXSwic291cmNlUm9vdCI6IiJ9