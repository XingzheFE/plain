(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Plain = factory());
}(this, (function () { 'use strict';

var Plain = (function () {
    function Plain(opt) {
        this.layers = {};
        this.use(opt);
    }
    Plain.prototype.use = function (opt) {
        this.factory = opt.factory;
    };
    Plain.prototype.createMap = function (opt) {
    };
    Plain.prototype.createMarker = function (opt) {
    };
    Plain.prototype.createPolyline = function (opt) {
    };
    return Plain;
}());

return Plain;

})));
//# sourceMappingURL=plain.js.map
