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
					expect(st.category).to.be.equal('PNConnectedCategory');
					expect(st.operation).to.be.equal('PNSubscribeOperation');
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

			listener = {
				status: function (st) {
					expect(st.error).to.be.equal(false);
					expect(st.operation).to.be.equal('PNUnsubscribeOperation');
					done();
				}
			};

			pubnub.addListener(listener);
			pubnub.unsubscribe({channels: [channelTest]});
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

	describe('All specification', function() {
		it('hereNow', function (done) {
			pubnub.hereNow({
				channels: ['ch1'],
				channelGroups : ['cg1'],
				includeUUIDs: true,
				includeState: true
			}).then(function (response) {
					expect(response.totalChannels).to.be.equal(0);
					done();
				}).catch(function(err){
					done();
			});
		});

		it('whereNow', function (done) {
			pubnub.whereNow({
					uuid: "blah"
			}).then(function (response) {
				done();
			}).catch(function (error) {
				done();
			});
		});

		it('grant', function (done) {
			var t = pubnub.grant({
				channels: [channelName],
				ttl: 5,
				read: true,
				write: true
			});

			t.then(function (status) {
				done();
			}).catch(function (error) {
				done();
			});
		});

		it('setState', function (done) {
			var objState = {company: 'PubNub', stars: 5};

			pubnub.setState({state: objState, channels: [channelName]}).then(function(response){
				expect(objState.company).to.be.equal(response.state.company);
				expect(objState.stars).to.be.equal(response.state.stars);
				done();
			}).catch(function(){
				done();
			});
		});

		it('getState', function (done) {
			pubnub.getState({channels: [channelName]}).then(function(response) {
				expect(response.channels[channelName]).to.not.equal(undefined);
				done();
			}).catch(function() {
				done();
			});
		});

		it('time', function (done) {
			pubnub.time(function(status){
				expect(status.statusCode).to.be.equal(200);
				done();
			});
		});

		it('push', function (done) {
			pubnub.push.addChannels(
				{
					channels: ['a', 'b'],
					device: 'niceDevice',
					pushGateway: 'apns'
				},
				function(status) {
					if (status.error) {
						done();
					} else {
						done();
					}
				}
			);
		});

		it('fire', function (done) {
			pubnub.fire(
				{
					message: 'hello',
					channel: channelName
				},
				function (status, response) {
					if (status) {
						done();
					} else {
						done();
					}
				}
			);
		});
	});
});
