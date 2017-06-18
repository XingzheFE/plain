(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Plain = factory());
}(this, (function () { 'use strict';

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var Plain = (function () {
    function Plain(factory) {
        this.use(factory);
    }
    Plain.prototype.use = function (factory) {
        this.factory = factory;
        return this;
    };
    Plain.prototype.Map = function (opt) {
        return this.factory.Map(opt);
    };
    Plain.prototype.Marker = function (opt) {
        return this.factory.Marker(opt);
    };
    Plain.prototype.Polyline = function (opt) {
        var polyline = this.factory.Polyline(opt);
        return this.factory.Polyline(opt);
    };
    Plain.prototype.tag = function (module) {
        module._id = Math.random().toString(16).substr(2);
        return module;
    };
    __decorate([
        tagging()
    ], Plain.prototype, "Map", null);
    __decorate([
        tagging()
    ], Plain.prototype, "Marker", null);
    __decorate([
        tagging()
    ], Plain.prototype, "Polyline", null);
    return Plain;
}());
function tagging() {
    return function (target, propertyKey, descriptor) {
        var oldFn = descriptor.value;
        descriptor.value = function (arg) {
            var value = oldFn.call(this, arg);
            value._id = Math.random().toString(16).substr(2);
            return value;
        };
    };
}

return Plain;

})));
//# sourceMappingURL=plain.js.map
