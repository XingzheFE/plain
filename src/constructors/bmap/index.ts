/// <reference path="./bmap.d.ts" />

import F from '../../factory/index';
import * as O from '../../options/mapOptions';

// BMap in not defined in this file
// But you will get this variable on window Object
// while loaded baidu map script

@eventBinder
class Map implements F.Map {
    _original: BMap.Map;
    _id: string;

    constructor(opt: O.MapOption) {
        let centerPoint = new BMap.Point(opt.center[1] || 0, opt.center[0] || 0);
        this._original = new BMap.Map(opt.container);
        this._original.centerAndZoom(centerPoint, opt.zoom || 15);
        this._original.enableScrollWheelZoom();
    }

    addLayer(layer: F.Layer | Array<F.Layer>) {
        if (layer instanceof Array) {
            for (let i = 0; i < layer.length; i++) {
                this._original.addOverlay(layer[i]._original);
            }
        } else {
            this._original.addOverlay(layer._original);
        }
    }

    removeLayer(layer: F.Layer | Array<F.Layer>) {
        if (layer instanceof Array) {
            for (let i = 0; i < layer.length; i++) {
                this._original.removeOverlay(layer[i]._original);
            }
        } else {
            this._original.removeOverlay(layer._original);
        }
    }

    clearLayers() {
        this._original.clearOverlays();
    }

    setZoom(zoom: number) {
        this._original.setZoom(zoom);
    }

    getZoom() {
        return this._original.getZoom();
    }

    fitView(latlngs: F.LatLng[], opt?: O.ViewportOption) {
        let points= latlngs.map(p => {
            return {
                lat: p[0],
                lng: p[1]
            }
        });
        this._original.setViewport(points);
    }

    setCenter(latlng: F.LatLng) {
        this._original.setCenter({
            lat: latlng[0],
            lng: latlng[1]
        });
    }

    getCenter(): F.LatLng {
        let center = this._original.getCenter();
        return [center.lat, center.lng];
    }
}

@eventBinder
class Marker implements F.Marker {
    _id: string;
    _original: BMap.Marker;

    constructor(latlng: F.LatLng, opt?: O.MarkerOption) {
        let point = new BMap.Point(latlng[1], latlng[0]);
        let opts = this.formatOpt(opt);
        this._original = new BMap.Marker(point, opts);
    }

    formatOpt (opt: O.MarkerOption = {}) {
        return {
            icon: opt.icon ? opt.icon._original : null,
            offset: opt.offset ? new BMap.Size(opt.offset[0], opt.offset[1]) : null,
            enableDragging: opt.draggable
        }
    }
    
    setLatLng(latlng: F.LatLng) {
        let point = new BMap.Point(latlng[1], latlng[0]);
        this._original.setPosition(point);
        return this;
    }

    getLatLng(): F.LatLng {
        let p =  this._original.getPosition();
        return [p.lat, p.lng];
    }
}

@eventBinder
class Polyline implements F.Polyline {
    _id: string;
    _original: BMap.Polyline;
 
    constructor(latlngs: F.LatLng[], opt?: O.PolylineOption) {
        let points = latlngs.map(latlng => {
            return new BMap.Point(latlng[1], latlng[0]);
        });
        this._original = new BMap.Polyline(points, this.formatOpt(opt));
    }   

    formatOpt (opt: O.PolylineOption = {}) {
        return {
            strokeColor: opt.color || '#3388ff',
            strokeWeight: opt.weight || 3,
            strokeOpacity: opt.opacity || 1
        }
    }

    setPath(latlngs: F.LatLng[]) {
        let points = latlngs.map(latlng => {
            return new BMap.Point(latlng[1], latlng[0]);
        });
        this._original.setPath(points);
    }

    getPath(): F.LatLng[] {
        let points = this._original.getPath() || [];
        return points.map(item => {
            return [item.lat, item.lng]
        });
    }
}

class Icon implements F.Icon {
    _id: string;
    _original: BMap.Icon;

    constructor(opt: O.IconOption) {
        let iconOption = this.formatOpt(opt);
        this._original = new BMap.Icon(iconOption.url, iconOption.size, iconOption);
    }

    formatOpt(opt: O.IconOption = {}) {
        return {
            anchor: opt.anchor ? new BMap.Size(opt.anchor[0], opt.anchor[1]) : null,
            url: opt.url,
            size: opt.size ? new BMap.Size(opt.size[0], opt.size[1]) : null,
        }
    }

    setImageUrl(url: string) {

    }

    setSize(size: F.Size) {

    }

    setAnchor(size: F.Size) {

    }
}

export default class B_Map implements F.Factory {
    Map(opt: O.MapOption): Map {
        return new Map(opt);
    }

    Marker(latlng: F.LatLng, opt?: O.MarkerOption): Marker {
        return new Marker(latlng, opt);
    }

    Polyline(latlngs: F.LatLng[], opt: O.PolylineOption): Polyline {
        return new Polyline(latlngs, opt);
    }
    Icon(opt: O.IconOption): Icon {
        return new Icon(opt);
    }
};

/**
 * @function set overlay eventListener
 * @param {Function} constructor 
 */
function eventBinder(constructor: Function) {
    constructor.prototype.on = function(eventName: string, handler: Function) {
        this._original.addEventListener(eventName, handler);
    }
    constructor.prototype.off = function(eventName: string, handler: Function) {
        this._original.removeEventListener(eventName, handler);
    }
}