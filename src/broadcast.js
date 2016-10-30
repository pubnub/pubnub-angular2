function subscribeChannel(subscriber, channel, callback) {

    if (Array.isArray(channel)) {

        channel.forEach((ch) => {

            subscriber[ch] = callback;
        });

    } else {

        subscriber[channel] = callback;
    }
}

function unsubscriberChannel(subscriber, channel) {

    if (Array.isArray(channel)) {

        channel.forEach((ch) => {

            if (subscriber[ch]) delete subscriber[ch];
        });

    } else {

        if (subscriber[channel]) delete subscriber[channel];
    }
}

module.exports = class {

    constructor() {

        this._message = {};
        this._presence = {};
        this._status = {};
    }

    message(channel, callback) {

        subscribeChannel(this._message, channel, callback);
    }

    presence(channel, callback) {

        subscribeChannel(this._presence, channel, callback);
    }

    status(channel, callback) {

        subscribeChannel(this._status, channel, callback);
    }

    emit(subscriber, channel, obj) {

        let subs = ('_').concat(subscriber);

        if (this[subs][channel]) this[subs][channel].call(null, obj);
    }

    unsubscribe(channel) {

        unsubscriberChannel(this._message, channel);
        unsubscriberChannel(this._presence, channel);
        unsubscriberChannel(this._status, channel);
    }
};
