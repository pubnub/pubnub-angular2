describe('#subscribe()', function () {

    var pubnub = new window.Pubnub();
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

    describe('success and connect callback', function () {

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

    describe('presence callback', function () {

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

            pubnub.subscribe({'channels': [channelName]});

            pubnub.publish({channel: channelName, message: stringMessage});
        });
    });
});