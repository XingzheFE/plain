System.register(["../../factory/mapsEventListener", "../../options/mapOptions", "../../options/default", "../../utils"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    function eventBinder(constructor) {
        constructor.prototype.on = function (eventName, handler) {
            var fn = handler.bind(this);
            var listener = this._original.addListener(eventName, fn);
            return new mapsEventListener_1.default({
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
    var mapsEventListener_1, O, default_1, utils_1, Map, Marker, Polyline, Icon, G_Map;
    return {
        setters: [
            function (mapsEventListener_1_1) {
                mapsEventListener_1 = mapsEventListener_1_1;
            },
            function (O_1) {
                O = O_1;
            },
            function (default_1_1) {
                default_1 = default_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            Map = (function () {
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
                    var bound = utils_1.default.getBound(latlngs).map(function (p) {
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
                return Map;
            }());
            Map = __decorate([
                eventBinder,
                __metadata("design:paramtypes", [Object])
            ], Map);
            Marker = (function () {
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
                return Marker;
            }());
            Marker = __decorate([
                eventBinder,
                __metadata("design:paramtypes", [Object, Object])
            ], Marker);
            Polyline = (function () {
                function Polyline(latlngs, opt) {
                    var path = latlngs.map(function (latlng) {
                        return new google.maps.LatLng(latlng[0], latlng[1]);
                    });
                    this._original = new google.maps.Polyline(this.formatOpt(opt, path));
                }
                Polyline.prototype.formatOpt = function (opt, path) {
                    if (opt === void 0) { opt = {}; }
                    utils_1.default.objectAssign(default_1.default.polyline, opt);
                    return {
                        path: path,
                        strokeColor: default_1.default.polyline.color,
                        strokeWeight: default_1.default.polyline.weight,
                        strokeOpacity: default_1.default.polyline.opacity
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
                return Polyline;
            }());
            Polyline = __decorate([
                eventBinder,
                __metadata("design:paramtypes", [Array, Object])
            ], Polyline);
            Icon = (function () {
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
            G_Map = (function () {
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
                    return new Map(opt);
                };
                G_Map.prototype.Marker = function (latlng, opt) {
                    return new Marker(latlng, opt);
                };
                G_Map.prototype.Polyline = function (latlngs, opt) {
                    return new Polyline(latlngs, opt);
                };
                G_Map.prototype.Icon = function (opt) {
                    return new Icon(opt);
                };
                G_Map.prototype.load = function (key, resolve, reject) {
                    if (window.google && window.google.maps) {
                        resolve && resolve();
                        return;
                    }
                    var callbackName = 'map_init_' + Math.random().toString(16).substr(2);
                    var body = document.body;
                    var script = document.createElement("SCRIPT");
                    var url = "https://maps.googleapis.com/maps/api/js?key=" + key + "&callback=" + callbackName;
                    script.setAttribute("src", url);
                    script.setAttribute("defer", "");
                    script.setAttribute("async", "");
                    body.appendChild(script);
                    window[callbackName] = function () {
                        resolve && resolve();
                        delete window[callbackName];
                    };
                };
                return G_Map;
            }());
            exports_1("default", G_Map);
        }
    };
});
//# sourceMappingURL=index.js.map