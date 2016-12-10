describe('#subscribe()', function () {

	var pubnub = new PubNubAngular();

	var channelName = undefined;
	var stringMessage = 'hey';
	var listener = null;

	pubnub.init(config.demo);

	beforeEach(function () {
		channelName = getRandomChannel();
	});

	afterEach(function () {
		pubnub.removeListener(listener);
		pubnub.unsubscribe({channels: [channelName]});
	});

	this.timeout(20000);

	describe('Success and Connect Callback', function () {

		it('should be invoked', function (done) {

			listener = {
				status: function (st) {
					expect(st.category).to.not.equal(null);
					expect(st.category).to.be.equal('PNConnectedCategory');
					done();
				}
			};

			pubnub.addListener(listener);

			pubnub.subscribe({channels: [channelName]});

			pubnub.publish({channel: channelName, message: stringMessage});
		});
	});

	describe('Unsubscribe successfully', function () {
		it('should be invoked', function (done) {
			var channelTest = getRandomChannel();

			pubnub.subscribe({channels: [channelTest]});
			pubnub.unsubscribe({channels: [channelTest]});

			done();
		});
	});

	describe('Presence callback', function () {

		it('should be invoked', function (done) {

			var uuid = 'blah';

			pubnub.getInstance('another').init(config.demo);

			pubnub.getInstance('another').setUUID(uuid);

			listener = {
				presence: function (p) {
					expect(p.uuid).to.be.equal(uuid);
					done();
				}
			};

			pubnub.getInstance('another').addListener(listener);

			pubnub.getInstance('another').subscribe({channels: [channelName], withPresence: true});
		});

	});

	describe('Message callback', function () {

		it('should be invoked', function (done) {

			pubnub.getInstance('another2').init(config.demo);

			listener = {
				message: function (m) {
					expect(m.message).to.be.equal(stringMessage);
					done();
				}
			};

			pubnub.getInstance('another2').addListener(listener);

			pubnub.getInstance('another2').subscribe({channels: [channelName]});

			pubnub.getInstance('another2').publish({channel: channelName, message: stringMessage});
		});
	});
});
