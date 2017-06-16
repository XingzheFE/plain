import Factory from '../factory/factory';

/**
 * @class Layer
 * 
 * @description all layer extends Class Layer
 * eg. marker polyline popup
 */
export default class Layer {
    readonly _id: string;
    original: object;
    factory: Factory;

    constructor (o: object, factory: Factory) {
        this._id = Math.random().toString(16).substr(2);
        this.original = o;
        this.factory = factory;
    }

    getOriginal (): object {
        return this.original;
    }

    addEventListener (eventName: string, callback: Function) {
        this.factory.addEventListener.call(this.original, eventName, callback);
    }
}