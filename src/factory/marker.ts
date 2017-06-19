import Layer from './layer';
import LatLng from './latlng';

interface Marker {
    _original: object;
    setLatLng(latLng: LatLng): Marker;
    getLatLng(): LatLng;
}

export default Marker;