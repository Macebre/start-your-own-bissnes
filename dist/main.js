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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/style */ "./styles/style.css");
/* harmony import */ var _styles_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/main */ "./styles/main.sass");
/* harmony import */ var _styles_main__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_main__WEBPACK_IMPORTED_MODULE_1__);




"use strict";

const accordion = document.getElementsByClassName('accordion')

for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function() {
    this.classList.toggle('active');

    let panel = this.nextElementSibling;
    if (panel.style.display === 'block') {
      panel.style.display = 'none'
    } else {
      panel.style.display = 'block'
    }
  })
};

let multiItemSlider = (function () {
    return function (selector, config) {
      let
        _mainElement = document.querySelector(selector),
        _sliderWrapper = _mainElement.querySelector('.slider__wrapper'),
        _sliderItems = _mainElement.querySelectorAll('.slider__item'),
        _sliderControls = _mainElement.querySelectorAll('.slider__control'),
        _sliderControlLeft = _mainElement.querySelector('.slider__control_left'),
        _sliderControlRight = _mainElement.querySelector('.slider__control_right'),
        _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width),
        _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width),
        _positionLeftItem = 0,
        _transform = 0,
        _step = _itemWidth / _wrapperWidth * 100,
        _items = [],
        _interval = 0,
        _config = {
          isCycling: false,
          direction: 'right',
          interval: 5000,
          pause: true
        };

      for (let key in config) {
        if (key in _config) {
          _config[key] = config[key];
        }
      }

      _sliderItems.forEach(function (item, index) {
        _items.push({ item: item, position: index, transform: 0 });
      });

      let position = {
        getItemMin: function () {
          let indexItem = 0;
          _items.forEach(function (item, index) {
            if (item.position < _items[indexItem].position) {
              indexItem = index;
            }
          });
          return indexItem;
        },
        getItemMax: function () {
          let indexItem = 0;
          _items.forEach(function (item, index) {
            if (item.position > _items[indexItem].position) {
              indexItem = index;
            }
          });
          return indexItem;
        },
        getMin: function () {
          return _items[position.getItemMin()].position;
        },
        getMax: function () {
          return _items[position.getItemMax()].position;
        }
      }

      let _transformItem = function (direction) {
        let nextItem;
        if (direction === 'right') {
          _positionLeftItem++;
          if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
            nextItem = position.getItemMin();
            _items[nextItem].position = position.getMax() + 1;
            _items[nextItem].transform += _items.length * 100;
            _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
          }
          _transform -= _step;
        }
        if (direction === 'left') {
          _positionLeftItem--;
          if (_positionLeftItem < position.getMin()) {
            nextItem = position.getItemMax();
            _items[nextItem].position = position.getMin() - 1;
            _items[nextItem].transform -= _items.length * 100;
            _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
          }
          _transform += _step;
        }
        _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
      }

      let _cycle = function (direction) {
        if (!_config.isCycling) {
          return;
        }
        _interval = setInterval(function () {
          _transformItem(direction);
        }, _config.interval);
      }

      let _controlClick = function (e) {
        if (e.target.classList.contains('slider__control')) {
          e.preventDefault();
          let direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
          _transformItem(direction);
          clearInterval(_interval);
          _cycle(_config.direction);
        }
      };

      let _setUpListeners = function () {
        _sliderControls.forEach(function (item) {
          item.addEventListener('click', _controlClick);
        });
        if (_config.pause && _config.isCycling) {
          _mainElement.addEventListener('mouseenter', function () {
            clearInterval(_interval);
          });
          _mainElement.addEventListener('mouseleave', function () {
            clearInterval(_interval);
            _cycle(_config.direction);
          });
        }
      }

      _setUpListeners();
      _cycle(_config.direction);

      return {
        right: function () {
          _transformItem('right');
        },
        left: function () {
          _transformItem('left');
        },
        stop: function () {
          _config.isCycling = false;
          clearInterval(_interval);
        },
        cycle: function () {
          _config.isCycling = true;
          clearInterval(_interval);
          _cycle();
        }
      }

    }
  }());

  let slider = multiItemSlider('.slider', {
    isCycling: true
  })


/***/ }),

/***/ "./styles/main.sass":
/*!**************************!*\
  !*** ./styles/main.sass ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ "./styles/style.css":
/*!**************************!*\
  !*** ./styles/style.css ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

/******/ });
//# sourceMappingURL=main.js.map