module.exports = class {

  constructor() {
    this.channels = {};
  }

  push(channel, message) {
    if (this.channels[channel]) this.channels[channel].push(message);
  }

  get(channel) {
    return this.channels[channel];
  }

  subscribe(channel) {
    if (!this.channels[channel]) this.channels[channel] = [];
  }

  unsubscribe(channel) {
    if (this.channels[channel]) delete this.channels[channel];
  }
};
