var _this = this;
var CALL_DELEGATE = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    _this.call = _this._createCall('sync');
    return _this.call.apply(_this, args);
};
var CALL_ASYNC_DELEGATE = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    _this.call = _this._createCall('async');
    return _this.call.apply(_this, args);
};
var PROMISE_DELEGATE = function (args) {
    _this.call = _this._createCall('promise');
    return _this.promise.apply(_this, args);
};
var Hook = /** @class */ (function () {
    function Hook(args, name) {
        if (name === void 0) { name = undefined; }
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
    return Hook;
}());
export {};
