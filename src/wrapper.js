import { Mock } from './mock';
import { Broadcast } from './broadcast';
import { Output } from './output';
import { Autoload } from './autoload';

export class Wrapper {
  constructor(label, pubnub) {
    this.label = label;
    this.pubnubInstance = null;
    this.PubNub = pubnub;
    this.broadcastOn = new Broadcast();
    this.outputOn = new Output();
    this.mockingInstance = new Mock(this.broadcastOn);
    this.autoload = new Autoload();

    if (!this.PubNub) {
      this.PubNub = PubNub;
    }

    if (typeof this.PubNub === 'undefined' || this.PubNub === null) {
      throw new Error('PubNub is not in global scope. Ensure that pubnub.js v4 library is included before the angular adapter');
    }
  }

  /**
   * Initialize the wrapper
   *
   * @param {object} initConfig
   */
  init(initConfig) {
    this.pubnubInstance = new this.PubNub(initConfig);
    this.mockingInstance.initializeListener(this);
    this.autoload.initialize(this);
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
    this.autoload.enableLoad(args);
  }

  /**
   * Wrap the unsubscribe method to disable the trigger events to the broadcast
   *
   * @param args
   */
  unsubscribe(args) {
    this.autoload.disableLoad(args);
    this.outputOn.unsubscribe(args);
    this.getOriginalInstance().unsubscribe(args);
    let self = this;
    let tm = setTimeout(() => {
      self.mockingInstance.disableEventsBroadcast(args);
      clearTimeout(tm);
    }, 1000);
  }

  /**
   * Get to receive messages from a channel or a set of channels through a callback
   *
   * @param {string|[string]} channel
   * @param callback
   */
  getMessage(channel, ...args) {
    let callback;
    let keepMessages = 100;

    if (args.length === 1 && typeof args[0] === 'function') {
      callback = args[0];
    } else if (args.length === 1 && typeof args[0] === 'number') {
      keepMessages = args[0];
    } else if (args.length === 2) {
      callback = args[0];
      keepMessages = args[1];
    }

    if (this.outputOn.subscribe(channel, keepMessages)) {
      this.autoload.getHistory(channel, callback);
    }

    this.broadcastOn.message(channel, (message) => {
      this.outputOn.push(channel, message);
      if (callback) callback(message);
    });

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
   * Clean the stack of messages for a channel or a set of channels
   *
   * @param {string|[string]} channel
   */
  clean(channel) {
    this.outputOn.clean(channel);
  }

  /**
   * Release the stack of messages for a channel or a set of channels
   *
   * @param {string|[string]} channel
   */
  release(channel) {
    this.broadcastOn.unsubscribe(channel);
    this.outputOn.unsubscribe(channel);
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
    this[methodName] = function () {
      return this.getOriginalInstance()[methodName].apply(this, arguments);
    };
  }
}
