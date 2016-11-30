describe('#History()', function () {

	var pubnub5 = new window.PubNubAngular();

	pubnub5.init(config.demoWithHistoryRetention);

	this.timeout(20000);

	describe('Get messages from a channel with history', function () {
		it('Get messages ', function (done) {

			var t = pubnub5.history({
				channel : config.channelWithHistory,
				reverse : false
			});

			t.then(function(r){
				expect(r.messages).to.have.length(100);
				done();
			});
		});

		it('Get the last 10 messages', function (done) {

			var t = pubnub5.history({
				channel : config.channelWithHistory,
				count: 10,
				reverse : false
			});

			t.then(function(r){
				expect(r.messages).to.not.length(0);
				done();
			});
		});
	});
});
