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
        this._status = null;
    }

    message(channel, callback) {

        subscribeChannel(this._message, channel, callback);
    }

    presence(channel, callback) {

        subscribeChannel(this._presence, channel, callback);
    }

    status(callback) {

        this._status = callback;
    }

    emit(register, obj) {

        if (!obj.channel) {

            if (this._status) this._status.call(null, obj);

        } else {

            let reg = ('_').concat(register);

            if (this[reg][obj.channel]) this[reg][obj.channel].call(null, obj);
        }
    }

    unsubscribe(channel) {

        unsubscriberChannel(this._message, channel);
        unsubscriberChannel(this._presence, channel);
    }
};
