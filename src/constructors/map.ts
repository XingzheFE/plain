import Factory from '../factory/factory';
import Layer from './layer';
import { Layers } from '../type/type';
import { mapOption, PlainOption } from '../options/mapOptions';

export default class Map {
    original: object;
    factory: Factory;
    layers: Layers;
    
    constructor (opt: mapOption) {
        this.factory = opt.factroy;
    }

    addLayer (layer: Layer) {
        let _id: string = layer._id;
        if (_id) {
            this.layers[_id] = layer;
            // this.map.addLayer(layer.original);
            this.factory.map.addLayer.call(this, layer.original);
        } else {
            return;
        }
    }
}
