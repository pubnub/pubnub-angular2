/*! 1.0.0-beta.8 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["PubNubAngular"] = factory();
	else
		root["PubNubAngular"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global window */


	var _config = __webpack_require__(1);

	var _config2 = _interopRequireDefault(_config);

	var _wrapper = __webpack_require__(2);

	var _wrapper2 = _interopRequireDefault(_wrapper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PubNubAngular = function () {
	  function PubNubAngular() {
	    _classCallCheck(this, PubNubAngular);

	    if (typeof PubNub === 'undefined' || PubNub === null) {
	      throw new Error('PubNub is not in global scope. Ensure that pubnub.js v4 library is included before the angular adapter');
	    }

	    this.wrappers = {};
	  }

	  /**
	   * Initializer for default instance
	   *
	   * @param {Object} initConfig
	   */


	  _createClass(PubNubAngular, [{
	    key: 'init',
	    value: function init(initConfig) {

	      var instance = this.getInstance(_config2.default.default_instance_name);

	      instance.init(initConfig);

	      return instance;
	    }

	    /**
	     * Instance getter
	     *
	     * @param instanceName
	     * @returns {Wrapper}
	     */

	  }, {
	    key: 'getInstance',
	    value: function getInstance(instanceName) {
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
	    }

	    /**
	     * Subscribe method wrapped for default instance
	     *
	     * @param {object} args
	     */

	  }, {
	    key: 'subscribe',
	    value: function subscribe(args) {
	      this.getInstance(_config2.default.default_instance_name).subscribe(args);
	    }

	    /**
	     * Unsubscribe method wrapped for default instance
	     *
	     * @param {object} args
	     */

	  }, {
	    key: 'unsubscribe',
	    value: function unsubscribe(args) {
	      this.getInstance(_config2.default.default_instance_name).unsubscribe(args);
	    }

	    /**
	     * GetMessage method wrapped for default instance
	     *
	     * @param {string|[string]} channel
	     * @param callback
	     * @returns [object] array
	     */

	  }, {
	    key: 'getMessage',
	    value: function getMessage(channel, callback) {
	      return this.getInstance(_config2.default.default_instance_name).getMessage(channel, callback);
	    }

	    /**
	     * GetPresence method wrapped for default instance
	     *
	     * @param {string|[string]} channel
	     * @param callback
	     */

	  }, {
	    key: 'getPresence',
	    value: function getPresence(channel, callback) {
	      this.getInstance(_config2.default.default_instance_name).getPresence(channel, callback);
	    }

	    /**
	     * GetStatus method wrapped for default instance
	     *
	     * @param {string|[string]} channel
	     * @param callback
	     */

	  }, {
	    key: 'getStatus',
	    value: function getStatus(channel, callback) {
	      this.getInstance(_config2.default.default_instance_name).getStatus(channel, callback);
	    }

	    /**
	     * GetError method wrapped for default instance
	     *
	     * @param callback
	     */

	  }, {
	    key: 'getError',
	    value: function getError(callback) {
	      this.getInstance(_config2.default.default_instance_name).getError(callback);
	    }

	    /**
	     * Clean Method wrapped for default instance
	     *
	     * @param {string|[string]} channel
	     */

	  }, {
	    key: 'clean',
	    value: function clean(channel) {
	      this.getInstance(_config2.default.default_instance_name).clean(channel);
	    }
	  }]);

	  return PubNubAngular;
	}();

	module.exports = PubNubAngular;

	module.exports.PubNubAngular = PubNubAngular;

/***/ },
/* 1 */
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
		],
		"history_sort_attribute": "timetoken"
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global angular PUBNUB */


	var _mock = __webpack_require__(3);

	var _mock2 = _interopRequireDefault(_mock);

	var _broadcast = __webpack_require__(4);

	var _broadcast2 = _interopRequireDefault(_broadcast);

	var _output = __webpack_require__(5);

	var _output2 = _interopRequireDefault(_output);

	var _autoload = __webpack_require__(6);

	var _autoload2 = _interopRequireDefault(_autoload);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Wrapper = function () {
	  function Wrapper(label) {
	    _classCallCheck(this, Wrapper);

	    this.label = label;
	    this.pubnubInstance = null;
	    this.broadcastOn = new _broadcast2.default();
	    this.outputOn = new _output2.default();
	    this.mockingInstance = new _mock2.default(this.broadcastOn);
	    this.autoload = new _autoload2.default();
	  }

	  /**
	   * Initialize the wrapper
	   *
	   * @param {object} initConfig
	   */


	  _createClass(Wrapper, [{
	    key: 'init',
	    value: function init(initConfig) {
	      this.pubnubInstance = new PubNub(initConfig);
	      this.mockingInstance.initializeListener(this);
	      this.autoload.initialize(this);
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
	      this.autoload.enableLoad(args);
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
	      this.autoload.disableLoad(args);
	      this.outputOn.unsubscribe(args);
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
	      var _this = this;

	      this.outputOn.subscribe(channel);

	      this.autoload.getHistory(channel, callback);

	      this.broadcastOn.message(channel, function (message) {
	        _this.outputOn.push(channel, message);
	        if (callback) callback(message);
	      });

	      return this.outputOn.get(channel);
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
	     * Clean the stack of messages for a channel or a set of channels
	     *
	     * @param {string|[string]} channel
	     */

	  }, {
	    key: 'clean',
	    value: function clean(channel) {
	      this.outputOn.clean(channel);
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

	  return Wrapper;
	}();

	module.exports = Wrapper;

	module.exports.Wrapper = Wrapper;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(1);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Mock = function () {
	  function Mock(broadcaster) {
	    _classCallCheck(this, Mock);

	    this.listener = null;
	    this.broadcaster = broadcaster;
	    this.broadcastChannels = {};
	  }

	  /**
	   * Initialize the listener for broadcasting all events
	   *
	   * @param {wrapper} instance
	   */


	  _createClass(Mock, [{
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

	  return Mock;
	}();

	module.exports = Mock;

	module.exports.Mock = Mock;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(1);

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

	var Broadcast = function () {
	  function Broadcast() {
	    var _this = this;

	    _classCallCheck(this, Broadcast);

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


	  _createClass(Broadcast, [{
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

	  return Broadcast;
	}();

	module.exports = Broadcast;

	module.exports.Broadcast = Broadcast;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Output = function () {
	  function Output() {
	    _classCallCheck(this, Output);

	    this.channels = {};
	  }

	  /**
	   * Push a message to a channel's stack or a set of channels' stack
	   *
	   * @param {string|[string]} channel
	   * @param {object} message
	   */


	  _createClass(Output, [{
	    key: "push",
	    value: function push(channel, message) {
	      if (this.channels[channel]) {
	        this.channels[channel].push(message);
	      }
	    }

	    /**
	     * Get a stack of messages for a channel or a set of channels
	     *
	     * @param {string|[string]} channel
	     * @returns [object] array
	     */

	  }, {
	    key: "get",
	    value: function get(channel) {
	      if (this.channels[channel]) {
	        return this.channels[channel];
	      } else {
	        return null;
	      }
	    }

	    /**
	     * Clean a stack of message for a channel or a set of channels
	     *
	     * @param {string|[string]} channel
	     */

	  }, {
	    key: "clean",
	    value: function clean(channel) {
	      if (this.channels[channel]) {
	        this.channels[channel].length = 0;
	      }
	    }

	    /**
	     * Subscribe a channel or a set of channels to create a stack of messages
	     *
	     * @param {string|[string]} channel
	     */

	  }, {
	    key: "subscribe",
	    value: function subscribe(channel) {
	      if (!this.channels[channel]) {
	        this.channels[channel] = [];
	      }
	    }
	  }, {
	    key: "sort",
	    value: function sort(channel, key) {
	      if (this.channels[channel]) {
	        this.channels[channel].sort(function (a, b) {
	          if (a[key] > b[key]) return 1;else if (a[key] < b[key]) return -1;else return 0;
	        });
	      }
	    }

	    /**
	     * Unsubscribe a channel or a set of channels of the stack of message
	     *
	     * @param {string|[string]} channel
	     */

	  }, {
	    key: "unsubscribe",
	    value: function unsubscribe(channel) {
	      if (this.channels[channel]) {
	        this.clean(channel);
	        delete this.channels[channel];
	      }
	    }
	  }]);

	  return Output;
	}();

	module.exports = Output;

	module.exports.Output = Output;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(1);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Autoload = function () {
	  function Autoload() {
	    _classCallCheck(this, Autoload);

	    this.count = {};
	    this.instance = undefined;
	  }

	  _createClass(Autoload, [{
	    key: 'initialize',
	    value: function initialize(instance) {
	      this.instance = instance;
	    }
	  }, {
	    key: 'enableLoad',
	    value: function enableLoad(args) {
	      var _this = this;

	      if (args.autoload && typeof args.autoload === 'number') {
	        this.count[args.channels] = args.autoload;

	        args.channels.forEach(function (channel) {
	          _this.count[channel] = args.autoload;
	        });
	      }
	    }
	  }, {
	    key: 'getHistory',
	    value: function getHistory(channel, callback) {
	      var _this2 = this;

	      if (this.count[channel]) {
	        (function () {
	          var instance = _this2.instance;
	          var _channels = Array.isArray(channel) ? channel : [channel];
	          var times = _channels.length;

	          _channels.forEach(function (ch) {
	            instance.history({ channel: ch, count: _this2.count[channel] }).then(function (response) {

	              response.messages.forEach(function (m) {
	                m.message = m.entry;
	                m.channel = ch;

	                instance.outputOn.push(channel, m);
	              });

	              times -= 1;

	              if (callback && times === 0) {
	                instance.outputOn.sort(channel, _config2.default.history_sort_attribute);
	                callback();
	              }
	            }).catch(function () {});
	          });
	        })();
	      }
	    }
	  }, {
	    key: 'disableLoad',
	    value: function disableLoad(args) {
	      var _this3 = this;

	      if (Array.isArray(args.channels)) {
	        args.channels.forEach(function (ch) {
	          if (_this3.count[ch]) delete _this3.count[ch];
	        });
	      } else if (this.count[args.channels]) {
	        delete this.count[args.channels];
	      }
	    }
	  }]);

	  return Autoload;
	}();

	module.exports = Autoload;

	module.exports.Autoload = Autoload;

/***/ }
/******/ ])
});
;