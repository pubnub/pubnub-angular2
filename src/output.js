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
    if (Array.isArray(channel) && this.multiChannels[channel]) {
			this.multiChannels[channel].push(message);
    } else if (this.channels[channel]) {
      this.channels[channel].push(message);
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
    if (Array.isArray(channel) && this.multiChannels[channel]) {
			this.multiChannels[channel].length = 0;
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

  sort(channel, key) {
    if (Array.isArray(channel) && this.multiChannels[channel]) {
      this.multiChannels[channel].sort((a, b) => {
        if (a[key] > b[key]) return 1;
        else if (a[key] < b[key]) return -1;
        else return 0;
      });
    } else if (this.channels[channel]) {
      this.channels[channel].sort((a, b) => {
				if (a[key] > b[key]) return 1;
				else if (a[key] < b[key]) return -1;
				else return 0;
			});
    }
  }

  /**
   * Unsubscribe a channel or a set of channels of the stack of message
   *
   * @param {string|[string]} channel
   */
  unsubscribe(channel) {
    this.clean(channel);

    if (Array.isArray(channel)) {
      if (this.multiChannels[channel]) delete this.multiChannels[channel];
    } else if (!this.channels[channel]) {
      delete this.channels[channel];
    }
  }
};
