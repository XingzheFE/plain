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

var MapsEventListener = (function () {
    function MapsEventListener(parm) {
        this.eventName = parm.eventName;
        this.host = parm.host;
        this.handler = parm.handler;
        this.listener = parm.listener;
    }
    return MapsEventListener;
}());

var variable = {
    DEBUG: true,
    name: 'plain',
};

var util = {
    log: function (v) {
        if (v instanceof Error) {
            console.error(v);
        }
        else if (variable.DEBUG) {
            console.log("[" + variable.name + "] ", v);
        }
    },
    getBound: function (latlngs) {
        var rectangle;
        var minLat = latlngs[0][0], minLng = latlngs[0][1], maxLat = minLat, maxLng = minLng;
        latlngs.map(function (latlng) {
            if (latlng[0] < minLat) {
                minLat = latlng[0];
            }
            else if (latlng[0] > maxLat) {
                maxLat = latlng[0];
            }
            if (latlng[1] < minLng) {
                minLng = latlng[1];
            }
            else if (latlng[1] > maxLng) {
                maxLng = latlng[1];
            }
        });
        return [[minLat, minLng], [maxLat, maxLng]];
    },
    objectAssign: function (target, source) {
        if (Object.assign) {
            Object.assign(target, source);
        }
        else {
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }
};

var Map = (function () {
    function Map(opt) {
        this.MAP_TYPE = {
            HYBRID: 'HYBRID',
            NORMAL: 'NORMAL',
            SATELLITE: 'SATELLITE',
        };
        this._original = new AMap.Map(opt.container, {
            zoom: opt.zoom,
            center: opt.center.slice().reverse(),
        });
    }
    Map.prototype.addLayer = function (layer) {
        if (layer instanceof Array) {
            for (var i = 0; i < layer.length; i++) {
                layer[i]._original.setMap(this._original);
            }
        }
        else {
            layer._original.setMap(this._original);
        }
    };
    Map.prototype.removeLayer = function (layer) {
        if (layer instanceof Array) {
            for (var i = 0; i < layer.length; i++) {
                layer[i]._original.setMap(null);
            }
        }
        else {
            layer._original.setMap(null);
        }
    };
    Map.prototype.clearLayers = function () {
        this._original.clearMap();
    };
    Map.prototype.setZoom = function (zoom) {
        this._original.setZoom(zoom);
    };
    Map.prototype.getZoom = function () {
        return this._original.getZoom();
    };
    Map.prototype.zoomIn = function () {
        this._original.zoomIn();
    };
    Map.prototype.zoomOut = function () {
        this._original.zoomOut();
    };
    Map.prototype.fitView = function (latlngs, opt) {
        var _this = this;
        var bound = util.getBound(latlngs);
        if (this._boundMarkers) {
            bound.map(function (p, i, arr) {
                _this._boundMarkers[i].setPosition([p[1], p[0]]);
            });
        }
        else {
            this._boundIcon = new AMap.Icon({
                size: new AMap.Size(0, 0)
            });
            this._boundMarkers = bound.map(function (latlng) {
                return new AMap.Marker({
                    map: _this._original,
                    icon: _this._boundIcon,
                    position: [latlng[1], latlng[0]],
                });
            });
        }
        this._original.setFitView(this._boundMarkers);
        this._original.remove(this._boundMarkers);
    };
    Map.prototype.setCenter = function (latlng) {
        this._original.setCenter(new AMap.LngLat(latlng[1], latlng[0]));
    };
    Map.prototype.getCenter = function () {
        var center = this._original.getCenter();
        return [center.lat, center.lng];
    };
    Map.prototype.panTo = function (latlng) {
        this._original.panTo(latlng.slice().reverse());
    };
    Map.prototype.setMapType = function (type) {
        var MAP_TYPE = this.MAP_TYPE;
        switch (type) {
            case MAP_TYPE.HYBRID: {
                this._original.setLayers([new AMap.TileLayer.Satellite(), new AMap.TileLayer.RoadNet()]);
                break;
            }
            case MAP_TYPE.NORMAL: {
                this._original.setLayers([new AMap.TileLayer()]);
                break;
            }
            case MAP_TYPE.SATELLITE: {
                this._original.setLayers([new AMap.TileLayer.Satellite()]);
                break;
            }
            case MAP_TYPE.TERRAIN: {
                break;
            }
        }
    };
    Map = __decorate([
        eventBinder
    ], Map);
    return Map;
}());
var Marker = (function () {
    function Marker(latlng, opt) {
        var opts = this.formatOpt(opt, latlng);
        this._original = new AMap.Marker(opts);
    }
    Marker.prototype.formatOpt = function (opt, latlng) {
        if (opt === void 0) { opt = {}; }
        return {
            map: null,
            position: [latlng[1], latlng[0]],
            icon: opt.icon ? opt.icon._original : null,
            raiseOnDrag: opt.raiseOnDrag ? opt.raiseOnDrag : true,
            crossOnDrag: opt.crossOnDrag ? opt.crossOnDrag : true,
            draggable: opt.draggable
        };
    };
    Marker.prototype.setLatLng = function (latlng) {
        this._original.setPosition(latlng.slice().reverse());
        return this;
    };
    Marker.prototype.getLatLng = function () {
        var p = this._original.getPosition();
        return [p.lat, p.lng];
    };
    Marker = __decorate([
        eventBinder
    ], Marker);
    return Marker;
}());
var Polyline = (function () {
    function Polyline(latlngs, opt) {
        var path = latlngs.map(function (latlng) {
            return [latlng[1], latlng[0]];
        });
        var polylineOption = this.formatOpt(opt, path);
        this._original = new AMap.Polyline(polylineOption);
    }
    Polyline.prototype.formatOpt = function (opt, path) {
        if (opt === void 0) { opt = {}; }
        return {
            path: path,
            strokeColor: opt.color || '#3388ff',
            strokeWeight: opt.weight || 3,
            strokeOpacity: opt.opacity || 1
        };
    };
    Polyline.prototype.setPath = function (latlngs) {
        var points = latlngs.map(function (latlng) {
            return [latlng[1], latlng[0]];
        });
        this._original.setPath(points);
    };
    Polyline.prototype.getPath = function () {
        var points = this._original.getPath() || [];
        return points.map(function (item) {
            return [item.lat, item.lng];
        });
    };
    Polyline = __decorate([
        eventBinder
    ], Polyline);
    return Polyline;
}());
var Icon = (function () {
    function Icon(opt) {
        var iconOption = this.formatOpt(opt);
        this._original = new AMap.Icon(iconOption);
        this.anchor = opt.anchor;
    }
    Icon.prototype.formatOpt = function (opt) {
        if (opt === void 0) { opt = {}; }
        var image = opt.url;
        var size = opt.size ? new AMap.Size(opt.size[0], opt.size[1]) : null;
        return {
            image: image,
            size: size,
            imageSize: size,
        };
    };
    Icon.prototype.setImageUrl = function (url) {
    };
    Icon.prototype.setSize = function (size) {
    };
    Icon.prototype.setAnchor = function (size) {
    };
    Icon.prototype.getImageUrl = function () {
        return '';
    };
    Icon.prototype.getAnchor = function () {
        return [];
    };
    Icon.prototype.getSize = function () {
        return [];
    };
    return Icon;
}());
var B_Map = (function () {
    function B_Map() {
        this.Util = {
            formatEvent: function (e) {
                if (e === void 0) { e = {}; }
                var point;
                if (e.lnglat) {
                    point = [e.lnglat.lat, e.lnglat.lng];
                }
                return {
                    type: e.type.replace(/^on/g, ''),
                    target: this,
                    e: e,
                    p: point
                };
            }
        };
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
    B_Map.prototype.Icon = function (opt) {
        return new Icon(opt);
    };
    return B_Map;
}());

function eventBinder(constructor) {
    constructor.prototype.on = function (eventName, handler) {
        var fn = handler.bind(this);
        var listener = this._original.on(eventName, fn);
        return new MapsEventListener({
            eventName: eventName,
            host: this,
            listener: listener,
            handler: fn
        });
    };
    constructor.prototype.off = function (listener) {
        this._original.off(listener.eventName, listener.handler);
    };
}

var Map$1 = (function () {
    function Map(opt) {
        var centerPoint = new BMap.Point(opt.center[1] || 0, opt.center[0] || 0);
        this._original = new BMap.Map(opt.container);
        this._original.centerAndZoom(centerPoint, opt.zoom || 15);
        this._original.enableScrollWheelZoom();
        this.MAP_TYPE = {
            HYBRID: 'HYBRID',
            NORMAL: 'NORMAL',
            SATELLITE: 'SATELLITE',
        };
    }
    Map.prototype.addLayer = function (layer) {
        if (layer instanceof Array) {
            for (var i = 0; i < layer.length; i++) {
                this._original.addOverlay(layer[i]._original);
            }
        }
        else {
            this._original.addOverlay(layer._original);
        }
    };
    Map.prototype.removeLayer = function (layer) {
        if (layer instanceof Array) {
            for (var i = 0; i < layer.length; i++) {
                this._original.removeOverlay(layer[i]._original);
            }
        }
        else {
            this._original.removeOverlay(layer._original);
        }
    };
    Map.prototype.clearLayers = function () {
        this._original.clearOverlays();
    };
    Map.prototype.setZoom = function (zoom) {
        this._original.setZoom(zoom);
    };
    Map.prototype.getZoom = function () {
        return this._original.getZoom();
    };
    Map.prototype.zoomIn = function () {
        this._original.zoomIn();
    };
    Map.prototype.zoomOut = function () {
        this._original.zoomOut();
    };
    Map.prototype.fitView = function (latlngs, opt) {
        var points = latlngs.map(function (p) {
            return {
                lat: p[0],
                lng: p[1]
            };
        });
        this._original.setViewport(points);
    };
    Map.prototype.setCenter = function (latlng) {
        this._original.setCenter({
            lat: latlng[0],
            lng: latlng[1]
        });
    };
    Map.prototype.getCenter = function () {
        var center = this._original.getCenter();
        return [center.lat, center.lng];
    };
    Map.prototype.panTo = function (latlng) {
        this._original.panTo(new BMap.Point(latlng[1], latlng[0]));
    };
    Map.prototype.setMapType = function (type) {
        var MAP_TYPE = this.MAP_TYPE;
        switch (type) {
            case MAP_TYPE.HYBRID: {
                this._original.setMapType(BMAP_HYBRID_MAP);
                break;
            }
            case MAP_TYPE.NORMAL: {
                this._original.setMapType(BMAP_NORMAL_MAP);
                break;
            }
            case MAP_TYPE.SATELLITE: {
                this._original.setMapType(BMAP_SATELLITE_MAP);
                break;
            }
            case MAP_TYPE.TERRAIN: {
                break;
            }
        }
    };
    Map = __decorate([
        eventBinder$1
    ], Map);
    return Map;
}());
var Marker$1 = (function () {
    function Marker(latlng, opt) {
        var point = new BMap.Point(latlng[1], latlng[0]);
        var opts = this.formatOpt(opt);
        this._original = new BMap.Marker(point, opts);
    }
    Marker.prototype.formatOpt = function (opt) {
        if (opt === void 0) { opt = {}; }
        return {
            icon: opt.icon ? opt.icon._original : null,
            raiseOnDrag: opt.raiseOnDrag ? opt.raiseOnDrag : true,
            crossOnDrag: opt.crossOnDrag ? opt.crossOnDrag : true,
            enableDragging: opt.draggable
        };
    };
    Marker.prototype.setLatLng = function (latlng) {
        var point = new BMap.Point(latlng[1], latlng[0]);
        this._original.setPosition(point);
        return this;
    };
    Marker.prototype.getLatLng = function () {
        var p = this._original.getPosition();
        return [p.lat, p.lng];
    };
    Marker = __decorate([
        eventBinder$1
    ], Marker);
    return Marker;
}());
var Polyline$1 = (function () {
    function Polyline(latlngs, opt) {
        var points = latlngs.map(function (latlng) {
            return new BMap.Point(latlng[1], latlng[0]);
        });
        this._original = new BMap.Polyline(points, this.formatOpt(opt));
    }
    Polyline.prototype.formatOpt = function (opt) {
        if (opt === void 0) { opt = {}; }
        return {
            strokeColor: opt.color || '#3388ff',
            strokeWeight: opt.weight || 3,
            strokeOpacity: opt.opacity || 1
        };
    };
    Polyline.prototype.setPath = function (latlngs) {
        var points = latlngs.map(function (latlng) {
            return new BMap.Point(latlng[1], latlng[0]);
        });
        this._original.setPath(points);
    };
    Polyline.prototype.getPath = function () {
        var points = this._original.getPath() || [];
        return points.map(function (item) {
            return [item.lat, item.lng];
        });
    };
    Polyline = __decorate([
        eventBinder$1
    ], Polyline);
    return Polyline;
}());
var Icon$1 = (function () {
    function Icon(opt) {
        var iconOption = this.formatOpt(opt);
        this._original = new BMap.Icon(iconOption.url, iconOption.size, iconOption);
    }
    Icon.prototype.formatOpt = function (opt) {
        if (opt === void 0) { opt = {}; }
        return {
            anchor: opt.anchor ? new BMap.Size(opt.anchor[0], opt.anchor[1]) : null,
            url: opt.url,
            size: opt.size ? new BMap.Size(opt.size[0], opt.size[1]) : null,
        };
    };
    Icon.prototype.setImageUrl = function (url) {
    };
    Icon.prototype.setSize = function (size) {
    };
    Icon.prototype.setAnchor = function (size) {
    };
    Icon.prototype.getImageUrl = function () {
        return '';
    };
    Icon.prototype.getAnchor = function () {
        return [];
    };
    Icon.prototype.getSize = function () {
        return [];
    };
    return Icon;
}());
var B_Map$1 = (function () {
    function B_Map() {
        this.Util = {
            formatEvent: function (e) {
                if (e === void 0) { e = {}; }
                var point;
                if (e.point) {
                    point = [e.point.lat, e.point.lng];
                }
                return {
                    type: e.type.replace(/^on/g, ''),
                    target: this,
                    e: e,
                    p: point,
                };
            }
        };
    }
    B_Map.prototype.Map = function (opt) {
        return new Map$1(opt);
    };
    B_Map.prototype.Marker = function (latlng, opt) {
        return new Marker$1(latlng, opt);
    };
    B_Map.prototype.Polyline = function (latlngs, opt) {
        return new Polyline$1(latlngs, opt);
    };
    B_Map.prototype.Icon = function (opt) {
        return new Icon$1(opt);
    };
    return B_Map;
}());

function eventBinder$1(constructor) {
    constructor.prototype.on = function (eventName, handler) {
        var fn = handler.bind(this);
        var listener = this._original.addEventListener(eventName, fn);
        return new MapsEventListener({
            eventName: eventName,
            host: this,
            listener: listener,
            handler: fn
        });
    };
    constructor.prototype.off = function (listener) {
        this._original.removeEventListener(listener.eventName, listener.handler);
    };
}

var Map$2 = (function () {
    function Map(opt) {
        var centerPoint = new google.maps.LatLng(opt.center[0], opt.center[1]);
        var container = typeof opt.container === 'string' ? document.getElementById(opt.container) : opt.container;
        this._original = new google.maps.Map(container, {
            zoom: opt.zoom,
            center: centerPoint,
            mapTypeControl: false,
            fullscreenControl: false,
            scaleControl: false,
            streetViewControl: false,
            zoomControl: false
        });
        this.MAP_TYPE = {
            HYBRID: 'HYBRID',
            NORMAL: 'NORMAL',
            TERRAIN: 'TERRAIN',
            SATELLITE: 'SATELLITE',
        };
    }
    Map.prototype.addLayer = function (layer) {
        if (layer instanceof Array) {
            for (var i = 0; i < layer.length; i++) {
                layer[i]._original.setMap(this._original);
            }
        }
        else {
            layer._original.setMap(this._original);
        }
    };
    Map.prototype.removeLayer = function (layer) {
        if (layer instanceof Array) {
            for (var i = 0; i < layer.length; i++) {
                layer[i]._original.setMap(null);
            }
        }
        else {
            layer._original.setMap(null);
        }
    };
    Map.prototype.clearLayers = function () {
        this._original.clearOverlays();
    };
    Map.prototype.setZoom = function (zoom) {
        this._original.setZoom(zoom);
    };
    Map.prototype.getZoom = function () {
        return this._original.getZoom();
    };
    Map.prototype.zoomIn = function () {
        this.setZoom(this.getZoom() + 1);
    };
    Map.prototype.zoomOut = function () {
        this.setZoom(this.getZoom() - 1);
    };
    Map.prototype.fitView = function (latlngs, opt) {
        var bound = util.getBound(latlngs).map(function (p) {
            return new google.maps.LatLng(p[0], p[1]);
        });
        var googleBound = new google.maps.LatLngBounds(bound[0], bound[1]);
        this._original.fitBounds(googleBound);
    };
    Map.prototype.setCenter = function (latlng) {
        this._original.setCenter({
            lat: latlng[0],
            lng: latlng[1]
        });
    };
    Map.prototype.setMapType = function (type) {
        var MAP_TYPE = this.MAP_TYPE;
        switch (type) {
            case MAP_TYPE.HYBRID: {
                this._original.setMapTypeId(google.maps.MapTypeId.HYBRID);
                break;
            }
            case MAP_TYPE.NORMAL: {
                this._original.setMapTypeId(google.maps.MapTypeId.ROADMAP);
                break;
            }
            case MAP_TYPE.SATELLITE: {
                this._original.setMapTypeId(google.maps.MapTypeId.SATELLITE);
                break;
            }
            case MAP_TYPE.TERRAIN: {
                this._original.setMapTypeId(google.maps.MapTypeId.TERRAIN);
                break;
            }
        }
    };
    Map.prototype.getCenter = function () {
        var center = this._original.getCenter();
        return [center.lat(), center.lng()];
    };
    Map.prototype.panTo = function (latlng) {
        this._original.panTo(new google.maps.LatLng(latlng[0], latlng[1]));
    };
    Map = __decorate([
        eventBinder$2
    ], Map);
    return Map;
}());
var Marker$2 = (function () {
    function Marker(latlng, opt) {
        var point = new google.maps.LatLng(latlng[0], latlng[1]);
        var opts = this.formatOpt(opt, point);
        this._original = new google.maps.Marker(opts);
    }
    Marker.prototype.formatOpt = function (opt, p) {
        if (opt === void 0) { opt = {}; }
        return {
            icon: opt.icon ? opt.icon._original : null,
            position: p,
            raiseOnDrag: opt.raiseOnDrag ? opt.raiseOnDrag : true,
            crossOnDrag: opt.crossOnDrag ? opt.crossOnDrag : true,
            draggable: opt.draggable
        };
    };
    Marker.prototype.setLatLng = function (latlng) {
        var point = new google.maps.LatLng(latlng[0], latlng[1]);
        this._original.setPosition(point);
        return this;
    };
    Marker.prototype.getLatLng = function () {
        var p = this._original.getPosition();
        return [p.lat(), p.lng()];
    };
    Marker = __decorate([
        eventBinder$2
    ], Marker);
    return Marker;
}());
var Polyline$2 = (function () {
    function Polyline(latlngs, opt) {
        var path = latlngs.map(function (latlng) {
            return new google.maps.LatLng(latlng[0], latlng[1]);
        });
        this._original = new google.maps.Polyline(this.formatOpt(opt, path));
    }
    Polyline.prototype.formatOpt = function (opt, path) {
        if (opt === void 0) { opt = {}; }
        return {
            path: path,
            strokeColor: opt.color || '#3388ff',
            strokeWeight: opt.weight || 3,
            strokeOpacity: opt.opacity || 1
        };
    };
    Polyline.prototype.setPath = function (latlngs) {
        var path = latlngs.map(function (latlng) {
            return new google.maps.LatLng(latlng[0], latlng[1]);
        });
        this._original.setPath(path);
    };
    Polyline.prototype.getPath = function () {
        var points = this._original.getPath();
        return points.getArray().map(function (item) {
            return [item.lat(), item.lng()];
        });
    };
    Polyline = __decorate([
        eventBinder$2
    ], Polyline);
    return Polyline;
}());
var Icon$2 = (function () {
    function Icon(opt) {
        var iconOption = this.formatOpt(opt);
        this._original = {
            url: iconOption.url,
            size: iconOption.size,
            anchor: iconOption.anchor,
        };
    }
    Icon.prototype.formatOpt = function (opt) {
        if (opt === void 0) { opt = {}; }
        return {
            anchor: opt.anchor ? new google.maps.Point(opt.anchor[0], opt.anchor[1]) : null,
            url: opt.url,
            size: opt.size ? new google.maps.Size(opt.size[0], opt.size[1]) : null,
        };
    };
    Icon.prototype.setImageUrl = function (url) {
    };
    Icon.prototype.setSize = function (size) {
    };
    Icon.prototype.setAnchor = function (size) {
    };
    Icon.prototype.getImageUrl = function () {
        return '';
    };
    Icon.prototype.getAnchor = function () {
        return [];
    };
    Icon.prototype.getSize = function () {
        return [];
    };
    return Icon;
}());
var G_Map = (function () {
    function G_Map() {
        this.Util = {
            formatEvent: function (e) {
                if (e === void 0) { e = {}; }
                var point;
                if (e.latLng) {
                    point = [e.latLng.lat(), e.latLng.lng()];
                }
                return {
                    type: e.ta && e.ta.type,
                    target: this,
                    e: e,
                    p: point,
                };
            }
        };
    }
    G_Map.prototype.Map = function (opt) {
        return new Map$2(opt);
    };
    G_Map.prototype.Marker = function (latlng, opt) {
        return new Marker$2(latlng, opt);
    };
    G_Map.prototype.Polyline = function (latlngs, opt) {
        return new Polyline$2(latlngs, opt);
    };
    G_Map.prototype.Icon = function (opt) {
        return new Icon$2(opt);
    };
    return G_Map;
}());
function eventBinder$2(constructor) {
    constructor.prototype.on = function (eventName, handler) {
        var fn = handler.bind(this);
        var listener = this._original.addListener(eventName, fn);
        return new MapsEventListener({
            eventName: eventName,
            host: this,
            listener: listener,
            handler: fn
        });
    };
    constructor.prototype.off = function (listener) {
        google.maps.event.removeListener(listener.listener);
    };
}

var Plain = (function () {
    function Plain(factory) {
        var that = this;
        factory && this.use(factory);
        this.Util = {
            formatEvent: function (e) {
                return that.factory.Util.formatEvent.call(this, e);
            }
        };
        util.objectAssign(this.Util, util);
    }
    Plain.prototype.use = function (factory) {
        if (typeof factory === 'string') {
            switch (factory) {
                case 'BMAP': {
                    this.factory = new B_Map$1();
                    break;
                }
                case 'GMAP': {
                    this.factory = new G_Map();
                    break;
                }
                case 'AMAP': {
                    this.factory = new B_Map();
                    break;
                }
                case 'LMAP': {
                }
            }
        }
        else {
            this.factory = factory;
        }
        return this;
    };
    Plain.prototype.Map = function (_a) {
        var opt = _a[0];
        return this.factory.Map(opt);
    };
    Plain.prototype.Marker = function (_a) {
        var latlng = _a[0], opt = _a[1];
        return this.factory.Marker(latlng, opt);
    };
    Plain.prototype.Polyline = function (_a) {
        var latlngs = _a[0], opt = _a[1];
        return this.factory.Polyline(latlngs, opt);
    };
    Plain.prototype.Icon = function (_a) {
        var opt = _a[0];
        return this.factory.Icon(opt);
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
    __decorate([
        tagging()
    ], Plain.prototype, "Icon", null);
    return Plain;
}());
function tagging() {
    return function (target, propertyKey, descriptor) {
        var oldFn = descriptor.value;
        descriptor.value = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i - 0] = arguments[_i];
            }
            var value = oldFn.call(this, arg);
            value._id = Math.random().toString(16).substr(2);
            return value;
        };
    };
}

return Plain;

})));
//# sourceMappingURL=plain.js.map
