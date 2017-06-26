import Layer from './layer';

interface Event {
    type: string;
    target: Layer;
    e: any;
}

export default Event;