var testBed = ng.core.testing.TestBed;
var browser = ng.platformBrowserDynamic.testing;

testBed.initTestEnvironment(browser.BrowserDynamicTestingModule, browser.platformBrowserDynamicTesting());

describe('#Injection Test', function () {
	it('Get instance for first time', function(done){
		testBed.configureTestingModule({ providers: [PubNubAngular] });

		var instance = testBed.get(PubNubAngular);

		instance.init({
			publishKey: 'ds',
			subscribeKey: 'ds'
		});

		expect(instance).to.be.an.instanceOf(PubNubAngular);
		done();
	});

	it('Get the same instance after second request', function(done){
		testBed.configureTestingModule({ providers: [PubNubAngular] });
		var instance = testBed.get(PubNubAngular);

		instance.init({
			publishKey: 'ds',
			subscribeKey: 'ds'
		});

		var sameInstance = testBed.get(PubNubAngular);

		expect(sameInstance).to.be.equal(instance);
		done();
	});
});