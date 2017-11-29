describe('#History()', function () {

  var pubnub5 = new PubNubAngular();

  pubnub5.init(config.demoWithHistoryRetention);
  pubnub5.getInstance('another').init(config.demoWithHistoryRetention);

  pubnub5.subscribe({channels: [config.channelWithHistory, config.channelWithHistory], triggerEvents: true, withPresence: true, autoload: 100});

	before(function (done) {
		for (var i = 1; i <= 100; i++) {
		  pubnub5.publish({ channel: config.channelWithHistory, message: Date.now() });
    }
    done();
	});

  this.timeout(30000);

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
        expect(r.messages).to.have.length(10);
        done();
      });
    });
  });

  describe('Autoload', function () {
    it('Should be to recovery history messages from a channel', function (done){
      var stack = pubnub5.getMessage(config.channelWithHistory, function(){
        expect(stack).to.have.length(100);
        done();
      });
    });

    it('Should be to recovery history message from a set of channels', function (done){
      var stack = pubnub5.getMessage([config.channelWithHistory, config.channelWithHistory], function(){
        expect(stack).to.have.length(200);
        done();
      }, 200);
    });
  });
});
