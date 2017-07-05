
import F from '../../factory/index';
import F_MapsEventListener from '../../factory/mapsEventListener';
import * as O from '../../options/mapOptions';
import D from '../../options/default';
import util from '../../utils';

// google.maps in not defined in this file
// But you will get this variable on window Object
// while loaded google map script

@eventBinder
class Map implements F.Map {
    _original: google.maps.Map;
    _id: string;
    MAP_TYPE: F.MapType;
    // _fitBound: google.maps.LatLngBounds;

    constructor(opt: O.MapOption) {
        let centerPoint: google.maps.LatLng = new google.maps.LatLng(opt.center[0], opt.center[1]);
        let container = typeof opt.container === 'string' ? document.getElementById(opt.container) : opt.container;
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
        this._original.clearOverlays();
    }

    setZoom(zoom: number) {
        this._original.setZoom(zoom);
    }

    getZoom() {
        return this._original.getZoom();
    }

    zoomIn() {
        this.setZoom(this.getZoom() + 1);
    }

    zoomOut() {
        this.setZoom(this.getZoom() - 1);
    }

    fitView(latlngs: F.LatLng[], opt?: O.ViewportOption) {
        let bound = util.getBound(latlngs).map(p => {
            return new google.maps.LatLng(p[0], p[1]);
        });
        let googleBound = new google.maps.LatLngBounds(bound[0], bound[1]);
        this._original.fitBounds(googleBound);
    }

    setCenter(latlng: F.LatLng) {
        this._original.setCenter({
            lat: latlng[0],
            lng: latlng[1]
        });
    }

    setMapType(type: string) {
        let { MAP_TYPE } = this;
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
    }

    getCenter(): F.LatLng {
        let center = this._original.getCenter();
        return [center.lat(), center.lng()];
    }

    panTo(latlng: F.LatLng): void {
        this._original.panTo(new google.maps.LatLng(latlng[0], latlng[1]));
    }
}

@eventBinder
class Marker implements F.Marker {
    _id: string;
    _original: google.maps.Marker;

    constructor(latlng: F.LatLng, opt?: O.MarkerOption) {
        let point = new google.maps.LatLng(latlng[0], latlng[1]);
        let opts = this.formatOpt(opt, point);
        this._original = new google.maps.Marker(opts);
    }

    formatOpt (opt: O.MarkerOption = {}, p: google.maps.LatLng) {
        return {
            icon: opt.icon ? opt.icon._original : null,
            position: p,
            // offset: opt.offset ? new google.maps.Size(opt.offset[0], opt.offset[1]) : null,
            raiseOnDrag: opt.raiseOnDrag ? opt.raiseOnDrag : true,
            crossOnDrag: opt.crossOnDrag ? opt.crossOnDrag : true,
            draggable: opt.draggable
        }
    }

    setLatLng(latlng: F.LatLng) {
        let point = new google.maps.LatLng(latlng[0], latlng[1]);
        this._original.setPosition(point);
        return this;
    }

    getLatLng(): F.LatLng {
        let p =  this._original.getPosition();
        return [p.lat(), p.lng()];
    }

    // TODO: change draggable property
}

@eventBinder
class Polyline implements F.Polyline {
    _id: string;
    _original: google.maps.Polyline;

    constructor(latlngs: F.LatLng[], opt?: O.PolylineOption) {
        let path = latlngs.map(latlng => {
            return new google.maps.LatLng(latlng[0], latlng[1]);
        });
        this._original = new google.maps.Polyline(this.formatOpt(opt, path));
    }

    formatOpt (opt: O.PolylineOption = {}, path: google.maps.LatLng[]) {
        util.objectAssign(D.polyline, opt);
        return {
            path: path,
            strokeColor: D.polyline.color,
            strokeWeight: D.polyline.weight,
            strokeOpacity: D.polyline.opacity
        }
    }

    setPath(latlngs: F.LatLng[]) {
        let path = latlngs.map(latlng => {
            return new google.maps.LatLng(latlng[0], latlng[1]);
        });
        this._original.setPath(path);
    }

    getPath(): F.LatLng[] {
        let points: google.maps.MVCArray<google.maps.LatLng> = this._original.getPath();
        return points.getArray().map(item => {
            return [item.lat(), item.lng()]
        });
    }
}

class Icon implements F.Icon {
    _id: string;
    _original: google.maps.Icon;

    constructor(opt: O.IconOption) {
        let iconOption = this.formatOpt(opt);
        this._original = {
            url: iconOption.url,
            size: iconOption.size,
            anchor: iconOption.anchor,
        };
    }

    formatOpt(opt: O.IconOption = {}) {
        return {
            anchor: opt.anchor ? new google.maps.Point(opt.anchor[0], opt.anchor[1]) : null,
            url: opt.url,
            size: opt.size ? new google.maps.Size(opt.size[0], opt.size[1]) : null,
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

export default class G_Map implements F.Factory {
    Util: F.Util;

    constructor () {
        this.Util = {
            formatEvent(e: any = {}): F.Event {
                let point;
                if (e.latLng) {
                    point = [e.latLng.lat(), e.latLng.lng()];
                }
                return {
                    type: e.ta && e.ta.type,
                    target: this,
                    e: e,
                    p: point,
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

    // Load map script
    load(key: string, resolve: Function, reject: Function): void {
        if ((<any>window).google && (<any>window).google.maps) {
            resolve && resolve();
            return;
        }
        let callbackName = 'map_init_' + Math.random().toString(16).substr(2);
        let body = document.body;
        let script = document.createElement("SCRIPT");
        let url = "https://maps.googleapis.com/maps/api/js?key=" + key + "&callback=" + callbackName;
        script.setAttribute("src", url);
        script.setAttribute("defer", "");
        script.setAttribute("async", "");
        body.appendChild(script);
        (<any>window)[callbackName] = function () {
            resolve && resolve();
            delete (<any>window)[callbackName];
        }
    }
}

/**
 * @function set overlay eventListener
 * @param {Function} constructor
 */
function eventBinder(constructor: Function) {
    // return MapEventListener
    constructor.prototype.on = function(eventName: string, handler: Function):  F.MapsEventListener {
        let fn: Function = handler.bind(this);
        let listener: google.maps.MapsEventListener = this._original.addListener(eventName, fn);
        return new F_MapsEventListener({
            eventName: eventName,
            host: this,
            listener: listener,
            handler: fn
        });
    }
    // require MapEventListener
    constructor.prototype.off = function(listener: F.MapsEventListener) {
        google.maps.event.removeListener(listener.listener);
    }
}
