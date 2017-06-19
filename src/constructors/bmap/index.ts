import _Factory from '../../factory/index'
import _Map from '../../factory/map';
import _Marker from '../../factory/marker';
import _Polyline from '../../factory/polyline';
import Layer from '../../factory/layer';
import LatLng from '../../factory/latlng';
import { mapOption, markerOption, polylineOption } from '../../options/mapOptions';

interface Original_BMap {
    Map: {new(): Function};
    Marker: {new(): Function};
    Poyline: {new(): Function};
}
interface Original_Position {
    lat: number;
    lng: number;
}
declare global {
    interface Window {
        BMap: Original_BMap;
    }
}
let BMap: Original_BMap = window.BMap;

class Map implements _Map {
    _original: {
        addOverlay?(l: object): void;
    };
    _id: string;
    constructor (opt: mapOption) {
        this._original = new BMap.Map();
    }

    addLayer (layer: Layer) {
        let layerOrigin =  layer._original;
        this._original.addOverlay(layerOrigin);
    }

    removeLayer () {

    }

    clearLayers () {

    }

    setZoom () {

    }

    getZoom () {

    }

    fitView () {

    }

    setCenter () {

    }
}

class Marker implements _Marker {
    _original: {
        getPosition?(): Original_Position;
        setPosition?(p: Original_Position): void;
    };

    constructor (opt: markerOption) {
        let options = {

        };
        this._original = new BMap.Marker();
    }

    setLatLng (latlng: LatLng) {
        let p = {
            lat: latlng[0],
            lng: latlng[1]
        };
        this._original.setPosition(p);
        return this;
    }

    getLatLng (): LatLng {
        let p =  this._original.getPosition();
        return [p.lat, p.lng];
    }
}