'use strict';

if (typeof Object.create !== 'function') {
  Object.create = function () {
    var Temp = function Temp() {};
    return function (prototype) {
      if (arguments.length > 1) {
        throw new Error('Second argument not supported');
      }
      if (prototype !== Object(prototype) && prototype !== null) {
        throw new TypeError('Argument must be an object or null');
      }
      if (prototype === null) {
        throw Error('null [[Prototype]] not supported');
      }
      Temp.prototype = prototype;
      var result = new Temp();
      Temp.prototype = null;
      return result;
    };
  }();
}
//# sourceMappingURL=polyfill.js.map
