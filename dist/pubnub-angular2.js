/*! 1.0.0-beta.5 */
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* global window */

	(function () {

	  window.PubNubAngular = ng.core.Class({
	    constructor: function constructor() {
	      if (typeof PubNub === 'undefined' || PubNub === null) {
	        throw new Error('PubNub is not in global scope. Ensure that pubnub.js v4 library is included before the angular adapter');
	      }

	      this.wrappers = {};
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
	     * Subscribe method wrapped for default instance
	     *
	     * @param {object} args
	     */
	    subscribe: function subscribe(args) {
	      this.getInstance(_config2.default.default_instance_name).subscribe(args);
	    },

	    /**
	     * Unsubscribe method wrapped for default instance
	     *
	     * @param {object} args
	     */
	    unsubscribe: function unsubscribe(args) {
	      this.getInstance(_config2.default.default_instance_name).unsubscribe(args);
	    },

	    /**
	     * GetMessage method wrapped for default instance
	     *
	     * @param {string|[string]} channel
	     * @param callback
	     */
	    getMessage: function getMessage(channel, callback) {
	      this.getInstance(_config2.default.default_instance_name).getMessage(channel, callback);
	    },

	    /**
	     * GetPresence method wrapped for default instance
	     *
	     * @param {string|[string]} channel
	     * @param callback
	     */
	    getPresence: function getPresence(channel, callback) {
	      this.getInstance(_config2.default.default_instance_name).getPresence(channel, callback);
	    },

	    /**
	     * GetStatus method wrapped for default instance
	     *
	     * @param {string|[string]} channel
	     * @param callback
	     */
	    getStatus: function getStatus(channel, callback) {
	      this.getInstance(_config2.default.default_instance_name).getStatus(channel, callback);
	    },

	    /**
	     * GetError method wrapped for default instance
	     *
	     * @param callback
	     */
	    getError: function getError(callback) {
	      this.getInstance(_config2.default.default_instance_name).getError(callback);
	    }
	  });
	})();

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

	var _broadcast = __webpack_require__(6);

	var _broadcast2 = _interopRequireDefault(_broadcast);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	module.exports = function () {
	  function _class(label) {
	    _classCallCheck(this, _class);

	    this.label = label;
	    this.pubnubInstance = null;
	    this.broadcastOn = new _broadcast2.default();
	    this.mockingInstance = new _mocks2.default(this.broadcastOn);
	  }

	  /**
	   * Initialize the wrapper
	   *
	   * @param {object} initConfig
	   */


	  _createClass(_class, [{
	    key: 'init',
	    value: function init(initConfig) {
	      this.pubnubInstance = new PubNub(initConfig);
	      this.mockingInstance.initializeListener(this);
	    }

	    /**
	     * Get the name of the instance
	     *
	     * @returns {*|string|null|string}
	     */

	  }, {
	    key: 'getLabel',
	    value: function getLabel() {
	      return this.label;
	    }

	    /**
	     * Wrap the subscribe method to enable trigger events to the broadcast
	     *
	     * @param {object} args
	     */

	  }, {
	    key: 'subscribe',
	    value: function subscribe(args) {
	      this.getOriginalInstance().subscribe(args);
	      this.mockingInstance.enableEventsBroadcast(args);
	    }

	    /**
	     * Wrap the unsubscribe method to disable the trigger events to the broadcast
	     *
	     * @param args
	     */

	  }, {
	    key: 'unsubscribe',
	    value: function unsubscribe(args) {
	      this.getOriginalInstance().unsubscribe(args);
	      this.mockingInstance.disableEventsBroadcast(args);
	    }

	    /**
	     * Get to receive messages from a channel or a set of channels through a callback
	     *
	     * @param {string|[string]} channel
	     * @param callback
	     */

	  }, {
	    key: 'getMessage',
	    value: function getMessage(channel, callback) {
	      if (this.broadcastOn) {
	        this.broadcastOn.message(channel, callback);
	      }
	    }

	    /**
	     * Get to receive presence information from a channel or a set of channels through a callback
	     *
	     * @param {string|[string]} channel
	     * @param callback
	     */

	  }, {
	    key: 'getPresence',
	    value: function getPresence(channel, callback) {
	      if (this.broadcastOn) {
	        this.broadcastOn.presence(channel, callback);
	      }
	    }

	    /**
	     * Get to receive status information from a channel or a set of channels through a callback
	     *
	     * @param {string|[string]} channel
	     * @param callback
	     */

	  }, {
	    key: 'getStatus',
	    value: function getStatus(channel, callback) {
	      if (this.broadcastOn) {
	        this.broadcastOn.status(channel, callback);
	      }
	    }

	    /**
	     * Get to receive error information from PubNub Service through a callback
	     *
	     * @param callback
	     */

	  }, {
	    key: 'getError',
	    value: function getError(callback) {
	      if (this.broadcastOn) {
	        this.broadcastOn.error(callback);
	      }
	    }

	    /**
	     * Get the PubNub instance wrapped or throw an exception if this is not instanced yet
	     *
	     * @returns {PubNub|*|null}
	     */

	  }, {
	    key: 'getOriginalInstance',
	    value: function getOriginalInstance() {
	      if (this.pubnubInstance) {
	        return this.pubnubInstance;
	      } else {
	        throw new ReferenceError('Pubnub default instance is not initialized yet. Invoke #init() method first.');
	      }
	    }

	    /**
	     * Wrap a PubNub's attribute
	     *
	     * @param {string} attributeName
	     */

	  }, {
	    key: 'wrapAttribute',
	    value: function wrapAttribute(attributeName) {
	      Object.defineProperty(this, attributeName, {
	        get: function get() {
	          return this.getOriginalInstance()[attributeName];
	        }
	      });
	    }

	    /**
	     * Wrap a PubNub's method
	     *
	     * @param methodName
	     */

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
	  function _class(broadcaster) {
	    _classCallCheck(this, _class);

	    this.listener = null;
	    this.broadcaster = broadcaster;
	    this.broadcastChannels = {};
	  }

	  /**
	   * Initialize the listener for broadcasting all events
	   *
	   * @param {wrapper} instance
	   */


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
	              if (received.subscription && self.broadcastChannels[received.subscription] && self.broadcastChannels[received.subscription].includes(event)) {
	                self.broadcaster.emit(event, received.subscription, received);

	                if (received.channel) {
	                  self.broadcaster.emit(event, received.channel, received);
	                }
	              }

	              if (received.channel && self.broadcastChannels[received.channel] && self.broadcastChannels[received.channel].includes(event)) {
	                self.broadcaster.emit(event, received.channel, received);
	              }

	              if (event === 'status') {
	                if (received.error) {
	                  self.broadcaster.emitError(received);
	                } else {
	                  received.affectedChannels.forEach(function (channel) {
	                    if (self.broadcastChannels[channel] && self.broadcastChannels[channel].includes(event)) {
	                      self.broadcaster.emit(event, channel, received);
	                    }
	                  });

	                  received.affectedChannelGroups.forEach(function (channelGroup) {
	                    if (self.broadcastChannels[channelGroup] && self.broadcastChannels[channelGroup].includes(event)) {
	                      self.broadcaster.emit(event, channelGroup, received);
	                    }
	                  });
	                }
	              }
	            };
	          });

	          instance.getOriginalInstance().addListener(_this.listener);
	        })();
	      }
	    }

	    /**
	     * Adds a set of channels to all events to broadcast
	     *
	     * @param {[string]} channels
	     * @param {true|['message', 'presence', 'status']} triggerEvents
	     */

	  }, {
	    key: 'addEventsBroadcast',
	    value: function addEventsBroadcast(channels, triggerEvents) {
	      var _this2 = this;

	      channels.forEach(function (channel) {
	        if (typeof triggerEvents === 'boolean') {
	          _this2.broadcastChannels[channel] = _config2.default.subscribe_listener_events_to_broadcast;
	        } else if (Array.isArray(triggerEvents)) {
	          _this2.broadcastChannels[channel] = [];

	          triggerEvents.forEach(function (trigger) {
	            if (_config2.default.subscribe_listener_events_to_broadcast.includes(trigger)) {
	              _this2.broadcastChannels[channel].push(trigger);
	            }
	          });
	        }
	      });
	    }

	    /**
	     * Removes a set of channels from of all events to broadcast
	     *
	     * @param {[string]} channels
	     */

	  }, {
	    key: 'removeEventBroadcast',
	    value: function removeEventBroadcast(channels) {
	      var _this3 = this;

	      channels.forEach(function (channel) {
	        if (_this3.broadcastChannels[channel]) {
	          delete _this3.broadcastChannels[channel];
	        }
	      });
	    }

	    /**
	     * Enable a set of channels or group of channels to the broadcaster
	     *
	     * @param {object} args
	     */

	  }, {
	    key: 'enableEventsBroadcast',
	    value: function enableEventsBroadcast(args) {
	      if (args.channels) {
	        this.addEventsBroadcast(args.channels, args.triggerEvents);
	      }

	      if (args.channelGroups) {
	        this.addEventsBroadcast(args.channelGroups, args.triggerEvents);
	      }
	    }

	    /**
	     * Disable a set of channels or group of channels from the broadcaster
	     *
	     * @param {object} args
	     */

	  }, {
	    key: 'disableEventsBroadcast',
	    value: function disableEventsBroadcast(args) {
	      if (args.channels) {
	        this.removeEventBroadcast(args.channels);
	      }

	      if (args.channelGroups) {
	        this.removeEventBroadcast(args.channelGroups);
	      }
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

	/**
	 * Subscribe a channel to a trigger event
	 *
	 * @param {string} event - (message, presence, status)
	 * @param {string|[string]} channel
	 * @param {function} callback to execute.
	 */
	function subscribeChannel(event, channel, callback) {
	  if (Array.isArray(channel)) {
	    channel.forEach(function (ch) {
	      event[ch] = callback;
	    });
	  } else {
	    event[channel] = callback;
	  }
	}

	/**
	 * Unsubscribe a channel of a trigger event
	 *
	 * @param {string} event - (message, presence, status)
	 * @param {string|[string]} channel
	 */
	function unsubscribeChannel(event, channel) {
	  if (Array.isArray(channel)) {
	    channel.forEach(function (ch) {
	      if (event[ch]) delete event[ch];
	    });
	  } else if (event[channel]) delete event[channel];
	}

	module.exports = function () {
	  function _class() {
	    var _this = this;

	    _classCallCheck(this, _class);

	    _config2.default.subscribe_listener_events_to_broadcast.forEach(function (eventName) {
	      var event = '_'.concat(eventName);

	      _this[event] = {};

	      /**
	       * Subscribe a channel with its callback to an event
	       *
	       * @param {string} channel
	       * @param {function} callback
	       */
	      _this[eventName] = function (channel, callback) {
	        subscribeChannel(this[event], channel, callback);
	      };
	    });
	  }

	  /**
	   * Emit a message to a channel through an event
	   *
	   * @param {string} event - (message, presence, status)
	   * @param {string} channel
	   * @param {object} args
	   */


	  _createClass(_class, [{
	    key: 'emit',
	    value: function emit(event, channel, args) {
	      var subscriber = '_'.concat(event);

	      if (this[subscriber] && this[subscriber][channel]) {
	        this[subscriber][channel].call(null, args);
	      }
	    }

	    /**
	     * Subscribe or unsubscribe for catching errors from trigger events
	     *
	     * @param {function|null} callback
	     */

	  }, {
	    key: 'error',
	    value: function error(callback) {
	      this._error = callback;
	    }

	    /**
	     * Emit an error to the callback subscribed
	     *
	     * @param {object} args
	     */

	  }, {
	    key: 'emitError',
	    value: function emitError(args) {
	      if (this._error) {
	        this._error.call(null, args);
	      }
	    }

	    /**
	     * Unsubscribe a channel of all events
	     *
	     * @param {string} channel
	     */

	  }, {
	    key: 'unsubscribe',
	    value: function unsubscribe(channel) {
	      var _this2 = this;

	      _config2.default.subscribe_listener_events_to_broadcast.forEach(function (event) {
	        var subscriber = '_'.concat(event);

	        unsubscribeChannel(_this2[subscriber], channel);
	      });
	    }
	  }]);

	  return _class;
	}();

/***/ }
/******/ ]);