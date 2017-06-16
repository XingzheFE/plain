import Icon from "../constructors/icon";
import Factory from "../factory/factory";

export interface mapOption {
    factory: Factory;
    zoom?: number;
    center?: Array<number>;
}

export interface markerOption {
    factory: Factory;
    icon?: Icon;
}

export interface PlainOption {
    factory: Factory;
    key: string;
}