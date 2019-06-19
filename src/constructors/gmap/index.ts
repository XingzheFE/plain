
import F from '../../factory/index';
import F_MapsEventListener from '../../factory/mapsEventListener';
import * as O from '../../options/mapOptions';
import D from '../../options/default';
import * as util from '../../utils';

// google.maps in not defined in this file
// But you will get this variable on window Object
// while loaded google map script

@eventBinder
class Map implements F.Map {
    _original: google.maps.Map;
    _id: string;
    _type: {map: string, type: string};
    MAP_TYPE: F.MapType;
    // _fitBound: google.maps.LatLngBounds;

    constructor(opt: O.MapOption) {
        const centerPoint: google.maps.LatLng = new google.maps.LatLng(opt.center[0], opt.center[1]);
        const container = typeof opt.container === 'string' ? document.getElementById(opt.container) : opt.container;
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
        const bound = util.getBound(latlngs).map(p => {
            return new google.maps.LatLng(p[0], p[1]);
        });
        const googleBound = new google.maps.LatLngBounds(bound[0], bound[1]);
        this._original.fitBounds(googleBound);
    }

    setCenter(latlng: F.LatLng) {
        this._original.setCenter({
            lat: latlng[0],
            lng: latlng[1]
        });
    }

    setMapType(type: string) {
        const { MAP_TYPE } = this;
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
    }

    getCenter(): F.LatLng {
        const center = this._original.getCenter();
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
        const point = new google.maps.LatLng(latlng[0], latlng[1]);
        const opts = this.formatOpt(opt, point);
        this._original = new google.maps.Marker(opts);
    }

    formatOpt (opt: O.MarkerOption = {}, p: google.maps.LatLng | google.maps.LatLngLiteral): google.maps.MarkerOptions {
        let o: google.maps.MarkerOptions = {
            icon: opt.icon ? opt.icon._original : null,
            position: p,
            // offset: opt.offset ? new google.maps.Size(opt.offset[0], opt.offset[1]) : null,
            // raiseOnDrag: opt.raiseOnDrag ? opt.raiseOnDrag : true,
            // crossOnDrag: opt.crossOnDrag ? opt.crossOnDrag : true,
            draggable: opt.draggable
        };
        return util.objectAssign(util.clone(opt), o);
    }

    setLatLng(latlng: F.LatLng) {
        const point = new google.maps.LatLng(latlng[0], latlng[1]);
        this._original.setPosition(point);
        return this;
    }

    getLatLng(): F.LatLng {
        const p =  this._original.getPosition();
        return [p.lat(), p.lng()];
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

    setLabel(str: string, opts: O.LabelOption): Marker {
        let defaultOption = {
            text: str || '',
        };
        util.objectAssign(defaultOption, opts);
        this._original && this._original.setLabel(defaultOption);
        return this;
    }
}

@eventBinder
class Polyline implements F.Polyline {
    _id: string;
    _original: google.maps.Polyline;

    constructor(latlngs: F.LatLng[], opt?: O.PolylineOption) {
        const path = latlngs.map(latlng => {
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
        };
    }

    setPath(latlngs: F.LatLng[]) {
        const path = latlngs.map(latlng => {
            return new google.maps.LatLng(latlng[0], latlng[1]);
        });
        this._original.setPath(path);
        return this;
    }

    getPath(): F.LatLng[] {
        const points: google.maps.MVCArray<google.maps.LatLng> = this._original.getPath();
        return points.getArray().map(item => {
            return [item.lat(), item.lng()];
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
    _original: google.maps.Icon;
    anchor: F.Size;
    size: F.Size;
    imageUrl: string;

    constructor(opt: O.IconOption) {
        const iconOption = this.formatOpt(opt);
        this._original = {
            url: iconOption.url,
            size: iconOption.size,
            anchor: iconOption.anchor,
            scaledSize: iconOption.scaledSize,
            labelOrigin: iconOption.labelOrigin
        };
    }

    formatOpt(opt: O.IconOption = {}): google.maps.Icon {
        let imageSize = opt.size ? new google.maps.Size(opt.size[0], opt.size[1]) : null;
        let labelOrigin = opt.labelOrigin ? new google.maps.Point(opt.labelOrigin[0], opt.labelOrigin[1]) : null;
        let o = {
            anchor: opt.anchor ? new google.maps.Point(opt.anchor[0], opt.anchor[1]) : null,
            url: opt.url,
            scaledSize: imageSize,
            size: imageSize,            // marker size
            labelOrigin: labelOrigin,
        };
        return util.objectAssign(util.clone(opt), o);
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
    LayerConstructor: any;
    PopupConstructor: any;

    constructor () {
        this.LayerConstructor = createLayerConstructor();
        this.PopupConstructor = createLayerConstructor(true);
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
        if ((<any>window).google && (<any>window).google.maps) {
            resolve && resolve();
            return;
        }
        const _this = this;
        const callbackName = 'map_init_' + Math.random().toString(16).substr(2);
        const body = document.body;
        const script = document.createElement('SCRIPT');
        const url = 'http://ditu.google.cn/maps/api/js?key=' + key + '&callback=' + callbackName;
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
 * @function set overlay eventListener
 * @param {Function} constructor
 */
function eventBinder(constructor: Function) {
    // return MapEventListener
    constructor.prototype.on = function(eventName: string, handler: Function): F.MapsEventListener {
        let fn: Function = handler.bind(this);
        let listener: google.maps.MapsEventListener = this._original.addListener(eventName, fn);
        return new F_MapsEventListener({
            eventName: eventName,
            host: this,
            listener: listener,
            handler: fn
        });
    };
    // require MapEventListener
    constructor.prototype.off = function(listener: F.MapsEventListener) {
        google.maps.event.removeListener(listener.listener);
    };
}

// TODO: In TS Class
/**
 * @function Create a custom layer constructor function
 * @param {Boolean} isPopup Return a popup custructor if this is true
 */
function createLayerConstructor (isPopup: boolean = false): any {
    let google = window.google;
    if (google && google.maps) {
        let Layer = function (opt?: O.LayerOption) {
            this._opt = opt;
            this.init();
        };
        Layer.prototype = new google.maps.OverlayView();
        Layer.prototype.init = function () {
            this._box = document.createElement('div');
            this._box.setAttribute('data-plain-style', '');
            this._latlng = this._latlng || new google.maps.LatLng(0, 0);
            this._content = this._content || `<h1 style='background:#fff;'>custom Layer</h1>`;
            this.createContent();
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
                util.stopPropagation(this._box);
                this._box.classList.add('popup-box');
                this._contentBox = document.createElement('div');
                this._box.innerHTML = `<div class='popup-arrow'></div>`;
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
        Layer.prototype.onAdd = function () {
            const panes = this.getPanes();
            this.createContent();
            panes.overlayImage.appendChild(this._box);
        };
        Layer.prototype.draw = function () {
            let project = this.getProjection();
            // hold the draggable map
            if (project) {
                let pixel = project.fromLatLngToDivPixel(this._latlng);
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
            let _box = isPopup ? this._contentBox : this._box;
            if (content instanceof Element) {
                _box.innerHTML = '';
                _box.appendChild(content);
            } else {
                _box.innerHTML = content;
            }
            return this;
        };
        Layer.prototype.setLatLng = function (latlng: F.LatLng = [0, 0]) {
            this._latlng = new google.maps.LatLng(latlng[0], latlng[1]);
            this.draw();
            return this;
        };
        Layer.prototype.mount = function (target: Map) {
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
