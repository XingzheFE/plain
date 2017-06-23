import Layer from './layer';
import LatLng from './latlng';

interface Polyline extends Layer {
    setPath(path: Array<LatLng>): void;
    getPath(): Array<LatLng>;
}

export default Polyline;