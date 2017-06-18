import LatLng from './latlng';

interface Marker {
    _original: object;
    setLatLng(latLng: LatLng): void;
    getLatLng(): LatLng;
}

export default Marker;