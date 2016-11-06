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
          if (received.subscription && self.broadcastChannels[received.subscription] && self.broadcastChannels[received.subscription].includes(event)) {
            self.service.broadcastOn.emit(event, received.subscription, received);

            if (received.channel) {
              self.service.broadcastOn.emit(event, received.channel, received);
            }
          }

          if (received.channel && self.broadcastChannels[received.channel] && self.broadcastChannels[received.channel].includes(event)) {
            self.service.broadcastOn.emit(event, received.channel, received);
          }

          if (event === 'status') {
            received.affectedChannels.forEach((channel) => {
              if (self.broadcastChannels[channel] && self.broadcastChannels[channel].includes(event)) {
                self.service.broadcastOn.emit(event, channel, received);
              }
            });

            received.affectedChannelGroups.forEach((channelGroup) => {
              if (self.broadcastChannels[channelGroup] && self.broadcastChannels[channelGroup].includes(event)) {
                self.service.broadcastOn.emit(event, channelGroup, received);
              }
            });
          }
        };
      });

      instance.getOriginalInstance().addListener(this.listener);
    }
  }

  addEventsBroadcast(channels, triggerEvents) {
    channels.forEach((channel) => {
      if (typeof triggerEvents === 'boolean') {
        this.broadcastChannels[channel] = config.subscribe_listener_events_to_broadcast;
      } else if (Array.isArray(triggerEvents)) {
        this.broadcastChannels[channel] = [];

        triggerEvents.forEach((trigger) => {
          if (config.subscribe_listener_events_to_broadcast.includes(trigger)) {
            this.broadcastChannels[channel].push(trigger);
          }
        });
      }
    });
  }

  removeEventBroadcast(channels) {
    channels.forEach((channel) => {
      if (this.broadcastChannels[channel]) {
        delete this.broadcastChannels[channel];
      }
    });
  }

  enableEventsBroadcast(args) {
    if (args.channels) {
      this.addEventsBroadcast(args.channels, args.triggerEvents);
    }

    if (args.channelGroups) {
      this.addEventsBroadcast(args.channelGroups, args.triggerEvents);
    }
  }

  disableEventsBroadcast(args) {
    if (args.channels) {
      this.removeEventBroadcast(args.channels);
    }

    if (args.channelGroups) {
      this.removeEventBroadcast(args.channelGroups);
    }
  }
};
