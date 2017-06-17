import { Layers } from './type/type';
import Factory from './factory/index';
import { mapOption, markerOption, polylineOption } from './options/mapOptions';

export default class Plain {
    map: object;
    layers: Layers;                         // every layer has own id and type
    factory: object;          
    
    constructor (factory: Factory ) {
        this.layers = {};        
        this.use(factory);        
    }

    // load the map factory plugin
    use (factory: Factory): void {
        if (!this.factory) {
            this.factory = factory;
        }
    }

    createMap (opt: mapOption) {
        return this.factory.Map();
    }

    createMarker (opt: markerOption) {
        
    }

    createPolyline (opt: PolylineOption) {

    }
    
    initModule (module: object): void {
        module.
    }

}
