# pubnub-angular2

![SDK Logo](http://cl.ly/241N0q2P2q22/Screen%20Shot%202016-02-03%20at%205.32.32%20PM.png)

Welcome! We're here to get you started quickly with your
integration between PubNub and Angular2. PubNub makes it
easy to integrate real-time bidirectional communication
into your app.

**Pubnub Angular2** service is a wrapper for **PubNub JavaScript SDK** [version 4](https://www.pubnub.com/docs/javascript/pubnub-javascript-sdk-v4) 
that adds a few of extra features to simplify Angular integrations:

You can still use the native PubNub JavaScript SDK if you feel this will be
more suitable for your situation.

## Communication
- If you **need help** or have a **general question**, contact <support@pubnub.com>
- If you **want to contribute**, please open a pull request against the `develop` branch.

## Integrating PubNub Angular SDK into Your App

Your HTML page will include 2 key libraries:

* PubNub JavaScript SDK V4
* PubNub JavaScript SDK Angular2 Service

```bower install --save pubnub```

Or using CDNs:

```html

```

Also available as minified:

```html

```

To utilize this wrapper, include the scripts in the following order:
```html
  <script src="https://unpkg.com/core-js/client/shim.min.js"></script>
  <script src="https://unpkg.com/zone.js@0.6.25?main=browser"></script>
  <script src="https://unpkg.com/reflect-metadata@0.1.3"></script>
  <script src="https://unpkg.com/rxjs@5.0.0-beta.12/bundles/Rx.js"></script>
  <script src="https://unpkg.com/@angular/core/bundles/core.umd.js"></script>
  <script src="https://unpkg.com/@angular/common/bundles/common.umd.js"></script>
  <script src="https://unpkg.com/@angular/compiler/bundles/compiler.umd.js"></script>
  <script src="https://unpkg.com/@angular/platform-browser/bundles/platform-browser.umd.js"></script>
  <script src="https://unpkg.com/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js"></script>
  <script src="(latest version of PubNub JS SDK from https://github.com/pubnub/javascript)"></script>
  <script src="(pubnub-angular2.js)"></script>
```

You have to register `pubnub.angular2Service` inside `providers` property either in yours ngModule or
ngComponent, this is going to depend on how far do you want to get your Pubnub instance.

This will make sure that the Pubnub object is available to get injected into your ngComponents,
Pubnub is going to be defined inside your ngModule.

```javascript

your_module.js

(function (app) {

    var pubnub = new window.Pubnub();
    
    pubnub.init({
        publish_key: 'your pub key',
        subscribe_key: 'your sub key'
    });

    app.your_module = ng.core.NgModule({

        imports: [...],
        declarations: [...],
        providers: [pubnubService],
        bootstrap: [...]

    }).Class({

        constructor: function(){}

    });

    document.addEventListener('DOMContentLoaded', function(){

        ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(app.your_module);
    });

})(window.app || (window.app = {}));
```

## Differences in usage with native JavaScript SDK 

In **Pubnub Angular2 SDK** instances are hidden inside service and are accessible via instance getter.


### Creating a default instance

<table>
<tr><td></td>
    <td>PubNub Angular2 SDK with JS <b>V4</b></td>
	 <td>PubNub Angular2 SDK with JS <b>V3</b></td>
</tr>
<tr>
	<td>Javascript SDK</td>
	<td>
	<pre><code>
	var defaultInstance = new PubNub({
        publishKey: 'your pub key',
        subscribeKey: 'your sub key'
        });
    </code></pre>
	</td>
	<td>
	<pre><code>
	var defaultInstance = PUBNUB.init({
	    publish_key: 'your pub key',
	    subscribe_key: 'your sub key'
	    });
    </code></pre>
	</td>
</tr>
<tr>
	<td>PubNub Angular2 SDK</td>
	<td>
    <pre><code>
    var pubnub = new window.Pubnub();
    </code></pre>
    <pre><code>
    pubnub.init({
    publishKey: 'your pub key',
    subscribeKey: 'your sub key'
    });
    </code></pre>
	</td>
	<td>
    <pre><code>
    var pubnub = new window.Pubnub();
    </code></pre>
    <pre><code>
    pubnub.init({
    publishKey: 'your pub key',
    subscribeKey: 'your sub key'
    });
    </code></pre>
	</td>
</tr>
</table>

### Creating an other instance

In most use cases, usage of the default PubNub instance will be sufficient, but if multiple instances with
different credentials are needed, the ```Pubnub.getInstance(instanceName)``` getter needs to be utilized.

<table>
<tr><td></td>
    <td>PubNub Angular2 SDK with JS <b>V4</b></td>
	 <td>PubNub Angular2 SDK with JS <b>V3</b></td>
</tr>
<tr>
	<td>PubNub Angular2 SDK</td>
	<td>
	<pre><code>
	var pubnub = new window.Pubnub();
    </code></pre>
	<pre><code>
	pubnub.getInstance("another").init({
	publishKey: 'your pub key',
	subscribeKey: 'your sub key'});
	</code></pre>
	</td>
	<td>
	<pre><code>
    var pubnub = new window.Pubnub();
    </code></pre>
	<pre><code>
	pubnub.getInstance("another").init({
	publish_key: 'your pub key',
	subscribe_key: 'your sub key'});
	</code></pre>
	</td>
</tr>
</table>

## Accessing methods

All methods of the Native Javascript SDKs are wrapped within the **Pubnub Angular2 Service**.

- Methods of default instance are mapped directly to PubNub service like ```Pubnub.publish({...})```.
- Methods of the other instances are available via the instance getter like ```Pubnub.getInstance(instanceName).publish()```.

To learn about PubNub JavaScript features and methods available refer to the API Reference of the Javascript SDK that you are using:

* [JavaScript V4 API Reference](https://www.pubnub.com/docs/javascript/api-reference-sdk-v4)
* [JavaScript V3 API Reference](https://https://www.pubnub.com/docs/web-javascript/api-reference)

**Examples:**

<table>
<tr><td></td>
    <td>PubNub Angular2 SDK with JS <b>V4</b></td>
	 <td>PubNub Angular2 SDK with JS <b>V3</b></td>
</tr>
<tr>
	<td>With the default instance</td>
	</td>
	<td><pre><code>pubnub.publish({
    channel: 'myChannel',
    message: 'Hello!'
  }, function(status, response){
       console.log(response);
});</code></pre>
	</td>
	</td>
	<td><pre><code>pubnub.publish({
    channel: 'myChannel',
    message: 'Hello!',
    callback: function (m) {console.log(m);},
    error: function (err) {console.log(err);}
});</code></pre>
	</td>
</tr>
<tr>
	<td>With an other instance</td>
</td>
	<td><pre><code>pubnub.getInstance("another").publish({
    channel: 'myChannel',
    message: 'Hello!'
  }, function(status, response){
       console.log(response);
});</code></pre>
	</td>
	</td>
	<td><pre><code>
	pubnub.getInstance("another").publish({
    channel: 'myChannel',
    message: 'Hello!',
    callback: function (m) {console.log(m);}
});</code></pre>
	</td>
</tr>
</table>

That's it - you're ready to start using the Angular2 PubNub SDK!

## Events



### Triggering and listening to events for the subscribe method


**Listening to a message event of a specific channel or channel group:**


**Listening to a presence event of a specific channel or channel group:**


**Listening to the global status events:**