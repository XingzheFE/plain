/// <reference path="./amap.d.ts" />

import F from '../../factory/index';
import F_MapsEventListener from '../../factory/mapsEventListener';
import * as O from '../../options/mapOptions';
import D from '../../options/default';
import * as util from '../../utils';

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
        if (!layer) return;
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
        const bound = util.getBound(latlngs);     // length === 2
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
        const center = this._original.getCenter();
        return [center.lat, center.lng];
    }

    panTo(latlng: F.LatLng) {
        this._original.panTo(latlng.slice().reverse());
    }

    setMapType(type: string) {
        const { MAP_TYPE } = this;
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
            bubble: false,
            clickable: false,
            position: [0, 0],
            content: 'custom Layer',
            offset: new AMap.Pixel(0, 0),
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
    constructor (opt: O.PopupOption) {
        super(opt);
        this._box = document.createElement('div');
        this._box.classList.add('popup-box');
        this._box.setAttribute('data-plain-style', '');
        this._box.setAttribute('style', this.getStyle(opt));
        this._contentBox = document.createElement('div');
        this._box.innerHTML = `<div class="popup-arrow"></div`;
        this._contentBox.classList.add('popup-content');
        this._box.appendChild(this._contentBox);
        util.stopPropagation(this._box, ['mouseup', 'mousedown']);

        this._original = new AMap.Marker({
            bubble: false,
            position: [0, 0],
            content: this._box,
            zIndex: opt && opt.zIndex ? opt.zIndex : 999,
        });
        if (opt && opt.closeBtn === true) {
            const closeBtn = document.createElement('button');
            closeBtn.setAttribute('type', 'button');
            closeBtn.classList.add('popup-close');
            closeBtn.innerHTML = '×';
            closeBtn.addEventListener('click', e => {
                this.hide();
            });
            this._box.appendChild(closeBtn);
        }
    }
    getStyle(opt: O.PopupOption = {}) {
        let style = 'position: absolute;left: 10px;';
        if (opt.zIndex && typeof opt.zIndex === 'number') {
            style += `z-index:${opt.zIndex};`;
        }
        if (opt.offset && opt.offset instanceof Array && opt.offset.length === 2) {
            style += `margin: ${opt.offset[0] + 30}px ${opt.offset[1]}px;`;
        }
        return style;
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
        const opts: AMap.MarkerOptions = this.formatOpt(opt, latlng);
        this._original = new AMap.Marker(opts);
    }

    formatOpt (opt: O.MarkerOption = {}, latlng: F.LatLng): object {
        const option = {
            map: null,
            position: [latlng[1], latlng[0]],
            icon: opt.icon ? opt.icon._original : null,
            raiseOnDrag: opt.raiseOnDrag ? opt.raiseOnDrag : true,
            crossOnDrag: opt.crossOnDrag ? opt.crossOnDrag : true,
            draggable: opt.draggable
        };
        // 19 31
        if (opt.icon && opt.icon.anchor) {
            option.offset = new AMap.Pixel(-opt.icon.anchor[0], -opt.icon.anchor[1]);
        }
        return util.objectAssign(util.clone(opt), option);
    }

    setLatLng(latlng: F.LatLng) {
        this._original.setPosition(latlng.slice().reverse());
        return this;
    }

    getLatLng(): F.LatLng {
        const p =  this._original.getPosition();
        return [p.lat, p.lng];
    }

    setIcon(icon: Icon): Marker {
        if (icon && icon._original) {
            this._original.setIcon(icon._original);
        }
        return this;
    }

    enableDragging(): Marker {
        this._original && this._original.setDraggable(true);
        return this;
    }

    disableDragging(): Marker {
        this._original && this._original.setDraggable(false);
        return this;
    }

    setLabel(str: string = '', opts: O.LabelOption): Marker {
        this._original.setLabel({
            content: str
        });
        return this;
    }
}

@eventBinder
class Polyline implements F.Polyline {
    _id: string;
    _original: AMap.Polyline;

    constructor(latlngs: F.LatLng[], opt?: O.PolylineOption) {
        const path = latlngs.map(latlng => {
            return [latlng[1], latlng[0]];
        });
        const polylineOption = this.formatOpt(opt, path);
        this._original = new AMap.Polyline(polylineOption);
    }

    formatOpt (opt: O.PolylineOption = {}, path: number[][]) {
        util.objectAssign(D.polyline, opt);
        return {
            path: path,
            strokeColor: D.polyline.color,
            strokeWeight: D.polyline.weight,
            strokeOpacity: D.polyline.opacity
        };
    }

    setPath(latlngs: F.LatLng[]): Polyline {
        const points = latlngs.map(latlng => {
            return [latlng[1], latlng[0]];
        });
        this._original.setPath(points);
        return this;
    }

    getPath(): F.LatLng[] {
        const points = this._original.getPath() || [];
        return points.map(item => {
            return [item.lat, item.lng];
        });
    }

    setStrokeColor(color: string = D.polyline.color): Polyline {
        this._original && this._original.setOptions({
            strokeColor: color,
        });
        return this;
    }

    setStrokeWeight(weight: number = D.polyline.weight): Polyline {
        this._original && this._original.setOptions({
            strokeWeight: weight,
        });
        return this;
    }

    setStrokeOpacity(opacity: number = D.polyline.opacity): Polyline {
        this._original && this._original.setOptions({
            strokeOpacity: opacity
        });
        return this;
    }
}

class Icon implements F.Icon {
    _id: string;
    _original: AMap.Icon;
    anchor: F.Size;

    constructor(opt: O.IconOption) {
        const iconOption = this.formatOpt(opt);
        this._original = new AMap.Icon(iconOption);
        this.anchor = opt.anchor;
    }

    formatOpt(opt: O.IconOption = {}) {
        const image = opt.url;
        const size = opt.size ? new AMap.Size(opt.size[0], opt.size[1]) : null;
        return {
            image: image,
            size: size,
            imageSize: size,
        };
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
                };
            }
        };
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
        const callbackName = 'map_init_' + Math.random().toString(16).substr(2);
        const body = document.body;
        const script = document.createElement('SCRIPT');
        const url = `https://webapi.amap.com/maps?v=1.3&key=${key}&callback=${callbackName}`;
        script.setAttribute('src', url);
        script.setAttribute('defer', '');
        script.setAttribute('async', '');
        body.appendChild(script);
        (<any>window)[callbackName] = function () {
            delete (<any>window)[callbackName];
            resolve && resolve();
        };
    }
}

/**
 * @function Set overlay eventListener
 * @param {Function} constructor
 */
function eventBinder(constructor: Function) {
    constructor.prototype.on = function(eventName: string, handler: Function): F.MapsEventListener {
        const fn: Function = handler.bind(this);
        const listener = this._original.on(eventName, fn);
        return new F_MapsEventListener({
            eventName: eventName,
            host: this,
            listener: listener,
            handler: fn
        });
    };
    // require MapEventListener
    constructor.prototype.off = function(listener: F.MapsEventListener) {
        this._original.off(listener.eventName, listener.handler);
    };
}

// TODO: fixCoord
