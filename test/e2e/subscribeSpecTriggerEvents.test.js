describe('#Triggered all events()', function () {

	var pubnub3 = new window.PubNubAngular();

	var channelName1 = getRandomChannel();
	var channelName2 = getRandomChannel();
	var stringMessage = 'hey';
	var uuid = 'blah1';

	pubnub3.init(config.demo);

	before(function () {
		pubnub3.setUUID(uuid);
		pubnub3.subscribe({channels: [channelName1, channelName2], triggerEvents: true, withPresence: true});
	});

	after(function () {
		pubnub3.unsubscribe({channels: [channelName1, channelName2]});
	});

	this.timeout(20000);

	describe('Status', function () {
		it('Should be triggered', function (done) {
			pubnub3.broadcastOn.status(channelName1, function (st) {
				expect(st).to.not.equal(null);
				expect(st.category).to.be.equal('PNConnectedCategory');
				done();
			});
		});
	});

	describe('Presence', function () {
		it('Should be triggered', function (done) {
			pubnub3.broadcastOn.presence(channelName2, function (ps) {
				expect(ps).to.not.equal(null);
				expect(ps.uuid).to.be.equal(uuid);
				done();
			});

			pubnub3.publish({channel: channelName2, message: stringMessage});
		});
	});

	describe('Message', function () {
		it('Should be triggered', function (done) {
			pubnub3.broadcastOn.message(channelName1, function (m) {
				expect(m).to.not.equal(null);
				expect(m.channel).to.be.equal(channelName1);
				expect(m.message).to.be.equal(stringMessage);
				done();
			});

			pubnub3.publish({channel: channelName1, message: stringMessage});
		});
	});
});