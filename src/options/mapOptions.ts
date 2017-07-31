import F from '../factory/index';

export interface PlainOption {
    key: string;
}

export interface MapOption {
    container: string | Element;
    zoom?: number;
    center?: Array<number>;
}

export interface LayerOption {
    // latlng?: Array<number>;
    content?: string | Element;
    // class?: string;
    // closeBtn?: boolean;
}

export interface PopupOption {
    latlng?: Array<number>;
    content?: string | Element;
    class?: string;
    closeBtn?: boolean;
    offset?: Array<number>;
    zIndex?: number;
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

export interface LabelOption {
    color?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
}