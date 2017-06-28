import F from "../factory/index";

export interface PlainOption {
    key: string;
}

export interface MapOption {
    container: string | Element;
    zoom?: number;
    center?: Array<number>;
}

export interface MarkerOption {
    icon?: F.Icon;
    // offset?: F.Size;
    draggable?: boolean;
    crossOnDrag?: boolean;
    raiseOnDrag?: boolean;
}

export interface PolylineOption {
    color?: string;
    weight?: number;
    opacity?: number; 
}

export interface IconOption {
    url?: string;
    size?: Array<number>;
    anchor?: Array<number>;
}

export interface ViewportOption {
    margins: number[];
}

export interface EventListenerOptions {
    eventName: string;
    host: F.Layer;
    handler?: Function;         // one of them must be set (handler | listener) 
    listener?: any;
}