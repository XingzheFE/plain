// import Icon from "../constructors/icon";

export interface PlainOption {
    key: string;
}

export interface mapOption {
    container: string | HTMLDivElement;
    zoom?: number;
    center?: Array<number>;
}

export interface markerOption {
    icon?: iconOption;
}

export interface polylineOption {
    color?: string;
    weight?: number;
    opacity?: number; 
}

export interface iconOption {
    url?: string;
    size?: Array<number>;
    offset?: Array<number>;
    anchor?: Array<number>;
}