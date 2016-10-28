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

                    //let eventName = self.service.getEventNameFor('subscribe', 'status', self.label);

                    //self.subscribeListener.status.emit({event: eventName, state: st});

                    self.service.on.emit('status', null, st);
                },
                message: (mg) => {

                    let eventName = self.service.getMessageEventNameFor(mg.channel, self.label);

                    //self.subscribeListener.messages.emit({event: eventName, message: mg});

                    self.service.on.emit('message', eventName, mg);
                },
                presence: (ps) => {

                    let eventName = self.service.getPresenceEventNameFor(ps.channel, self.label);

                    //self.subscribeListener.presence.emit(ps);

                    self.service.on.emit('presence', eventName, ps);
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
