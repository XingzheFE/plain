import F from './factory/index';
import LatLng from './factory/latlng';
import O from './options/mapOptions';
import A_Map from './constructors/amap/index';      // gaode map
import B_Map from './constructors/bmap/index';      // baidu map
import G_Map from './constructors/gmap/index';      // google map
import util from './utils';
// Error with import require: can not find module 'object-assign'
// import objectAssign = require('object-assign');

export default class Plain {
    FACTORYS: {[key: string]: F.Factory};
    Util: F.Util;
    map: object;
    factory: F.Factory;          
    
    constructor(factory?: F.Factory | string) {
        let that = this;
        factory && this.use(factory);
        // Various utility functions
        this.Util = {
            formatEvent(e: any): F.Event {
                return that.factory.Util.formatEvent.call(this, e);
            }
        }
        util.objectAssign(this.Util, util);
    }

    // Load the map factory plugin
    use(factory: F.Factory | string): Plain {
        if(typeof factory === 'string') {
            switch (factory) {
                case 'BMAP': {
                    this.factory = new B_Map();
                    break;
                }
                case 'GMAP': {
                    this.factory = new G_Map();
                    break;
                }
                case 'AMAP': {
                    this.factory = new A_Map();    
                    break;
                }
                case 'LMAP': {
                    // this.factory = new L_Map();
                }
            }
        } else {
            this.factory = factory;
        }
        return this;
    }

    // Create Map
    @tagging()
    Map([opt] : [O.MapOption]) {
        return this.factory.Map(opt);
    }

    // Create Marker
    @tagging()
    Marker([latlng, opt] : [LatLng, O.MarkerOption]) {
        return this.factory.Marker(latlng, opt);
    }

    // Create Polyline
    @tagging()
    Polyline([latlngs, opt] : [LatLng[], O.PolylineOption]) {
        return this.factory.Polyline(latlngs, opt);
    }

    // Create Icon
    @tagging()
    Icon([opt] : [O.IconOption]) {
        return this.factory.Icon(opt);
    }
    
    
}

/**
 * @function set _id property
 */
function tagging(): Function {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let oldFn = descriptor.value;
        descriptor.value= function(...arg: any[]) {
            let value = oldFn.call(this, arg);
            value._id = Math.random().toString(16).substr(2);
            return value;  
        };
    }
}

