describe('#subscribe_channelGroups', function () {

	var pubnub = new window.PubNubAngular();

	var channelGroup = undefined;
	var channels = [];
	var stringMessage = 'hey';

	pubnub.init(config.demo);

	beforeEach(function () {
		channelGroup = getRandomChannelGroup();

		for (var x = 0; x < 3; x++) {
			channels.push(getRandomChannel());
		}
	});

	afterEach(function () {
		pubnub.channelGroups.deleteGroup({channelGroup: channelGroup});
	});

	this.timeout(20000);

	describe('subscribe a channel group', function () {
		it('It is able to subscribe a channel group', function (done) {

			pubnub.channelGroups.addChannels(
				{
					channels: channels,
					channelGroup: channelGroup
				},
				function(status) {
					expect(status.error).to.be.equal(false);
					done();
				}
			);

			// pubnub.addListener({
			// 	message: function (m) {
			// 		console.log(m);
			// 		expect(m.message).to.be.equal(stringMessage);
			// 		done();
			// 	}
			// });
			//
			// pubnub.subscribe({channelGroups: [config.channelGroup]});
			//
			// pubnub.publish({channel: config.channels[0], message: stringMessage});

		});
	});
});