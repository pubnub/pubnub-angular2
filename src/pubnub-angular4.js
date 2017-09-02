import PubNub from 'pubnub';
import PubNubCommon from './pubnub-common';

export class PubNubAngular extends PubNubCommon {
  constructor() {
    super(PubNub);
  }
}
