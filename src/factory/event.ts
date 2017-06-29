import Layer from './layer';
import LatLng from './latlng';

interface Event {
    type: string;
    target: Layer;
    e: any;
    p: LatLng;
}

export default Event;