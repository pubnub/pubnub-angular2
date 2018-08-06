/*! 1.3.1 */
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _pubnubCommon = __webpack_require__(1);

	var _pubnubCommon2 = _interopRequireDefault(_pubnubCommon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PubNubAngular = function (_PubNubCommon) {
	  _inherits(PubNubAngular, _PubNubCommon);

	  function PubNubAngular() {
	    _classCallCheck(this, PubNubAngular);

	    return _possibleConstructorReturn(this, (PubNubAngular.__proto__ || Object.getPrototypeOf(PubNubAngular)).call(this, undefined));
	  }

	  return PubNubAngular;
	}(_pubnubCommon2.default);

	module.exports = PubNubAngular;

	module.exports.PubNubAngular = PubNubAngular;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _wrapper = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _class = function () {
	  function _class(pubnub) {
	    _classCallCheck(this, _class);

	    this.pubnub = pubnub;
	    this.wrappers = {};
	  }

	  _createClass(_class, [{
	    key: 'init',
	    value: function init(initConfig) {

	      var instance = this.getInstance(_config2.default.default_instance_name);

	      instance.init(initConfig);

	      return instance;
	    }
	  }, {
	    key: 'getInstance',
	    value: function getInstance(instanceName) {
	      var _this = this;

	      var instance = this.wrappers[instanceName];

	      if (instance && instance instanceof _wrapper.Wrapper) {
	        return instance;
	      } else if (typeof instanceName === 'string' && instanceName.length > 0) {
	        this.wrappers[instanceName] = new _wrapper.Wrapper(instanceName, this.pubnub);

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
	            _this[method] = function () {
	              var defaultInstance = this.getInstance(_config2.default.default_instance_name);
	              return defaultInstance[method].apply(defaultInstance, arguments);
	            };
	          }
	        });

	        return this.wrappers[instanceName];
	      }

	      return instance;
	    }
	  }, {
	    key: 'subscribe',
	    value: function subscribe(args) {
	      this.getInstance(_config2.default.default_instance_name).subscribe(args);
	    }
	  }, {
	    key: 'unsubscribe',
	    value: function unsubscribe(args) {
	      this.getInstance(_config2.default.default_instance_name).unsubscribe(args);
	    }
	  }, {
	    key: 'getMessage',
	    value: function getMessage(channel) {
	      var _getInstance;

	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      return (_getInstance = this.getInstance(_config2.default.default_instance_name)).getMessage.apply(_getInstance, [channel].concat(args));
	    }
	  }, {
	    key: 'getPresence',
	    value: function getPresence(channel, callback) {
	      this.getInstance(_config2.default.default_instance_name).getPresence(channel, callback);
	    }
	  }, {
	    key: 'getStatus',
	    value: function getStatus(channel, callback) {
	      this.getInstance(_config2.default.default_instance_name).getStatus(channel, callback);
	    }
	  }, {
	    key: 'getError',
	    value: function getError(callback) {
	      this.getInstance(_config2.default.default_instance_name).getError(callback);
	    }
	  }, {
	    key: 'clean',
	    value: function clean(channel) {
	      this.getInstance(_config2.default.default_instance_name).clean(channel);
	    }
	  }, {
	    key: 'release',
	    value: function release(channel) {
	      this.getInstance(_config2.default.default_instance_name).release(channel);
	    }
	  }]);

	  return _class;
	}();

	exports.default = _class;
	module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = {"pubnub_prefix":"pubnub","default_instance_name":"default","attributes_to_delegate":["channelGroups","push"],"methods_to_delegate":["addListener","removeListener","removeAllListeners","hereNow","whereNow","getState","setState","grant","audit","publish","fire","history","deleteMessages","fetchMessages","time","reconnect","stop","unsubscribeAll","getSubscribedChannels","getSubscribedChannelGroups","encrypt","decrypt","getAuthKey","setAuthKey","setCipherKey","getUUID","setUUID","getFilterExpression","setFilterExpression"],"common_callbacks_to_wrap":["callback","error"],"subscribe_listener_events_to_broadcast":["message","presence","status"],"history_sort_attribute":"timetoken"}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Wrapper = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _mock = __webpack_require__(4);

	var _broadcast = __webpack_require__(5);

	var _output = __webpack_require__(6);

	var _autoload = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Wrapper = exports.Wrapper = function () {
	  function Wrapper(label, pubnub) {
	    _classCallCheck(this, Wrapper);

	    this.label = label;
	    this.pubnubInstance = null;
	    this.PubNub = pubnub;
	    this.broadcastOn = new _broadcast.Broadcast();
	    this.outputOn = new _output.Output();
	    this.mockingInstance = new _mock.Mock(this.broadcastOn);
	    this.autoload = new _autoload.Autoload();

	    if (!this.PubNub) {
	      this.PubNub = PubNub;
	    }

	    if (typeof this.PubNub === 'undefined' || this.PubNub === null) {
	      throw new Error('PubNub is not in global scope. Ensure that pubnub.js v4 library is included before the angular adapter');
	    }
	  }

	  _createClass(Wrapper, [{
	    key: 'init',
	    value: function init(initConfig) {
	      this.pubnubInstance = new this.PubNub(initConfig);
	      this.mockingInstance.initializeListener(this);
	      this.autoload.initialize(this);
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
	      this.autoload.enableLoad(args);
	    }
	  }, {
	    key: 'unsubscribe',
	    value: function unsubscribe(args) {
	      this.autoload.disableLoad(args);
	      this.outputOn.unsubscribe(args);
	      this.getOriginalInstance().unsubscribe(args);
	      var self = this;
	      var tm = setTimeout(function () {
	        self.mockingInstance.disableEventsBroadcast(args);
	        clearTimeout(tm);
	      }, 1000);
	    }
	  }, {
	    key: 'getMessage',
	    value: function getMessage(channel) {
	      var _this = this;

	      var callback = void 0;
	      var keepMessages = 100;

	      if ((arguments.length <= 1 ? 0 : arguments.length - 1) === 1 && typeof (arguments.length <= 1 ? undefined : arguments[1]) === 'function') {
	        callback = arguments.length <= 1 ? undefined : arguments[1];
	      } else if ((arguments.length <= 1 ? 0 : arguments.length - 1) === 1 && typeof (arguments.length <= 1 ? undefined : arguments[1]) === 'number') {
	        keepMessages = arguments.length <= 1 ? undefined : arguments[1];
	      } else if ((arguments.length <= 1 ? 0 : arguments.length - 1) === 2) {
	        callback = arguments.length <= 1 ? undefined : arguments[1];
	        keepMessages = arguments.length <= 2 ? undefined : arguments[2];
	      }

	      if (this.outputOn.subscribe(channel, keepMessages)) {
	        this.autoload.getHistory(channel, callback);
	      }

	      this.broadcastOn.message(channel, function (message) {
	        _this.outputOn.push(channel, message);
	        if (callback) callback(message);
	      });

	      return this.outputOn.get(channel);
	    }
	  }, {
	    key: 'getPresence',
	    value: function getPresence(channel, callback) {
	      if (this.broadcastOn) {
	        this.broadcastOn.presence(channel, callback);
	      }
	    }
	  }, {
	    key: 'getStatus',
	    value: function getStatus(channel, callback) {
	      if (this.broadcastOn) {
	        this.broadcastOn.status(channel, callback);
	      }
	    }
	  }, {
	    key: 'getError',
	    value: function getError(callback) {
	      if (this.broadcastOn) {
	        this.broadcastOn.error(callback);
	      }
	    }
	  }, {
	    key: 'clean',
	    value: function clean(channel) {
	      this.outputOn.clean(channel);
	    }
	  }, {
	    key: 'release',
	    value: function release(channel) {
	      this.broadcastOn.unsubscribe(channel);
	      this.outputOn.unsubscribe(channel);
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
	      this[methodName] = function () {
	        return this.getOriginalInstance()[methodName].apply(this, arguments);
	      };
	    }
	  }]);

	  return Wrapper;
	}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Mock = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Mock = exports.Mock = function () {
	  function Mock(broadcaster) {
	    _classCallCheck(this, Mock);

	    this.listener = null;
	    this.broadcaster = broadcaster;
	    this.broadcastChannels = {};
	  }

	  _createClass(Mock, [{
	    key: 'initializeListener',
	    value: function initializeListener(instance) {
	      if (this.listener === null) {
	        var self = this;

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
	              } else if (received.affectedChannels || received.affectedChannelGroups) {
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
	              } else {
	                Object.keys(self.broadcastChannels).forEach(function (channel) {
	                  self.broadcaster.emit(event, channel, received);
	                });
	              }
	            }
	          };
	        });

	        instance.getOriginalInstance().addListener(this.listener);
	      }
	    }
	  }, {
	    key: 'addEventsBroadcast',
	    value: function addEventsBroadcast(channels, triggerEvents) {
	      var _this = this;

	      channels.forEach(function (channel) {
	        if (typeof triggerEvents === 'boolean') {
	          _this.broadcastChannels[channel] = _config2.default.subscribe_listener_events_to_broadcast;
	        } else if (Array.isArray(triggerEvents)) {
	          _this.broadcastChannels[channel] = [];

	          triggerEvents.forEach(function (trigger) {
	            if (_config2.default.subscribe_listener_events_to_broadcast.includes(trigger)) {
	              _this.broadcastChannels[channel].push(trigger);
	            }
	          });
	        }
	      });
	    }
	  }, {
	    key: 'removeEventBroadcast',
	    value: function removeEventBroadcast(channels) {
	      var _this2 = this;

	      channels.forEach(function (channel) {
	        if (_this2.broadcastChannels[channel]) {
	          delete _this2.broadcastChannels[channel];
	        }
	      });
	    }
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Broadcast = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function subscribeChannel(event, channel, callback) {
	  if (Array.isArray(channel)) {
	    channel.forEach(function (ch) {
	      event[ch] = callback;
	    });
	  } else {
	    event[channel] = callback;
	  }
	}

	function unsubscribeChannel(event, channel) {
	  if (Array.isArray(channel)) {
	    channel.forEach(function (ch) {
	      if (event[ch]) delete event[ch];
	    });
	  } else if (event[channel]) delete event[channel];
	}

	var Broadcast = exports.Broadcast = function () {
	  function Broadcast() {
	    var _this = this;

	    _classCallCheck(this, Broadcast);

	    _config2.default.subscribe_listener_events_to_broadcast.forEach(function (eventName) {
	      var event = '_'.concat(eventName);

	      _this[event] = {};

	      _this[eventName] = function (channel, callback) {
	        subscribeChannel(this[event], channel, callback);
	      };
	    });
	  }

	  _createClass(Broadcast, [{
	    key: 'emit',
	    value: function emit(event, channel, args) {
	      var subscriber = '_'.concat(event);

	      if (this[subscriber] && this[subscriber][channel]) {
	        this[subscriber][channel].call(null, args);
	      }
	    }
	  }, {
	    key: 'error',
	    value: function error(callback) {
	      this._error = callback;
	    }
	  }, {
	    key: 'emitError',
	    value: function emitError(args) {
	      if (this._error) {
	        this._error.call(null, args);
	      }
	    }
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

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Output = exports.Output = function () {
	  function Output() {
	    _classCallCheck(this, Output);

	    this.channels = {};
	    this.keepMessages = {};
	  }

	  _createClass(Output, [{
	    key: "push",
	    value: function push(channel, message) {
	      if (this.channels[channel]) {
	        this.channels[channel].push(message);

	        if (this.keepMessages[channel] && this.channels[channel].length > this.keepMessages[channel]) {
	          this.channels[channel].splice(0, this.channels[channel].length - this.keepMessages[channel]);
	        }
	      }
	    }
	  }, {
	    key: "get",
	    value: function get(channel) {
	      if (this.channels[channel]) {
	        return this.channels[channel];
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: "clean",
	    value: function clean(channel) {
	      if (this.channels[channel]) {
	        this.channels[channel].length = 0;
	      }
	    }
	  }, {
	    key: "subscribe",
	    value: function subscribe(channel, keepMessages) {
	      if (!this.channels[channel]) {
	        this.channels[channel] = [];
	        this.keepMessages[channel] = keepMessages;
	        return true;
	      } else {
	        return false;
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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Autoload = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Autoload = exports.Autoload = function () {
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
	        var instance = this.instance;
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

/***/ })
/******/ ])
});
;