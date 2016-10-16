describe('"#subscribe()', function () {

    var pubnubService = undefined;
    var channelName = undefined;
    var stringMessage = "hey";

    beforeEach(function(){

        pubnubService = new window.pubnub.angular2Service();

        pubnubService.init(config.demo);

        channelName = getRandomChannel();
    });

    this.timeout(10000);

    describe("success and connect callback", function(){

        it("should be invoked", function(done){

            pubnubService.addListener({
                message: function(m){

                    expect(m.message).to.be.equal(stringMessage);
                    expect(m.channel).to.be.equal(channelName);
                    done();
                }
            });

            pubnubService.subscribe({channels: [channelName]});

            pubnubService.publish({channel: channelName, message: stringMessage});
        })
    });
});