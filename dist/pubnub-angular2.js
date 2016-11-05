/*! 1.0.0-beta.3 */
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

	__webpack_require__(1);
	__webpack_require__(2);
	//  require('./pubnub_channel.js');
	//  require('./pubnub_channel_group.js');

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	/* istanbul ignore next */
	// Object.create(proto[, propertiesObject])
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	if (typeof Object.create !== 'function') {
	  Object.create = function () {
	    var Temp = function Temp() {};
	    return function (prototype) {
	      if (arguments.length > 1) {
	        throw new Error('Second argument not supported');
	      }
	      if (prototype !== Object(prototype) && prototype !== null) {
	        throw new TypeError('Argument must be an object or null');
	      }
	      if (prototype === null) {
	        throw Error('null [[Prototype]] not supported');
	      }
	      Temp.prototype = prototype;
	      var result = new Temp();
	      Temp.prototype = null;
	      return result;
	    };
	  }();
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _config = __webpack_require__(3);

	var _config2 = _interopRequireDefault(_config);

	var _wrapper = __webpack_require__(4);

	var _wrapper2 = _interopRequireDefault(_wrapper);

	var _broadcast = __webpack_require__(6);

	var _broadcast2 = _interopRequireDefault(_broadcast);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {

	  window.PubNubAngular = ng.core.Class({
	    constructor: function constructor() {
	      if (typeof PubNub === 'undefined' || PubNub === null) {
	        throw new Error('PubNub is not in global scope. Ensure that pubnub.js v4 library is included before the angular adapter');
	      }

	      this.wrappers = {};
	      this.broadcastOn = new _broadcast2.default();
	    },

	    /**
	     * Initializer for default instance
	     *
	     * @param {Object} initConfig
	     */
	    init: function init(initConfig) {

	      var instance = this.getInstance(_config2.default.default_instance_name);

	      instance.init(initConfig);

	      return instance;
	    },

	    /**
	     * Instance getter
	     *
	     * @param instanceName
	     * @returns {Wrapper}
	     */
	    getInstance: function getInstance(instanceName) {
	      var _this = this;

	      var instance = this.wrappers[instanceName];

	      if (instance && instance instanceof _wrapper2.default) {
	        return instance;
	      } else if (typeof instanceName === 'string' && instanceName.length > 0) {
	        this.wrappers[instanceName] = new _wrapper2.default(instanceName, this);

	        _config2.default.attributes_to_delegate.forEach(function (attribute) {
	          _this.wrappers[instanceName].wrapAttribute(attribute);

	          if (!_this[attribute]) {
	            Object.defineProperty(_this, attribute, {
	              get: function get() {
	                return this.getInstance(_config2.default.default_instance_name)[attribute];
	              }
	            });
	          }
	        });

	        _config2.default.methods_to_delegate.forEach(function (method) {
	          _this.wrappers[instanceName].wrapMethod(method);

	          if (!_this[method]) {
	            _this[method] = function (args) {
	              return this.getInstance(_config2.default.default_instance_name)[method](args);
	            };
	          }
	        });

	        return this.wrappers[instanceName];
	      }

	      return instance;
	    },

	    /**
	     * Subscribe method wrapper for default instance
	     *
	     * @param {object} args
	     */
	    subscribe: function subscribe(args) {
	      this.getInstance(_config2.default.default_instance_name).subscribe(args);
	    },

	    /**
	     * Unsubscribe method wrapper for default instance
	     *
	     * @param {object} args
	     */
	    unsubscribe: function unsubscribe(args) {
	      this.getInstance(_config2.default.default_instance_name).unsubscribe(args);
	    }
	  });
	})(); /* global window */

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
		"pubnub_prefix": "pubnub",
		"default_instance_name": "default",
		"attributes_to_delegate": [
			"channelGroups",
			"push"
		],
		"methods_to_delegate": [
			"addListener",
			"removeListener",
			"removeAllListeners",
			"hereNow",
			"whereNow",
			"getState",
			"setState",
			"grant",
			"audit",
			"publish",
			"fire",
			"history",
			"time",
			"reconnect",
			"stop",
			"unsubscribeAll",
			"getSubscribedChannels",
			"getSubscribedChannelGroups",
			"encrypt",
			"decrypt",
			"getAuthKey",
			"setAuthKey",
			"setCipherKey",
			"getUUID",
			"setUUID",
			"getFilterExpression",
			"setFilterExpression"
		],
		"common_callbacks_to_wrap": [
			"callback",
			"error"
		],
		"subscribe_listener_events_to_broadcast": [
			"message",
			"presence",
			"status"
		]
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global angular PUBNUB */


	var _mocks = __webpack_require__(5);

	var _mocks2 = _interopRequireDefault(_mocks);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	module.exports = function () {
	  function _class(label, service) {
	    _classCallCheck(this, _class);

	    this.label = label;
	    this.pubnubInstance = null;
	    this.mockingInstance = new _mocks2.default(service);
	  }

	  _createClass(_class, [{
	    key: 'init',
	    value: function init(initConfig) {
	      this.pubnubInstance = new PubNub(initConfig);
	      this.mockingInstance.initializeListener(this);
	    }
	  }, {
	    key: 'getLabel',
	    value: function getLabel() {
	      return this.label;
	    }
	  }, {
	    key: 'subscribe',
	    value: function subscribe(args) {
	      this.getOriginalInstance().subscribe(args);
	      this.mockingInstance.enableEventsBroadcast(args);
	    }
	  }, {
	    key: 'unsubscribe',
	    value: function unsubscribe(args) {
	      this.getOriginalInstance().unsubscribe(args);
	      this.mockingInstance.disableEventsBroadcast(args);
	    }
	  }, {
	    key: 'getOriginalInstance',
	    value: function getOriginalInstance() {
	      if (this.pubnubInstance) {
	        return this.pubnubInstance;
	      } else {
	        throw new ReferenceError('Pubnub default instance is not initialized yet. Invoke #init() method first.');
	      }
	    }
	  }, {
	    key: 'wrapAttribute',
	    value: function wrapAttribute(attributeName) {
	      Object.defineProperty(this, attributeName, {
	        get: function get() {
	          return this.getOriginalInstance()[attributeName];
	        }
	      });
	    }
	  }, {
	    key: 'wrapMethod',
	    value: function wrapMethod(methodName) {
	      this[methodName] = function (args) {
	        return this.getOriginalInstance()[methodName](args);
	      };
	    }
	  }]);

	  return _class;
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(3);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	module.exports = function () {
	  function _class(service) {
	    _classCallCheck(this, _class);

	    this.listener = null;
	    this.service = service;
	    this.broadcastChannels = {};
	  }

	  _createClass(_class, [{
	    key: 'initializeListener',
	    value: function initializeListener(instance) {
	      var _this = this;

	      if (this.listener === null) {
	        (function () {
	          var self = _this;

	          self.listener = {};

	          _config2.default.subscribe_listener_events_to_broadcast.forEach(function (event) {
	            self.listener[event] = function (received) {
	              if (received.channel && self.broadcastChannels[received.channel] && self.broadcastChannels[received.channel].includes(event)) {
	                self.service.broadcastOn.emit(event, received.channel, received);
	              } else if (event === 'status') {
	                received.affectedChannels.forEach(function (channel) {
	                  if (self.broadcastChannels[channel] && self.broadcastChannels[channel].includes(event)) {
	                    self.service.broadcastOn.emit(event, channel, received);
	                  }
	                });
	              }
	            };
	          });

	          instance.getOriginalInstance().addListener(_this.listener);
	        })();
	      }
	    }
	  }, {
	    key: 'enableEventsBroadcast',
	    value: function enableEventsBroadcast(args) {
	      var _this2 = this;

	      args.channels.forEach(function (channel) {
	        if (typeof args.triggerEvents === 'boolean') {
	          _this2.broadcastChannels[channel] = _config2.default.subscribe_listener_events_to_broadcast;
	        } else if (Array.isArray(args.triggerEvents)) {
	          _this2.broadcastChannels[channel] = [];

	          args.triggerEvents.forEach(function (trigger) {
	            if (_config2.default.subscribe_listener_events_to_broadcast.includes(trigger)) {
	              _this2.broadcastChannels[channel].push(trigger);
	            }
	          });
	        }
	      });
	    }
	  }, {
	    key: 'disableEventsBroadcast',
	    value: function disableEventsBroadcast(args) {
	      var _this3 = this;

	      args.channels.forEach(function (channel) {
	        if (_this3.broadcastChannels[channel]) {
	          delete _this3.broadcastChannels[channel];
	        }
	      });
	    }
	  }]);

	  return _class;
	}();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(3);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function subscribeChannel(subscriber, channel, callback) {
	  if (Array.isArray(channel)) {
	    channel.forEach(function (ch) {
	      subscriber[ch] = callback;
	    });
	  } else {
	    subscriber[channel] = callback;
	  }
	}

	function unsubscriberChannel(subscriber, channel) {
	  if (Array.isArray(channel)) {
	    channel.forEach(function (ch) {
	      if (subscriber[ch]) delete subscriber[ch];
	    });
	  } else if (subscriber[channel]) delete subscriber[channel];
	}

	module.exports = function () {
	  function _class() {
	    var _this = this;

	    _classCallCheck(this, _class);

	    _config2.default.subscribe_listener_events_to_broadcast.forEach(function (event) {
	      var subscriber = '_'.concat(event);
	      _this[subscriber] = {};
	      _this[event] = function (channel, callback) {
	        subscribeChannel(this[subscriber], channel, callback);
	      };
	    });
	  }

	  _createClass(_class, [{
	    key: 'emit',
	    value: function emit(event, channel, obj) {
	      var subscriber = '_'.concat(event);

	      if (this[subscriber] && this[subscriber][channel]) {
	        this[subscriber][channel].call(null, obj);
	      }
	    }
	  }, {
	    key: 'unsubscribe',
	    value: function unsubscribe(channel) {
	      var _this2 = this;

	      _config2.default.subscribe_listener_events_to_broadcast.forEach(function (event) {
	        var subscriber = '_'.concat(event);

	        unsubscriberChannel(_this2[subscriber], channel);
	      });
	    }
	  }]);

	  return _class;
	}();

/***/ }
/******/ ]);