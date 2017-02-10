import config from '../config.json';

export class Autoload {
  constructor() {
    this.count = {};
    this.instance = undefined;
  }

  /**
   * Initialize the autoload with a wrapper instance
   *
   * @param instance
   */
  initialize(instance) {
    this.instance = instance;
  }

  /**
   * Enable the autoload for a channel or a set of channels subscribed
   *
   * @param args
   */
  enableLoad(args) {
    if (args.autoload && typeof args.autoload === 'number') {
      this.count[args.channels] = args.autoload;

      args.channels.forEach((channel) => {
        this.count[channel] = args.autoload;
      });
    }
  }

  /**
   * Get history of a channel or a set of channels.
   *
   * @param {string|[string]} channel
   * @param callback
   */
  getHistory(channel, callback) {
    if (this.count[channel]) {
      let instance = this.instance;
      let _channels = Array.isArray(channel) ? channel : [channel];
      let times = _channels.length;

      _channels.forEach((ch) => {
        instance.history({ channel: ch, count: this.count[channel] }).then((response) => {

          response.messages.forEach((m) => {
            m.message = m.entry;
            m.channel = ch;

            instance.outputOn.push(channel, m);
          });

          times -= 1;

          if (callback && times === 0) {
            instance.outputOn.sort(channel, config.history_sort_attribute);
            callback();
          }
        }).catch(() => {});
      });
    }
  }

  /**
   * Disable the autoload for a channel or set of channels
   *
   * @param args
   */
  disableLoad(args) {
    if (Array.isArray(args.channels)) {
      args.channels.forEach((ch) => {
        if (this.count[ch]) delete this.count[ch];
      });
    } else if (this.count[args.channels]) {
      delete this.count[args.channels];
    }
  }
}
