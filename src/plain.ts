import Map from './constructors/map';
import Layer from './constructors/layer';
import { Layers } from './type/type';
import { mapOption, PlainOption } from './options/mapOptions';

export default class Plain {
    map: Map;
    layers: Layers;                         // every layer has own id and type
    factory: object;          
    
    constructor (opt: PlainOption) {
        this.layers = {};        
        this.use(opt);        
    }

    // load the map factory plugin
    use (opt: PlainOption): void {
        this.factory = opt.factory;
    }

    createMap (opt: mapOption) {
        
    }

    createMarker (opt: object) {
        
    }

    createPolyline (opt: object) {

    }
}
