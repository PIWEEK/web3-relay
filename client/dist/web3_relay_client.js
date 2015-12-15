/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Web3 = __webpack_require__(1);

	// dont override global variable
	if (typeof window !== 'undefined' && typeof window.Web3 === 'undefined') {
	    window.Web3 = Web3;
	}

	module.exports = Web3;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Eth = __webpack_require__(2);

	function Web3 (provider) {
	    this.eth = new Eth(this);
	}

	module.exports = Web3;



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Contract = __webpack_require__(3);

	function Eth(web3) {
	    var self = this;
	}

	Eth.prototype.contract = function (abi) {
	    var factory = new Contract(this, abi);
	    return factory;
	};

	module.exports = Eth;



/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var ContractFactory = function (eth, abi) {
	    this.eth = eth;
	    this.abi = abi;
	};

	ContractFactory.prototype.new = function () {
	    var contract = new Contract(this.eth, this.abi);
	    return contract;
	};

	var Contract = function (eth, abi, address) {
	    this._eth = eth;
	    this.address = address;
	    this.abi = abi;
	};

	module.exports = ContractFactory;


/***/ }
/******/ ]);