describe('#Allocate messages in arrays of output()', function () {

  var pubnub4 = new PubNubAngular();

  var channelName1 = getRandomChannel();
  var channelName2 = getRandomChannel();
  var channelName3 = getRandomChannel();
	var channelName4 = getRandomChannel();
	var channelName5 = getRandomChannel();
  var stringMessage = 'hey ';

  pubnub4.init(config.demo);

  pubnub4.subscribe({channels: [channelName1], triggerEvents: true, withPresence: true});
  pubnub4.subscribe({channels: [channelName1, channelName2], triggerEvents: true, withPresence: true});
  pubnub4.subscribe({channels: [channelName1, channelName3, channelName4], triggerEvents: true, withPresence: true});
	pubnub4.subscribe({channels: [channelName5], triggerEvents: true});

  var result1 = pubnub4.getMessage(channelName1);
  var result2 = undefined;

  describe('Get the stack of message with length equal to 1', function () {
    var newStringMessege = stringMessage + '1';

    it('Should be triggered', function (done) {
      pubnub4.getMessage(channelName1, function (m) {
        expect(m).to.not.equal(null);
        expect(result1).to.have.length(1);
        expect(m.message).to.be.equal(newStringMessege);
        done();
      });

      pubnub4.publish({channel: channelName1, message: newStringMessege});
    });
  });

  describe('Get the stack of message with length equal to 2', function () {
    it('Should be triggered', function (done) {
      var newStringMessege = stringMessage + '2';

      pubnub4.getMessage(channelName1, function (m) {
        expect(m).to.not.equal(null);
        expect(result1).to.have.length(2);
        expect(m.message).to.be.equal(newStringMessege);
        done();
      });

      pubnub4.publish({channel: channelName1, message: newStringMessege});
    });
  });

  describe('Get the stack of message with length equal to 3', function () {
    it('Should be triggered', function (done) {
      var newStringMessege = stringMessage + '3';

      pubnub4.getMessage(channelName1, function (m) {
        expect(m).to.not.equal(null);
        expect(result1).to.have.length(3);
        expect(m.message).to.be.equal(newStringMessege);
        done();
      });

      pubnub4.publish({channel: channelName1, message: newStringMessege});
    });
  });

  describe('Get a message to be allocated in an array of a set of channels and a single channel', function () {
    it('Should be triggered', function (done) {
      result2 = pubnub4.getMessage([channelName1, channelName2]);

      var newStringMessege = stringMessage + '4';

      pubnub4.getMessage([channelName1, channelName2], function (m) {
        expect(m).to.not.equal(null);
        expect(result1).to.have.length(3);
        expect(result2).to.have.length(1);
        done();
      });

      pubnub4.publish({channel: channelName1, message: newStringMessege});
    });
  });

  describe('Receive a message from the callback equal to the message pushed in an array', function () {
    it('Should be triggered', function(done) {
      var result3 = pubnub4.getMessage([channelName1, channelName3]);

      var newStringMessege = stringMessage + '5';

      pubnub4.getMessage([channelName1, channelName3], function (m) {
        expect(result1).to.have.length(3);
        expect(result2).to.have.length(1);
        expect(result3).to.have.length(1);
        done();
      });

      pubnub4.publish({channel: channelName1, message: newStringMessege});
    });
  });

  describe('Clean stack of messages', function (){
    it('For a channel', function(done) {
      var stack = pubnub4.getMessage(channelName3);

      pubnub4.clean(channelName3);

      expect(stack).to.have.length(0);
      done();
    });

    it('For a set of channels', function (done) {
      var stack = pubnub4.getMessage([channelName1, channelName2]);
      var stack1 = pubnub4.getMessage(channelName1);
      var stack2 = pubnub4.getMessage(channelName2);

      pubnub4.clean([channelName1, channelName2]);

      expect(stack).to.have.length(0);
      expect(stack1).to.have.length(3);
      expect(stack2).to.have.length(0);
      done();
    });

    it('For a channel does not register', function (done) {
      pubnub4.clean(getRandomChannel());
      done();
    });
  });

  describe('Release stack of messages', function (){
    it('Should be release a channel', function (done) {
			var newStringMessege = stringMessage + '4';

			var stack3 = pubnub4.getMessage(channelName4, function (m) {
			  pubnub4.release(channelName4);
				expect(stack3).to.have.length(0);
				done();
			});

			pubnub4.publish({channel: channelName4, message: newStringMessege});
    });

		it('Should be release a set of channels', function (done) {
			var newStringMessege = stringMessage + '4';

			var stack4 = pubnub4.getMessage([channelName1, channelName4], function (m) {
				pubnub4.release([channelName1, channelName4]);
				expect(stack4).to.have.length(0);
				done();
			});

			pubnub4.publish({channel: channelName4, message: newStringMessege});
		});
  });

  describe('Trim stack of messages', function () {
    it('should be keep the last 3 messages received', function(done) {
			var counter = 0;

			var result = pubnub4.getMessage(channelName5, function (m) {
				counter += 1;
				if (counter === 4) {
					expect(result).to.have.length(3);
					done();
				}
			}, 3);

			for (var i = 1; i <= 4; i++) {
				pubnub4.publish({ channel: channelName5, message: ('message ' + i )});
			}
    }).timeout(7000);
  });

  describe('Unsubscribe', function (){
    it('Should be triggered', function (done) {
      var stack = pubnub4.getMessage([channelName1, channelName3]);

      pubnub4.unsubscribe([channelName1, channelName3]);

      expect(stack).to.have.length(0);
      done();
    });
  });
});