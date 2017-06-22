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

var Map = (function () {
    function Map(opt) {
        this._original = new BMap.Map();
    }
    Map.prototype.addLayer = function (layer) {
        var layerOrigin = layer._original;
        this._original.addOverlay(layerOrigin);
    };
    Map.prototype.removeLayer = function () {
    };
    Map.prototype.clearLayers = function () {
    };
    Map.prototype.setZoom = function () {
    };
    Map.prototype.getZoom = function () {
    };
    Map.prototype.fitView = function () {
    };
    Map.prototype.setCenter = function () {
    };
    return Map;
}());
var Marker = (function () {
    function Marker(latlng, opt) {
        var options = {};
        this._original = new BMap.Marker();
    }
    Marker.prototype.setLatLng = function (latlng) {
        var p = {
            lat: latlng[0],
            lng: latlng[1]
        };
        this._original.setPosition(p);
        return this;
    };
    Marker.prototype.getLatLng = function () {
        var p = this._original.getPosition();
        return [p.lat, p.lng];
    };
    return Marker;
}());
var Polyline = (function () {
    function Polyline(latlngs, opt) {
        this._original = new BMap.Poyline();
    }
    Polyline.prototype.setPath = function (latlngs) {
        var points = latlngs.map(function (item) {
            return {
                lat: item[0],
                lng: item[1]
            };
        });
        this._original.setPath(points);
    };
    Polyline.prototype.getPath = function () {
        var points = this._original.getPath() || [];
        return points.map(function (item) {
            return [item.lat, item.lng];
        });
    };
    return Polyline;
}());
var B_Map = (function () {
    function B_Map() {
    }
    B_Map.prototype.Map = function (opt) {
        return new Map(opt);
    };
    B_Map.prototype.Marker = function (latlng, opt) {
        return new Marker(latlng, opt);
    };
    B_Map.prototype.Polyline = function (latlngs, opt) {
        return new Polyline(latlngs, opt);
    };
    return B_Map;
}());

var Plain = (function () {
    function Plain(factory) {
        this.FACTORYS = {
            'BMAP': new B_Map(),
        };
        factory && this.use(factory);
    }
    Plain.prototype.use = function (factory) {
        var f;
        if (typeof factory === 'string') {
            f = this.FACTORYS[factory];
        }
        else {
            f = factory;
        }
        this.factory = f;
        return this;
    };
    Plain.prototype.Map = function (opt) {
        return this.factory.Map(opt);
    };
    Plain.prototype.Marker = function (latlng, opt) {
        return this.factory.Marker(latlng, opt);
    };
    Plain.prototype.Polyline = function (latlngs, opt) {
        return this.factory.Polyline(latlngs, opt);
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
