import F from "../factory/index";

export interface PlainOption {
    key: string;
}

export interface MapOption {
    container: string | HTMLDivElement;
    zoom?: number;
    center?: Array<number>;
}

export interface MarkerOption {
    icon?: F.Icon;
    offset?: F.Size;
    draggable?: boolean;
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