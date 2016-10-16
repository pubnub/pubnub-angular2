/* global angular PUBNUB */

module.exports = class {

    constructor(label) {

        this.label = label;
        this.pubnubInstance = null;
    }

    init(initConfig) {

        this.pubnubInstance = new PubNub(initConfig);
    }

    getLabel() {

        return this.label;
    }

    getOriginalInstance() {

        if (this.pubnubInstance) {

            return this.pubnubInstance;

        } else {

            throw new ReferenceError('Pubnub default instance is not initialized yet. Invoke #init() method first.');
        }
    }

    wrapMethod(methodName) {

        this[methodName] = (args) => {

            if (typeof args === 'object') {

            }

            return this.getOriginalInstance()[methodName](args);
        };
    }
};
