import config from '../config.json';

export class Mock {

  constructor(broadcaster) {
    this.listener = null;
    this.broadcaster = broadcaster;
    this.broadcastChannels = {};
  }

  /**
   * Initialize the listener for broadcasting all events
   *
   * @param {wrapper} instance
   */
  initializeListener(instance) {
    if (this.listener === null) {
      let self = this;

      self.listener = {};

      config.subscribe_listener_events_to_broadcast.forEach((event) => {
        self.listener[event] = function (received) {
          if (received.subscription && self.broadcastChannels[received.subscription] && self.broadcastChannels[received.subscription].includes(event)) {
            self.broadcaster.emit(event, received.subscription, received);

            if (received.channel) {
              self.broadcaster.emit(event, received.channel, received);
            }
          }

          if (received.channel && self.broadcastChannels[received.channel] && self.broadcastChannels[received.channel].includes(event)) {
            self.broadcaster.emit(event, received.channel, received);
          }

          if (event === 'status') {
            if (received.error) {
              self.broadcaster.emitError(received);
            } else if (received.affectedChannels || received.affectedChannelGroups) {
              received.affectedChannels.forEach((channel) => {
                if (self.broadcastChannels[channel] && self.broadcastChannels[channel].includes(event)) {
                  self.broadcaster.emit(event, channel, received);
                }
              });

              received.affectedChannelGroups.forEach((channelGroup) => {
                if (self.broadcastChannels[channelGroup] && self.broadcastChannels[channelGroup].includes(event)) {
                  self.broadcaster.emit(event, channelGroup, received);
                }
              });
            } else {
              Object.keys(self.broadcastChannels).forEach((channel) => {
                self.broadcaster.emit(event, channel, received);
              });
            }
          }
        };
      });

      instance.getOriginalInstance().addListener(this.listener);
    }
  }

  /**
   * Adds a set of channels to all events to broadcast
   *
   * @param {[string]} channels
   * @param {true|['message', 'presence', 'status']} triggerEvents
   */
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

  /**
   * Removes a set of channels from of all events to broadcast
   *
   * @param {[string]} channels
   */
  removeEventBroadcast(channels) {
    channels.forEach((channel) => {
      if (this.broadcastChannels[channel]) {
        delete this.broadcastChannels[channel];
      }
    });
  }

  /**
   * Enable a set of channels or group of channels to the broadcaster
   *
   * @param {object} args
   */
  enableEventsBroadcast(args) {
    if (args.channels) {
      this.addEventsBroadcast(args.channels, args.triggerEvents);
    }

    if (args.channelGroups) {
      this.addEventsBroadcast(args.channelGroups, args.triggerEvents);
    }
  }

  /**
   * Disable a set of channels or group of channels from the broadcaster
   *
   * @param {object} args
   */
  disableEventsBroadcast(args) {
    if (args.channels) {
      this.removeEventBroadcast(args.channels);
    }

    if (args.channelGroups) {
      this.removeEventBroadcast(args.channelGroups);
    }
  }
}
