'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wrapper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mock = require('./mock');

var _broadcast = require('./broadcast');

var _output = require('./output');

var _autoload = require('./autoload');

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
//# sourceMappingURL=wrapper.js.map
