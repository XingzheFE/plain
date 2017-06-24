import Map from './map';
import Marker from './marker';
import Polyline from './polyline';
import LatLng from './latlng';
import { mapOption, markerOption, polylineOption } from '../options/mapOptions';

/**
 * @interface Factory
 * 
 * @description type for map factory plugin
 */
interface Factory {
    Map(opt: mapOption): Map;
    Marker(point: LatLng, opt?: markerOption): Marker;
    Polyline(points: Array<LatLng>, opt?: polylineOption): Polyline;
}

export default Factory;