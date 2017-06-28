/// <reference path="./amap.d.ts" />

import F from '../../factory/index';
import F_MapsEventListener from '../../factory/mapsEventListener';
import * as O from '../../options/mapOptions';
import util from '../../utils';

// AMap in not defined in this file
// But you will get this variable on window Object
// while loaded baidu map script
// NOTICE: AMap library will cause memory leak !!

@eventBinder
class Map implements F.Map {
    _original: AMap.Map;
    _id: string;
    private _boundMarkers: AMap.Marker[];      // For set Viewport
    private _boundIcon: AMap.Icon;             // For set Viewport
    
    constructor(opt: O.MapOption) {
        this._original = new AMap.Map(opt.container, {
            zoom: opt.zoom,
            center: opt.center.slice().reverse(),
        });
    }

    addLayer(layer: F.Layer | Array<F.Layer>) {
        if (layer instanceof Array) {
            for (let i = 0; i < layer.length; i++) {
                layer[i]._original.setMap(this._original);
            }
        } else {
            layer._original.setMap(this._original);
        }
    }

    removeLayer(layer: F.Layer | Array<F.Layer>) {
        if (layer instanceof Array) {
            for (let i = 0; i < layer.length; i++) {
                layer[i]._original.setMap(null);
            }
        } else {
            layer._original.setMap(null);
        }
    }

    clearLayers() {
        this._original.clearMap();
    }

    setZoom(zoom: number) {
        this._original.setZoom(zoom);
    }

    getZoom() {
        return this._original.getZoom();
    }

    zoomIn() {
        this._original.zoomIn();    
    }
    
    zoomOut() {
        this._original.zoomOut();
    }
    
    fitView(latlngs: F.LatLng[], opt?: O.ViewportOption) {
        let bound = util.getBound(latlngs);     // length === 2
        if (this._boundMarkers) {
            bound.map((p, i, arr) => {
                this._boundMarkers[i].setPosition([p[1], p[0]]);
            });
        } else {
            console.log('new');
            
            this._boundIcon = new AMap.Icon({
                size: new AMap.Size(0, 0)
            });
            this._boundMarkers = bound.map(latlng => {
                return new AMap.Marker({
                    map: this._original,
                    icon: this._boundIcon,
                    position: [latlng[1], latlng[0]],
                });
            });
        }
        this._original.setFitView(this._boundMarkers);
        // Release memory
        this._original.remove(this._boundMarkers);
    }

    setCenter(latlng: F.LatLng) {
        this._original.setCenter(new AMap.LngLat(latlng[1], latlng[0]));
    }

    getCenter(): F.LatLng {
        let center = this._original.getCenter();
        return [center.lat, center.lng];
    }
    
    panTo(point: F.LatLng) {
        // TODO
    }
}

@eventBinder
class Marker implements F.Marker {
    _id: string;
    _original: AMap.Marker;

    constructor(latlng: F.LatLng, opt?: O.MarkerOption) {
        let opts: AMap.MarkerOptions = this.formatOpt(opt, latlng);
        this._original = new AMap.Marker(opts);
    }

    formatOpt (opt: O.MarkerOption = {}, latlng: F.LatLng): object {
        let markerOffset;
        // if (opt.icon && opt.icon.getAnchor) {
        //     let anchor = opt.icon.getAnchor();
        //     markerOffset
        // }
        return {
            map: null,
            position: [latlng[1], latlng[0]],
            icon: opt.icon ? opt.icon._original : null,
            raiseOnDrag: opt.raiseOnDrag ? opt.raiseOnDrag : true,
            crossOnDrag: opt.crossOnDrag ? opt.crossOnDrag : true,
            // offset: opt.offset ? new AMap.Size(opt.offset[0], opt.offset[1]) : null,
            draggable: opt.draggable
        }
    }
    
    setLatLng(latlng: F.LatLng) {
        let point = new AMap.Point(latlng[1], latlng[0]);
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
    _original: AMap.Polyline;
 
    constructor(latlngs: F.LatLng[], opt?: O.PolylineOption) {
        let path = latlngs.map(latlng => {
            return [latlng[1], latlng[0]];
        });
        let polylineOption = this.formatOpt(opt, path);
        this._original = new AMap.Polyline(polylineOption);
    }   

    formatOpt (opt: O.PolylineOption = {}, path: number[][]) {
        return {
            path: path,
            strokeColor: opt.color || '#3388ff',
            strokeWeight: opt.weight || 3,
            strokeOpacity: opt.opacity || 1
        }
    }

    setPath(latlngs: F.LatLng[]) {
        let points = latlngs.map(latlng => {
            return [latlng[1], latlng[0]];
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
    _original: AMap.Icon;
    anchor: F.Size;
    
    constructor(opt: O.IconOption) {
        let iconOption = this.formatOpt(opt);
        this._original = new AMap.Icon(iconOption);
        this.anchor = opt.anchor;
    }

    formatOpt(opt: O.IconOption = {}) {
        let image = opt.url;
        let size = opt.size ? new AMap.Size(opt.size[0], opt.size[1]) : null;
        return {
            image: image,
            size: size,
            imageSize: size,
        }
    }

    setImageUrl(url: string) {

    }

    setSize(size: F.Size) {

    }

    setAnchor(size: F.Size) {

    }
    
    getImageUrl(): string {
        return '';
    }
    
    getAnchor(): F.Size {
        return [];        
    }
    
    getSize(): F.Size {
        return [];
    }
}

export default class B_Map implements F.Factory {
    Util: F.Util;

    constructor () {
        this.Util = {
            formatEvent(e: any = {}): F.Event {
                return {
                    type: e.type.replace(/^on/g, ''),
                    target: this,
                    e: e
                }
            }
        }
    }

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
 * @function Set overlay eventListener
 * @param {Function} constructor 
 */
function eventBinder(constructor: Function) {
    constructor.prototype.on = function(eventName: string, handler: Function):  F.MapsEventListener {
        let fn: Function = handler.bind(this);
        let listener = this._original.on(eventName, fn);
        return new F_MapsEventListener({
            eventName: eventName,
            host: this,
            listener: listener,
            handler: fn 
        });
    }
    // require MapEventListener
    constructor.prototype.off = function(listener: F.MapsEventListener) {
        this._original.off(listener.eventName, listener.handler);
    }
}