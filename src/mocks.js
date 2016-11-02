import config from '../config.json';

module.exports = class {

    constructor(service) {

        this.listener = null;
        this.service = service;
        this.broadcastChannels = {};
    }

    initializeListener(instance) {

        if (this.listener === null) {

            let self = this;

            self.listener = {};

            config.subscribe_listener_events_to_broadcast.forEach((event) => {

                self.listener[event] = function (received) {

                    if (received.channel && self.broadcastChannels[received.channel] &&
                        self.broadcastChannels[received.channel].includes(event)) {

                        self.service.broadcastOn.emit(event, received.channel, received);

                    } else if (event === 'status') {

                        received.affectedChannels.forEach((channel) => {

                            if (self.broadcastChannels[channel] && self.broadcastChannels[channel].includes(event)) {

                                self.service.broadcastOn.emit(event, channel, received);
                            }
                        });
                    }
                };
            });

            instance.getOriginalInstance().addListener(this.listener);
        }
    }

    enableEventsBroadcast(args) {

        args.channels.forEach((channel) => {

            if (typeof args.triggerEvents === 'boolean') {

                this.broadcastChannels[channel] = config.subscribe_listener_events_to_broadcast;

            } else if (Array.isArray(args.triggerEvents)) {

                this.broadcastChannels[channel] = [];

                args.triggerEvents.forEach((trigger) => {

                    if (config.subscribe_listener_events_to_broadcast.includes(trigger)) {

                        this.broadcastChannels[channel].push(trigger);
                    }
                });
            }
        });
    }

    disableEventsBroadcast(args) {

        args.channels.forEach((channel) => {

            if (this.broadcastChannels[channel]) {

                delete this.broadcastChannels[channel];
            }
        });
    }
};
