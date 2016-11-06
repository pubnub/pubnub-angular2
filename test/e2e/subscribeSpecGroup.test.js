describe('#subscribe_channelGroups', function () {

	var pubnub = new window.PubNubAngular();

	var channelGroup = undefined;
	var channels = [];
	var stringMessage = 'hey';

	pubnub.init(config.demo);

	beforeEach(function (done) {
		channelGroup = getRandomChannelGroup();

		for (var x = 0; x < 3; x++) {
			channels.push(getRandomChannel());
		}

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
	});

	afterEach(function (done) {
		pubnub.channelGroups.deleteGroup(
			{channelGroup: channelGroup},
			function(status) {
				expect(status.error).to.be.equal(false);
				done();
			}
		);
	});

	//this.timeout(20000);

	describe('#Subscribe a channel group', function () {
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
		});
	});

	describe('Listening from a channel group', function () {
		it('It is able to listen over a channel group', function (done) {

			pubnub.addListener({
				message: function (m) {
					expect(m.message).to.be.equal(stringMessage);
					done();
				}
			});

			pubnub.subscribe({channelGroups: [channelGroup]});

			pubnub.publish({channel: channels[0], message: stringMessage});
		});
	});

	this.timeout(10000);

	describe('Using trigger events', function () {
		it('It is able to listen using trigger events', function (done) {
			pubnub.broadcastOn.message(channelGroup, function (m) {

				expect(m).to.not.equal(null);
				expect(m.subscription).to.be.equal(channelGroup);
				expect(m.message).to.be.equal(stringMessage);
				done();
			});

			pubnub.subscribe({channelGroups: [channelGroup], triggerEvents: true});

			pubnub.publish({channel: channels[0], message: stringMessage});
		});
	});

	this.timeout(10000);

	describe('Listening from a channel', function () {
		it('It is able to listen from a channel associated to the channel group', function (done) {
			var channelGroup2 = getRandomChannelGroup();
			var channels2 = [];

			for (var x = 0; x < 3; x++) {
				channels2.push(getRandomChannel());
			}

			pubnub.channelGroups.addChannels(
				{
					channels: channels2,
					channelGroup: channelGroup2
				},
				function(status) {
					expect(status.error).to.be.equal(false);

					pubnub.broadcastOn.message(channels2[0], function (m) {

						expect(m).to.not.equal(null);
						expect(m.channel).to.be.equal(channels2[0]);
						expect(m.message).to.be.equal(stringMessage);
						done();
					});

					pubnub.subscribe({channelGroups: [channelGroup2], triggerEvents: true});

					pubnub.publish({channel: channels2[0], message: stringMessage});
				}
			);
		});
	});
});