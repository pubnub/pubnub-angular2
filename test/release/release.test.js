/* global describe, it, __dirname */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const packageJSON = require('../../package.json');
const bowerJSON = require('../../bower.json');

describe('release should be consistent', () => {

  it('with bower valid entry point', () => {
    assert.equal(bowerJSON.main, 'dist/pubnub-angular2.min.js');
  });

  it('with npm valid entry point', () => {
    assert.equal(packageJSON.main, 'dist/pubnub-angular2.min.js');
  });

  it('with packaged dist files', () => {
    const fileList = fs.readdirSync(path.resolve(__dirname, '../../dist'));
    assert.deepEqual(fileList, [
      'pubnub-angular2.js',
      'pubnub-angular2.min.js',
    ]);
  });
});
