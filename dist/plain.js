(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Plain = factory());
}(this, (function () { 'use strict';

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var V = {
    DEBUG: true,
    name: 'plain',
    coordType: 'DEFAULT',
    setCoordType: function (type) {
        this.coordType = type;
    }
};
//# sourceMappingURL=var.js.map

var MapsEventListener = (function () {
    function MapsEventListener(parm) {
        this.eventName = parm.eventName;
        this.host = parm.host;
        this.handler = parm.handler;
        this.listener = parm.listener;
    }
    return MapsEventListener;
}());

var D = {
    polyline: {
        color: '#3388ff',
        weight: 3,
        opacity: 0.8,
    }
};
//# sourceMappingURL=default.js.map

var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;
var bd09togcj02 = function bd09togcj02(bd_lat, bd_lon) {
    var bd_lon = +bd_lon;
    var bd_lat = +bd_lat;
    var x = bd_lon - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return [gg_lat, gg_lng];
};
var gcj02tobd09 = function gcj02tobd09(lat, lng) {
    var lat = +lat;
    var lng = +lng;
    var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lat, bd_lng];
};
var wgs84togcj02 = function wgs84togcj02(lat, lng) {
    var lat = +lat;
    var lng = +lng;
    if (out_of_china(lat, lng)) {
        return [lat, lng];
    }
    else {
        var dlat = transformlat(lat - 35.0, lng - 105.0);
        var dlng = transformlng(lat - 35.0, lng - 105.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        return [mglat, mglng];
    }
};
var gcj02towgs84 = function gcj02towgs84(lat, lng) {
    var lat = +lat;
    var lng = +lng;
    if (out_of_china(lat, lng)) {
        return [lat, lng];
    }
    else {
        var dlat = transformlat(lat - 35.0, lng - 105.0);
        var dlng = transformlng(lat - 35.0, lng - 105.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        return [lat * 2 - mglat, lng * 2 - mglng];
    }
};
var transformlat = function transformlat(lat, lng) {
    var lat = +lat;
    var lng = +lng;
    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret;
};
var transformlng = function transformlng(lat, lng) {
    var lat = +lat;
    var lng = +lng;
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret;
};
var out_of_china = function out_of_china(lat, lng) {
    var lat = +lat;
    var lng = +lng;
    return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
};
var coordtransform = {
    bd09togcj02: bd09togcj02,
    gcj02tobd09: gcj02tobd09,
    wgs84togcj02: wgs84togcj02,
    gcj02towgs84: gcj02towgs84
};
//# sourceMappingURL=coordtransform.js.map

function log(v) {
    if (v instanceof Error) {
        console.error(v);
    }
    else if (V.DEBUG) {
        console.log("[" + V.name + "] ", v);
    }
}
function getBound(latlngs) {
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
}
function objectAssign(target, source) {
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
function g2b(latlngs) {
    if (!(latlngs[0] instanceof Array)) {
        return coordtransform.gcj02tobd09(latlngs[0], latlngs[1]);
    }
    return latlngs.map(function (latlng) {
        return coordtransform.gcj02tobd09(latlng[0], latlng[1]);
    });
}
function b2g(latlngs) {
    if (!(latlngs[0] instanceof Array)) {
        return coordtransform.bd09togcj02(latlngs[0], latlngs[1]);
    }
    return latlngs.map(function (latlng) {
        return coordtransform.bd09togcj02(latlng[0], latlng[1]);
    });
}
function w2g(latlngs) {
    if (!(latlngs[0] instanceof Array)) {
        return coordtransform.wgs84togcj02(latlngs[0], latlngs[1]);
    }
    return latlngs.map(function (latlng) {
        return coordtransform.wgs84togcj02(latlng[0], latlng[1]);
    });
}
function g2w(latlngs) {
    if (!(latlngs[0] instanceof Array)) {
        return coordtransform.gcj02towgs84(latlngs[0], latlngs[1]);
    }
    return latlngs.map(function (latlng) {
        return coordtransform.gcj02towgs84(latlng[0], latlng[1]);
    });
}
function w2b(latlngs) {
    if (!(latlngs[0] instanceof Array)) {
        var coor = coordtransform.wgs84togcj02(latlngs[0], latlngs[1]);
        return coordtransform.gcj02tobd09(coor[0], coor[1]);
    }
    var coords = latlngs.map(function (latlng) {
        return coordtransform.wgs84togcj02(latlng[0], latlng[1]);
    });
    return coords.map(function (latlng) {
        return coordtransform.gcj02tobd09(latlng[0], latlng[1]);
    });
}
function b2w(latlngs) {
    if (!(latlngs[0] instanceof Array)) {
        var coor = coordtransform.bd09togcj02(latlngs[0], latlngs[1]);
        return coordtransform.gcj02towgs84(coor[0], coor[1]);
    }
    var coords = latlngs.map(function (latlng) {
        return coordtransform.bd09togcj02(latlng[0], latlng[1]);
    });
    return coords.map(function (latlng) {
        return coordtransform.gcj02towgs84(latlng[0], latlng[1]);
    });
}
function locate(success, error) {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            success && success(position.coords.latitude, position.coords.longitude);
        }, function (e) {
            error && error(e);
        });
    }
    else {
        error && error(new Error('Geolocation is not supported by your browser'));
    }
}
function stopPropagation(el, eventNameList) {
    if (eventNameList === void 0) { eventNameList = ['click', 'dblclick']; }
    eventNameList.map(function (eventName) {
        el.addEventListener(eventName, function (e) {
            e.stopPropagation && e.stopPropagation();
            e.stopImmediatePropagation && e.stopImmediatePropagation();
        });
    });
}
function setStyle(el, style) {
    style.split(';').map(function (s) {
        var attr = s.split(':');
        el.style[trim(attr[0])] = trim(attr[1]);
    });
}
function trim(str) {
    if (str === void 0) { str = ''; }
    return str.replace(/^\s+|\s+$/g, '');
}
function clone(target) {
    if (typeof target === 'object') {
        return JSON.parse(JSON.stringify(target));
    }
    else {
        return target;
    }
}
//# sourceMappingURL=utils.js.map


var util = Object.freeze({
	log: log,
	getBound: getBound,
	objectAssign: objectAssign,
	g2b: g2b,
	b2g: b2g,
	w2g: w2g,
	g2w: g2w,
	w2b: w2b,
	b2w: b2w,
	locate: locate,
	stopPropagation: stopPropagation,
	setStyle: setStyle,
	trim: trim,
	clone: clone
});

var Map = (function () {
    function Map(opt) {
        this.MAP_TYPE = {
            HYBRID: 'HYBRID',
            NORMAL: 'NORMAL',
            SATELLITE: 'SATELLITE',
        };
        this._type = {
            map: 'AMAP',
            type: this.MAP_TYPE.NORMAL
        };
        this._original = new AMap.Map(opt.container, {
            zoom: opt.zoom,
            center: opt.center.slice().reverse(),
        });
    }
    Map.prototype.addLayer = function (layer) {
        if (!layer)
            return;
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
        var bound = getBound(latlngs);
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
                this._type.type = MAP_TYPE.HYBRID;
                this._original.setLayers([new AMap.TileLayer.Satellite(), new AMap.TileLayer.RoadNet()]);
                break;
            }
            case MAP_TYPE.NORMAL: {
                this._type.type = MAP_TYPE.NORMAL;
                this._original.setLayers([new AMap.TileLayer()]);
                break;
            }
            case MAP_TYPE.SATELLITE: {
                this._type.type = MAP_TYPE.SATELLITE;
                this._original.setLayers([new AMap.TileLayer.Satellite()]);
                break;
            }
            case MAP_TYPE.TERRAIN: {
                break;
            }
        }
        return this;
    };
    Map = __decorate([
        eventBinder
    ], Map);
    return Map;
}());
var Layer = (function () {
    function Layer(opt) {
        this._opt = opt;
        this._original = new AMap.Marker({
            bubble: false,
            clickable: false,
            position: [0, 0],
            content: 'custom Layer',
            offset: new AMap.Pixel(0, 0),
        });
    }
    Layer.prototype.setLatLng = function (latlng) {
        this._original && this._original.setPosition(latlng.slice().reverse());
        return this;
    };
    Layer.prototype.setContent = function (content) {
        if (content === void 0) { content = ''; }
        this._original.setContent(content);
        return this;
    };
    Layer.prototype.mount = function (map) {
        this._original.setMap(map._original);
        return this;
    };
    Layer.prototype.unmount = function () {
        this._original.setMap(null);
        return this;
    };
    Layer.prototype.show = function () {
        this._original.show();
        return this;
    };
    Layer.prototype.hide = function () {
        this._original.hide();
        return this;
    };
    Layer.prototype.remove = function () {
        this._box = null;
        this._contentBox = null;
        this._original = null;
    };
    return Layer;
}());
var Popup = (function (_super) {
    __extends(Popup, _super);
    function Popup(opt) {
        var _this = this;
        _super.call(this, opt);
        this._box = document.createElement('div');
        this._box.classList.add('popup-box');
        this._box.setAttribute('data-plain-style', '');
        this._box.setAttribute('style', this.getStyle(opt));
        this._contentBox = document.createElement('div');
        this._box.innerHTML = "<div class=\"popup-arrow\"></div";
        this._contentBox.classList.add('popup-content');
        this._box.appendChild(this._contentBox);
        stopPropagation(this._box, ['mouseup', 'mousedown']);
        this._original = new AMap.Marker({
            bubble: false,
            position: [0, 0],
            content: this._box,
        });
        if (opt && opt.closeBtn === true) {
            var closeBtn = document.createElement('button');
            closeBtn.setAttribute('type', 'button');
            closeBtn.classList.add('popup-close');
            closeBtn.innerHTML = '×';
            closeBtn.addEventListener('click', function (e) {
                _this.hide();
            });
            this._box.appendChild(closeBtn);
        }
    }
    Popup.prototype.getStyle = function (opt) {
        if (opt === void 0) { opt = {}; }
        var style = 'position: absolute;left: 10px;';
        if (opt.zIndex && typeof opt.zIndex === 'number') {
            style += "z-index:" + opt.zIndex + ";";
        }
        if (opt.offset && opt.offset instanceof Array && opt.offset.length === 2) {
            style += "margin: " + (opt.offset[0] + 30) + "px " + opt.offset[1] + "px;";
        }
        return style;
    };
    Popup.prototype.createContent = function (content) {
        if (typeof content === 'string') {
            this._contentBox.innerHTML = content;
        }
        else {
            this._contentBox.innerHTML = '';
            this._contentBox.appendChild(content);
        }
    };
    Popup.prototype.setContent = function (content) {
        this.createContent(content);
        return this;
    };
    return Popup;
}(Layer));
var Marker = (function () {
    function Marker(latlng, opt) {
        var opts = this.formatOpt(opt, latlng);
        this._original = new AMap.Marker(opts);
    }
    Marker.prototype.formatOpt = function (opt, latlng) {
        if (opt === void 0) { opt = {}; }
        var option = {
            map: null,
            position: [latlng[1], latlng[0]],
            icon: opt.icon ? opt.icon._original : null,
            raiseOnDrag: opt.raiseOnDrag ? opt.raiseOnDrag : true,
            crossOnDrag: opt.crossOnDrag ? opt.crossOnDrag : true,
            draggable: opt.draggable
        };
        if (opt.icon && opt.icon.anchor) {
            option.offset = new AMap.Pixel(-opt.icon.anchor[0], -opt.icon.anchor[1]);
        }
        return objectAssign(clone(opt), option);
    };
    Marker.prototype.setLatLng = function (latlng) {
        this._original.setPosition(latlng.slice().reverse());
        return this;
    };
    Marker.prototype.getLatLng = function () {
        var p = this._original.getPosition();
        return [p.lat, p.lng];
    };
    Marker.prototype.setIcon = function (icon) {
        if (icon && icon._original) {
            this._original.setIcon(icon._original);
        }
        return this;
    };
    Marker.prototype.enableDragging = function () {
        this._original && this._original.setDraggable(true);
        return this;
    };
    Marker.prototype.disableDragging = function () {
        this._original && this._original.setDraggable(false);
        return this;
    };
    Marker.prototype.setLabel = function (str, opts) {
        if (str === void 0) { str = ''; }
        this._original.setLabel({
            content: str
        });
        return this;
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
        objectAssign(D.polyline, opt);
        return {
            path: path,
            strokeColor: D.polyline.color,
            strokeWeight: D.polyline.weight,
            strokeOpacity: D.polyline.opacity
        };
    };
    Polyline.prototype.setPath = function (latlngs) {
        var points = latlngs.map(function (latlng) {
            return [latlng[1], latlng[0]];
        });
        this._original.setPath(points);
        return this;
    };
    Polyline.prototype.getPath = function () {
        var points = this._original.getPath() || [];
        return points.map(function (item) {
            return [item.lat, item.lng];
        });
    };
    Polyline.prototype.setStrokeColor = function (color) {
        if (color === void 0) { color = D.polyline.color; }
        this._original && this._original.setOptions({
            strokeColor: color,
        });
        return this;
    };
    Polyline.prototype.setStrokeWeight = function (weight) {
        if (weight === void 0) { weight = D.polyline.weight; }
        this._original && this._original.setOptions({
            strokeWeight: weight,
        });
        return this;
    };
    Polyline.prototype.setStrokeOpacity = function (opacity) {
        if (opacity === void 0) { opacity = D.polyline.opacity; }
        this._original && this._original.setOptions({
            strokeOpacity: opacity
        });
        return this;
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
                    p: point,
                    pixel: JSON.parse(JSON.stringify(e.pixel))
                };
            }
        };
    }
    B_Map.prototype.Map = function (opt) {
        return new Map(opt);
    };
    B_Map.prototype.Layer = function (opt) {
        return new Layer(opt);
    };
    B_Map.prototype.Popup = function (opt) {
        return new Popup(opt);
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
    B_Map.prototype.load = function (key, resolve, reject) {
        if (window.AMap) {
            resolve && resolve();
            return;
        }
        var callbackName = 'map_init_' + Math.random().toString(16).substr(2);
        var body = document.body;
        var script = document.createElement('SCRIPT');
        var url = "https://webapi.amap.com/maps?v=1.3&key=" + key + "&callback=" + callbackName;
        script.setAttribute('src', url);
        script.setAttribute('defer', '');
        script.setAttribute('async', '');
        body.appendChild(script);
        window[callbackName] = function () {
            delete window[callbackName];
            resolve && resolve();
        };
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
        var center = opt.center ? fixCoord(opt.center) : [0, 0];
        var centerPoint = new BMap.Point(center[1], center[0]);
        this._original = new BMap.Map(opt.container);
        this._original.centerAndZoom(centerPoint, opt.zoom || 15);
        this._original.enableScrollWheelZoom();
        this.MAP_TYPE = {
            HYBRID: 'HYBRID',
            NORMAL: 'NORMAL',
            SATELLITE: 'SATELLITE',
        };
        this._type = {
            map: 'BMAP',
            type: this.MAP_TYPE.NORMAL
        };
    }
    Map.prototype.addLayer = function (layer) {
        if (!layer)
            return;
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
        latlng = fixCoord(latlng);
        this._original.setCenter(new BMap.Point(latlng[1], latlng[0]));
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
                this._type.type = MAP_TYPE.HYBRID;
                break;
            }
            case MAP_TYPE.NORMAL: {
                this._original.setMapType(BMAP_NORMAL_MAP);
                this._type.type = MAP_TYPE.NORMAL;
                break;
            }
            case MAP_TYPE.SATELLITE: {
                this._original.setMapType(BMAP_SATELLITE_MAP);
                this._type.type = MAP_TYPE.SATELLITE;
                break;
            }
            case MAP_TYPE.TERRAIN: {
                break;
            }
        }
        return this;
    };
    Map = __decorate([
        eventBinder$1
    ], Map);
    return Map;
}());
var Marker$1 = (function () {
    function Marker(latlng, opt) {
        latlng = fixCoord(latlng);
        var point = new BMap.Point(latlng[1], latlng[0]);
        var opts = this.formatOpt(opt);
        this._original = new BMap.Marker(point, opts);
    }
    Marker.prototype.formatOpt = function (opt) {
        if (opt === void 0) { opt = {}; }
        var o = {
            icon: opt.icon ? opt.icon._original : null,
            raiseOnDrag: opt.raiseOnDrag ? opt.raiseOnDrag : true,
            crossOnDrag: opt.crossOnDrag ? opt.crossOnDrag : true,
            enableDragging: opt.draggable
        };
        return objectAssign(clone(opt), o);
    };
    Marker.prototype.setLatLng = function (latlng) {
        latlng = fixCoord(latlng);
        var point = new BMap.Point(latlng[1], latlng[0]);
        this._original.setPosition(point);
        return this;
    };
    Marker.prototype.getLatLng = function () {
        var p = this._original.getPosition();
        return fixCoord([p.lat, p.lng], 'output');
    };
    Marker.prototype.setIcon = function (icon) {
        if (icon && icon._original) {
            this._original.setIcon(icon._original);
        }
        return this;
    };
    Marker.prototype.enableDragging = function () {
        this._original && this._original.enableDragging();
        return this;
    };
    Marker.prototype.disableDragging = function () {
        this._original && this._original.disableDragging();
        return this;
    };
    Marker.prototype.setLabel = function (str, labelOpts) {
        if (str === void 0) { str = ''; }
        var label = new BMap.Label(str);
        var defaultOpt = {
            border: 'none',
            background: 'transparent',
            zIndex: 1,
        };
        label.setStyle(objectAssign(defaultOpt, labelOpts));
        label.setZIndex(defaultOpt.zIndex);
        this._original && this._original.setLabel(label);
        return this;
    };
    Marker = __decorate([
        eventBinder$1
    ], Marker);
    return Marker;
}());
var Polyline$1 = (function () {
    function Polyline(latlngs, opt) {
        var points = fixCoord(latlngs).map(function (latlng) {
            return new BMap.Point(latlng[1], latlng[0]);
        });
        this._original = new BMap.Polyline(points, this.formatOpt(opt));
    }
    Polyline.prototype.formatOpt = function (opt) {
        if (opt === void 0) { opt = {}; }
        objectAssign(D.polyline, opt);
        return {
            strokeColor: D.polyline.color,
            strokeWeight: D.polyline.weight,
            strokeOpacity: D.polyline.opacity
        };
    };
    Polyline.prototype.setPath = function (latlngs) {
        var points = fixCoord(latlngs).map(function (latlng) {
            return new BMap.Point(latlng[1], latlng[0]);
        });
        this._original.setPath(points);
        return this;
    };
    Polyline.prototype.getPath = function () {
        var points = this._original.getPath() || [];
        return fixCoord(points.map(function (item) {
            return [item.lat, item.lng];
        }), 'output');
    };
    Polyline.prototype.setStrokeColor = function (color) {
        if (color === void 0) { color = D.polyline.color; }
        this._original && this._original.setStrokeColor(color);
        return this;
    };
    Polyline.prototype.setStrokeWeight = function (weight) {
        if (weight === void 0) { weight = D.polyline.weight; }
        this._original && this._original.setStrokeWeight(weight);
        return this;
    };
    Polyline.prototype.setStrokeOpacity = function (opacity) {
        if (opacity === void 0) { opacity = D.polyline.opacity; }
        this._original && this._original.setStrokeOpacity(opacity);
        return this;
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
        this._original.setImageSize(iconOption.size);
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
        this.LayerConstructor = createLayerConstructor();
        this.PopupConstructor = createLayerConstructor(true);
        this.Util = {
            formatEvent: function (e) {
                if (e === void 0) { e = {}; }
                var point;
                if (e.point) {
                    point = fixCoord([e.point.lat, e.point.lng], 'output');
                }
                return {
                    type: e.type.replace(/^on/g, ''),
                    target: this,
                    e: e,
                    p: point,
                    pixel: JSON.parse(JSON.stringify(e.pixel))
                };
            }
        };
    }
    B_Map.prototype.Map = function (opt) {
        return new Map$1(opt);
    };
    B_Map.prototype.Layer = function (opt) {
        return new this.LayerConstructor(opt);
    };
    B_Map.prototype.Popup = function (opt) {
        return new this.PopupConstructor(opt);
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
    B_Map.prototype.load = function (key, resolve, reject) {
        if (window.BMap) {
            resolve && resolve();
            return;
        }
        var _this = this;
        var callbackName = 'map_init_' + Math.random().toString(16).substr(2);
        var body = document.body;
        var script = document.createElement('SCRIPT');
        var url = "https://api.map.baidu.com/api?v=2.0&ak=" + key + "&callback=" + callbackName;
        script.setAttribute('src', url);
        script.setAttribute('defer', '');
        script.setAttribute('async', '');
        body.appendChild(script);
        window[callbackName] = function () {
            _this.LayerConstructor = createLayerConstructor();
            _this.PopupConstructor = createLayerConstructor(true);
            delete window[callbackName];
            resolve && resolve();
        };
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
function fixCoord(latlngs, type) {
    if (type === 'output') {
        if (V.coordType === 'DEFAULT') {
            return latlngs;
        }
        switch (V.coordType) {
            case ('DEFAULT'): {
                return latlngs;
            }
            case ('GCJ02'): {
                return b2g(latlngs);
            }
            case ('BD09'): {
                return latlngs;
            }
            case ('WGS84'): {
                return b2w(latlngs);
            }
        }
    }
    else {
        if (V.coordType === 'DEFAULT') {
            return latlngs;
        }
        switch (V.coordType) {
            case ('DEFAULT'): {
                return latlngs;
            }
            case ('GCJ02'): {
                return g2b(latlngs);
            }
            case ('BD09'): {
                return latlngs;
            }
            case ('WGS84'): {
                return w2b(latlngs);
            }
        }
    }
}
function createLayerConstructor(isPopup) {
    if (isPopup === void 0) { isPopup = false; }
    var BMap = window.BMap;
    if (BMap) {
        var Layer = function (opt) {
            this._box = document.createElement('div');
            this._box.setAttribute('data-plain-style', '');
            this._opt = opt;
            this._latlng = this._latlng || new BMap.Point(0, 0);
            this._content = this._content || '<h1 style="background:#fff;">custom Layer</h1>';
            this.createContent();
        };
        Layer.prototype = new BMap.Overlay();
        Layer.prototype.initialize = function (map) {
            this._map = map;
            this.createContent();
            map.getPanes().markerPane.appendChild(this._box);
            return this._box;
        };
        Layer.prototype.getStyle = function (o) {
            var opt = o || this._opt || {};
            var style = '';
            if (opt.zIndex && typeof opt.zIndex === 'number') {
                style += "z-index:" + opt.zIndex + ";";
            }
            if (opt.offset && opt.offset instanceof Array && opt.offset.length === 2) {
                style += "margin: " + opt.offset[0] + "px " + opt.offset[1] + "px;";
            }
            return style;
        };
        Layer.prototype.createContent = function () {
            var _this = this;
            this._box.innerHTML = '';
            if (isPopup) {
                stopPropagation(this._box, ['click', 'dblclick', 'mousedown']);
                this._box.classList.add('popup-box');
                this._contentBox = document.createElement('div');
                this._box.innerHTML = "<div class=\"popup-arrow\"></div>";
                this._contentBox.classList.add('popup-content');
                if (typeof this._content === 'string') {
                    this._contentBox.innerHTML = this._content;
                }
                else {
                    this._contentBox.appendChild(this._content);
                }
                this._box.appendChild(this._contentBox);
                if (this._opt && this._opt.closeBtn === true) {
                    var closeBtn = document.createElement('button');
                    closeBtn.setAttribute('type', 'button');
                    closeBtn.classList.add('popup-close');
                    closeBtn.innerHTML = '×';
                    closeBtn.addEventListener('click', function (e) {
                        _this.hide();
                    });
                    this._box.appendChild(closeBtn);
                }
            }
            else {
                if (typeof this._content === 'string') {
                    this._box.innerHTML = this._content;
                }
                else {
                    this._box.appendChild(this._content);
                }
            }
        };
        Layer.prototype.draw = function () {
            if (this._map) {
                var pixel = this._map.pointToOverlayPixel(this._latlng);
                var style = "position: absolute; left: " + ~~pixel.x + "px; top: " + ~~pixel.y + "px;";
                style += this.getStyle(this._opt);
                setStyle(this._box, style);
            }
        };
        Layer.prototype.remove = function () {
            this._box.parentNode.removeChild(this._box);
            this._content = null;
            this._contentBox = null;
            this._box = null;
        };
        Layer.prototype.setContent = function (content) {
            this._content = content;
            var _box = isPopup ? this._contentBox : this._box;
            if (content instanceof Element) {
                _box.innerHTML = '';
                _box.appendChild(content);
            }
            else {
                _box.innerHTML = content;
            }
            return this;
        };
        Layer.prototype.setLatLng = function (latlng) {
            if (latlng === void 0) { latlng = [0, 0]; }
            latlng = fixCoord(latlng);
            this._latlng = new BMap.Point(latlng[1], latlng[0]);
            this.draw();
            return this;
        };
        Layer.prototype.mount = function (target) {
            target._original.addOverlay(this);
            return this;
        };
        Layer.prototype.unmount = function () {
            this._map.removeOverlay(this);
            return this;
        };
        Layer.prototype.show = function () {
            if (this._box) {
                this._box.style.display = 'block';
            }
            return this;
        };
        Layer.prototype.hide = function () {
            if (this._box) {
                this._box.style.display = 'none';
            }
            return this;
        };
        return Layer;
    }
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
        this._type = {
            map: 'GMAP',
            type: this.MAP_TYPE.NORMAL
        };
    }
    Map.prototype.addLayer = function (layer) {
        if (!layer)
            return;
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
        var bound = getBound(latlngs).map(function (p) {
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
                this._type.type = MAP_TYPE.HYBRID;
                break;
            }
            case MAP_TYPE.NORMAL: {
                this._original.setMapTypeId(google.maps.MapTypeId.ROADMAP);
                this._type.type = MAP_TYPE.NORMAL;
                break;
            }
            case MAP_TYPE.SATELLITE: {
                this._original.setMapTypeId(google.maps.MapTypeId.SATELLITE);
                this._type.type = MAP_TYPE.SATELLITE;
                break;
            }
            case MAP_TYPE.TERRAIN: {
                this._original.setMapTypeId(google.maps.MapTypeId.TERRAIN);
                this._type.type = MAP_TYPE.TERRAIN;
                break;
            }
        }
        return this;
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
        var o = {
            icon: opt.icon ? opt.icon._original : null,
            position: p,
            raiseOnDrag: opt.raiseOnDrag ? opt.raiseOnDrag : true,
            crossOnDrag: opt.crossOnDrag ? opt.crossOnDrag : true,
            draggable: opt.draggable
        };
        return objectAssign(clone(opt), o);
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
    Marker.prototype.setIcon = function (icon) {
        if (icon && icon._original) {
            this._original.setIcon(icon._original);
        }
        return this;
    };
    Marker.prototype.enableDragging = function () {
        this._original && this._original.setDraggable(true);
        return this;
    };
    Marker.prototype.disableDragging = function () {
        this._original && this._original.setDraggable(false);
        return this;
    };
    Marker.prototype.setLabel = function (str, opts) {
        var defaultOption = {
            text: str || '',
        };
        objectAssign(defaultOption, opts);
        this._original && this._original.setLabel(defaultOption);
        return this;
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
        objectAssign(D.polyline, opt);
        return {
            path: path,
            strokeColor: D.polyline.color,
            strokeWeight: D.polyline.weight,
            strokeOpacity: D.polyline.opacity
        };
    };
    Polyline.prototype.setPath = function (latlngs) {
        var path = latlngs.map(function (latlng) {
            return new google.maps.LatLng(latlng[0], latlng[1]);
        });
        this._original.setPath(path);
        return this;
    };
    Polyline.prototype.getPath = function () {
        var points = this._original.getPath();
        return points.getArray().map(function (item) {
            return [item.lat(), item.lng()];
        });
    };
    Polyline.prototype.setStrokeColor = function (color) {
        if (color === void 0) { color = D.polyline.color; }
        this._original && this._original.setOptions({
            strokeColor: color,
        });
        return this;
    };
    Polyline.prototype.setStrokeWeight = function (weight) {
        if (weight === void 0) { weight = D.polyline.weight; }
        this._original && this._original.setOptions({
            strokeWeight: weight,
        });
        return this;
    };
    Polyline.prototype.setStrokeOpacity = function (opacity) {
        if (opacity === void 0) { opacity = D.polyline.opacity; }
        this._original && this._original.setOptions({
            strokeOpacity: opacity
        });
        return this;
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
            scaledSize: iconOption.scaledSize,
            labelOrigin: iconOption.labelOrigin
        };
    }
    Icon.prototype.formatOpt = function (opt) {
        if (opt === void 0) { opt = {}; }
        var imageSize = opt.size ? new google.maps.Size(opt.size[0], opt.size[1]) : null;
        var labelOrigin = opt.labelOrigin ? new google.maps.Point(opt.labelOrigin[0], opt.labelOrigin[1]) : null;
        var o = {
            anchor: opt.anchor ? new google.maps.Point(opt.anchor[0], opt.anchor[1]) : null,
            url: opt.url,
            scaledSize: new google.maps.Size(100, 100, '%', '%'),
            size: imageSize,
            labelOrigin: labelOrigin,
        };
        return objectAssign(clone(opt), o);
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
        this.LayerConstructor = createLayerConstructor$1();
        this.PopupConstructor = createLayerConstructor$1(true);
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
                    pixel: JSON.parse(JSON.stringify(e.pixel))
                };
            }
        };
    }
    G_Map.prototype.Map = function (opt) {
        return new Map$2(opt);
    };
    G_Map.prototype.Layer = function (opt) {
        return new this.LayerConstructor(opt);
    };
    G_Map.prototype.Popup = function (opt) {
        return new this.PopupConstructor(opt);
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
    G_Map.prototype.load = function (key, resolve, reject) {
        if (window.google && window.google.maps) {
            resolve && resolve();
            return;
        }
        var _this = this;
        var callbackName = 'map_init_' + Math.random().toString(16).substr(2);
        var body = document.body;
        var script = document.createElement('SCRIPT');
        var url = 'https://maps.googleapis.com/maps/api/js?key=' + key + '&callback=' + callbackName;
        script.setAttribute('src', url);
        script.setAttribute('defer', '');
        script.setAttribute('async', '');
        body.appendChild(script);
        window[callbackName] = function () {
            _this.LayerConstructor = createLayerConstructor$1();
            _this.PopupConstructor = createLayerConstructor$1(true);
            delete window[callbackName];
            resolve && resolve();
        };
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
function createLayerConstructor$1(isPopup) {
    if (isPopup === void 0) { isPopup = false; }
    var google = window.google;
    if (google && google.maps) {
        var Layer = function (opt) {
            this._opt = opt;
            this.init();
        };
        Layer.prototype = new google.maps.OverlayView();
        Layer.prototype.init = function () {
            this._box = document.createElement('div');
            this._box.setAttribute('data-plain-style', '');
            this._latlng = this._latlng || new google.maps.LatLng(0, 0);
            this._content = this._content || "<h1 style='background:#fff;'>custom Layer</h1>";
            this.createContent();
        };
        Layer.prototype.getStyle = function (o) {
            var opt = o || this._opt || {};
            var style = '';
            if (opt.zIndex && typeof opt.zIndex === 'number') {
                style += "z-index:" + opt.zIndex + ";";
            }
            if (opt.offset && opt.offset instanceof Array && opt.offset.length === 2) {
                style += "margin: " + opt.offset[0] + "px " + opt.offset[1] + "px;";
            }
            return style;
        };
        Layer.prototype.createContent = function () {
            var _this = this;
            this._box.innerHTML = '';
            if (isPopup) {
                stopPropagation(this._box);
                this._box.classList.add('popup-box');
                this._contentBox = document.createElement('div');
                this._box.innerHTML = "<div class='popup-arrow'></div>";
                this._contentBox.classList.add('popup-content');
                if (typeof this._content === 'string') {
                    this._contentBox.innerHTML = this._content;
                }
                else {
                    this._contentBox.appendChild(this._content);
                }
                this._box.appendChild(this._contentBox);
                if (this._opt && this._opt.closeBtn === true) {
                    var closeBtn = document.createElement('button');
                    closeBtn.setAttribute('type', 'button');
                    closeBtn.classList.add('popup-close');
                    closeBtn.innerHTML = '×';
                    closeBtn.addEventListener('click', function (e) {
                        _this.hide();
                    });
                    this._box.appendChild(closeBtn);
                }
            }
            else {
                if (typeof this._content === 'string') {
                    this._box.innerHTML = this._content;
                }
                else {
                    this._box.appendChild(this._content);
                }
            }
        };
        Layer.prototype.onAdd = function () {
            var panes = this.getPanes();
            this.createContent();
            panes.overlayImage.appendChild(this._box);
        };
        Layer.prototype.draw = function () {
            var project = this.getProjection();
            if (project) {
                var pixel = project.fromLatLngToDivPixel(this._latlng);
                var style = "position: absolute; left: " + ~~pixel.x + "px; top: " + ~~pixel.y + "px;";
                style += this.getStyle(this._opt);
                setStyle(this._box, style);
            }
        };
        Layer.prototype.remove = function () {
            this._box.parentNode.removeChild(this._box);
            this._content = null;
            this._contentBox = null;
            this._box = null;
        };
        Layer.prototype.setContent = function (content) {
            this._content = content;
            var _box = isPopup ? this._contentBox : this._box;
            if (content instanceof Element) {
                _box.innerHTML = '';
                _box.appendChild(content);
            }
            else {
                _box.innerHTML = content;
            }
            return this;
        };
        Layer.prototype.setLatLng = function (latlng) {
            if (latlng === void 0) { latlng = [0, 0]; }
            this._latlng = new google.maps.LatLng(latlng[0], latlng[1]);
            this.draw();
            return this;
        };
        Layer.prototype.mount = function (target) {
            this.init();
            this.setMap(target._original);
            return this;
        };
        Layer.prototype.unmount = function () {
            this.setMap(null);
            return this;
        };
        Layer.prototype.show = function () {
            if (this._box) {
                this._box.style.display = 'block';
            }
            return this;
        };
        Layer.prototype.hide = function () {
            if (this._box) {
                this._box.style.display = 'none';
            }
            return this;
        };
        return Layer;
    }
}

var styleString = "\n.popup-box[data-plain-style] {\n    z-index: 9;\n    padding: 0 0 14px 0;\n    cursor: arrow;\n    transform: translate3d(-50%, -100%, 0);\n    translate: transform ease 0;\n    animation: fade-in-data-plain-style linear 0.12s;\n    pointer-events: auto !important;\n    cursor: auto;\n}\n.popup-box[data-plain-style] .popup-content {\n    padding: 0.5rem 1rem;\n    min-height: 2rem;\n    min-width: 4rem;\n    color: #222;\n    box-shadow: 0 3px 12px rgba(0,0,0,0.38);\n    background: #fff;\n    border-radius: 4px;\n}\n.popup-box[data-plain-style] .popup-arrow{\n    position: absolute;\n    left: 50%;\n    bottom: 0;\n    height: 14px;\n    width: 28px;\n    overflow: hidden;\n    transform: translate3d(-50%, 0, 0);\n}\n.popup-box[data-plain-style] .popup-close {\n    position: absolute;\n    display: block;\n    right: 0;\n    top: 0;\n    height: 20px;\n    width: 20px;\n    border: none;\n    color: #888;\n    font-size: 20px;\n    line-height: 14px;\n    cursor: pointer;\n    background: transparent;\n    outline: none;\n}\n.popup-box[data-plain-style] .popup-close:hover {\n    color: #666;\n}\n.popup-box[data-plain-style] .popup-arrow::after {\n    display: block;\n    content: '';\n    position: absolute;\n    top: -12px;\n    left: 3px;\n    background: #fff;\n    height: 20px;\n    width: 20px;\n    border-radius: 2px;\n    transform: rotate3d(0, 0, 1, 45deg);\n    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.34);\n}\n@keyframes fade-in-data-plain-style {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n\n/**\n *  BMAP */\n/**\n *  AMAP */\n.amap-marker-label {\n    border: none;\n    background: transparent;\n}\n";
//# sourceMappingURL=style.js.map

var Plain = (function () {
    function Plain(factory) {
        var that = this;
        factory && this.use(factory);
        this.Util = {
            formatEvent: function (e) {
                return that.factory.Util.formatEvent.call(this, e);
            }
        };
        objectAssign(this.Util, util);
        this._v = V;
        var style = document.createElement('style');
        style.innerHTML = styleString;
        document.head.appendChild(style);
    }
    Plain.prototype.use = function (factory, key) {
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
    Plain.prototype.Layer = function (_a) {
        var opt = _a[0];
        return this.factory.Layer(opt);
    };
    Plain.prototype.Popup = function (_a) {
        var opt = _a[0];
        return this.factory.Popup(opt);
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
    Plain.prototype.loadMap = function (key, resolve, reject) {
        this.factory.load(key, resolve, reject);
    };
    __decorate([
        tagging()
    ], Plain.prototype, "Map", null);
    __decorate([
        tagging()
    ], Plain.prototype, "Layer", null);
    __decorate([
        tagging()
    ], Plain.prototype, "Popup", null);
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
