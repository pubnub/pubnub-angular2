/* global window */
// import config from '../config.json';
// import Wrapper from './wrapper';
// import core from '@angular/core';

"use strict";
/* global window */
var config = require("../config.json");
var Wrapper = require("./wrapper");
var core = require('@angular/core');

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};

var __metadata = (this && this.__metadata) || function (k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};


var PubNubAngular = (function () {
	function PubNubAngular() {
		if (typeof PubNub === 'undefined' || PubNub === null) {
			throw new Error('PubNub is not in global scope. Ensure that pubnub.js v4 library is included before the angular adapter');
		}
		this.wrappers = {};
	}
	/**
	 * Initializer for default instance
	 *
	 * @param {Object} initConfig
	 */
	PubNubAngular.prototype.init = function (initConfig) {
		var instance = this.getInstance(config.default_instance_name);
		instance.init(initConfig);
		return instance;
	};
	/**
	 * Instance getter
	 *
	 * @param instanceName
	 * @returns {Wrapper}
	 */
	PubNubAngular.prototype.getInstance = function (instanceName) {
		var _this = this;
		var instance = this.wrappers[instanceName];
		if (instance && instance instanceof Wrapper) {
			return instance;
		}
		else if (typeof instanceName === 'string' && instanceName.length > 0) {
			this.wrappers[instanceName] = new Wrapper(instanceName, this);
			config.attributes_to_delegate.forEach(function (attribute) {
				_this.wrappers[instanceName].wrapAttribute(attribute);
				if (!_this[attribute]) {
					Object.defineProperty(_this, attribute, {
						get: function () {
							return this.getInstance(config.default_instance_name)[attribute];
						}
					});
				}
			});
			config.methods_to_delegate.forEach(function (method) {
				_this.wrappers[instanceName].wrapMethod(method);
				if (!_this[method]) {
					_this[method] = function (args) {
						return this.getInstance(config.default_instance_name)[method](args);
					};
				}
			});
			return this.wrappers[instanceName];
		}
		return instance;
	};
	/**
	 * Subscribe method wrapped for default instance
	 *
	 * @param {object} args
	 */
	PubNubAngular.prototype.subscribe = function (args) {
		this.getInstance(config.default_instance_name).subscribe(args);
	};
	/**
	 * Unsubscribe method wrapped for default instance
	 *
	 * @param {object} args
	 */
	PubNubAngular.prototype.unsubscribe = function (args) {
		this.getInstance(config.default_instance_name).unsubscribe(args);
	};
	/**
	 * GetMessage method wrapped for default instance
	 *
	 * @param {string|[string]} channel
	 * @param callback
	 * @returns [object] array
	 */
	PubNubAngular.prototype.getMessage = function (channel, callback) {
		return this.getInstance(config.default_instance_name).getMessage(channel, callback);
	};
	/**
	 * GetPresence method wrapped for default instance
	 *
	 * @param {string|[string]} channel
	 * @param callback
	 */
	PubNubAngular.prototype.getPresence = function (channel, callback) {
		this.getInstance(config.default_instance_name).getPresence(channel, callback);
	};
	/**
	 * GetStatus method wrapped for default instance
	 *
	 * @param {string|[string]} channel
	 * @param callback
	 */
	PubNubAngular.prototype.getStatus = function (channel, callback) {
		this.getInstance(config.default_instance_name).getStatus(channel, callback);
	};
	/**
	 * GetError method wrapped for default instance
	 *
	 * @param callback
	 */
	PubNubAngular.prototype.getError = function (callback) {
		this.getInstance(config.default_instance_name).getError(callback);
	};
	/**
	 * Clean Method wrapped for default instance
	 *
	 * @param {string|[string]} channel
	 */
	PubNubAngular.prototype.clean = function (channel) {
		this.getInstance(config.default_instance_name).clean(channel);
	};

	PubNubAngular = __decorate([
		core.Injectable(),
		__metadata('design:paramtypes', [])
	], PubNubAngular);

	return PubNubAngular;
}());

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PubNubAngular;

// export default class PubNubAngular {
//   constructor() {
//     if (typeof PubNub === 'undefined' || PubNub === null) {
//       throw new Error('PubNub is not in global scope. Ensure that pubnub.js v4 library is included before the angular adapter');
//     }
//
//     this.wrappers = {};
//   }
//
//   /**
//    * Initializer for default instance
//    *
//    * @param {Object} initConfig
//    */
//   init(initConfig) {
//
//     let instance = this.getInstance(config.default_instance_name);
//
//     instance.init(initConfig);
//
//     return instance;
//   }
//
//   /**
//    * Instance getter
//    *
//    * @param instanceName
//    * @returns {Wrapper}
//    */
//   getInstance(instanceName) {
//     let instance = this.wrappers[instanceName];
//
//     if (instance && instance instanceof Wrapper) {
//       return instance;
//     } else if (typeof instanceName === 'string' && instanceName.length > 0) {
//       this.wrappers[instanceName] = new Wrapper(instanceName, this);
//
//       config.attributes_to_delegate.forEach((attribute) => {
//         this.wrappers[instanceName].wrapAttribute(attribute);
//
//         if (!this[attribute]) {
//           Object.defineProperty(this, attribute, {
//             get: function () {
//               return this.getInstance(config.default_instance_name)[attribute];
//             }
//           });
//         }
//       });
//
//       config.methods_to_delegate.forEach((method) => {
//         this.wrappers[instanceName].wrapMethod(method);
//
//         if (!this[method]) {
//           this[method] = function (args) {
//             return this.getInstance(config.default_instance_name)[method](args);
//           };
//         }
//       });
//
//       return this.wrappers[instanceName];
//     }
//
//     return instance;
//   }
//
//   /**
//    * Subscribe method wrapped for default instance
//    *
//    * @param {object} args
//    */
//   subscribe(args) {
//     this.getInstance(config.default_instance_name).subscribe(args);
//   }
//
//   /**
//    * Unsubscribe method wrapped for default instance
//    *
//    * @param {object} args
//    */
//   unsubscribe(args) {
//     this.getInstance(config.default_instance_name).unsubscribe(args);
//   }
//
//   /**
//    * GetMessage method wrapped for default instance
//    *
//    * @param {string|[string]} channel
//    * @param callback
//    * @returns [object] array
//    */
//   getMessage(channel, callback) {
//     return this.getInstance(config.default_instance_name).getMessage(channel, callback);
//   }
//
//   /**
//    * GetPresence method wrapped for default instance
//    *
//    * @param {string|[string]} channel
//    * @param callback
//    */
//   getPresence(channel, callback) {
//     this.getInstance(config.default_instance_name).getPresence(channel, callback);
//   }
//
//   /**
//    * GetStatus method wrapped for default instance
//    *
//    * @param {string|[string]} channel
//    * @param callback
//    */
//   getStatus(channel, callback) {
//     this.getInstance(config.default_instance_name).getStatus(channel, callback);
//   }
//
//   /**
//    * GetError method wrapped for default instance
//    *
//    * @param callback
//    */
//   getError(callback) {
//     this.getInstance(config.default_instance_name).getError(callback);
//   }
//
//   /**
//    * Clean Method wrapped for default instance
//    *
//    * @param {string|[string]} channel
//    */
//   clean(channel) {
//     this.getInstance(config.default_instance_name).clean(channel);
//   }
// }