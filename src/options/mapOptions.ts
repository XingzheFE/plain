import Icon from "../constructors/icon";

export interface mapOption {
    zoom?: number;
    center?: Array<number>;
}

export interface markerOption {
    icon?: Icon;
}

export interface PlainOption {
    key: string;
}

export interface PolylineOption {

}