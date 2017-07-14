/// <reference path="./amap.d.ts" />

import F from '../../factory/index';
import F_MapsEventListener from '../../factory/mapsEventListener';
import * as O from '../../options/mapOptions';
import D from '../../options/default';
import util from '../../utils';

// AMap in not defined in this file
// But you will get this variable on window Object
// while loaded baidu map script

@eventBinder
class Map implements F.Map {
    _original: AMap.Map;
    _id: string;
    _type: {map: string, type: string};
    MAP_TYPE: F.MapType;        // tile type

    private _boundMarkers: AMap.Marker[];      // For set Viewport
    private _boundIcon: AMap.Icon;             // For set Viewport

    constructor(opt: O.MapOption) {
        this.MAP_TYPE = {
            HYBRID: 'HYBRID',
            NORMAL: 'NORMAL',   // default
            SATELLITE: 'SATELLITE',
            // TERRAIN: 'TERRAIN',
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

    panTo(latlng: F.LatLng) {
        this._original.panTo(latlng.slice().reverse());
    }

    setMapType(type: string) {
        let { MAP_TYPE } = this;
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
                // TODO
                break;
            }
        }
        return this;
    }
}

class Layer implements F.Layer {
    _original: any;
    _id: string;
    _opt: object;
    _box?: HTMLDivElement;
    _contentBox?: HTMLDivElement;
    constructor (opt: O.LayerOption) {
        this._opt = opt;
        this._original = new AMap.Marker({
           position: [0, 0],
           content: 'custom Layer' 
        });
    }
    setLatLng (latlng: F.LatLng) {
        this._original && this._original.setPosition(latlng.slice().reverse());
        return this;
    }
    setContent (content: string | Element = '') {
        this._original.setContent(content);
        return this;
    }
    mount (map: Map) {
        this._original.setMap(map._original);
        return this;
    }
    unmount () {
        this._original.setMap(null);
        return this;
    }
    show () {
        this._original.show();
        return this;
    }
    hide () {
        this._original.hide();
        return this;
    }
    remove () {
        this._box = null;
        this._contentBox = null;
        this._original = null;
    }
}

class Popup extends Layer {
    constructor (opt: O.LayerOption) {
        super(opt);
        this._box = document.createElement('div');
        this._box.classList.add('popup-box');
        this._box.setAttribute('data-plain-style', '');
        this._box.setAttribute('style', 'position: absolute;transform:translate3d(-50%, -50%, 0);left: 10px;');
        this._contentBox = document.createElement('div');
        this._box.innerHTML = `<div class="popup-arrow"></div`;
        this._contentBox.classList.add('popup-content');
        this._box.appendChild(this._contentBox);
        this._original = new AMap.Marker({
           position: [0, 0],
           content: this._box,
        });
        if (opt && opt.closeBtn === true) {
            let closeBtn = document.createElement('button');
            closeBtn.setAttribute('type', 'button');
            closeBtn.classList.add('popup-close');
            closeBtn.innerHTML = '×';
            closeBtn.addEventListener('click', e => {
                this.hide();
            });
            this._box.appendChild(closeBtn);
        }
    }
    createContent (content: string | Element) {
        if (typeof content === 'string') {
            this._contentBox.innerHTML = content;
        } else {
            this._contentBox.innerHTML = '';
            this._contentBox.appendChild(content);
        }
    }
    setContent (content: string | Element) {
        this.createContent(content);
        return this;
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
        let option = {
            map: null,
            position: [latlng[1], latlng[0]],
            icon: opt.icon ? opt.icon._original : null,
            raiseOnDrag: opt.raiseOnDrag ? opt.raiseOnDrag : true,
            crossOnDrag: opt.crossOnDrag ? opt.crossOnDrag : true,
            draggable: opt.draggable
        }
        // 19 31
        if (opt.icon && opt.icon.anchor) {
            option.offset = new AMap.Pixel(-opt.icon.anchor[0], -opt.icon.anchor[1]);
        }
        return option;
    }

    setLatLng(latlng: F.LatLng) {
        this._original.setPosition(latlng.slice().reverse());
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
        util.objectAssign(D.polyline, opt);
        return {
            path: path,
            strokeColor: D.polyline.color,
            strokeWeight: D.polyline.weight,
            strokeOpacity: D.polyline.opacity
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
                let point;
                if (e.lnglat) {
                    point = [e.lnglat.lat, e.lnglat.lng];
                }
                return {
                    type: e.type.replace(/^on/g, ''),
                    target: this,
                    e: e,
                    p: point,
                    pixel: JSON.parse(JSON.stringify(e.pixel))
                }
            }
        }
    }

    Map(opt: O.MapOption): Map {
        return new Map(opt);
    }

    Layer(opt: O.LayerOption) {
        return new Layer(opt);
    }
    
    Popup(opt: O.LayerOption) {
        return new Popup(opt);
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
        if ((<any>window).AMap) {
            resolve && resolve();
            return;
        }
        let callbackName = 'map_init_' + Math.random().toString(16).substr(2);
        let body = document.body;
        let script = document.createElement("SCRIPT");
        let url = "https://webapi.amap.com/maps?v=1.3&key=" + key + "&callback=" + callbackName;
        script.setAttribute("src", url);
        script.setAttribute("defer", "");
        script.setAttribute("async", "");
        body.appendChild(script);
        (<any>window)[callbackName] = function () {
            resolve && resolve();
            delete (<any>window)[callbackName];
        }
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

// TODO: fixCoord
