export class Output {
  constructor() {
    this.channels = {};
    this.keepMessages = {};
  }

  /**
   * Push a message to a channel's stack or a set of channels' stack
   *
   * @param {string|[string]} channel
   * @param {object} message
   */
  push(channel, message) {
    if (this.channels[channel]) {
      this.channels[channel].push(message);

      if (this.keepMessages[channel] && this.channels[channel].length > this.keepMessages[channel]) {
        this.channels[channel].splice(0, (this.channels[channel].length - this.keepMessages[channel]));
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
    if (this.channels[channel]) {
      return this.channels[channel];
    } else {
      return null;
    }
  }

  /**
   * Clean a stack of message for a channel or a set of channels
   *
   * @param {string|[string]} channel
   */
  clean(channel) {
    if (this.channels[channel]) {
      this.channels[channel].length = 0;
    }
  }

  /**
   * Subscribe a channel or a set of channels to create a stack of messages
   *
   * @param {string|[string]} channel
   */
  subscribe(channel, keepMessages) {
    if (!this.channels[channel]) {
      this.channels[channel] = [];
      this.keepMessages[channel] = keepMessages;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Sort the stack of messages for a channel or set of channels
   *
   * @param {string|[string]} channel
   * @param string key
   */
  sort(channel, key) {
    if (this.channels[channel]) {
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
    if (this.channels[channel]) {
      this.clean(channel);
      delete this.channels[channel];
    }
  }
}
