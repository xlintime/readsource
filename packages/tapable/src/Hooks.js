const call_delegate = (...args) => {
  this.call = this._createCall('sync');
  return this.call(...args);
}

const call_async_delegate = (...args) => { 
  this.callAsync = this._createCall('async');
  return this.callAsync(...args);
}

const promise_delegate = (...args) => { 
  this.promise = this._createCall('promise');
  return this.promise(...args); 
}

class Hook{
  constructor(args = [], name = undefined) {
    this._args = args;
    this.name = name;
    this.tap = [];
    this.interceptors = [];
    this._call = call_delegate;
    this.call = call_delegate
    this.callAsync = call_async_delegate;
    this._callAsync = call_async_delegate;
    this._promise = promise_delegate;
    this.promise = promise_delegate;

    this._x = undefined;
    
    this.compile = this.compile;
    this.tap = this.tap;
    this.tapAsync = this.tapAsync;
    this.tapPromise = this.tapPromise;

  }
  compile(options) { 
    throw new Error("Abstract method ")
  }

  _createCall(type) {
    return this.compile({
      taps: this.taps,
      interceptors: this.interceptors,
      args: this._args,
      type:type
    })
  }

  _tap(type, options, fn) {
    options = Object.assign({ type, fn }, options);
    options = this._runRegisterInterceptor(options);
    this._insert(options)
  }

  tap(options, fn) {
    this._tap("sync",options,fn);
  }

  tapAsync(options, fn) {
    this._tap('async',options,fn);
  }

  tapPromise(options, fn) {
    this._tap('promise',options,fn)
  }

}