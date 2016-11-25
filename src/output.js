module.exports = class {

  constructor() {
    this.channels = {};
    this.multiChannels = {};
  }

  push(channel, message) {
    if (Array.isArray(channel)) {
      channel.forEach((ch) => {
        if (this.channels[ch]) this.channels[ch].push(message);
      });
    } else if (this.channels[channel]) {
      this.channels[channel].push(message);
    }

    for (let key of Object.keys(this.multiChannels)) {
      if (key.includes(channel)) {
        this.multiChannels[key].push(message);
        break;
      }
    }
  }

  get(channel) {
    if (Array.isArray(channel)) {
      return this.multiChannels[channel];
    } else {
      return this.channels[channel];
    }
  }

  clean(channel) {
    if (Array.isArray(channel)) {
      channel.forEach((ch) => {
        if (this.channels[ch]) this.channels[ch].length = 0;
      });

      if (this.multiChannels[channel]) this.multiChannels[channel].length = 0;

    } else if (this.channels[channel]) {
      this.channels[channel].length = 0;
    }
  }

  subscribe(channel) {
    if (Array.isArray(channel)) {
      if (!this.multiChannels[channel]) this.multiChannels[channel] = [];

    } else if (!this.channels[channel]) {
      this.channels[channel] = [];
    }
  }

  unsubscribe(channel) {
    if (this.channels[channel]) delete this.channels[channel];
  }
};
