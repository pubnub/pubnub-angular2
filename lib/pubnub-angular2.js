'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PubNubAngular = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config.json');

var _config2 = _interopRequireDefault(_config);

var _wrapper = require('./wrapper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PubNubAngular = exports.PubNubAngular = function () {
  function PubNubAngular() {
    _classCallCheck(this, PubNubAngular);

    if (typeof PubNub === 'undefined' || PubNub === null) {
      throw new Error('PubNub is not in global scope. Ensure that pubnub.js v4 library is included before the angular adapter');
    }

    this.wrappers = {};
  }

  _createClass(PubNubAngular, [{
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
        this.wrappers[instanceName] = new _wrapper.Wrapper(instanceName, this);

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
    value: function getMessage(channel, callback) {
      return this.getInstance(_config2.default.default_instance_name).getMessage(channel, callback);
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

  return PubNubAngular;
}();
//# sourceMappingURL=pubnub-angular2.js.map
