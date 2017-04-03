'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Autoload = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config.json');

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
//# sourceMappingURL=autoload.js.map
