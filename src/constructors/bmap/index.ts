import Factory from '../../factory/index';
import _Map from '../../factory/map';
import _Marker from '../../factory/marker';
import _Polyline from '../../factory/polyline';
import Layer from '../../factory/layer';
import LatLng from '../../factory/latlng';
import { mapOption, markerOption, polylineOption } from '../../options/mapOptions';

// BMap in not defined in this file
// But you will get this variable on window Object
// while loaded baidu map script

interface Original_BMap {
    Map: {new(): Function};
    Marker: {new(): Function};
    Poyline: {new(): Function};
}
interface Original_BMap_Map {
    addOverlay?(l: object): void;
}
interface Original_BMap_Position {
    lat: number;
    lng: number;
}
interface Original_BMap_Polyline {
    getPath?(): Original_BMap_Position[];
    setPath?(points: Original_BMap_Position[]): void;
}

class Map implements _Map {
    _original: Original_BMap_Map;
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
        getPosition?(): Original_BMap_Position;
        setPosition?(p: Original_BMap_Position): void;
    };

    constructor (latlng: LatLng, opt?: markerOption) {
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

class Polyline implements _Polyline {
    _original: Original_BMap_Polyline;
 
    constructor (latlngs: LatLng[], opt?: polylineOption) {
        this._original = new BMap.Poyline();
    }

    setPath (latlngs: LatLng[]) {
        let points = latlngs.map(item => {
            return {
                lat: item[0],
                lng: item[1]
            }
        });
        this._original.setPath(points);
    }

    getPath (): LatLng[] {
        let points = this._original.getPath() || [];
        return points.map(item => {
            return [item.lat, item.lng]
        });
    }
}

export default class B_Map implements Factory {
    Map (opt: mapOption): Map {
        return new Map(opt);
    }

    Marker (latlng: LatLng, opt?: markerOption): Marker {
        return new Marker(latlng, opt);
    }

    Polyline (latlngs: LatLng[], opt: polylineOption): Polyline {
        return new Polyline(latlngs, opt);
    }
};