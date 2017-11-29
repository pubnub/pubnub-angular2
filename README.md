# pubnub-angular2

![SDK Logo](http://cl.ly/241N0q2P2q22/Screen%20Shot%202016-02-03%20at%205.32.32%20PM.png)

[![Build Status](https://travis-ci.org/pubnub/pubnub-angular2.svg?branch=master)](https://travis-ci.org/pubnub/pubnub-angular2)
[![Codecov](https://img.shields.io/codecov/c/github/pubnub/pubnub-angular2.svg)](https://codecov.io/github/pubnub/pubnub-angular2?branch=master)
[![npm](https://img.shields.io/npm/v/pubnub-angular2.svg)](https://www.npmjs.com/package/pubnub-angular2)
![Bower](https://img.shields.io/bower/v/pubnub-angular2.svg)

Welcome! We're here to get you started quickly with your
integration between PubNub and Angular v2 and Angular v4. PubNub makes it
easy to integrate real-time bidirectional communication
into your app.

**Pubnub Angular2** service is a wrapper for **PubNub JavaScript SDK** [version 4](https://www.pubnub.com/docs/javascript/pubnub-javascript-sdk-v4)
that adds a few of extra features to simplify Angular integrations:

You can still use the native PubNub JavaScript SDK if you feel this will be
more suitable for your situation.

## Communication
- If you **need help** or have a **general question**, contact <support@pubnub.com>
- If you **want to contribute**, please open a pull request against the `develop` branch.

## How to use PubNubAngular for Angular4

NPM
```shell
npm install pubnub-angular2 --save
```

Add PubNubAngular to list of providers inside the NgModule.

***TypeScript***
```typescript
import { PubNubAngular } from 'pubnub-angular2';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ ... ],
  bootstrap:    [ ... ],
  providers: [ PubNubAngular ]
})
export class AppModule { }
```

Now PubNubAngular is a service available for all components defined in the NgModule.

***TypeScript***
```typescript
import { PubNubAngular } from 'pubnub-angular2';
import { Component, Injectable, Class } from '@angular/core';

@Component({
  selector: 'my-app',
  template: '<div>...</div>',
})

export class AppComponent  {
  constructor(pubnub: PubNubAngular){

    pubnub.init({ publishKey: 'your pub key', subscribeKey: 'your sub key' });
  }
}
```

## How to use PubNubAngular for Angular2

NPM
```shell
npm install pubnub pubnub-angular2 --save
```

Bower
```shell
bower install pubnub pubnub-angular2 --save
```

CDN
```html
<script src="http(s)://cdn.pubnub.com/sdk/pubnub-angular2/pubnub-angular2.(version).js"></script>
<script src="http(s)://cdn.pubnub.com/sdk/pubnub-angular2/pubnub-angular2.(version).min.js"></script>
```

### For environments Javascript follow these steps

1. Include global dependencies for Angular2

```html
<script src="node_modules/core-js/client/shim.min.js"></script>
<script src="node_modules/zone.js/dist/zone.js"></script>
<script src="node_modules/reflect-metadata/Reflect.js"></script>
<script src="node_modules/rxjs/bundles/Rx.js"></script>
```

2. Include Angular2

```html
<script src="node_modules/@angular/core/bundles/core.umd.js"></script>
<script src="node_modules/@angular/common/bundles/common.umd.js"></script>
<script src="node_modules/@angular/compiler/bundles/compiler.umd.js"></script>
<script src="node_modules/@angular/platform-browser/bundles/platform-browser.umd.js"></script>
<script src="node_modules/@angular/forms/bundles/forms.umd.js"></script>
<script src="node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js"></script>
```

3. Include the lastest version of PubNub's Javascript SDK

```html
<script src="node_modules/pubnub/dist/web/pubnub-angular2.js"></script>
```

4. Include PubNub's Angular2 SDK

```html
<script src="node_modules/pubnub-angular2/dist/pubnub-angular2.js"></script>
```

Add PubNubAngular to list of providers inside the NgModule.

***Javascript***
```javascript
(function (app) {

    app.your_module = ng.core.NgModule({
        imports: [...],
        declarations: [...],
        providers: [PubNubAngular],
        bootstrap: [...]
    }).Class({
        constructor: function(){}
    });

    document.addEventListener('DOMContentLoaded', function(){
        ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(app.your_module);
    });

})(window.app || (window.app = {}));
```

Now PubNubAngular is a service available for all components defined in the NgModule.

***Javascript***
```javascript
(function (app) {

    app.main_component = ng.core.Component({

        selector: '...',
        templateUrl: '...'

    }).Class({

        constructor: [PubNubAngular, function(pubnub){

            pubnub.init({
                publishKey: 'your pub key',
                subscribeKey: 'your sub key'
            });

            ...
        }]
    });

})(window.app || (window.app = {}));
```

### For environments Typescript follow these steps

1. Include global dependencies for Angular2

```html
<script src="node_modules/core-js/client/shim.min.js"></script>
<script src="node_modules/zone.js/dist/zone.js"></script>
<script src="node_modules/reflect-metadata/Reflect.js"></script>
<script src="node_modules/rxjs/bundles/Rx.js"></script>
```  

2. Include the lastest version of PubNub's Javascript SDK

```html
<script src="node_modules/pubnub/dist/web/pubnub-angular2.js"></script>
```

3. Include and load libraries from systemjs

```
<script src="node_modules/systemjs/dist/system.src.js"></script>
<script src="systemjs.config.js"></script>
<script>
  System.import('app').catch(function(err){ console.error(err); });
</script>
```

4. Your systemjs.config.js will have to include next libraries with the last one key library. Inside the map attribute.

```javascript
map: {
  'rxjs': 'npm:rxjs',
  '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
  '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
  '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
  '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
  '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
  '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
  '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
  '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
  'pubnub-angular2': 'npm:pubnub-angular2/dist/pubnub-angular2.js'
}
```

Add PubNubAngular to list of providers inside the NgModule.

***TypeScript***
```typescript
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PubNubAngular } from 'pubnub-angular2';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ ... ],
  bootstrap:    [ ... ],
  providers: [ PubNubAngular ]
})
export class AppModule { }
```

Now PubNubAngular is a service available for all components defined in the NgModule.

***TypeScript***
```typescript
import {Component, Injectable, Class} from '@angular/core';

@Component({
  selector: 'my-app',
  template: '<div>...</div>',
})

export class AppComponent  {
  constructor(pubnub: PubNubAngular){

    pubnub.init({
      publishKey: 'your pub key',
      subscribeKey: 'your sub key'
    });
  }
}
```

## Differences in usage with native JavaScript SDK

In **Pubnub Angular2 SDK** instances are hidden inside service and are accessible via instance getter.

### Creating a default instance PubNub JS V4

***Javascript***
```javascript
var defaultInstance = new PubNub({
  publishKey: 'your pub key',
  subscribeKey: 'your sub key'
});
```

***TypeScript***
```typescript
declare var PubNub: any;

var defaultInstance = new PubNub({
  publishKey: 'your pub key',
  subscribeKey: 'your sub key'
});
```

### Creating a default instance PubNub Angular 2 SDK

```javascript
var pubnub = new PubNubAngular();

pubnub.init({
  publishKey: 'your pub key',
  subscribeKey: 'your sub key'
});
```

### Creating an other instance

In most use cases, usage of the default PubNub instance will be sufficient, but if multiple instances with
different credentials are needed, the ```pubnub.getInstance(instanceName)``` getter needs to be utilized.

```javascript
var pubnub = new PubNubAngular();

pubnub.getInstance("another").init({
  publishKey: 'your pub key',
  subscribeKey: 'your sub key'
});
```

## Accessing methods

All methods of the Native Javascript SDKs are wrapped within the **Pubnub Angular2 SDK**.

- Methods of default instance are mapped directly to PubNub service like ```pubnub.publish({...})```.
- Methods of the other instances are available via the instance getter like ```pubnub.getInstance(instanceName).publish()```.

To learn about PubNub JavaScript features and methods available refer to the API Reference of the Javascript SDK that you are using:

* [JavaScript V4 API Reference](https://www.pubnub.com/docs/javascript/api-reference-sdk-v4)

**Examples:**

```javascript
pubnub.publish({ channel: 'myChannel', message: 'Hello!' }, (response) => {
  console.log(response);
});
```

With an other instance

```javascript
pubnub.getInstance("another").publish({ channel: 'myChannel', message: 'Hello!' }, (response) => {
  console.log(response);
});
```

That's it - you're ready to start using the Angular2 PubNub SDK!

## Events

Another key feature of this SDK is the ability to trigger method events in addition to passed in callbacks. By default events will not be triggered.

To enable all possible events for certain method, add ```triggerEvents: true``` option to the method arguments.

```javascript
pubnub.subscribe({ channels: ['myChannel1'], triggerEvents: true, withPresence: true });
```

To enable specific triggerEvents, add ```triggerEvents: ['message', 'presence', 'status']```option to the method arguments.

```javascript
pubnub.subscribe({ channels: ['myChannel1'], triggerEvents: ['message', 'status'] });
```

To get that `presence` event works, do not forget to add ```withPresence: true```

### Triggering and listening to events for the subscribe method

For listening trigger events is available `broadcastOn` this allows to intercept events using a callback per channel
or callback per a set of channels.

With Javascript V4, you can trigger 3 different events (message, presence and status)

```javascript
pubnub.subscribe({
  channels  : ['myChannel1', 'myChannel2', 'myChannel3'],
  channelGroups: ['myGroup1', 'myGroup2'],
  withPresence: true,
  triggerEvents: ['message', 'presence', 'status']
});
```

You can also enable all possible events using `triggerEvents: true`

**Listening to a message event of a specific channel or channel group:**

```javascript
pubnub.getMessage('myChannel', (msg) => {
  console.log(msg);
});

pubnub.getMessage('myGroup1', (msg) => {
  console.log(msg);
});
```

**Listening to a message event of a specific set of channels or channel groups:**

```javascript
pubnub.getMessage(['myChannel1', 'myChannel2', 'myGroup1'], (msg) => {
  console.log(msg.message);
  console.log(msg.channel);
});
```

**Listening to a presence event of a specific channel or channel group:**

```javascript
pubnub.getPresence('myChannel', (pse) => {
  console.log(pse);
});

pubnub.getPresence('myGroup1', (pse) => {
  console.log(pse);
});
```

**Listening to a presence event of a specific set of channels or channel groups:**

```javascript
pubnub.getPresence(['myChannel1', 'myChannel2', 'myGroup1'], (pse) => {
  console.log(pse);
  console.log(pse.subscribedChannel);
});
```

**Listening to the global status for a channel or channel group:**

```javascript
pubnub.getStatus('myChannel', (st) => {
  console.log(st);
});

pubnub.getStatus('myGroup1', (st) => {
  console.log(st);
});
```

**Listening to the global status for a specific set of channels or channel group:**

```javascript
pubnub.getStatus(['myChannel1', 'myChannel2', 'myGroup1'], (st) => {
  console.log(st);
});
```

**Catching trigger errors**

```javascript
pubnub.getError((err) => {
  console.log(err);
});
```
**Listening to other instances:**

```javascript
pubnub.getInstance('another').getMessage('myChannel', (msg) => {
  console.log(msg);
});
```

**Unsubscribe a channel:**

```javascript
pubnub.unsubscribe('myChannel1');
```

### How to get the stack of messages or inject it directly in the HTML

The ```getMessage``` method is more than a mechanism for registering a channel, a set of channels or even a channel group
to a callback method that acts like a receptor to receive message by message when it is activated the triggerEvents option
at the moment of subscribing channels.

The stack is going to hold all messages since when you register your channel with ```getMessage``` method.

**Getting stack of messages for each register of channel or channel group:**

```javascript
var myStack1 = pubnub.getMessage('myChannel1', (msg) => {
 console.log(msg);
});
```

```javascript
var myStack1 = pubnub.getMessage('myGroup1', (msg) => {
  console.log(msg);
});
```

**Getting stack of messages without having a callback associated to the channel or channel group:**

```javascript
var myStack1 = pubnub.getMessage('myChannel1');
```

```javascript
var myStack1 = pubnub.getMessage('myGroup1');
```

When you are using getMessage this is going to keep the latest 100 messages received by default. 
But you can change this value when you attach the channel for first time with getMessage.

```javascript
var myStack1 = pubnub.getMessage('myChannel1', (msg) => {
 console.log(msg);
}, 20);
```

```javascript
var myStack1 = pubnub.getMessage('myChannel1', 30);
```

You can also get the stack of messages with the code above in whatever moment after registering the channel. Remember
that you can use this code to associate this to a field in your ngComponent and the stack of messages is going to be
available inside your html.

**Cleaning and releasing the stack of messages:**

You can execute clean to remove all message cached by the instance in run time without affecting the capture of new
incoming messages for the trigger events.

```javascript
pubnub.clean('myChannel1');
```

```javascript
pubnub.clean('myGroup1');
```

```javascript
pubnub.clean(['myChannel1', 'myChannel2']);
```

You can execute release if you want to remove all message cached and stop of capturing new incoming messages for the
trigger events.


```javascript
pubnub.release('myChannel1');
```

```javascript
pubnub.release('myGroup1');
```

```javascript
pubnub.release(['myChannel1', 'myChannel2']);
```

**Getting stack of messages directly in the HTML:**

Inside the HTML that you have defined like a template in your ngComponent, you can inject the ```getMessage``` method
with name of your channel or channel group subscribed.

```html
<ul *ngFor="let item of pubnub.getMessage('myChannel1')">
    <li>{{ item.message }}</li>
</ul>
```
### Channels with history

You can retrieve published messages from archival storage for this requires that [Storage and Playback](http://www.pubnub.com/knowledge-base/discussion/644/how-do-i-enable-add-on-features-for-my-keys) add-on is enabled
for your keys. In order to get more information about this feature - see [History](https://www.pubnub.com/docs/javascript/api-reference-sdk-v4#history).

```javascript
pubnub.history({ channel: 'myChannel1' }).then((response) => {
  console.log(response);
});
```

**Retriving the history from ```getMessage``` method:**

At the moment that you are subscribing a channel you can pass the optional parameter ```autoload``` this value has to
contain a value from 1 to 100 in order to retrieve the last messages published in the channel. When the ```getMessage```
is called this going to retrieve the history.

```javascript
pubnub.subscribe({ channels: ['myChannel1'], triggerEvents: true, withPresence: true, autoload: 100 });

var myStack1 = pubnub.getMessage('myChannel1');
```

Also you can use a callback to know when the retrieving process has finished.

```javascript
var myStack1 = pubnub.getMessage('myChannel1', () => {
  console.log(myStack1);
});
```

