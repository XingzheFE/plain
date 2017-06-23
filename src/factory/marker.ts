import Layer from './layer';
import LatLng from './latlng';

interface Marker extends Layer {
    setLatLng(latLng: LatLng): Marker;
    getLatLng(): LatLng;
}

export default Marker;