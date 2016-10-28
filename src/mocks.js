/* global angular */
module.exports = class {

    constructor(label, instance, service) {

        this.label = label;
        this.instance = instance;
        this.subscribeListener = null;
        this.service = service;
    }

    initializeListener() {

        if (this.subscribeListener === null) {

/*            this.subscribeListener =
            {
                messages: new ng.core.EventEmitter(),
                status: new ng.core.EventEmitter(),
                presence: new ng.core.EventEmitter()
            };*/

            let self = this;

            this.instance.getOriginalInstance().addListener({
                status: (st) => {

                    //self.subscribeListener.status.emit({event: eventName, state: st});

                    self.service.on.emit('status', null, st);
                },
                message: (mg) => {

                    //self.subscribeListener.messages.emit({event: eventName, message: mg});

                    self.service.on.emit('message', mg.channel, mg);
                },
                presence: (ps) => {

                    //self.subscribeListener.presence.emit(ps);

                    self.service.on.emit('presence', ps.channel, ps);
                }
            });
        }
    }

    //enableEventsBroadcast(channel) {

        // this.broadcastStatus[channel] = true;
        // this.broadcastedPresenceChannels[channel] = true;
        // this.broadcastedChannels[channel] = true;
    //}

};
