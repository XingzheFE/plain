import { Layers } from './type/type';
import Factory from './factory/index';
import { mapOption, markerOption, polylineOption } from './options/mapOptions';

export default class Plain {
    map: object;
    // layers: Layers;                         // every layer has own id and type
    factory: Factory;          
    
    constructor (factory?: Factory ) {
        // this.layers = {};        
        this.use(factory);        
    }

    // load the map factory plugin
    use (factory: Factory): Plain {
        this.factory = factory;
        return this;
    }

    // create Map
    @tagging()
    Map (opt: mapOption) {
        return this.factory.Map(opt);
    }

    @tagging()
    Marker (opt: markerOption) {
        return this.factory.Marker(opt);
    }

    @tagging()
    Polyline (opt: polylineOption) {
        let polyline = this.factory.Polyline(opt);
        return this.factory.Polyline(opt);
    }
}

/**
 * PropertyDescriptor
 */
function tagging (): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let oldFn = descriptor.value;
        descriptor.value= function (arg: any) {
            let value = oldFn.call(this, arg);
            value._id = Math.random().toString(16).substr(2);
            return value;  
        };
    }
}