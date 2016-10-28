function resolveChannel(channel) {

    let ch = '';

    if (Array.isArray(channel)) {

        channel.sort();

        ch = channel.join('@');

    } else {

        ch = channel;
    }

    return ch;
}

function registerChannel(register, channel, callback) {

    let ch = resolveChannel(channel);

    register[ch] = callback;
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

    emit(register, channel, obj) {

        if (register === 'status') {

            if (this._status) this._status.call(null, obj);

        } else {

            let ch = resolveChannel(channel);

            let reg = '_' + register;

            if (this[reg][ch]) this[reg][ch].call(null, obj);
        }
    }

    unsubscribe(channel) {

        let ch = resolveChannel(channel);

        if (this._message[ch]) delete this._message[ch];

        if (this._presence[ch]) delete this._presence[ch];
    }
};
