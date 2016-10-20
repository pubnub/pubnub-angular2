describe('#subscribe()', function () {

    var pubnubService = undefined;
    var channelName = undefined;
    var stringMessage = 'hey';

    pubnubService = new window.pubnub.angular2Service();

    pubnubService.init(config.demo);

    beforeEach(function () {

        channelName = getRandomChannel();
    });

    afterEach(function () {

        pubnubService.unsubscribe({channels: [channelName]});
    });

    this.timeout(20000);

    describe('success and connect callback', function () {

        it('should be invoked', function (done) {

            pubnubService.addListener({
                message: function (m) {

                    expect(m.message).to.be.equal(stringMessage);
                    expect(m.channel).to.be.equal(channelName);
                    done();

                }
            });

            pubnubService.subscribe({channels: [channelName]});

            pubnubService.publish({channel: channelName, message: stringMessage});
        });
    });

    describe('presence callback', function () {

        it('should be invoked', function (done) {

            var uuid = 'blah';

            pubnubService.getInstance('another').init(config.demo);

            pubnubService.getInstance('another').setUUID(uuid);

            pubnubService.getInstance('another').addListener({
                presence: function (p) {

                    expect(p.uuid).to.be.equal(uuid);
                    done();
                }
            });

            pubnubService.getInstance('another').subscribe({channels: [channelName], withPresence: true});
        });

    });

    describe('Message callback', function () {

        it('The message callback should be invoked as usual', function (done) {

            pubnubService.addListener({
                message: function (m) {

                    expect(m.message).to.be.equal(stringMessage);
                    done();
                }
            });

            pubnubService.subscribe({'channels': [channelName]});

            pubnubService.publish({channel: channelName, message: stringMessage});
        });
    });
});