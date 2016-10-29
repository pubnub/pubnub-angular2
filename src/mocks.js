import config from '../config.json';

module.exports = class {

    constructor(service) {

        this.listener = null;
        this.service = service;
        this.broadcastStatus = false;
        this.broadcastedPresenceChannels = {};
        this.broadcastedChannels = {};
    }

    initializeListener(instance) {

        if (this.listener === null) {

            let self = this;

            self.listener = {};

            config.subscribe_listener_events_to_broadcast.forEach((event) => {

                self.listener[event] = function (received) {

                    self.service.on.emit(event, received);
                };

            });

            instance.getOriginalInstance().addListener(this.listener);
        }
    }

    enableEventsBroadcast(args) {

        args.channels.forEach((channel) => {

            register[ch] = callback;
        });

        this.broadcastStatus = true;
        this.broadcastedPresenceChannels[channel] = true;
        this.broadcastedChannels[channel] = true;
    }

};
