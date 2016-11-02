/* global window */

import config from '../config.json';
import Wrapper from './wrapper';
import Broadcast from './broadcast';

(function () {
  let wrappers = {};

  window.PubNubAngular = ng.core.Class({
    constructor: function (initConfig) {
      if (typeof PubNub === 'undefined' || PubNub === null) {
        throw new Error('PubNub is not in global scope. Ensure that pubnub.js v4 library is included before the angular adapter');
      }

      if (initConfig) this.init(initConfig);

      this.broadcastOn = new Broadcast();
    },

    /**
     * Initializer for default instance
     *
     * @param {Object} initConfig
     */
    init: function (initConfig) {

      let instance = this.getInstance(config.default_instance_name);

      instance.init(initConfig);

      return instance;
    },

    /**
     * Instance getter
     *
     * @param instanceName
     * @returns {Wrapper}
     */
    getInstance: function (instanceName) {
      let instance = wrappers[instanceName];

      if (instance && instance instanceof Wrapper) {
        return instance;
      } else if (typeof instanceName === 'string' && instanceName.length > 0) {
        wrappers[instanceName] = new Wrapper(instanceName, this);

        config.methods_to_delegate.forEach((method) => {
          wrappers[instanceName].wrapMethod(method);

          this[method] = function (args) {
            return this.getInstance(config.default_instance_name)[method](args);
          };
        });

        return wrappers[instanceName];
      }

      return instance;
    },

    /**
     * Subscribe method wrapper for default instance
     *
     * @param {object} args
     */
    subscribe: function (args) {
      this.getInstance(config.default_instance_name).subscribe(args);
    },

    /**
     * Unsubscribe method wrapper for default instance
     *
     * @param {object} args
     */
    unsubscribe: function (args) {
      this.getInstance(config.default_instance_name).unsubscribe(args);
    }
  });

})();
