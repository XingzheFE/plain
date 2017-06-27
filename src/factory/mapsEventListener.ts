// Return an EventListener that can be used with Layer.off();
import Layer from './layer';
import O from '../options/mapOptions';

export default class MapsEventListener {
    private static eventName: string;
    private static host: Layer;           // Plain.Layer
    private static handler: Function;    // Event handler
    private static listener: any;        // Original MapsEventListener(eg: google.maps.event)
    constructor(parm: O.EventListenerOptions) {
        this.eventName = parm.eventName;
        this.host = parm.host;
        this.handler = parm.handler;
        this.listener = parm.listener;
    }
}