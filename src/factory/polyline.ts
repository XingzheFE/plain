import LatLng from './latlng';

interface Polyline {
    _original: object;
    setPath(path: Array<LatLng>): void;
    getPath(): Array<LatLng>;
}

export default Polyline;