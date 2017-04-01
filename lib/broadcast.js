'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Broadcast = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config.json');

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
//# sourceMappingURL=broadcast.js.map
