import Layer from './layer';
import LatLng from './latlng';
import * as O from '../options/mapOptions';

interface Polyline extends Layer {
    setPath(path: Array<LatLng>): Polyline;
    getPath(): Array<LatLng>;
    setStrokeColor(color: string): Polyline;
    setStrokeWeight(weight: number): Polyline;
    setStrokeOpacity(opacity: number): Polyline;
}

export default Polyline;