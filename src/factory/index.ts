import Map from './map';
import Marker from './marker';
import Polyline from './polyline';
import { mapOption, markerOption, polylineOption } from '../options/mapOptions';

/**
 * @interface Factory
 * 
 * @description type for map factory plugin
 */
interface Factory {
    Map (opt: mapOption): Map;
    Marker (opt: markerOption): Marker;
    Polyline (opt: polylineOption): Polyline;
}

export default Factory;