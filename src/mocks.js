import config from '../config.json';

module.exports = class {

    constructor(service) {

        this.listener = null;
        this.service = service;
        this.broadcastStatus = false;
        this.broadcastChannels = {};
    }

    initializeListener(instance) {

        if (this.listener === null) {

            let self = this;

            self.listener = {};

            config.subscribe_listener_events_to_broadcast.forEach((event) => {

                self.listener[event] = function (received) {

                    if(self.broadcastChannels[received.channel])

                    self.service.on.emit(event, received);
                };

            });

            instance.getOriginalInstance().addListener(this.listener);
        }
    }

    enableEventsBroadcast(args) {

        args.channels.forEach((channel) => {

            if (typeof args.triggerEvents === 'bool') {

                this.broadcastChannels[channel] = config.subscribe_listener_events_to_broadcast;
                this.broadcastStatus = true;

            } else if(Array.isArray(args.triggerEvents)) {

                this.broadcastChannels[channel] = [];

                args.triggerEvents.forEach((trigger) => {

                    if (config.subscribe_listener_events_to_broadcast.includes(trigger)) {

                        if (trigger === 'status') this.broadcastStatus = true;

                        this.broadcastChannels[channel].push(trigger);
                    }
                });
            }
        });


    }

};
