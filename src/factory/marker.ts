import Icon from './icon';
import Layer from './layer';
import LatLng from './latlng';
import * as O from '../options/mapOptions';

interface Marker extends Layer {
    setLatLng(latLng: LatLng): Marker;
    getLatLng(): LatLng;
    setIcon(icon: Icon): Marker;
    enableDragging(): Marker;
    disableDragging(): Marker;
}

export default Marker;