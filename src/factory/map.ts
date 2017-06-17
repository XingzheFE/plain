import { mapOption } from '../options/mapOptions';

interface Map {
    _original: object;          // original map object, create in constructor method
    addLayer<T> (layer: T | Array<T>): T | Array<T>;
    removeLayer<T> (layer: T | Array<T>): T | Array<T>;
    clearLayers (): void;
}

export default Map;