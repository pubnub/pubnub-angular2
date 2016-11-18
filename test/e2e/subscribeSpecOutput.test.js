describe('#Output of messages()', function () {

	var pubnub4 = new window.PubNubAngular();

	var channelName1 = getRandomChannel();
	var stringMessage = 'hey ';

	pubnub4.init(config.demo);

	pubnub4.subscribe({channels: [channelName1], triggerEvents: true, withPresence: true});

	var result = pubnub4.getMessage(channelName1);

	before(function () {

	});

	after(function () {
		pubnub4.unsubscribe({channels: [channelName1]});
	});

	describe('Gets length equal 1', function () {
		var newStringMessege = stringMessage + '1';

		it('Should be triggered', function (done) {
			pubnub4.getMessage(channelName1, function (m) {
				expect(m).to.not.equal(null);
				expect(result).to.have.length(1);
				expect(m.message).to.be.equal(newStringMessege);
				done();
			});

			pubnub4.publish({channel: channelName1, message: newStringMessege});
		});
	});

	describe('Gets length equal 2', function () {
		it('Should be triggered', function (done) {
			var newStringMessege = stringMessage + '2';

			pubnub4.getMessage(channelName1, function (m) {
				expect(m).to.not.equal(null);
				expect(result).to.have.length(2);
				expect(m.message).to.be.equal(newStringMessege);
				done();
			});

			pubnub4.publish({channel: channelName1, message: newStringMessege});
		});
	});

	describe('Gets length equal 3', function () {
		it('Should be triggered', function (done) {
			var newStringMessege = stringMessage + '3';

			pubnub4.getMessage(channelName1, function (m) {
				expect(m).to.not.equal(null);
				expect(result).to.have.length(3);
				expect(m.message).to.be.equal(newStringMessege);
				done();
			});

			pubnub4.publish({channel: channelName1, message: newStringMessege});
		});
	});
});