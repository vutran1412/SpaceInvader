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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Space = __webpack_require__(/*! ./space */ "./src/space.js");

document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('container');
  var space = new Space();
  space.init(container);
  space.createStars();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zcGFjZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3Rhci5qcyJdLCJuYW1lcyI6WyJTcGFjZSIsInJlcXVpcmUiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsInNwYWNlIiwiaW5pdCIsImNyZWF0ZVN0YXJzIiwiU3RhciIsImZwcyIsImNhbnZhcyIsIndpZHRoIiwiaGVpZ2h0IiwibWluVmVsb2NpdHkiLCJtYXhWZWxvY2l0eSIsInN0YXJzIiwiaW50ZXJ2YWxJZCIsInByb3RvdHlwZSIsImkiLCJNYXRoIiwicmFuZG9tIiwidXBkYXRlIiwiZGVsdGFUIiwibGVuZ3RoIiwic3RhciIsInkiLCJ2ZWxvY2l0eSIsImRpdiIsInNlbGYiLCJzZXRJbnRlcnZhbCIsImRyYXciLCJjb250YWluZXJEaXYiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJyZXNpemUiLCJldmVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJ4Iiwic2l6ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtB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YWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJsZXQgU3BhY2UgPSByZXF1aXJlKCcuL3NwYWNlJylcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpXG4gICAgbGV0IHNwYWNlID0gbmV3IFNwYWNlKClcbiAgICBzcGFjZS5pbml0KGNvbnRhaW5lcilcbiAgICBzcGFjZS5jcmVhdGVTdGFycygpICAgIFxuXG59KSIsImxldCBTdGFyID0gcmVxdWlyZSgnLi9zdGFyJylcblxuZnVuY3Rpb24gU3BhY2UoKSB7XG4gICAgdGhpcy5mcHMgPSAzMFxuICAgIHRoaXMuY2FudmFzID0gbnVsbFxuICAgIHRoaXMud2lkdGggPSAwXG4gICAgdGhpcy5oZWlnaHQgPSAwXG4gICAgdGhpcy5taW5WZWxvY2l0eSA9IDE1XG4gICAgdGhpcy5tYXhWZWxvY2l0eSA9IDMwXG4gICAgdGhpcy5zdGFycyA9IDIwMFxuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IDBcbiAgICBcbn1cblxuU3BhY2UucHJvdG90eXBlLmNyZWF0ZVN0YXJzID0gZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgc3RhcnMgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFyczsgaSsrKSB7XG4gICAgICAgIHN0YXJzW2ldID0gbmV3IFN0YXIoXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy53aWR0aCwgXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy53aWR0aCwgXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogMyArIDEsIFxuICAgICAgICAgICAgKE1hdGgucmFuZG9tKCkgKiAodGhpcy5tYXhWZWxvY2l0eSAtIHRoaXMubWluVmVsb2NpdHkpKSArIHRoaXMubWluVmVsb2NpdHlcbiAgICAgICAgKVxuICAgIH1cbiAgICBkZWJ1Z2dlclxuICAgIHRoaXMuc3RhcnMgPSBzdGFyc1xufVxuXG5TcGFjZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGRlbHRhVCA9IDEgLyB0aGlzLmZwc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgc3RhciA9IHRoaXMuc3RhcnNbaV1cbiAgICAgICAgc3Rhci55ICs9IGRlbHRhVCAqIHN0YXIudmVsb2NpdHlcbiAgICAgICAgaWYgKHN0YXIueSA+IHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJzW2ldID0gbmV3IFN0YXIoXG4gICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIHRoaXMud2lkdGgsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogMyArIDEsXG4gICAgICAgICAgICAgICAgKE1hdGgucmFuZG9tKCkgKiAodGhpcy5tYXhWZWxvY2l0eSAtIHRoaXMubWluVmVsb2NpdHkpKSArIHRoaXMubWluVmVsb2NpdHlcbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5TcGFjZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKGRpdikge1xuICAgIGxldCBzZWxmID0gdGhpc1xuXG4gICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYudXBkYXRlKClcbiAgICAgICAgc2VsZi5kcmF3KClcbiAgICB9LCAxMDAwIC8gdGhpcy5mcHMpXG5cbiAgICB0aGlzLmNvbnRhaW5lckRpdiA9IGRpdlxuICAgIHNlbGYud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIHNlbGYuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gcmVzaXplKGV2ZW50KSB7XG4gICAgICAgIHNlbGYud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICBzZWxmLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICBzZWxmLmNhbnZhcy53aWR0aCA9IHNlbGYud2lkdGhcbiAgICAgICAgc2VsZi5jYW52YXMuaGVpZ2h0ID0gc2VsZi5oZWlnaHRcbiAgICAgICAgc2VsZi5kcmF3KClcbiAgICB9KVxuXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgZGl2LmFwcGVuZENoaWxkKGNhbnZhcylcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhc1xuICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy53aWR0aFxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0XG59XG5cblNwYWNlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIilcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjMDAwMDAwJ1xuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG5cbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjYWRkNmZmJ1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgc3RhciA9IHRoaXMuc3RhcnNbaV1cbiAgICAgICAgY29udGV4dC5maWxsUmVjdChzdGFyLngsIHN0YXIueSwgc3Rhci5zaXplLCBzdGFyLnNpemUpXG4gICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3BhY2UiLCJmdW5jdGlvbiBTdGFyKHgsIHksIHNpemUsIHZlbG9jaXR5KSB7XG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgICB0aGlzLnNpemUgPSBzaXplXG4gICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5XG59IFxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXIiXSwic291cmNlUm9vdCI6IiJ9