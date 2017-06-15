import Map from 'constructor/map.ts';

export class P {
    map: Map;
    factory: string;
    constructor (opt: mapOption) {
        this.factory = opt;
    }
}
