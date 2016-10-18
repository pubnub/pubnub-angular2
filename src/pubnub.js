import config from '../config.json';
import Wrapper from './wrapper.js';
import PubNub from '../bower_components/pubnub/dist/web/pubnub';

(function (pubnub) {

    let wrappers = {};

    pubnub.angular2Service = new ng.core.Class({

        constructor: function () {

            if (typeof PubNub === undefined || PubNub === null) {

                throw new Error('PubNub is not in global scope. Ensure that pubnub.js v4.0.13 file is included before pubnub-angular2.js');
            }
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

                wrappers[instanceName] = new Wrapper(instanceName);

                config.methods_to_delegate.forEach(method => {

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
         * Generate unique method/callback event name
         *
         * @param {string} methodName
         * @param {string} callbackName
         * @param {string} instanceName
         * @returns {string} event name
         */
        getEventNameFor: function (methodName, callbackName, instanceName) {

            return instanceName;
        },
        /**
         * Generate unique message event name for specified channel
         *
         * @param {string} channelName
         * @param {string} instanceName
         * @returns {string} event name
         */
        getMessageEventNameFor: function (channelName, instanceName) {

            return instanceName;
        },
        /**
         * Generate unique presence event name for specified channel
         *
         * @param {string} channelName
         * @param {string} instanceName
         * @returns {string} event name
         */
        getPresenceEventNameFor: function (channelName, instanceName) {

            return instanceName;
        },
        /**
         * Subscribe method wrapper for default instance
         *
         * @param {object} args
         */
        subscribe: function (args) {

            return args;
        }
    });

})(window.pubnub || (window.pubnub = {}));
