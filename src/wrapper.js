/* global angular PUBNUB */
import Mock from './mocks';

module.exports = class {

  constructor(label, service) {
    this.label = label;
    this.pubnubInstance = null;
    this.mockingInstance = new Mock(service);
  }

  init(initConfig) {
    this.pubnubInstance = new PubNub(initConfig);
    this.mockingInstance.initializeListener(this);
  }

  getLabel() {
    return this.label;
  }

  subscribe(args) {
    this.getOriginalInstance().subscribe(args);
    this.mockingInstance.enableEventsBroadcast(args);
  }

  unsubscribe(args) {
    this.getOriginalInstance().unsubscribe(args);
    this.mockingInstance.disableEventsBroadcast(args);
  }

  getOriginalInstance() {
    if (this.pubnubInstance) {
      return this.pubnubInstance;
    } else {
      throw new ReferenceError('Pubnub default instance is not initialized yet. Invoke #init() method first.');
    }
  }

  wrapAttribute(attributeName) {
    Object.defineProperty(this, attributeName, {
      get: function () {
        return this.getOriginalInstance()[attributeName];
      }
    });
  }

  wrapMethod(methodName) {
    this[methodName] = function (args) {
      return this.getOriginalInstance()[methodName](args);
    };
  }
};
