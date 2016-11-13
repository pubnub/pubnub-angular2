/* global angular PUBNUB */
import Mock from './mocks';

module.exports = class {

  constructor(label, service) {
    this.label = label;
    this.pubnubInstance = null;
    this.mockingInstance = new Mock(service);
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
   * get the PubNub instance wrapped or throw an exception if this is not instanced yet
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
