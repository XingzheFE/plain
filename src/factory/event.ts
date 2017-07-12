import Layer from './layer';
import LatLng from './latlng';

interface Event {
    type: string;
    target: Layer;
    e: any;
    p: LatLng;
    pixel: {x: number, y: number}
}

export default Event;