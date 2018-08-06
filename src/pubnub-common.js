import config from '../config.json';
import { Wrapper } from './wrapper';

export default class {
  constructor(pubnub) {
    this.pubnub = pubnub;
    this.wrappers = {};
  }

  /**
   * Initializer for default instance
   *
   * @param {Object} initConfig
   */
  init(initConfig) {

    let instance = this.getInstance(config.default_instance_name);

    instance.init(initConfig);

    return instance;
  }

  /**
   * Instance getter
   *
   * @param instanceName
   * @returns {Wrapper}
   */
  getInstance(instanceName) {
    let instance = this.wrappers[instanceName];

    if (instance && instance instanceof Wrapper) {
      return instance;
    } else if (typeof instanceName === 'string' && instanceName.length > 0) {
      this.wrappers[instanceName] = new Wrapper(instanceName, this.pubnub);

      config.attributes_to_delegate.forEach((attribute) => {
        this.wrappers[instanceName].wrapAttribute(attribute);

        if (!this[attribute]) {
          Object.defineProperty(this, attribute, {
            get: function () {
              return this.getInstance(config.default_instance_name)[attribute];
            }
          });
        }
      });

      config.methods_to_delegate.forEach((method) => {
        this.wrappers[instanceName].wrapMethod(method);

        if (!this[method]) {
          this[method] = function () {
            let defaultInstance = this.getInstance(config.default_instance_name);
            return defaultInstance[method].apply(defaultInstance, arguments);
          };
        }
      });

      return this.wrappers[instanceName];
    }

    return instance;
  }

  /**
   * Subscribe method wrapped for default instance
   *
   * @param {object} args
   */
  subscribe(args) {
    this.getInstance(config.default_instance_name).subscribe(args);
  }

  /**
   * Unsubscribe method wrapped for default instance
   *
   * @param {object} args
   */
  unsubscribe(args) {
    this.getInstance(config.default_instance_name).unsubscribe(args);
  }

  /**
   * GetMessage method wrapped for default instance
   *
   * @param {string|[string]} channel
   * @param callback
   * @returns [object] array
   */
  getMessage(channel, ...args) {
    return this.getInstance(config.default_instance_name).getMessage(channel, ...args);
  }

  /**
   * GetPresence method wrapped for default instance
   *
   * @param {string|[string]} channel
   * @param callback
   */
  getPresence(channel, callback) {
    this.getInstance(config.default_instance_name).getPresence(channel, callback);
  }

  /**
   * GetStatus method wrapped for default instance
   *
   * @param {string|[string]} channel
   * @param callback
   */
  getStatus(channel, callback) {
    this.getInstance(config.default_instance_name).getStatus(channel, callback);
  }

  /**
   * GetError method wrapped for default instance
   *
   * @param callback
   */
  getError(callback) {
    this.getInstance(config.default_instance_name).getError(callback);
  }

  /**
   * Clean Method wrapped for default instance
   *
   * @param {string|[string]} channel
   */
  clean(channel) {
    this.getInstance(config.default_instance_name).clean(channel);
  }

  /**
   * Release Method wrapped for default instance
   *
   * @param {string|[string]} channel
   */
  release(channel) {
    this.getInstance(config.default_instance_name).release(channel);
  }
}
