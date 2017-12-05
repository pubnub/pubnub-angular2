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
//# sourceMappingURL=output.js.map
