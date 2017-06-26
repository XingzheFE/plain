import F_Map from './map';
import F_Marker from './marker';
import F_Polyline from './polyline';
import F_LatLng from './latlng';
import F_Layer from './layer';
import F_Icon from './icon';
import F_Size from './size';
import F_Event from './event';
import {  MapOption, MarkerOption, PolylineOption, IconOption } from '../options/mapOptions';

export default F;

namespace F {

    /**
     * @interface Factory
     * 
     * @description Type for map factory plugin
     */
    export interface Factory {
        Map(opt:  MapOption): Map;
        Marker(point: LatLng, opt?: MarkerOption): Marker;
        Polyline(points: Array<LatLng>, opt?: PolylineOption): Polyline;
        Icon(opt: IconOption): Icon;
        Util: Util;
    }

    /**
     * @interface Util
     * 
     * @description Various utility functions
     */
    export interface Util {
        formatEvent(e: object): F_Event;
    }

    export type Map = F_Map;

    export type Marker = F_Marker;

    export type Polyline = F_Polyline;
    
    export type Icon = F_Icon;

    export type Size = F_Size;

    export type LatLng = F_LatLng;

    export type Layer = F_Layer;

    export type Event = F_Event;
}