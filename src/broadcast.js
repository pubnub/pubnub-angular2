function registerChannel(register, channel, callback) {

    if (Array.isArray(channel)) {

        channel.forEach((ch) => {

            register[ch] = callback;
        });

    } else {

        register[channel.toString()] = callback;
    }
}

module.exports = class {

    constructor() {

        this._message = {};
        this._presence = {};
        this._status = null;
    }

    message(channel, callback) {

        registerChannel(this._message, channel, callback);
    }

    presence(channel, callback) {

        registerChannel(this._presence, channel, callback);
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

        if (this._message[channel]) delete this._message[channel];

        if (this._presence[channel]) delete this._presence[channel];
    }
};
