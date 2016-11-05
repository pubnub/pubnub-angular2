describe('#subscribe()', function () {

	var pubnub = new window.PubNubAngular();

	var channelName = undefined;
	var stringMessage = 'hey';

	pubnub.init(config.demo);

	beforeEach(function () {
		channelName = getRandomChannel();
	});

	afterEach(function () {

		pubnub.unsubscribe({channels: [channelName]});
	});

	this.timeout(20000);

	describe('Success and Connect Callback', function () {

		it('should be invoked', function (done) {

			pubnub.addListener({
				message: function (m) {

					expect(m.message).to.be.equal(stringMessage);
					expect(m.channel).to.be.equal(channelName);
					done();
				}
			});

			pubnub.subscribe({channels: [channelName]});

			pubnub.publish({channel: channelName, message: stringMessage});
		});
	});

	describe('Presence callback', function () {

		it('should be invoked', function (done) {

			var uuid = 'blah';

			pubnub.getInstance('another').init(config.demo);

			pubnub.getInstance('another').setUUID(uuid);

			pubnub.getInstance('another').addListener({
				presence: function (p) {

					expect(p.uuid).to.be.equal(uuid);
					done();
				}
			});

			pubnub.getInstance('another').subscribe({channels: [channelName], withPresence: true});
		});

	});

	describe('Message callback', function () {

		it('The message callback should be invoked as usual', function (done) {

			pubnub.addListener({
				message: function (m) {

					expect(m.message).to.be.equal(stringMessage);
					done();
				}
			});

			pubnub.subscribe({channels: [channelName]});

			pubnub.publish({channel: channelName, message: stringMessage});
		});
	});

	describe('Triggered all events', function () {

		it('Should be triggered (message)', function (done) {

			pubnub.broadcastOn.message(channelName, function (m) {

				expect(m).to.not.equal(null);
				expect(m.channel).to.be.equal(channelName);
				expect(m.message).to.be.equal(stringMessage);
				done();
			});

			pubnub.publish({channel: channelName, message: stringMessage});
			pubnub.subscribe({channels: [channelName], triggerEvents: ['message']});
		});

		it('Should be triggered (presence)', function (done) {

			var uuid = 'blah';
			var subscribedChannel = channelName + '-pnpres';

			pubnub.broadcastOn.presence(channelName, function (ps) {

				expect(ps).to.not.equal(null);
				expect(ps.subscribedChannel).to.be.equal(subscribedChannel);
				done();
			});

			pubnub.setUUID(uuid);
			pubnub.publish({channel: channelName, message: stringMessage});
			pubnub.subscribe({channels: [channelName], triggerEvents: true, withPresence: true});
		});

		it('Should be triggered (status)', function (done) {

			pubnub.broadcastOn.status(channelName, function (st) {

				expect(st).to.not.equal(null);
				expect(st.category).to.be.equal('PNConnectedCategory');
				done();
			});

			pubnub.publish({channel: channelName, message: stringMessage});
			pubnub.subscribe({channels: [channelName], triggerEvents: true});
		});
	});
});
