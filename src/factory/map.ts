import Layer from './layer';
import LatLng from './latlng';
import MapType from './mapType';
import * as O from '../options/mapOptions';

interface Map extends Layer {
    _original: object;          // original map object, create in constructor method
    _type: object;              // map type, not tile type
    MAP_TYPE: MapType;
    addLayer(layer: Layer | Array<Layer>): void;
    removeLayer(layer: Layer | Array<Layer>): void;
    clearLayers(): void;
    setZoom(zoom: number): void;
    getZoom(): void;
    zoomIn(): void;
    zoomOut(): void;
    fitView(points: LatLng[], opt: O.ViewportOption): void;
    setCenter(center: LatLng): void;
    getCenter(): LatLng;
    panTo(latlng: LatLng): void;
    setMapType(type: string): Map;
    getMapType?(): string;
    search?(name: string, resolve: Function, reject?: Function): void;
}

export default Map;
