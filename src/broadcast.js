import config from '../config.json';

function subscribeChannel(subscriber, channel, callback) {
  if (Array.isArray(channel)) {
    channel.forEach((ch) => {
      subscriber[ch] = callback;
    });
  } else {
    subscriber[channel] = callback;
  }
}

function unsubscriberChannel(subscriber, channel) {
  if (Array.isArray(channel)) {
    channel.forEach((ch) => {
      if (subscriber[ch]) delete subscriber[ch];
    });
  } else if (subscriber[channel]) delete subscriber[channel];
}

module.exports = class {

  constructor() {
    config.subscribe_listener_events_to_broadcast.forEach((event) => {
      let subscriber = ('_').concat(event);
      this[subscriber] = {};
      this[event] = function (channel, callback) {
        subscribeChannel(this[subscriber], channel, callback);
      };
    });
  }

  emit(event, channel, args) {
    let subscriber = ('_').concat(event);

    if (this[subscriber] && this[subscriber][channel]) {
      this[subscriber][channel].call(null, args);
    }
  }

  error(callback) {
    this._error = callback;
    console.log(this._error);
  }

  emitError(args) {
    if (this._error) {
      this._error.call(null, args);
    }
  }

  unsubscribe(channel) {
    config.subscribe_listener_events_to_broadcast.forEach((event) => {
      let subscriber = ('_').concat(event);

      unsubscriberChannel(this[subscriber], channel);
    });
  }
};
