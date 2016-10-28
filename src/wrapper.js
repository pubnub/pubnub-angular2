/* global angular PUBNUB */
import Mock from './mocks.js';

module.exports = class {

    constructor(label, service) {

        this.label = label;
        this.pubnubInstance = null;
        this.mockingInstance = new Mock(label, this, service);
        this.service = service;
    }

    init(initConfig) {

        this.pubnubInstance = new PubNub(initConfig);
        this.mockingInstance.initializeListener();
    }

    getLabel() {

        return this.label;
    }

    subscribe(args) {

        this.getOriginalInstance().subscribe(args);
    }

    getOriginalInstance() {

        if (this.pubnubInstance) {

            return this.pubnubInstance;

        } else {

            throw new ReferenceError('Pubnub default instance is not initialized yet. Invoke #init() method first.');
        }
    }

    wrapMethod(methodName) {

        this[methodName] = function (args) {

            return this.getOriginalInstance()[methodName](args);
        };
    }
};
