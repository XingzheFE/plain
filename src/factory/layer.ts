interface Layer {
    _original: any;      // Original map layer object
    readonly _id: string;            // Unique layer id
    on?(eventName: string, handler: Function): void;    // AddEventListener function，not required
    off?(eventName: string, handler: Function): void;   // Remove a previously added listener funciton
}

export default Layer;
