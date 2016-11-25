module.exports = class {

  constructor() {
    this.channels = {};
    this.multiChannels = {};
  }

  /**
   * Push a message to a channel's stack or a set of channels' stack
   *
   * @param {string|[string]} channel
   * @param {object} message
   */
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

  /**
   * Get a stack of messages for a channel or a set of channels
   *
   * @param {string|[string]} channel
   * @returns [object] array
   */
  get(channel) {
    if (Array.isArray(channel)) {
      return this.multiChannels[channel];
    } else {
      return this.channels[channel];
    }
  }

  /**
   * Clean a stack of message for a channel or a set of channels
   *
   * @param {string|[string]} channel
   */
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

  /**
   * Subscribe a channel or a set of channels to create a stack of messages
   *
   * @param {string|[string]} channel
   */
  subscribe(channel) {
    if (Array.isArray(channel)) {
      if (!this.multiChannels[channel]) this.multiChannels[channel] = [];

    } else if (!this.channels[channel]) {
      this.channels[channel] = [];
    }
  }

  /**
   * Unsubscribe a channel or a set of channels of the stack of message
   *
   * @param {string|[string]} channel
   */
  unsubscribe(channel) {
    if (this.channels[channel]) delete this.channels[channel];
  }
};
