/// <reference path="./bmap.d.ts" />

import V from '../../var';
import F from '../../factory/index';
import F_MapsEventListener from '../../factory/mapsEventListener';
import * as O from '../../options/mapOptions';
import D from '../../options/default';
import * as util from '../../utils';

// BMap in not defined in this file
// But you will get this variable on window Object
// while loaded baidu map script

@eventBinder
class Map implements F.Map {
    _original: BMap.Map;
    _id: string;
    _type: {map: string, type: string};
    MAP_TYPE: F.MapType;

    constructor(opt: O.MapOption) {
        const center = opt.center ? fixCoord(opt.center) : [0, 0];
        const centerPoint = new BMap.Point(center[1], center[0]);
        this._original = new BMap.Map(opt.container);
        this._original.centerAndZoom(centerPoint, opt.zoom || 15);
        this._original.enableScrollWheelZoom();
        this.MAP_TYPE = {
            HYBRID: 'HYBRID',
            NORMAL: 'NORMAL',
            SATELLITE: 'SATELLITE',
            // TERRAIN: 'TERRAIN',
        };
        this._type = {
            map: 'BMAP',
            type: this.MAP_TYPE.NORMAL
        };
    }

    addLayer(layer: F.Layer | Array<F.Layer>) {
        if (!layer) return;
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

    zoomIn() {
        this._original.zoomIn();
    }

    zoomOut() {
        this._original.zoomOut();
    }

    fitView(latlngs: F.LatLng[], opt?: O.ViewportOption) {
        const points = (<F.LatLng[]>fixCoord(latlngs)).map(p => {
            return {
                lat: p[0],
                lng: p[1]
            };
        });
        this._original.setViewport(points);
    }

    setCenter(latlng: F.LatLng) {
        latlng = <F.LatLng>fixCoord(latlng);
        this._original.setCenter(new BMap.Point(latlng[1], latlng[0]));
    }

    getCenter(): F.LatLng {
        const center = this._original.getCenter();
        return [center.lat, center.lng];
    }

    panTo(latlng: F.LatLng) {
        this._original.panTo(new BMap.Point(latlng[1], latlng[0]));
    }

    setMapType(type: string) {
        const { MAP_TYPE } = this;
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
                // TODO
                break;
            }
        }
        return this;
    }
}

@eventBinder
class Marker implements F.Marker {
    _id: string;
    _original: BMap.Marker;

    constructor(latlng: F.LatLng, opt?: O.MarkerOption) {
        latlng = <F.LatLng>fixCoord(latlng);
        const point = new BMap.Point(latlng[1], latlng[0]);
        const opts = this.formatOpt(opt);
        this._original = new BMap.Marker(point, opts);
    }

    formatOpt (opt: O.MarkerOption = {}) {
        let o = {
            icon: opt.icon ? opt.icon._original : null,
            // offset: opt.offset ? new BMap.Size(opt.offset[0], opt.offset[1]) : null,
            raiseOnDrag: opt.raiseOnDrag ? opt.raiseOnDrag : true,
            crossOnDrag: opt.crossOnDrag ? opt.crossOnDrag : true,
            enableDragging: opt.draggable
        };
        return util.objectAssign(util.clone(opt), o);
    }

    setLatLng(latlng: F.LatLng) {
        latlng = <F.LatLng>fixCoord(latlng);
        const point = new BMap.Point(latlng[1], latlng[0]);
        this._original.setPosition(point);
        return this;
    }

    getLatLng(): F.LatLng {
        const p =  this._original.getPosition();
        return <F.LatLng>fixCoord([p.lat, p.lng], 'output');
    }

    setIcon(icon: Icon): Marker {
        if (icon && icon._original) {
            this._original.setIcon(icon._original);
        }
        return this;
    }

    enableDragging(): Marker {
        this._original && this._original.enableDragging();
        return this;
    }

    disableDragging(): Marker {
        this._original && this._original.disableDragging();
        return this;
    }

    setLabel (str: string = '', labelOpts: O.LabelOption): Marker {
        let label = this._original.getLabel();
        let defaultOpt = {
            border: 'none',
            background: 'transparent',
            zIndex: 1,
        };
        if (label) {
            label.setContent(str);
        } else {
            label = new BMap.Label(str);
            this._original && this._original.setLabel(label);
            this._label = label;
        }
        label.setStyle(util.objectAssign(defaultOpt, labelOpts));
        label.setZIndex(defaultOpt.zIndex);
        return this;
    }
}

@eventBinder
class Polyline implements F.Polyline {
    _id: string;
    _original: BMap.Polyline;

    constructor(latlngs: F.LatLng[], opt?: O.PolylineOption) {
        const points = (<F.LatLng[]>fixCoord(latlngs)).map(latlng => {
            return new BMap.Point(latlng[1], latlng[0]);
        });
        this._original = new BMap.Polyline(points, this.formatOpt(opt));
    }

    formatOpt (opt: O.PolylineOption = {}) {
        util.objectAssign(D.polyline, opt);
        return {
            strokeColor: D.polyline.color,
            strokeWeight: D.polyline.weight,
            strokeOpacity: D.polyline.opacity
        };
    }

    setPath(latlngs: F.LatLng[]): Polyline {
        const points =  (<F.LatLng[]>fixCoord(latlngs)).map(latlng => {
            return new BMap.Point(latlng[1], latlng[0]);
        });
        this._original.setPath(points);
        return this;
    }

    getPath(): F.LatLng[] {
        const points = this._original.getPath() || [];
        return <F.LatLng[]>fixCoord(points.map(item => {
            return [item.lat, item.lng];
        }), 'output');
    }

    setStrokeColor(color: string = D.polyline.color): Polyline {
        this._original && this._original.setStrokeColor(color);
        return this;
    }

    setStrokeWeight(weight: number = D.polyline.weight): Polyline {
        this._original && this._original.setStrokeWeight(weight);
        return this;
    }

    setStrokeOpacity(opacity: number = D.polyline.opacity): Polyline {
        this._original && this._original.setStrokeOpacity(opacity);
        return this;
    }
}

class Icon implements F.Icon {
    _id: string;
    _original: BMap.Icon;

    constructor(opt: O.IconOption) {
        const iconOption = this.formatOpt(opt);
        this._original = new BMap.Icon(iconOption.url, iconOption.size, iconOption);
        this._original.setImageSize(iconOption.size);
    }

    formatOpt(opt: O.IconOption = {}) {
        return {
            anchor: opt.anchor ? new BMap.Size(opt.anchor[0], opt.anchor[1]) : null,
            url: opt.url,
            size: opt.size ? new BMap.Size(opt.size[0], opt.size[1]) : null,
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
    LayerConstructor: any;
    PopupConstructor: any;

    constructor () {
        this.LayerConstructor = createLayerConstructor();
        this.PopupConstructor = createLayerConstructor(true);
        this.Util = {
            formatEvent(e: any = {}): F.Event {
                let point;
                if (e.point) {
                    point = <F.LatLng>fixCoord([e.point.lat, e.point.lng], 'output');
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
        return new this.LayerConstructor(opt);
    }

    Popup(opt: O.LayerOption) {
        return new this.PopupConstructor(opt);
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
        if ((<any>window).BMap) {
            resolve && resolve();
            return;
        }
        const _this = this;
        const callbackName = 'map_init_' + Math.random().toString(16).substr(2);
        const body = document.body;
        const script = document.createElement('SCRIPT');
        const url = `https://api.map.baidu.com/api?v=2.0&ak=${key}&callback=${callbackName}`;
        script.setAttribute('src', url);
        script.setAttribute('defer', '');
        script.setAttribute('async', '');
        body.appendChild(script);
        (<any>window)[callbackName] = function () {
            _this.LayerConstructor = createLayerConstructor();
            _this.PopupConstructor = createLayerConstructor(true);
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
        const listener = this._original.addEventListener(eventName, fn);
        return new F_MapsEventListener({
            eventName: eventName,
            host: this,
            listener: listener,
            handler: fn
        });
    };
    // require MapEventListener
    constructor.prototype.off = function(listener: F.MapsEventListener) {
        this._original.removeEventListener(listener.eventName, listener.handler);
    };
}

function fixCoord (latlngs: F.LatLng[] | F.LatLng, type?: string): F.LatLng[] | F.LatLng {
    if (type === 'output') {
        if (V.coordType === 'DEFAULT') {
            return latlngs;
        }
        switch (V.coordType) {
            case ('DEFAULT'): {
                return latlngs;
            }
            case ('GCJ02'): {
                return util.b2g(<F.LatLng[]>latlngs);
            }
            case ('BD09'): {
                return latlngs;
            }
            case ('WGS84'): {
                return util.b2w(<F.LatLng[]>latlngs);
            }
        }
    } else {
        if (V.coordType === 'DEFAULT') {
            return latlngs;
        }
        switch (V.coordType) {
            case ('DEFAULT'): {
                return latlngs;
            }
            case ('GCJ02'): {
                return util.g2b(<F.LatLng[]>latlngs);
            }
            case ('BD09'): {
                return latlngs;
            }
            case ('WGS84'): {
                return util.w2b(<F.LatLng[]>latlngs);
            }
        }
    }
}

// TODO: In TS Class
/**
 * @function Create a custom layer constructor function
 * @param {Boolean} isPopup Return a popup custructor if this is true
 */
function createLayerConstructor (isPopup: boolean = false): any {
    const BMap = window.BMap;
    if (BMap) {
        const Layer = function (opt?: O.LayerOption) {
            this._box = document.createElement('div');
            this._box.setAttribute('data-plain-style', '');
            this._opt = opt;
            this._latlng = this._latlng || new BMap.Point(0, 0);
            this._content = this._content || '<h1 style="background:#fff;">custom Layer</h1>';
            this.createContent();
        };
        Layer.prototype = new BMap.Overlay();
        Layer.prototype.initialize = function (map: BMap.Map) {
            this._map = map;
            this.createContent();
            map.getPanes().markerPane.appendChild(this._box);
            return this._box;
        };
        Layer.prototype.getStyle = function(o: O.PopupOption) {
            let opt = o || this._opt || {};
            let style = '';
            if (opt.zIndex && typeof opt.zIndex === 'number') {
                style += `z-index:${opt.zIndex};`;
            }
            if (opt.offset && opt.offset instanceof Array && opt.offset.length === 2) {
                style += `margin: ${opt.offset[0]}px ${opt.offset[1]}px;`;
            }
            return style;
        };
        Layer.prototype.createContent = function () {
            this._box.innerHTML = '';
            if (isPopup) {
                util.stopPropagation(this._box, ['click', 'dblclick', 'mousedown']);
                this._box.classList.add('popup-box');
                this._contentBox = document.createElement('div');
                this._box.innerHTML = `<div class="popup-arrow"></div>`;
                this._contentBox.classList.add('popup-content');
                if (typeof this._content === 'string') {
                    this._contentBox.innerHTML = this._content;
                } else {
                    this._contentBox.appendChild(this._content);
                }
                this._box.appendChild(this._contentBox);
                if (this._opt && this._opt.closeBtn === true) {
                    const closeBtn = document.createElement('button');
                    closeBtn.setAttribute('type', 'button');
                    closeBtn.classList.add('popup-close');
                    closeBtn.innerHTML = '×';
                    closeBtn.addEventListener('click', e => {
                        this.hide();
                    });
                    this._box.appendChild(closeBtn);
                }
            } else {
                if (typeof this._content === 'string') {
                    this._box.innerHTML = this._content;
                } else {
                    this._box.appendChild(this._content);
                }
            }
        };
        Layer.prototype.draw = function () {
            if (this._map) {
                const pixel = this._map.pointToOverlayPixel(this._latlng);
                let style = `position: absolute; left: ${~~pixel.x}px; top: ${~~pixel.y}px;`;
                style += this.getStyle(this._opt);
                util.setStyle(this._box, style);
            }
        };
        Layer.prototype.remove = function () {
            this._box.parentNode.removeChild(this._box);
            this._content = null;
            this._contentBox = null;
            this._box = null;
        };
        Layer.prototype.setContent = function (content: string | Element) {
            this._content = content;
            const _box = isPopup ? this._contentBox : this._box;
            if (content instanceof Element) {
                _box.innerHTML = '';
                _box.appendChild(content);
            } else {
                _box.innerHTML = content;
            }
            return this;
        };
        Layer.prototype.setLatLng = function (latlng: F.LatLng = [0, 0]) {
            latlng = <F.LatLng>fixCoord(latlng);
            this._latlng = new BMap.Point(latlng[1], latlng[0]);
            this.draw();
            return this;
        };
        Layer.prototype.mount = function (target: Map) {
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

