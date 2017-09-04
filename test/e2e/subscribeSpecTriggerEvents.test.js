describe('#Triggered all events()', function () {

	var pubnub3 = new PubNubAngular();

	var channelName1 = getRandomChannel();
	var channelName2 = getRandomChannel();
	var channelName3 = getRandomChannel();
	var stringMessage = 'hey';
	var uuid = 'blah1';

	pubnub3.init(config.demo);

	pubnub3.getError(function(err) {
		console.error(err);
	});

	before(function () {
		pubnub3.setUUID(uuid);
		pubnub3.subscribe({channels: [channelName1, channelName2], triggerEvents: true, withPresence: true});
	});

	after(function () {
		pubnub3.unsubscribe({channels: [channelName1, channelName2]});
	});

	this.timeout(30000);

	describe('Status', function () {
		it('Should be triggered', function (done) {
			pubnub3.getStatus(channelName1, function (st) {
				expect(st).to.not.equal(null);
				expect(st.category).to.be.equal('PNConnectedCategory');
				done();
			});
		});
	});

	describe('Presence', function () {
		it('Should be triggered', function (done) {
			pubnub3.getPresence(channelName2, function (ps) {
				expect(ps).to.not.equal(null);
				expect(ps.uuid).to.be.equal(uuid);
				done();
			});

			pubnub3.publish({channel: channelName2, message: stringMessage});
		});
	});

	describe('Message', function () {
		it('Should be triggered', function (done) {
			pubnub3.getMessage(channelName1, function (m) {
				expect(m).to.not.equal(null);
				expect(m.channel).to.be.equal(channelName1);
				expect(m.message).to.be.equal(stringMessage);
				done();
			});

			pubnub3.publish({channel: channelName1, message: stringMessage});
		});
	});

	describe('Message from other instance', function(){
		it('Should be triggered', function (done) {
			pubnub3.getInstance('another').init(config.demo);

			pubnub3.getInstance('another').subscribe({channels: [channelName3], triggerEvents: true});

			pubnub3.getInstance('another').getMessage(channelName3, function(m) {
				expect(m).to.not.equal(null);
				expect(m.channel).to.be.equal(channelName3);
				expect(m.message).to.be.equal(stringMessage);
				done();
			});

			pubnub3.getInstance('another').publish({channel: channelName3, message: stringMessage});
		});
	});
});