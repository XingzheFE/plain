import Layer from './layer';
import LatLng from './latlng';
import * as O from '../options/mapOptions';

interface Map extends Layer {
    _original: object;          // original map object, create in constructor method
    addLayer<T>(layer: T | Array<T>): T | Array<T>;
    removeLayer<T>(layer: T | Array<T>): void;
    clearLayers(): void;
    setZoom(zoom: number): void;
    getZoom(): void;
    zoomIn(): void;
    zoomOut(): void;
    fitView(points: LatLng[], opt: O.ViewportOption): void;
    setCenter(center: LatLng): void;
    getCenter(): LatLng;
    panTo(latlng: LatLng): void;
}

export default Map;