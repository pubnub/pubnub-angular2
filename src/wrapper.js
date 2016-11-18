/* global angular PUBNUB */
import Mock from './mocks';
import Broadcast from './broadcast';
import Output from './output';

module.exports = class {

  constructor(label) {
    this.label = label;
    this.pubnubInstance = null;
    this.broadcastOn = new Broadcast();
    this.outputOn = new Output();
    this.mockingInstance = new Mock(this.broadcastOn);
  }

  /**
   * Initialize the wrapper
   *
   * @param {object} initConfig
   */
  init(initConfig) {
    this.pubnubInstance = new PubNub(initConfig);
    this.mockingInstance.initializeListener(this);

  }

  /**
   * Get the name of the instance
   *
   * @returns {*|string|null|string}
   */
  getLabel() {
    return this.label;
  }

  /**
   * Wrap the subscribe method to enable trigger events to the broadcast
   *
   * @param {object} args
   */
  subscribe(args) {
    this.getOriginalInstance().subscribe(args);
    this.mockingInstance.enableEventsBroadcast(args);
  }

  /**
   * Wrap the unsubscribe method to disable the trigger events to the broadcast
   *
   * @param args
   */
  unsubscribe(args) {
    this.getOriginalInstance().unsubscribe(args);
    this.mockingInstance.disableEventsBroadcast(args);
  }

  /**
   * Get to receive messages from a channel or a set of channels through a callback
   *
   * @param {string|[string]} channel
   * @param callback
   */
  getMessage(channel, callback) {
    this.outputOn.subscribe(channel);

    if (callback) {
      this.broadcastOn.message(channel, (message) => {
        this.outputOn.push(channel, message);
        callback(message);
      });
    }

    return this.outputOn.get(channel);
  }

  /**
   * Get to receive presence information from a channel or a set of channels through a callback
   *
   * @param {string|[string]} channel
   * @param callback
   */
  getPresence(channel, callback) {
    if (this.broadcastOn) {
      this.broadcastOn.presence(channel, callback);
    }
  }

  /**
   * Get to receive status information from a channel or a set of channels through a callback
   *
   * @param {string|[string]} channel
   * @param callback
   */
  getStatus(channel, callback) {
    if (this.broadcastOn) {
      this.broadcastOn.status(channel, callback);
    }
  }

  /**
   * Get to receive error information from PubNub Service through a callback
   *
   * @param callback
   */
  getError(callback) {
    if (this.broadcastOn) {
      this.broadcastOn.error(callback);
    }
  }

  /**
   * Get the PubNub instance wrapped or throw an exception if this is not instanced yet
   *
   * @returns {PubNub|*|null}
   */
  getOriginalInstance() {
    if (this.pubnubInstance) {
      return this.pubnubInstance;
    } else {
      throw new ReferenceError('Pubnub default instance is not initialized yet. Invoke #init() method first.');
    }
  }

  /**
   * Wrap a PubNub's attribute
   *
   * @param {string} attributeName
   */
  wrapAttribute(attributeName) {
    Object.defineProperty(this, attributeName, {
      get: function () {
        return this.getOriginalInstance()[attributeName];
      }
    });
  }

  /**
   * Wrap a PubNub's method
   *
   * @param methodName
   */
  wrapMethod(methodName) {
    this[methodName] = function (args) {
      return this.getOriginalInstance()[methodName](args);
    };
  }
};
