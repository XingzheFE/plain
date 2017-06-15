(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.plain = global.plain || {})));
}(this, (function (exports) { 'use strict';

var P = (function () {
    function P(opt) {
        this.factory = opt;
    }
    return P;
}());

exports.P = P;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=plain.js.map
