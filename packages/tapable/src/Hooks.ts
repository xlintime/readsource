import util from './util';

const CALL_DELEGATE = (...args) => {
  this.call = this._createCall('sync');
  return this.call(...args);
};

const CALL_ASYNC_DELEGATE = (...args) => {
  this.call = this._createCall('async');
  return this.call(...args);
};

const PROMISE_DELEGATE = args => {
  this.call = this._createCall('promise');
  return this.promise(...args);
};

class Hook {
  constructor(args: [], name = undefined) {
    this._args = args;
    this.name = name;
    this.args = args;
    this.interceptors = [];
    this.call = CALL_DELEGATE;
    this._call = CALL_DELEGATE;
    this.callAsync = CALL_ASYNC_DELEGATE;
    this.promise = PROMISE_DELEGATE;
    this._x = undefined;

    this.compile = this.compile;
    this.tap = this.tap;
    this.tapAsync = this.tapAsync;
    this.tapPromise = this.tapPromise;
  }
}
