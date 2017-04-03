'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mock = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config.json');

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
//# sourceMappingURL=mock.js.map
